"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, ShieldCheck, Send, Smile, Image, Paperclip, MoreVertical, Users, Search, Pin, Settings } from "lucide-react";

// Mock data
const mockScore = 750;
const getTier = (score: number) => {
  if (score >= 900) return { color: "diamond" as const, level: "diamond", stage: "Diamond" };
  if (score >= 750) return { color: "gold" as const, level: "gold", stage: "Gold" };
  if (score >= 600) return { color: "silver" as const, level: "silver", stage: "Silver" };
  return { color: "bronze" as const, level: "bronze", stage: "Bronze" };
};

const MOCK_MESSAGES = [
  { id: 1, user: "0x91e…c3a", time: "14:21", text: "liquidity depth looks thinner than yesterday", reactions: { "👍": 2 } },
  { id: 2, user: "0xA2b…9d8", time: "14:25", text: "noticed the same, slippage spikes on larger swaps", reactions: { "👍": 1, "👀": 1 } },
  { id: 3, user: "0xF81…aa0", time: "14:33", text: "rpc congestion maybe, not protocol-side", reactions: {} },
];

export default function ChatRoomPage() {
  const tier = getTier(mockScore);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<typeof MOCK_MESSAGES>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load messages from storage on mount
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const raw = localStorage.getItem('chat-messages');
        if (raw) {
          setMessages(JSON.parse(raw));
        } else {
          // If no messages exist, use mock data
          setMessages(MOCK_MESSAGES);
        }
      } catch (error) {
        // If storage fails or messages don't exist, use mock data
        setMessages(MOCK_MESSAGES);
      } finally {
        setIsLoading(false);
      }
    };
    loadMessages();
  }, []);

  const COLOR_STYLES: Record<
    "bronze" | "silver" | "gold" | "diamond",
    { badge: string; soft: string; text: string; hover: string }
  > = {
    bronze: {
      badge: "bg-amber-700/10 text-amber-500 border-amber-700/30",
      soft: "bg-amber-500/10",
      text: "text-amber-400",
      hover: "hover:bg-amber-500/20",
    },
    silver: {
      badge: "bg-slate-400/10 text-slate-300 border-slate-400/30",
      soft: "bg-slate-400/10",
      text: "text-slate-300",
      hover: "hover:bg-slate-400/20",
    },
    gold: {
      badge: "bg-yellow-400/10 text-yellow-300 border-yellow-400/30",
      soft: "bg-yellow-400/10",
      text: "text-yellow-300",
      hover: "hover:bg-yellow-400/20",
    },
    diamond: {
      badge: "bg-cyan-400/10 text-cyan-300 border-cyan-400/30",
      soft: "bg-cyan-400/10",
      text: "text-cyan-300",
      hover: "hover:bg-cyan-400/20",
    },
  };

  const colors = COLOR_STYLES[tier.color];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      user: "You",
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      text: message,
      reactions: {},
    };
    
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setMessage("");
    
    // Save to storage
    try {
      window.localStorage.setItem('chat-messages', JSON.stringify(updatedMessages));
    } catch (error) {
      console.error('Failed to save message:', error);
    }
    // Simulate typing indicator
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000);
  };

  const handleDeleteMessage = async (messageId: number) => {
    const updatedMessages = messages.filter(msg => msg.id !== messageId);
    setMessages(updatedMessages);
    
    // Save to storage
    try {
      await (window.localStorage as Storage).setItem('chat-messages', JSON.stringify(updatedMessages));
    } catch (error) {
      console.error('Failed to delete message:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <main className="min-h-screen bg-[#0f0f0f] flex flex-col">
      {/* Header */}
      <header className="border-b border-[#1f1f1f] px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between bg-[#0a0a0a]">
        <div className="flex items-center gap-3 sm:gap-6 flex-1 min-w-0">
          <div className="space-y-1 flex-1 min-w-0">
            <a
              href="/dashboard"
              className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition"
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">Back</span>
            </a>

            <h1 className="text-base sm:text-lg font-semibold text-white truncate">
              {tier.stage} Room
            </h1>

            <p className="text-xs text-slate-400 hidden sm:block">
              High-signal discussions only
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 hidden md:flex">
            <Users size={14} />
            <span>24 online</span>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-3">
          <button className="p-2 text-slate-400 hover:text-white transition rounded-lg hover:bg-white/5 hidden sm:block">
            <Search size={18} />
          </button>
          <button className="p-2 text-slate-400 hover:text-white transition rounded-lg hover:bg-white/5 hidden sm:block">
            <Pin size={18} />
          </button>
          <button className="p-2 text-slate-400 hover:text-white transition rounded-lg hover:bg-white/5 hidden lg:block">
            <Settings size={18} />
          </button>
          
          <div
            className={`inline-flex items-center gap-1.5 sm:gap-2 rounded-xl px-2 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold border ${colors.badge}`}
          >
            <ShieldCheck size={12} className="sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">{tier.level.toUpperCase()}</span>
            <span className="sm:hidden">{tier.stage[0]}</span>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <section className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4">
        <SystemMessage text="Room opened 12 minutes ago" />

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <span className="text-slate-400 text-sm">Loading messages...</span>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                id={msg.id}
                user={msg.user}
                time={msg.time}
                text={msg.text}
                reactions={
                  Object.fromEntries(
                    Object.entries(msg.reactions ?? {}).filter(
                      ([_, v]) => typeof v === 'number' && !isNaN(v)
                    )
                  ) as Record<string, number>
                }
                colors={colors}
                onDelete={handleDeleteMessage}
              />
            ))}
          </>
        )}

        {isTyping && (
          <div className="flex gap-2 sm:gap-4 text-sm">
            <span className="w-10 sm:w-12 shrink-0 text-xs text-slate-500"></span>
            <div className="flex items-center gap-2">
              <span className="text-slate-400 italic text-xs sm:text-sm">Someone is typing</span>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </section>

      {/* Input Area */}
      <footer className="border-t border-[#1f1f1f] px-3 sm:px-6 py-3 sm:py-4 bg-[#0a0a0a]">
        <div className="space-y-2 sm:space-y-3">
          {/* Toolbar */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button 
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className={`p-1.5 sm:p-2 text-slate-400 hover:text-white transition rounded-lg ${colors.hover}`}
            >
              <Smile size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>
            <button className={`p-1.5 sm:p-2 text-slate-400 hover:text-white transition rounded-lg ${colors.hover} hidden sm:block`}>
              <Image size={18} />
            </button>
            <button className={`p-1.5 sm:p-2 text-slate-400 hover:text-white transition rounded-lg ${colors.hover} hidden sm:block`}>
              <Paperclip size={18} />
            </button>
            
            <div className="flex-1" />
            
            <span className="text-[10px] sm:text-xs text-slate-500">
              {message.length}/500
            </span>
          </div>

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-2 sm:p-3">
              <div className="grid grid-cols-8 gap-1 sm:gap-2">
                {["😀", "😂", "❤️", "👍", "👀", "🔥", "💯", "🚀", "💎", "⚡", "✅", "❌", "🤔", "👏", "🎉", "💪"].map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => {
                      setMessage(message + emoji);
                      setShowEmojiPicker(false);
                    }}
                    className="text-lg sm:text-xl hover:bg-white/5 rounded p-1 transition"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Box */}
          <div className="flex items-end gap-2 sm:gap-3">
            <div className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus-within:border-[#3a3a3a] transition">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Write a message… (Press Enter to send)"
                maxLength={500}
                rows={1}
                className="w-full bg-transparent text-sm text-white placeholder-slate-500 outline-none resize-none"
                style={{ maxHeight: "120px" }}
              />
            </div>

            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className={`rounded-lg px-3 sm:px-5 py-2 sm:py-3 text-sm font-medium transition flex items-center gap-2 ${
                message.trim()
                  ? `${colors.soft} ${colors.text} ${colors.hover}`
                  : "bg-slate-800 text-slate-600 cursor-not-allowed"
              }`}
            >
              <Send size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>

          {/* Tips */}
          <p className="text-[10px] sm:text-xs text-slate-500">
            💡 Keep discussions constructive and on-topic to maintain room quality
          </p>
        </div>
      </footer>
    </main>
  );
}

/* ---------- Message Components ---------- */

function ChatMessage({
  id,
  user,
  time,
  text,
  reactions,
  colors,
  onDelete,
}: {
  id: number;
  user: string;
  time: string;
  text: string;
  reactions: Record<string, number>;
  colors: any;
  onDelete: (id: number) => void;
}) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="group flex gap-2 sm:gap-4 text-sm hover:bg-white/[0.02] -mx-2 px-2 py-2 rounded-lg transition">
      <span className="w-10 sm:w-12 shrink-0 text-[10px] sm:text-xs text-slate-500 pt-0.5">
        {time}
      </span>

      <div className="flex-1 space-y-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-slate-200 hover:underline cursor-pointer text-xs sm:text-sm truncate">
            {user}
          </span>
          {user === "You" && (
            <span className={`text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded ${colors.badge}`}>
              YOU
            </span>
          )}
        </div>
        
        <p className="text-slate-400 leading-relaxed text-xs sm:text-sm break-words">
          {text}
        </p>

        {Object.keys(reactions).length > 0 && (
          <div className="flex gap-1 mt-2 flex-wrap">
            {Object.entries(reactions).map(([emoji, count]) => (
              <button
                key={emoji}
                className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white/5 hover:bg-white/10 rounded text-[10px] sm:text-xs flex items-center gap-1 transition"
              >
                <span>{emoji}</span>
                <span className="text-slate-400">{count}</span>
              </button>
            ))}
            <button className="px-1.5 sm:px-2 py-0.5 sm:py-1 hover:bg-white/5 rounded text-[10px] sm:text-xs text-slate-500 transition">
              +
            </button>
          </div>
        )}
      </div>

      <div className="relative opacity-0 group-hover:opacity-100 transition">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-1 text-slate-400 hover:text-white rounded hover:bg-white/5"
        >
          <MoreVertical size={14} className="sm:w-4 sm:h-4" />
        </button>
        
        {showMenu && (
          <div className="absolute right-0 mt-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg py-1 min-w-[120px] z-10">
            <button className="w-full px-3 py-1.5 text-left text-xs text-slate-300 hover:bg-white/5">
              Reply
            </button>
            <button className="w-full px-3 py-1.5 text-left text-xs text-slate-300 hover:bg-white/5">
              Copy
            </button>
            {user === "You" && (
              <button 
                onClick={() => {
                  onDelete(id);
                  setShowMenu(false);
                }}
                className="w-full px-3 py-1.5 text-left text-xs text-red-400 hover:bg-white/5"
              >
                Delete
              </button>
            )}
            <button className="w-full px-3 py-1.5 text-left text-xs text-red-400 hover:bg-white/5">
              Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function SystemMessage({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 my-6">
      <div className="flex-1 h-px bg-[#1f1f1f]" />
      <p className="text-[10px] sm:text-xs text-slate-500 whitespace-nowrap">
        {text}
      </p>
      <div className="flex-1 h-px bg-[#1f1f1f]" />
    </div>
  );
}