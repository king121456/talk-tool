export interface Conversation {
  id: number;
  name: string;
  date: string;
  status: 'active' | 'completed' | 'pending';
}

export interface Note {
  id: number;
  text: string;
  type: 'pro' | 'con' | 'note';
  timestamp: string;
}

export interface Message {
  id: number;
  text: string;
  type: 'analysis' | 'response';
  keywords?: string[];
  timestamp: string;
}

export interface UserCategory {
  id: string;
  name: string;
  icon: string;
  users: User[];
  isExpanded?: boolean;
}

export interface User {
  id: number;
  name: string;
  title: string;
  selected: boolean;
  avatar?: string;
}