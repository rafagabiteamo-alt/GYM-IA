import React from 'react';
import { Student, Expense } from '../types';
import { MOCK_CHART_DATA } from '../constants';
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
import { TrendingUp, TrendingDown, Users, Wallet } from 'lucide-react';

interface DashboardProps {
  students: Student[];
  expenses: Expense[];
}

export const Dashboard: React.FC<DashboardProps> = ({ students, expenses }) => {
  // Simple calculations for demo
  const activeStudents = students.filter(s => s.status === 'active').length;
  const totalRevenue = students
    .filter(s => s.status === 'active')
    .reduce((acc, curr) => acc + curr.value, 0);
  
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const profit = totalRevenue - totalExpenses;

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

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Faturamento Mensal" 
          value={`R$ ${totalRevenue.toFixed(2)}`} 
          icon={TrendingUp} 
          color="text-green-500"
          subtext="+12% em relação ao mês anterior"
        />
        <StatCard 
          title="Despesas Totais" 
          value={`R$ ${totalExpenses.toFixed(2)}`} 
          icon={TrendingDown} 
          color="text-red-500"
          subtext="3 gastos registrados este mês"
        />
        <StatCard 
          title="Lucro Líquido" 
          value={`R$ ${profit.toFixed(2)}`} 
          icon={Wallet} 
          color="text-yellow-500"
          subtext="Margem atual de 35%"
        />
        <StatCard 
          title="Alunos Ativos" 
          value={activeStudents} 
          icon={Users} 
          color="text-blue-500"
          subtext="2 alunos com pagamento pendente"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
          <h3 className="text-lg font-bold text-white mb-6">Entradas vs Saídas</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#71717a" tick={{fill: '#71717a'}} axisLine={false} />
                <YAxis stroke="#71717a" tick={{fill: '#71717a'}} axisLine={false} tickFormatter={(value) => `R$${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
                  cursor={{ fill: '#27272a' }}
                />
                <Legend />
                <Bar dataKey="entrada" name="Entradas" fill="#EAB308" radius={[4, 4, 0, 0]} />
                <Bar dataKey="saida" name="Saídas" fill="#3f3f46" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
          <h3 className="text-lg font-bold text-white mb-6">Últimas Atividades</h3>
          <div className="space-y-4">
            {expenses.slice(0, 3).map((expense) => (
              <div key={expense.id} className="flex items-center justify-between border-b border-zinc-800 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                    <TrendingDown size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{expense.description}</p>
                    <p className="text-xs text-zinc-500">{expense.date}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-white">- R$ {expense.amount}</span>
              </div>
            ))}
            {students.slice(0, 3).map((student) => (
              <div key={student.id} className="flex items-center justify-between border-b border-zinc-800 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                    <TrendingUp size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Pagamento: {student.name}</p>
                    <p className="text-xs text-zinc-500">Plano {student.plan}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-white">+ R$ {student.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
