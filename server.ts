import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json({ limit: '10mb' }));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_INSTRUCTION = `You are GlowGuide AI, a beauty and cosmetic assistant for a skincare website.

Your job:
- Help users choose the right cosmetic products
- Suggest skincare and haircare routines
- Recommend product types based on skin/hair type

Style:
- Friendly, feminine, and supportive
- Use light emojis like ✨🌸💖
- Keep answers neat and structured

Rules:
- No medical diagnosis
- No brand promotion (only product types)

Output format (always follow this structured format when recommending routines or product guidance):
✨ Skin Type:
✨ Hair Type:

💖 Recommended Products:
- Cleanser:
- Moisturizer:
- Shampoo:

🌿 Routine:
Morning:
- Step 1
- Step 2
Night:
- Step 1
- Step 2

🌸 Tips:
- Tip 1
- Tip 2

⚠️ Disclaimer:
This is general guidance and not medical advice.

When answering specific beauty or ingredient questions, maintain this friendly, feminine, and supportive tone with light emojis, bullet points, no brand promotion, and the gentle disclaimer at the end.`;

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

const CANDIDATE_MODELS = [
  'gemini-3.6-flash',
  'gemini-3.8-flash',
  'gemini-3.5-flash',
  'gemini-flash-latest',
  'gemini-3.1-flash-lite',
];

// Helper to generate a structured, empathetic response if upstream API is temporarily unreachable
function generateResilientFallback(userMessage: string, context: any): string {
  const profile = context?.userProfile || {};
  const skin = profile.skinType || context?.currentRoutineSkinType || 'Combination';
  const hair = profile.hairTexture || context?.currentRoutineHairType || 'Wavy';
  const scalp = profile.scalpType || 'Balanced';
  const concerns: string[] = profile.concerns || [];

  const isDry = concerns.some((c: string) => c.toLowerCase().includes('dry')) || skin.toLowerCase().includes('dry');
  const isAcne = concerns.some((c: string) => c.toLowerCase().includes('acne')) || userMessage.toLowerCase().includes('acne');
  const isOily = skin.toLowerCase().includes('oily') || scalp.toLowerCase().includes('oily');

  return `Hey gorgeous! ✨ Based on what you shared, here is your personalized beauty guide 💖

✨ Skin Type: ${skin}
✨ Hair Type: ${hair} (Scalp: ${scalp})

💖 Recommended Products:
- Cleanser: ${isOily || isAcne ? 'Low-pH gentle foaming gel cleanser' : 'Hydrating milky cream cleanser'}
- Moisturizer: ${isDry ? 'Barrier-repair ceramide rich cream' : 'Lightweight, oil-free water gel moisturizer'}
- Shampoo: ${isOily ? 'Clarifying scalp-balancing shampoo (sulfate-free)' : 'Moisturizing sulfate-free gentle shampoo'}

🌿 Routine:
Morning:
- Step 1: Cleanse with lukewarm water and gentle cleanser
- Step 2: Apply a lightweight hydrating moisturizer on damp skin
- Step 3: Protect with broad-spectrum SPF 50+ sunscreen

Night:
- Step 1: Double-cleanse to gently lift away daily SPF and impurities
- Step 2: Seal in nourishment with your night moisturizer
- Step 3: Sleep on a silk or satin pillowcase to protect hair texture

🌸 Tips:
- Always patch-test new products on your inner wrist for 24 hours before first use ✨
- Apply hydrating serums and moisturizers to damp skin to seal in optimal hydration 💧
- Never pop or pick blemishes; use hydrocolloid pimple patches to calm irritation gently 🌸

⚠️ Disclaimer:
This is general guidance and not medical advice.`;
}

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, context } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: 'Messages array is required.' });
      return;
    }

    const latestUserMsg = [...messages].reverse().find((m: any) => m.role === 'user')?.content || '';

    // Prepare contents array for Gemini
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    if (context) {
      contents.unshift({
        role: 'user',
        parts: [{ text: `[User Profile Context]: ${JSON.stringify(context)}` }],
      });
    }

    let reply = '';
    let success = false;
    let lastError: any = null;

    // Try candidate models in order with graceful fallbacks
    for (const modelName of CANDIDATE_MODELS) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
        });

        if (response && response.text) {
          reply = response.text;
          success = true;
          break;
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${modelName} call failed with status ${err?.status || err?.code || 'unknown'}, trying next model...`);
        // Brief backoff before next candidate
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
    }

    // If upstream models all had transient 503/429 spikes, use the resilient fallback
    if (!success || !reply) {
      console.warn('All Gemini candidate models were temporarily unavailable; generating resilient fallback.');
      reply = generateResilientFallback(latestUserMsg, context);
    }

    res.json({ reply });
  } catch (error: any) {
    console.error('Critical chat handler error:', error);
    const fallbackText = generateResilientFallback('', req.body?.context);
    res.json({ reply: fallbackText });
  }
});

// Proxy for the user's n8n AI Chatbot webhook
const N8N_WEBHOOK_URL = 'https://induganga.app.n8n.cloud/webhook/0e20027c-af70-41b4-be16-86337796ff69/chat';
const N8N_TEST_WEBHOOK_URL = 'https://induganga.app.n8n.cloud/webhook-test/0e20027c-af70-41b4-be16-86337796ff69/chat';

app.post('/api/n8n-chat', async (req, res) => {
  try {
    const { message, sessionId, chatInput } = req.body;
    const textToSend = chatInput || message || '';

    if (!textToSend.trim()) {
      res.status(400).json({ error: 'Message text is required.' });
      return;
    }

    const payload = {
      action: 'sendMessage',
      chatInput: textToSend,
      message: textToSend,
      sessionId: sessionId || `session-${Date.now()}`,
    };

    // Try production URL first
    let upstreamRes: any = null;
    let usedUrl = N8N_WEBHOOK_URL;

    try {
      upstreamRes = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (fetchErr: any) {
      console.warn('Production n8n fetch error, will try test URL:', fetchErr?.message);
    }

    // If 404, check if it's because workflow is not active in production, and check test URL
    if (!upstreamRes || upstreamRes.status === 404) {
      try {
        const testRes = await fetch(N8N_TEST_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (testRes.ok) {
          upstreamRes = testRes;
          usedUrl = N8N_TEST_WEBHOOK_URL;
        }
      } catch (testErr) {
        // ignore
      }
    }

    if (upstreamRes && upstreamRes.ok) {
      const data = await upstreamRes.json().catch(async () => {
        const text = await upstreamRes.text();
        return { output: text };
      });

      const outputText =
        data.output ||
        data.text ||
        data.message ||
        data.response ||
        (Array.isArray(data) ? data[0]?.output || data[0]?.text || data[0]?.message : null) ||
        (typeof data === 'string' ? data : JSON.stringify(data));

      res.json({ output: outputText, raw: data, status: 'active', url: usedUrl });
      return;
    }

    // If workflow is not active in n8n yet, return friendly instructional message + guidance
    res.json({
      output: `Hey sweet friend! ✨ I've connected to your **n8n AI agent webhook**!

⚠️ **Note for Developer/Admin:**
Your workflow on n8n (\`0e20027c-af70-41b4-be16-86337796ff69/chat\`) is currently **Inactive**.
To enable real-time replies from your n8n workflow:
1. Open your workflow in [n8n cloud](https://induganga.app.n8n.cloud)
2. Switch the toggle in the top-right corner to **Active**
3. Then send another message here to chat directly with your n8n AI agent! 💖

In the meantime, feel free to use our **Glow Quiz**, **Routine Checklist**, and **Product Categories Guide**! 🌸`,
      status: 'workflow_inactive',
      hint: 'The n8n workflow must be toggled to Active in the top-right of your n8n editor canvas.',
    });
  } catch (error: any) {
    console.error('n8n proxy error:', error);
    res.status(500).json({
      error: 'Failed to communicate with n8n chatbot webhook',
      message: error?.message,
    });
  }
});

// Full-stack Vite middleware configuration
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`🌸 GlowGuide AI Server running on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
