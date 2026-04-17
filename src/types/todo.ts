export interface TodoItem {
  id: string;
  title: string;
  description: string;
  category: 'work' | 'study' | 'life' | 'travel' | 'other';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string; // ISO date string
  completed: boolean;
  createdAt: string; // ISO date string
}

export type Category = 'all' | 'work' | 'study' | 'life' | 'travel' | 'other';
export type Priority = 'low' | 'medium' | 'high';
export type Status = 'all' | 'pending' | 'completed';