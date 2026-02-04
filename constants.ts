import { Student, Transaction, WeeklyTip } from './types';

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

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', description: 'Aluguel do Espaço', category: 'Aluguel', amount: 2500.00, date: '2023-11-01', type: 'expense' },
  { id: '2', description: 'Manutenção Esteira', category: 'Equipamentos', amount: 450.00, date: '2023-11-03', type: 'expense' },
  { id: '3', description: 'Mensalidade Carlos', category: 'Mensalidade', amount: 90.00, date: '2023-11-04', type: 'income' },
  { id: '4', description: 'Venda Suplemento', category: 'Vendas', amount: 150.00, date: '2023-11-05', type: 'income' },
  { id: '5', description: 'Conta de Luz', category: 'Outros', amount: 380.00, date: '2023-11-10', type: 'expense' },
];

export const MOCK_CHART_DATA = [
  { name: 'Jan', entrada: 4000, saida: 2400 },
  { name: 'Fev', entrada: 3000, saida: 1398 },
  { name: 'Mar', entrada: 2000, saida: 5800 },
  { name: 'Abr', entrada: 2780, saida: 3908 },
  { name: 'Mai', entrada: 1890, saida: 4800 },
  { name: 'Jun', entrada: 2390, saida: 3800 },
  { name: 'Jul', entrada: 3490, saida: 4300 },
];

export const WEEKLY_TIPS: WeeklyTip[] = [
  {
    id: '1',
    title: 'Controle de Gastos',
    content: 'Revise suas despesas recorrentes. Negociar o aluguel ou mudar fornecedores de limpeza pode aumentar seu lucro em até 15% este mês.',
    type: 'finance'
  },
  {
    id: '2',
    title: 'Promoção Relâmpago',
    content: 'Crie um plano "Traga um Amigo": Se um aluno trouxer um amigo que se matricular, ambos ganham 10% de desconto na próxima mensalidade.',
    type: 'marketing'
  },
  {
    id: '3',
    title: 'Manutenção Preventiva',
    content: 'Agende a manutenção das esteiras para esta semana. Equipamento quebrado afasta alunos e custa o dobro para consertar na emergência.',
    type: 'management'
  },
  {
    id: '4',
    title: 'Retenção de Alunos',
    content: 'Mande uma mensagem para alunos que não vêm há mais de 10 dias. Um simples "Sentimos sua falta!" pode recuperar uma matrícula.',
    type: 'management'
  },
  {
    id: '5',
    title: 'Venda de Produtos',
    content: 'Coloque um pequeno stand de água e suplementos na recepção. Isso pode aumentar seu faturamento em 20% apenas com conveniência.',
    type: 'finance'
  },
  {
    id: '6',
    title: 'Horários de Pico',
    content: 'Analise quais horários estão mais cheios. Crie planos mais baratos para horários "mortos" (ex: 10h às 15h) para distribuir melhor os alunos.',
    type: 'management'
  },
  {
    id: '7',
    title: 'Feedback é Ouro',
    content: 'Coloque uma caixa de sugestões na saída. Às vezes o que falta para seu aluno ficar é apenas um ventilador melhor posicionado.',
    type: 'marketing'
  },
  {
    id: '8',
    title: 'Aniversariantes do Mês',
    content: 'Dê um dia de "Free Pass" para o aniversariante trazer 3 amigos. É uma ótima forma de conseguir novos cadastros de graça.',
    type: 'marketing'
  }
];
