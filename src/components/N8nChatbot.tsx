import React, { useState, useEffect, useRef } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Bot,
  RotateCcw,
  ChevronDown,
  ExternalLink,
  ShieldCheck,
  Check,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
  status?: 'active' | 'workflow_inactive';
}

const INITIAL_GREETING: ChatMessage = {
  id: 'greet-1',
  sender: 'bot',
  text: `Hey gorgeous! ✨ I am your n8n-powered Skin & Hair Care Chatbot! 🌸

Ask me any questions about choosing cosmetic products, managing breakouts, calming frizz, or building your morning and night routines. I'm here to help with zero judgment! 💖`,
  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

const SUGGESTED_QUESTIONS = [
  'Help me choose a gentle cleanser',
  'What is my skin type?',
  'How do I fix hair frizz & dry ends?',
  'Recommend an oil-free sunscreen',
];

interface Props {
  isOpen?: boolean;
  onToggle?: () => void;
}

export const N8nChatbot: React.FC<Props> = ({ isOpen: controlledIsOpen, onToggle }) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const toggleChat = onToggle || (() => setInternalIsOpen((prev) => !prev));

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('glowguide_n8n_chat_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [INITIAL_GREETING];
  });

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasPromptedGreeting, setHasPromptedGreeting] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Persistent session ID for n8n memory
  const [sessionId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('glowguide_n8n_session_id');
      if (saved) return saved;
      const newId = `session-${Math.random().toString(36).substring(2, 9)}-${Date.now()}`;
      localStorage.setItem('glowguide_n8n_session_id', newId);
      return newId;
    } catch {
      return `session-${Date.now()}`;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('glowguide_n8n_chat_v1', JSON.stringify(messages));
    } catch (e) {
      console.error(e);
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    const text = textToSend.trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/n8n-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chatInput: text,
          message: text,
          sessionId,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const botReply =
          data.output ||
          data.message ||
          'Thank you for your message! 🌸 I am here to help you glow.';

        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: botReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: data.status,
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        const errData = await res.json().catch(() => ({}));
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text:
            errData.hint ||
            `I had trouble reaching your n8n workflow. Please make sure the workflow is active in your n8n cloud dashboard! ✨`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botMsg]);
      }
    } catch (networkError) {
      const errorMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `Unable to connect to the n8n webhook right now. Please check your network connection or n8n cloud URL! 💖`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    if (confirm('Clear your conversation with the chatbot?')) {
      setMessages([INITIAL_GREETING]);
      try {
        localStorage.removeItem('glowguide_n8n_chat_v1');
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <>
      {/* Floating Chat Launcher Button (Bottom Right) */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
          {hasPromptedGreeting && (
            <div className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-rose-200/80 text-xs text-rose-950 animate-bounce-subtle">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-medium">n8n AI Chatbot Ready!</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setHasPromptedGreeting(false);
                }}
                className="text-stone-400 hover:text-stone-600 ml-1 text-xs"
              >
                ✕
              </button>
            </div>
          )}

          <button
            onClick={toggleChat}
            className="group relative flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white rounded-full shadow-xl shadow-rose-300/60 hover:shadow-rose-400/80 hover:scale-105 transition-all duration-300 cursor-pointer"
            aria-label="Open AI Chatbot"
          >
            <div className="relative">
              <Bot className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white" />
            </div>
            <span className="font-medium text-xs sm:text-sm tracking-wide">
              Chatbot AI
            </span>
            <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-full text-white/90 text-[10px]">
              n8n
            </span>
          </button>
        </div>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[95vw] sm:w-[420px] max-h-[85vh] h-[600px] bg-white rounded-3xl shadow-2xl border border-rose-200/90 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 p-4 text-white flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white border border-white/30 shadow-xs">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif font-bold text-sm tracking-wide text-white">
                    GlowGuide AI
                  </h3>
                  <span className="text-[10px] font-sans font-medium bg-emerald-400/30 text-emerald-100 border border-emerald-300/40 px-1.5 py-0.2 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                    n8n Connected
                  </span>
                </div>
                <p className="text-[11px] text-white/80">Skin & Hair Care Assistant</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                className="p-1.5 rounded-xl hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
                title="Clear conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={toggleChat}
                className="p-1.5 rounded-xl hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Webhook Connection Indicator Sub-bar */}
          <div className="bg-rose-50/80 px-3.5 py-1.5 border-b border-rose-100 text-[11px] text-rose-900 flex items-center justify-between">
            <span className="truncate flex items-center gap-1.5">
              <span className="text-rose-500">✨</span>
              <span>Webhook: <strong>induganga.app.n8n.cloud</strong></span>
            </span>
            <span className="text-[10px] text-stone-400 font-mono shrink-0">v1.0</span>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FFFDFB]/60 scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-2xs ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-br-xs'
                      : 'bg-white border border-rose-100 text-stone-800 rounded-bl-xs'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-stone-400 mt-1 px-1">{msg.time}</span>
              </div>
            ))}

            {/* Typing Loader */}
            {isLoading && (
              <div className="flex items-center gap-1.5 p-3 bg-white border border-rose-100 rounded-2xl rounded-bl-xs text-xs text-rose-700 w-fit">
                <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-spin" />
                <span>GlowGuide AI is typing...</span>
                <span className="inline-flex gap-1 ml-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-bounce [animation-delay:0.4s]" />
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts (if chat is fresh or empty) */}
          {messages.length <= 3 && (
            <div className="px-3.5 py-2 bg-stone-50/80 border-t border-rose-100/60 overflow-x-auto scrollbar-none flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-bold text-stone-400 shrink-0">
                Try:
              </span>
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  disabled={isLoading}
                  className="text-[11px] whitespace-nowrap bg-white hover:bg-rose-50 text-rose-900 border border-rose-200/80 px-2.5 py-1 rounded-full transition-colors shrink-0 cursor-pointer disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputText);
            }}
            className="p-3 bg-white border-t border-rose-100 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about skin, hair, or product types..."
              disabled={isLoading}
              className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-hidden focus:border-rose-400 focus:ring-2 focus:ring-rose-100 bg-stone-50/50"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="p-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition-all cursor-pointer shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
