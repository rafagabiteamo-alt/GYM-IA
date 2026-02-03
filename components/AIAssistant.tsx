import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, User } from 'lucide-react';
import { ChatMessage, Student, Expense } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

interface AIAssistantProps {
  students: Student[];
  expenses: Expense[];
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ students, expenses }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Olá! Sou o GymFlow IA. Posso te ajudar a organizar suas finanças. Tente perguntar: "Quanto gastei esse mês?" ou "Quem está devendo?".',
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Call Gemini Service
    const aiResponseText = await sendMessageToGemini(userMsg.content, { students, expenses });

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: aiResponseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-zinc-800 bg-zinc-900 flex items-center gap-3">
        <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-black">
          <Bot size={24} />
        </div>
        <div>
          <h2 className="font-bold text-white">GymFlow IA</h2>
          <p className="text-xs text-green-500 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500"></span> Online
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl p-4 ${
              msg.role === 'user' 
                ? 'bg-zinc-800 text-white rounded-br-none' 
                : 'bg-yellow-500 text-black rounded-bl-none'
            }`}>
              <div className="flex items-center gap-2 mb-1 opacity-70 text-xs">
                {msg.role === 'user' ? <User size={12}/> : <Bot size={12}/>}
                <span>{msg.role === 'user' ? 'Você' : 'IA'}</span>
              </div>
              <div className="whitespace-pre-wrap text-sm md:text-base">
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-yellow-500/20 text-yellow-500 rounded-2xl p-4 rounded-bl-none flex items-center gap-2">
              <div className="animate-bounce w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="animate-bounce w-2 h-2 bg-yellow-500 rounded-full delay-75"></div>
              <div className="animate-bounce w-2 h-2 bg-yellow-500 rounded-full delay-150"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-zinc-900 border-t border-zinc-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Digite um comando (ex: Listar inadimplentes)..."
            className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500"
            disabled={isLoading}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="bg-yellow-500 hover:bg-yellow-400 text-black rounded-xl p-3 transition-colors disabled:opacity-50"
          >
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};
