import React, { useState } from 'react';
import { Transaction } from '../types';
import { Plus, Trash2, TrendingUp, TrendingDown } from 'lucide-react';

interface ExpensesProps {
  transactions: Transaction[];
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  onDeleteTransaction: (id: string) => void;
}

export const Expenses: React.FC<ExpensesProps> = ({ transactions, onAddTransaction, onDeleteTransaction }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('Outros');

  const incomeCategories = ['Mensalidade', 'Vendas', 'Matrícula', 'Outros'];
  const expenseCategories = ['Aluguel', 'Equipamentos', 'Limpeza', 'Funcionários', 'Outros'];

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;

    onAddTransaction({
      description,
      amount: Number(amount),
      category: category,
      date: new Date().toISOString().split('T')[0],
      type: type
    });
    setDescription('');
    setAmount('');
  };

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Financeiro</h2>
          <p className="text-zinc-400">Controle suas entradas e saídas de caixa.</p>
        </div>
        <div className="flex gap-4">
            <div className="px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500">
                <span className="text-xs uppercase font-bold block">Entradas</span>
                <span className="text-lg font-bold">R$ {totalIncome.toFixed(2)}</span>
            </div>
            <div className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500">
                <span className="text-xs uppercase font-bold block">Saídas</span>
                <span className="text-lg font-bold">R$ {totalExpense.toFixed(2)}</span>
            </div>
            <div className={`px-4 py-2 rounded-lg border ${balance >= 0 ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-red-900/20 border-red-500/30 text-white'}`}>
                <span className="text-xs uppercase font-bold block text-zinc-400">Saldo</span>
                <span className="text-lg font-bold">R$ {balance.toFixed(2)}</span>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl sticky top-6">
            <h3 className="text-lg font-bold text-white mb-4">Nova Transação</h3>
            
            <div className="flex gap-2 mb-4 p-1 bg-zinc-950 rounded-lg">
                <button 
                    onClick={() => { setType('income'); setCategory('Mensalidade'); }}
                    className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${type === 'income' ? 'bg-green-600 text-white' : 'text-zinc-500 hover:text-white'}`}
                >
                    Entrada
                </button>
                <button 
                    onClick={() => { setType('expense'); setCategory('Outros'); }}
                    className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${type === 'expense' ? 'bg-red-600 text-white' : 'text-zinc-500 hover:text-white'}`}
                >
                    Saída
                </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Descrição</label>
                <input 
                  type="text" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:border-yellow-500 outline-none"
                  placeholder={type === 'income' ? "Ex: Mensalidade João" : "Ex: Conta de Luz"}
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Categoria</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:border-yellow-500 outline-none"
                >
                  {(type === 'income' ? incomeCategories : expenseCategories).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Valor (R$)</label>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:border-yellow-500 outline-none"
                  placeholder="0.00"
                />
              </div>
              <button 
                type="submit" 
                className={`w-full font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors mt-2 ${type === 'income' ? 'bg-green-600 hover:bg-green-500 text-white' : 'bg-red-600 hover:bg-red-500 text-white'}`}
              >
                <Plus size={20} /> Registrar {type === 'income' ? 'Entrada' : 'Saída'}
              </button>
            </form>
          </div>
        </div>

        {/* List Section */}
        <div className="lg:col-span-2 space-y-4">
          {transactions.map((t) => (
            <div key={t.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-center justify-between hover:border-zinc-700 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg ${t.type === 'income' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {t.type === 'income' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">{t.description}</h4>
                  <div className="flex gap-2 text-xs text-zinc-500">
                    <span className="bg-zinc-800 px-2 py-0.5 rounded text-zinc-300">{t.category}</span>
                    <span>{t.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-xl font-bold ${t.type === 'income' ? 'text-green-500' : 'text-white'}`}>
                    {t.type === 'income' ? '+ ' : '- '} R$ {t.amount.toFixed(2)}
                </span>
                <button 
                    onClick={() => onDeleteTransaction(t.id)}
                    className="text-zinc-600 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
          {transactions.length === 0 && (
            <div className="text-center py-10 text-zinc-500">
              Nenhuma transação registrada.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
