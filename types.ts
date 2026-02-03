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

export interface Expense {
  id: string;
  description: string;
  category: 'Aluguel' | 'Equipamentos' | 'Limpeza' | 'Funcionários' | 'Outros';
  amount: number;
  date: string;
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

export type PageView = 'landing' | 'dashboard' | 'students' | 'expenses' | 'ai';