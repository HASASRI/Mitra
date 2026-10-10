import React, { useState } from 'react';
import { UserProfile } from '../types';
import { askMitraAI } from '../services/aiService';
import { 
  Sparkles, 
  Send, 
  X, 
  Bot, 
  User, 
  HelpCircle, 
  ArrowRight,
  BookOpen,
  Code2
} from 'lucide-react';

interface AIAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const AIAdvisorModal: React.FC<AIAdvisorModalProps> = ({
  isOpen,
  onClose,
  profile,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Hello ${profile.name}! 👋 I am your Mitra AI Career Coach. Ask me anything about campus placement drives, choosing between C++ vs Java, preparing for TCS Digital or Amazon SDE-1, building recruiter-magnet projects, or overcoming coding roadblocks. How can I guide you today?`,
      timestamp: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sampleQuestions = [
    'How should I divide my time between DSA and Web Development?',
    'Which is better for campus placements in India: C++ or Java?',
    'What projects stand out best for SDE-1 roles?',
    'How do I prepare for TCS Digital in 30 days?',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const question = (textToSend || inputText).trim();
    if (!question || isLoading) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: question,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await askMitraAI(question, {
        degree: profile.degree,
        branch: profile.branch,
        year: profile.year,
        primaryGoal: profile.primaryGoal,
        leetCodeSolved: profile.leetCodeSolved,
      });

      const aiMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'ai',
        text: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div 
        className="w-full max-w-2xl h-[650px] max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-surface-container-high overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-surface-container-high bg-gradient-to-r from-purple-700 to-primary text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-2xl overflow-hidden ring-2 ring-white/30 shadow-md bg-white/10 shrink-0">
              <img 
                src="/src/assets/images/mitra_logo_1791625654446.jpg" 
                alt="Mitra Logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-display font-bold text-base">Mitra AI Career Coach</h3>
                <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded-full bg-white/20 text-amber-200">
                  ONLINE
                </span>
              </div>
              <p className="text-xs text-indigo-100">Tailored advice for {profile.degree} • {profile.primaryGoal}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat message history */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[78%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-primary text-white rounded-tr-xs shadow-xs'
                    : 'bg-surface-container-low border border-surface-container-high text-on-surface rounded-tl-xs'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>
                <div
                  className={`text-[10px] mt-1.5 font-medium ${
                    msg.sender === 'user' ? 'text-indigo-200 text-right' : 'text-outline text-left'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-outline pl-10">
              <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              <span>Mitra is formulating recommendations...</span>
            </div>
          )}
        </div>

        {/* Suggested Quick Question Chips */}
        <div className="p-3 bg-surface-container-lowest border-t border-surface-container-high overflow-x-auto scrollbar-none flex items-center gap-1.5">
          <span className="text-[10px] font-bold uppercase text-outline shrink-0">Quick prompts:</span>
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="text-xs px-2.5 py-1 rounded-xl bg-surface-container-low border border-surface-container-high text-on-surface-variant hover:text-primary hover:border-primary/40 whitespace-nowrap transition-all"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 sm:p-4 bg-surface-container-low border-t border-surface-container-high flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask about placement preparation, coding roadmap, or skills..."
            className="flex-1 px-4 py-2.5 rounded-2xl bg-white border border-surface-container-high text-xs sm:text-sm text-on-surface focus:outline-none focus:border-primary placeholder:text-outline"
          />

          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="px-4 py-2.5 rounded-2xl bg-primary text-white font-bold text-xs disabled:opacity-40 hover:bg-primary-container shadow-xs transition-all flex items-center gap-1.5 shrink-0"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
