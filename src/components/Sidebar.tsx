import type { Conversation } from '@/types';
import { formatRelativeTime } from '@/utils/format';
import { useAuth } from '@/context/AuthContext';
import { LogOut } from 'lucide-react';

interface SidebarProps {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function Sidebar({ conversations, selectedId, onSelect }: SidebarProps) {
  const { signOut } = useAuth();

  return (
    <aside className="w-80 shrink-0 border-r border-slate-200 bg-white flex flex-col">
      <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-slate-800">Messages</h1>
        <button
          onClick={() => signOut()}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Log out"
          title="Log out"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>
      <div className="px-5 py-3 border-b border-slate-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-lg bg-slate-100 py-2 pl-9 pr-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.map((c) => {
          const active = c.id === selectedId;
          return (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-l-2 ${
                active
                  ? 'bg-blue-50 border-blue-500'
                  : 'border-transparent hover:bg-slate-50'
              }`}
            >
              <div className="relative shrink-0">
                <img src={c.user.avatar} alt={c.user.name} className="h-11 w-11 rounded-full object-cover" />
                {c.user.online && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-slate-800 truncate">{c.user.name}</span>
                  <span className="text-xs text-slate-400 shrink-0">{formatRelativeTime(c.lastMessageTime)}</span>
                </div>
                <div className="flex items-center justify-between gap-2 mt-0.5">
                  <span className="text-sm text-slate-500 truncate">{c.lastMessage || 'No messages yet'}</span>
                  {c.unreadCount > 0 && (
                    <span className="shrink-0 rounded-full bg-blue-500 text-white text-xs font-medium px-2 py-0.5 min-w-[20px] text-center">
                      {c.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
