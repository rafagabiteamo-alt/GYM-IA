import React, { useState, useEffect } from 'react';
import { Student } from '../types';
import { 
  Search, 
  Plus, 
  MoreVertical, 
  MessageCircle, 
  AlertCircle, 
  CheckCircle, 
  Trash2, 
  Edit, 
  DollarSign,
  Ban,
  Clock
} from 'lucide-react';

interface StudentListProps {
  students: Student[];
  onAddStudent: (student: Omit<Student, 'id'>) => void;
  onUpdateStudent: (student: Student) => void;
  onDeleteStudent: (id: string) => void;
}

export const StudentList: React.FC<StudentListProps> = ({ 
  students, 
  onAddStudent, 
  onUpdateStudent, 
  onDeleteStudent 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    plan: 'Mensal',
    value: 90,
    dueDate: '',
  });

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveMenuId(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.whatsapp.includes(searchTerm)
  );

  const handleOpenModal = (student?: Student) => {
    if (student) {
      setEditingId(student.id);
      setFormData({
        name: student.name,
        whatsapp: student.whatsapp,
        plan: student.plan,
        value: student.value,
        dueDate: student.dueDate,
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', whatsapp: '', plan: 'Mensal', value: 90, dueDate: '' });
    }
    setIsModalOpen(true);
    setActiveMenuId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      const original = students.find(s => s.id === editingId);
      onUpdateStudent({
        id: editingId,
        ...formData,
        status: original?.status || 'active',
        plan: formData.plan as any
      });
    } else {
      onAddStudent({
        ...formData,
        status: 'active',
        plan: formData.plan as any
      });
    }
    
    setIsModalOpen(false);
  };

  const handleWhatsAppClick = (student: Student) => {
    // Basic cleaning, user handles country code
    const cleanNumber = student.whatsapp.replace(/\D/g, '');
    let message = '';
    
    if (student.status === 'overdue') {
      message = `Olá ${student.name}, tudo bem? Aqui é da academia. Notamos que sua mensalidade venceu no dia ${student.dueDate}. Podemos gerar um link para pagamento?`;
    } else {
      message = `Olá ${student.name}, tudo bem? Aqui é da academia. Passando para lembrar que seu plano vence no dia ${student.dueDate}.`;
    }

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/55${cleanNumber}?text=${encodedMessage}`, '_blank');
  };

  const handleChangeStatus = (student: Student, newStatus: 'active' | 'overdue' | 'inactive') => {
    onUpdateStudent({ ...student, status: newStatus });
    setActiveMenuId(null);
  };

  const handleDeleteClick = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este aluno?')) {
      onDeleteStudent(id);
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20"><CheckCircle size={12} className="mr-1"/> Ativo</span>;
    }
    if (status === 'overdue') {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/20"><AlertCircle size={12} className="mr-1"/> Atrasado</span>;
    }
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-500/10 text-zinc-500 border border-zinc-500/20"><Ban size={12} className="mr-1"/> Inativo</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Alunos</h2>
          <p className="text-zinc-400">Gerencie matrículas e cobranças.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={20} /> Novo Aluno
        </button>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-visible">
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

        <div className="overflow-x-auto min-h-[300px]">
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
                <tr key={student.id} className="hover:bg-zinc-800/50 transition-colors relative">
                  <td className="px-6 py-4 font-medium text-white">{student.name}</td>
                  <td className="px-6 py-4">{student.plan}</td>
                  <td className="px-6 py-4">{student.dueDate}</td>
                  <td className="px-6 py-4 text-white font-bold">R$ {student.value.toFixed(2)}</td>
                  <td className="px-6 py-4">{getStatusBadge(student.status)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 relative">
                      {/* WhatsApp Button */}
                      <button 
                        onClick={() => handleWhatsAppClick(student)}
                        className="p-2 text-zinc-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-colors" 
                        title="Enviar Cobrança WhatsApp"
                      >
                        <MessageCircle size={18} />
                      </button>
                      
                      {/* Dropdown Menu */}
                      <div className="relative" onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenuId(activeMenuId === student.id ? null : student.id);
                          }}
                          className={`p-2 rounded-lg transition-colors ${activeMenuId === student.id ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-700'}`}
                        >
                          <MoreVertical size={18} />
                        </button>

                        {activeMenuId === student.id && (
                          <div className="absolute right-0 mt-2 w-56 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl z-50 overflow-hidden">
                            <button 
                              onClick={() => handleChangeStatus(student, 'active')}
                              className="w-full px-4 py-3 text-left text-sm text-zinc-300 hover:bg-zinc-800 hover:text-green-400 flex items-center gap-2"
                            >
                              <DollarSign size={16} /> Confirmar Pagamento
                            </button>
                            <button 
                              onClick={() => handleChangeStatus(student, 'overdue')}
                              className="w-full px-4 py-3 text-left text-sm text-zinc-300 hover:bg-zinc-800 hover:text-orange-400 flex items-center gap-2"
                            >
                              <Clock size={16} /> Marcar como Atrasado
                            </button>
                            <button 
                              onClick={() => handleChangeStatus(student, 'inactive')}
                              className="w-full px-4 py-3 text-left text-sm text-zinc-300 hover:bg-zinc-800 hover:text-zinc-400 flex items-center gap-2"
                            >
                              <Ban size={16} /> Desativar Aluno
                            </button>
                            <button 
                              onClick={() => handleOpenModal(student)}
                              className="w-full px-4 py-3 text-left text-sm text-zinc-300 hover:bg-zinc-800 hover:text-yellow-500 flex items-center gap-2 border-t border-zinc-800"
                            >
                              <Edit size={16} /> Editar Aluno
                            </button>
                            <button 
                              onClick={() => handleDeleteClick(student.id)}
                              className="w-full px-4 py-3 text-left text-sm text-zinc-300 hover:bg-zinc-800 hover:text-red-500 flex items-center gap-2"
                            >
                              <Trash2 size={16} /> Excluir
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-white mb-4">
              {editingId ? 'Editar Aluno' : 'Cadastrar Novo Aluno'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Nome Completo</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white focus:border-yellow-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">WhatsApp (com DDD)</label>
                <input 
                  required 
                  value={formData.whatsapp} 
                  onChange={e => setFormData({...formData, whatsapp: e.target.value})} 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white focus:border-yellow-500 outline-none" 
                  placeholder="11999999999" 
                />
                <p className="text-xs text-zinc-500">Insira apenas números com DDD.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Plano</label>
                  <select value={formData.plan} onChange={e => setFormData({...formData, plan: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white focus:border-yellow-500 outline-none">
                    <option>Mensal</option>
                    <option>Trimestral</option>
                    <option>Anual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Valor (R$)</label>
                  <input type="number" required value={formData.value} onChange={e => setFormData({...formData, value: Number(e.target.value)})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white focus:border-yellow-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Vencimento</label>
                <input type="date" required value={formData.dueDate} onChange={e => setFormData({...formData, dueDate: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white focus:border-yellow-500 outline-none" />
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-zinc-400 hover:text-white">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg">
                  {editingId ? 'Salvar Alterações' : 'Cadastrar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
