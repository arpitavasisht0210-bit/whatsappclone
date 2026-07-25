import type { Conversation, Message, User } from '@/types';

const now = Date.now();
const minutes = (n: number) => n * 60 * 1000;
const hours = (n: number) => n * 60 * 60 * 1000;
const days = (n: number) => n * 24 * 60 * 60 * 1000;

export const users: User[] = [
  { id: 'u1', name: 'Alice Johnson', avatar: 'https://i.pravatar.cc/150?img=1', online: true },
  { id: 'u2', name: 'Bob Smith', avatar: 'https://i.pravatar.cc/150?img=12', online: true },
  { id: 'u3', name: 'Carol White', avatar: 'https://i.pravatar.cc/150?img=5', online: false },
  { id: 'u4', name: 'David Lee', avatar: 'https://i.pravatar.cc/150?img=15', online: true },
  { id: 'u5', name: 'Emma Brown', avatar: 'https://i.pravatar.cc/150?img=9', online: false },
  { id: 'u6', name: 'Frank Miller', avatar: 'https://i.pravatar.cc/150?img=13', online: true },
];

const meId = 'me';

export const conversations: Conversation[] = users.map((u, i) => ({
  id: `c${i + 1}`,
  userId: u.id,
  user: u,
  lastMessage: '',
  lastMessageTime: now - hours(i),
  unreadCount: 0,
}));

export const initialMessages: Message[] = [
  {
    id: 'm1', conversationId: 'c1', senderId: 'u1',
    text: 'Hey! Are we still on for the meeting tomorrow?',
    timestamp: now - hours(2),
  },
  {
    id: 'm2', conversationId: 'c1', senderId: meId,
    text: 'Yes, 10am works for me.',
    timestamp: now - hours(2) + minutes(5),
  },
  {
    id: 'm3', conversationId: 'c1', senderId: 'u1',
    text: 'Perfect, see you then!',
    timestamp: now - hours(1),
  },
  {
    id: 'm4', conversationId: 'c2', senderId: 'u2',
    text: 'Did you review the pull request?',
    timestamp: now - hours(3),
  },
  {
    id: 'm5', conversationId: 'c2', senderId: meId,
    text: 'Just left a few comments.',
    timestamp: now - hours(3) + minutes(10),
  },
  {
    id: 'm6', conversationId: 'c3', senderId: 'u3',
    text: 'Happy birthday! Hope you have a great day!',
    timestamp: now - days(1),
  },
  {
    id: 'm7', conversationId: 'c4', senderId: 'u4',
    text: 'Lunch this week?',
    timestamp: now - hours(5),
  },
  {
    id: 'm8', conversationId: 'c5', senderId: 'u5',
    text: 'Thanks for the help yesterday!',
    timestamp: now - days(2),
  },
  {
    id: 'm9', conversationId: 'c6', senderId: 'u6',
    text: 'The deployment went smoothly.',
    timestamp: now - hours(8),
  },
];

// Set last messages from initial messages
conversations.forEach((c) => {
  const msgs = initialMessages.filter((m) => m.conversationId === c.id);
  if (msgs.length > 0) {
    const last = msgs[msgs.length - 1];
    c.lastMessage = last.text;
    c.lastMessageTime = last.timestamp;
  }
});

conversations[0].unreadCount = 1;
conversations[3].unreadCount = 2;

export const currentUserId = meId;
