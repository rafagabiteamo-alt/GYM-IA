import React, { useState } from 'react';
import { Student } from '../types';
import { Search, Plus, MoreVertical, MessageCircle, AlertCircle, CheckCircle } from 'lucide-react';

interface StudentListProps {
  students: Student[];
  onAddStudent: (student: Omit<Student, 'id'>) => void;
}

export const StudentList: React.FC<StudentListProps> = ({ students, onAddStudent }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    whatsapp: '',
    plan: 'Mensal',
    value: 90,
    dueDate: '',
  });

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.whatsapp.includes(searchTerm)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddStudent({
      ...newStudent,
      status: 'active',
      plan: newStudent.plan as any
    });
    setIsModalOpen(false);
    setNewStudent({ name: '', whatsapp: '', plan: 'Mensal', value: 90, dueDate: '' });
  };

  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20"><CheckCircle size={12} className="mr-1"/> Ativo</span>;
    }
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/20"><AlertCircle size={12} className="mr-1"/> Atrasado</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Alunos</h2>
          <p className="text-zinc-400">Gerencie matrículas e cobranças.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={20} /> Novo Aluno
        </button>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-zinc-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500" size={20} />
            <input 
              type="text" 
              placeholder="Buscar por nome ou telefone..." 
              className="w-full bg-zinc-950 border border-zinc-800 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-yellow-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-400">
            <thead className="bg-zinc-950 text-zinc-200 uppercase text-xs font-bold">
              <tr>
                <th className="px-6 py-4">Nome</th>
                <th className="px-6 py-4">Plano</th>
                <th className="px-6 py-4">Vencimento</th>
                <th className="px-6 py-4">Valor</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{student.name}</td>
                  <td className="px-6 py-4">{student.plan}</td>
                  <td className="px-6 py-4">{student.dueDate}</td>
                  <td className="px-6 py-4 text-white font-bold">R$ {student.value.toFixed(2)}</td>
                  <td className="px-6 py-4">{getStatusBadge(student.status)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-zinc-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg" title="Enviar Cobrança WhatsApp">
                        <MessageCircle size={18} />
                      </button>
                      <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-lg">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simple Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-white mb-4">Cadastrar Novo Aluno</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Nome Completo</label>
                <input required value={newStudent.name} onChange={e => setNewStudent({...newStudent, name: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white focus:border-yellow-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">WhatsApp</label>
                <input required value={newStudent.whatsapp} onChange={e => setNewStudent({...newStudent, whatsapp: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white focus:border-yellow-500 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Plano</label>
                  <select value={newStudent.plan} onChange={e => setNewStudent({...newStudent, plan: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white focus:border-yellow-500 outline-none">
                    <option>Mensal</option>
                    <option>Trimestral</option>
                    <option>Anual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Valor</label>
                  <input type="number" required value={newStudent.value} onChange={e => setNewStudent({...newStudent, value: Number(e.target.value)})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white focus:border-yellow-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Vencimento</label>
                <input type="date" required value={newStudent.dueDate} onChange={e => setNewStudent({...newStudent, dueDate: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white focus:border-yellow-500 outline-none" />
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-zinc-400 hover:text-white">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
