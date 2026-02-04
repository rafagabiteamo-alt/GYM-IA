import React, { useState } from 'react';
import { PageView, User } from '../types';
import { Dumbbell, ArrowRight, Mail, Lock, User as UserIcon, AlertCircle } from 'lucide-react';

interface AuthProps {
  view: 'login' | 'register';
  onNavigate: (page: PageView) => void;
  onSuccess: (email: string) => void;
  users: User[];
  onRegister: (user: User) => void;
}

export const Auth: React.FC<AuthProps> = ({ view, onNavigate, onSuccess, users, onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setInfo('');
    
    if (view === 'login') {
      const user = users.find(u => u.email === email);
      
      if (!user) {
        setInfo(`O e-mail ${email} não foi encontrado. Redirecionando para o cadastro...`);
        setTimeout(() => {
          onNavigate('register');
          setInfo('');
        }, 2000);
        return;
      }

      if (user.password === password) {
        onSuccess(email);
      } else {
        setError('Senha incorreta.');
      }
    } else {
      const userExists = users.some(u => u.email === email);
      if (userExists) {
        setError('Este e-mail já está cadastrado. Faça login.');
        return;
      }

      if (password.length < 6) {
        setError('A senha deve ter pelo menos 6 caracteres.');
        return;
      }

      onRegister({ email, password, academyName: name });
      onSuccess(email);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
      <div className="mb-8 flex flex-col items-center">
        <div className="bg-yellow-500 p-3 rounded-xl text-black mb-4">
          <Dumbbell size={32} />
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight">GymFlow IA</h1>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-2">
          {view === 'login' ? 'Bem-vindo de volta' : 'Crie sua conta'}
        </h2>
        <p className="text-zinc-400 mb-6">
          {view === 'login' 
            ? 'Entre com seu e-mail para acessar o painel.' 
            : 'Comece a organizar sua academia hoje mesmo.'}
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-xl mb-4 text-sm flex items-center gap-2">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {info && (
          <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 p-3 rounded-xl mb-4 text-sm flex items-center gap-2">
            <AlertCircle size={16} /> {info}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {view === 'register' && (
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1.5">Nome da Academia</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all"
                  placeholder="Ex: Iron Gym"
                  required={view === 'register'}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1.5">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all"
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1.5">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-[0.98] mt-2"
          >
            {view === 'login' ? 'Entrar' : 'Cadastrar'} <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-zinc-500">
          {view === 'login' ? (
            <>
              Não tem uma conta?{' '}
              <button onClick={() => onNavigate('register')} className="text-yellow-500 hover:underline font-medium">
                Cadastre-se
              </button>
            </>
          ) : (
            <>
              Já tem uma conta?{' '}
              <button onClick={() => onNavigate('login')} className="text-yellow-500 hover:underline font-medium">
                Faça login
              </button>
            </>
          )}
        </div>
      </div>
      
      <button onClick={() => onNavigate('landing')} className="mt-8 text-zinc-500 hover:text-white text-sm">
        Voltar para a página inicial
      </button>
    </div>
  );
};
