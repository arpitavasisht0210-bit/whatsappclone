import { useMemo, useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ChatArea } from '@/components/ChatArea';
import { conversations as initialConversations, initialMessages, currentUserId } from '@/data/mockData';
import type { Conversation, Message } from '@/types';

function App() {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [selectedId, setSelectedId] = useState<string | null>(initialConversations[0]?.id ?? null);

  const selectedConversation = useMemo(
    () => conversations.find((c) => c.id === selectedId) ?? null,
    [conversations, selectedId]
  );

  const selectedMessages = useMemo(
    () => messages.filter((m) => m.conversationId === selectedId),
    [messages, selectedId]
  );

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c))
    );
  };

  const handleSend = (text: string) => {
    if (!selectedId) return;
    const newMsg: Message = {
      id: `m${Date.now()}`,
      conversationId: selectedId,
      senderId: currentUserId,
      text,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, newMsg]);
    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedId
          ? { ...c, lastMessage: text, lastMessageTime: newMsg.timestamp }
          : c
      )
    );

    const conv = conversations.find((c) => c.id === selectedId);
    if (conv) {
      setTimeout(() => {
        const replies = ['Got it!', 'Sounds good.', 'Thanks for letting me know.', 'Sure thing.', 'Talk soon!'];
        const reply: Message = {
          id: `m${Date.now()}-r`,
          conversationId: selectedId,
          senderId: conv.userId,
          text: replies[Math.floor(Math.random() * replies.length)],
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, reply]);
        setConversations((prev) =>
          prev.map((c) =>
            c.id === selectedId
              ? { ...c, lastMessage: reply.text, lastMessageTime: reply.timestamp }
              : c
          )
        );
      }, 1500);
    }
  };

  return (
    <div className="h-screen flex bg-white overflow-hidden">
      <Sidebar conversations={conversations} selectedId={selectedId} onSelect={handleSelect} />
      <ChatArea
        conversation={selectedConversation ? { id: selectedConversation.id, user: selectedConversation.user } : null}
        messages={selectedMessages}
        onSend={handleSend}
      />
    </div>
  );
}

export default App;
