import React, { useState } from 'react';
import { PageView } from '../types';
import { 
  LayoutDashboard, 
  Users, 
  Wallet, 
  Bot, 
  LogOut, 
  Dumbbell,
  Menu,
  X
} from 'lucide-react';

interface LayoutProps {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  children: React.ReactNode;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ currentPage, setCurrentPage, children, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Alunos', icon: Users },
    { id: 'expenses', label: 'Despesas', icon: Wallet },
    { id: 'ai', label: 'IA Organizadora', icon: Bot },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans flex overflow-hidden">
      {/* Mobile Menu Button */}
      <button 
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-zinc-900 rounded-md border border-zinc-800 text-yellow-500"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-zinc-900 border-r border-zinc-800 transform transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 flex items-center gap-3 border-b border-zinc-800">
          <div className="bg-yellow-500 p-2 rounded-lg text-black">
            <Dumbbell size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">GymFlow IA</h1>
            <span className="text-xs text-zinc-500 uppercase tracking-wider">Painel Gestor</span>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id as PageView);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' 
                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-zinc-800">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>Sair do Sistema</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-screen bg-zinc-950 relative">
        <div className="max-w-7xl mx-auto p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};
