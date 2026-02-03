import { Student, Expense } from './types';

export const APP_COLORS = {
  primary: '#EAB308', // Yellow-500
  dark: '#09090B',    // Zinc-950
  light: '#FAFAFA',   // Zinc-50
};

export const MOCK_STUDENTS: Student[] = [
  { id: '1', name: 'Carlos Silva', whatsapp: '11999999999', plan: 'Mensal', value: 90.00, dueDate: '2023-11-10', status: 'active' },
  { id: '2', name: 'Ana Souza', whatsapp: '11988888888', plan: 'Trimestral', value: 250.00, dueDate: '2023-11-05', status: 'overdue', daysOverdue: 5 },
  { id: '3', name: 'Pedro Santos', whatsapp: '11977777777', plan: 'Mensal', value: 90.00, dueDate: '2023-11-15', status: 'active' },
  { id: '4', name: 'Mariana Lima', whatsapp: '11966666666', plan: 'Anual', value: 900.00, dueDate: '2023-11-20', status: 'active' },
  { id: '5', name: 'João Ferreira', whatsapp: '11955555555', plan: 'Mensal', value: 90.00, dueDate: '2023-10-30', status: 'overdue', daysOverdue: 11 },
];

export const MOCK_EXPENSES: Expense[] = [
  { id: '1', description: 'Aluguel do Espaço', category: 'Aluguel', amount: 2500.00, date: '2023-11-01' },
  { id: '2', description: 'Manutenção Esteira', category: 'Equipamentos', amount: 450.00, date: '2023-11-03' },
  { id: '3', description: 'Produtos de Limpeza', category: 'Limpeza', amount: 120.00, date: '2023-11-