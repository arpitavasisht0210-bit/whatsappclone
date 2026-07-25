import { useEffect, useRef, useState } from 'react';
import type { Message, User } from '@/types';
import { currentUserId } from '@/data/mockData';
import { formatTime, formatDayDivider } from '@/utils/format';

interface ChatAreaProps {
  conversation: { id: string; user: User } | null;
  messages: Message[];
  onSend: (text: string) => void;
}

export function ChatArea({ conversation, messages, onSend }: ChatAreaProps) {
  const [draft, setDraft] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!conversation) {
    return (
      <main className="flex-1 flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-slate-200 flex items-center justify-center mb-4">
            <svg className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path d="M8 10h8M8 14h5" />
              <path d="M21 12a8 8 0 0 1-8 8H7l-4 3V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8Z" />
            </svg>
          </div>
          <h2 className="text-lg font-medium text-slate-600">Select a conversation</h2>
          <p className="text-sm text-slate-400 mt-1">Choose someone to start chatting</p>
        </div>
      </main>
    );
  }

  const handleSend = () => {
    const v = draft.trim();
    if (!v) return;
    onSend(v);
    setDraft('');
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  let lastDay = '';

  return (
    <main className="flex-1 flex flex-col bg-slate-50">
      {/* Header */}
      <header className="flex items-center gap-3 px-5 py-3.5 border-b border-slate-200 bg-white">
        <div className="relative">
          <img src={conversation.user.avatar} alt={conversation.user.name} className="h-10 w-10 rounded-full object-cover" />
          {conversation.user.online && (
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
          )}
        </div>
        <div>
          <h2 className="font-semibold text-slate-800">{conversation.user.name}</h2>
          <p className="text-xs text-slate-400">{conversation.user.online ? 'Active now' : 'Offline'}</p>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1">
        {messages.length === 0 && (
          <p className="text-center text-sm text-slate-400 mt-8">No messages yet. Say hello!</p>
        )}
        {messages.map((m) => {
          const mine = m.senderId === currentUserId;
          const day = formatDayDivider(m.timestamp);
          const showDay = day !== lastDay;
          lastDay = day;
          return (
            <div key={m.id}>
              {showDay && (
                <div className="flex justify-center my-4">
                  <span className="text-xs text-slate-400 bg-slate-200/70 px-3 py-1 rounded-full">{day}</span>
                </div>
              )}
              <div className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                    mine
                      ? 'bg-blue-500 text-white rounded-br-md'
                      : 'bg-white text-slate-700 rounded-bl-md shadow-sm border border-slate-100'
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">{m.text}</p>
                  <p className={`text-[10px] mt-1 text-right ${mine ? 'text-blue-100' : 'text-slate-400'}`}>
                    {formatTime(m.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-5 py-4 border-t border-slate-200 bg-white">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={handleKey}
            className="flex-1 rounded-full bg-slate-100 px-5 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            className="rounded-full bg-blue-500 hover:bg-blue-600 transition-colors p-2.5 text-white"
            aria-label="Send message"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}
