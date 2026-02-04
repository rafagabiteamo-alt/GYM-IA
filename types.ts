export interface Student {
  id: string;
  name: string;
  whatsapp: string;
  plan: 'Mensal' | 'Trimestral' | 'Semestral' | 'Anual';
  value: number;
  dueDate: string; // ISO Date
  status: 'active' | 'overdue' | 'inactive';
  daysOverdue?: number;
}

export interface Transaction {
  id: string;
  description: string;
  category: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
}

export interface DashboardStats {
  revenue: number;
  expenses: number;
  profit: number;
  activeStudents: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface User {
  email: string;
  password: string;
  academyName: string;
}

export interface WeeklyTip {
  id: string;
  title: string;
  content: string;
  type: 'finance' | 'marketing' | 'management';
}

export type PageView = 'landing' | 'login' | 'register' | 'dashboard' | 'students' | 'expenses' | 'ai';
