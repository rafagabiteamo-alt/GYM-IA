import React, { useMemo } from 'react';
import { Student, Transaction } from '../types';
import { WEEKLY_TIPS } from '../constants';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';
import { TrendingUp, TrendingDown, Users, Wallet, Lightbulb, Megaphone, Zap } from 'lucide-react';

interface DashboardProps {
  students: Student[];
  transactions: Transaction[];
}

export const Dashboard: React.FC<DashboardProps> = ({ students, transactions }) => {
  const activeStudents = students.filter(s => s.status === 'active').length;
  
  // Real Financial Data from Transactions
  const totalRevenue = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);
  
  const profit = totalRevenue - totalExpenses;

  // Generate chart data from transactions (simplified for demo, usually involves grouping by month)
  // For this demo, we will use mock structure but mapped if we had dates, sticking to mock chart for visual consistency
  // but showing real numbers in cards.
  const chartData = [
    { name: 'Entradas', value: totalRevenue },
    { name: 'Saídas', value: totalExpenses },
  ];

  const weeklyTip = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * WEEKLY_TIPS.length);
    return WEEKLY_TIPS[randomIndex];
  }, []);

  const getTipIcon = (type: string) => {
    switch(type) {
      case 'marketing': return <Megaphone className="text-purple-500" />;
      case 'finance': return <Wallet className="text-green-500" />;
      default: return <Zap className="text-yellow-500" />;
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, subtext }: any) => (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-zinc-400 text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg bg-zinc-800 ${color}`}>
          <Icon size={24} />
        </div>
      </div>
      <p className="text-xs text-zinc-500">{subtext}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Visão Geral</h2>
        <p className="text-zinc-400">Acompanhe a saúde financeira da sua academia.</p>
      </div>

      {/* Tip of the Week */}
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 p-6 rounded-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Lightbulb size={120} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="bg-zinc-950 p-3 rounded-full border border-zinc-700">
            {getTipIcon(weeklyTip.type)}
          </div>
          <div>
            <span className="text-xs font-bold text-yellow-500 uppercase tracking-wider mb-1 block">
              Dica da Semana
            </span>
            <h3 className="text-lg font-bold text-white mb-1">{weeklyTip.title}</h3>
            <p className="text-zinc-300 text-sm leading-relaxed max-w-2xl">
              {weeklyTip.content}
            </p>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Faturamento Real" 
          value={`R$ ${totalRevenue.toFixed(2)}`} 
          icon={TrendingUp} 
          color="text-green-500"
          subtext="Baseado nas transações registradas"
        />
        <StatCard 
          title="Despesas Totais" 
          value={`R$ ${totalExpenses.toFixed(2)}`} 
          icon={TrendingDown} 
          color="text-red-500"
          subtext={`${transactions.filter(t => t.type === 'expense').length} saídas registradas`}
        />
        <StatCard 
          title="Lucro Líquido" 
          value={`R$ ${profit.toFixed(2)}`} 
          icon={Wallet} 
          color="text-yellow-500"
          subtext="Saldo atual em caixa"
        />
        <StatCard 
          title="Alunos Ativos" 
          value={activeStudents} 
          icon={Users} 
          color="text-blue-500"
          subtext="Matrículas ativas"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
          <h3 className="text-lg font-bold text-white mb-6">Balanço Atual</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
                <XAxis type="number" stroke="#71717a" tick={{fill: '#71717a'}} axisLine={false} tickFormatter={(value) => `R$${value}`} />
                <YAxis dataKey="name" type="category" stroke="#71717a" tick={{fill: '#71717a'}} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
                  cursor={{ fill: '#27272a' }}
                />
                <Legend />
                <Bar dataKey="value" name="Valor (R$)" fill="#EAB308" radius={[0, 4, 4, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
          <h3 className="text-lg font-bold text-white mb-6">Últimas Transações</h3>
          <div className="space-y-4">
            {transactions.slice(0, 5).map((t) => (
              <div key={t.id} className="flex items-center justify-between border-b border-zinc-800 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${t.type === 'income' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {t.type === 'income' ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{t.description}</p>
                    <p className="text-xs text-zinc-500">{t.category}</p>
                  </div>
                </div>
                <span className={`text-sm font-bold ${t.type === 'income' ? 'text-green-500' : 'text-white'}`}>
                    {t.type === 'income' ? '+' : '-'} R$ {t.amount}
                </span>
              </div>
            ))}
            {transactions.length === 0 && <p className="text-zinc-500 text-sm">Nenhuma movimentação.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
