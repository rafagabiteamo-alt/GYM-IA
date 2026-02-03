import React, { useState } from 'react';
import { Expense } from '../types';
import { Plus, Trash2 } from 'lucide-react';

interface ExpensesProps {
  expenses: Expense[];
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
}

export const Expenses: React.FC<ExpensesProps> = ({ expenses, onAddExpense }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Outros');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;

    onAddExpense({
      description,
      amount: Number(amount),
      category: category as any,
      date: new Date().toISOString().split('T')[0]
    });
    setDescription('');
    setAmount('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white">Despesas</h2>
        <p className="text-zinc-400">Registre e controle os gastos da academia.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl sticky top-6">
            <h3 className="text-lg font-bold text-white mb-4">Nova Despesa</h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Descrição</label>
                <input 
                  type="text" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:border-yellow-500 outline-none"
                  placeholder="Ex: Conta de Luz"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Categoria</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:border-yellow-500 outline-none"
                >
                  <option>Aluguel</option>
                  <option>Equipamentos</option>
                  <option>Limpeza</option>
                  <option>Funcionários</option>
                  <option>Outros</option>
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
                className="w-full bg-white hover:bg-gray-200 text-black font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors mt-2"
              >
                <Plus size={20} /> Registrar
              </button>
            </form>
          </div>
        </div>

        {/* List Section */}
        <div className="lg:col-span-2 space-y-4">
          {expenses.map((expense) => (
            <div key={expense.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-center justify-between hover:border-zinc-700 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 font-bold text-lg">
                  R$
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">{expense.description}</h4>
                  <div className="flex gap-2 text-xs text-zinc-500">
                    <span className="bg-zinc-800 px-2 py-0.5 rounded text-zinc-300">{expense.category}</span>
                    <span>{expense.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xl font-bold text-white">- R$ {expense.amount.toFixed(2)}</span>
                <button className="text-zinc-600 hover:text-red-500 transition-colors">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
          {expenses.length === 0 && (
            <div className="text-center py-10 text-zinc-500">
              Nenhuma despesa registrada este mês.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
