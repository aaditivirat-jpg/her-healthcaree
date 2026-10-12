import React, { useState } from 'react';
import { evaluateUserQuestion, AssistantResponse } from '../../lib/educationalAssistant';
import { 
  Sparkles, 
  Send, 
  AlertTriangle, 
  ShieldCheck, 
  BookOpen, 
  FileText,
  User,
  Bot
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  responseMeta?: AssistantResponse;
}

export const AskAssistantWidget: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Hello! I am your HerHealth Educational Assistant. I can share evidence-informed information about menstrual cycles, PCOS, nutrition, and common symptoms. 

*Please note: I am not a doctor and cannot diagnose medical conditions or prescribe medications. In an emergency, please call 112 immediately.*`,
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const samplePrompts = [
    'How does PCOS affect my menstrual cycle?',
    'What foods help with low iron and fatigue?',
    'What are normal remedies for menstrual cramps?',
    'When should I see a doctor for late periods?'
  ];

  const handleSend = (textToSend?: string) => {
    const q = textToSend || input;
    if (!q.trim() || isProcessing) return;

    const userMsg: ChatMessage = {
      id: 'u_' + Date.now(),
      sender: 'user',
      text: q.trim(),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsProcessing(true);

    setTimeout(() => {
      const evaluation = evaluateUserQuestion(q);
      const assistantMsg: ChatMessage = {
        id: 'a_' + Date.now(),
        sender: 'assistant',
        text: evaluation.answer,
        responseMeta: evaluation,
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsProcessing(false);
    }, 600);
  };

  return (
    <div className="bg-white rounded-3xl border border-ivory-200 shadow-sm flex flex-col h-[650px] overflow-hidden">
      
      {/* Header */}
      <div className="px-6 py-4 border-b border-ivory-200 bg-ivory-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-stone-900 flex items-center gap-2">
              Ask HerHealth
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                Educational AI
              </span>
            </h3>
            <p className="text-xs text-stone-500">
              Vetted guidelines • Clinical disclaimers • Zero personal profiling
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-sage-700 bg-sage-50 px-2.5 py-1 rounded-full border border-sage-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span className="text-[11px] font-medium">Safe & Confidential</span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-7 h-7 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl p-4 leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-rose-600 text-white rounded-tr-none'
                  : 'bg-ivory-50 text-stone-800 border border-ivory-200 rounded-tl-none space-y-3'
              }`}
            >
              <div className="whitespace-pre-line text-xs sm:text-sm">
                {msg.text}
              </div>

              {/* Emergency Banner if red flags detected */}
              {msg.responseMeta?.isEmergencyAlert && msg.responseMeta.emergencyGuidance && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-900 text-xs font-medium space-y-1">
                  <div className="flex items-center gap-1.5 text-red-700 font-bold">
                    <AlertTriangle className="w-4 h-4" />
                    <span>EMERGENCY NOTIFICATION</span>
                  </div>
                  <div className="whitespace-pre-line leading-relaxed">
                    {msg.responseMeta.emergencyGuidance}
                  </div>
                </div>
              )}

              {/* Educational Citations & References */}
              {msg.responseMeta && msg.responseMeta.references.length > 0 && (
                <div className="pt-2 border-t border-ivory-200/80 text-[11px] text-stone-500 space-y-1">
                  <span className="font-semibold text-stone-700 block">Credible References:</span>
                  <ul className="list-disc list-inside space-y-0.5">
                    {msg.responseMeta.references.map((ref, idx) => (
                      <li key={idx}>{ref}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related Library Link */}
              {msg.responseMeta?.relatedCategory && (
                <div className="pt-1">
                  <Link
                    to="/education"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 hover:text-rose-900 underline underline-offset-2"
                  >
                    <BookOpen className="w-3 h-3" />
                    Read verified article in {msg.responseMeta.relatedCategory} →
                  </Link>
                </div>
              )}

              {/* Clinical disclaimer on answer */}
              {msg.responseMeta?.disclaimer && (
                <p className="text-[10px] text-stone-400 italic pt-1">
                  * {msg.responseMeta.disclaimer}
                </p>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isProcessing && (
          <div className="flex items-center gap-2 text-stone-500 text-xs pl-10">
            <div className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
            <span>Consulting reviewed healthcare guidelines...</span>
          </div>
        )}
      </div>

      {/* Quick Prompts Bar */}
      <div className="px-6 py-2 bg-ivory-50/70 border-t border-ivory-200 flex items-center gap-2 overflow-x-auto text-[11px]">
        <span className="text-stone-400 shrink-0 font-medium">Try asking:</span>
        {samplePrompts.map((sp, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(sp)}
            className="px-2.5 py-1 rounded-full bg-white border border-ivory-300 text-stone-700 hover:border-rose-300 hover:text-rose-800 whitespace-nowrap transition"
          >
            {sp}
          </button>
        ))}
      </div>

      {/* Input box */}
      <div className="p-4 bg-white border-t border-ivory-200 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Ask a question about periods, PCOS, nutrition, or symptoms..."
          className="flex-1 px-4 py-2.5 rounded-2xl border border-ivory-300 bg-ivory-50/50 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || isProcessing}
          className="p-3 rounded-2xl bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-40 transition shadow-sm shadow-rose-200"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
