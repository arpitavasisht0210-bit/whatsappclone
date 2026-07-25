export interface User {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  timestamp: number;
}

export interface Conversation {
  id: string;
  userId: string;
  user: User;
  lastMessage: string;
  lastMessageTime: number;
  unreadCount: number;
}
