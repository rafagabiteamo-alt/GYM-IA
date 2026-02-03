import React from 'react';
import { CheckCircle, ArrowRight, TrendingUp, ShieldAlert, Clock } from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-yellow-500 selection:text-black">
      {/* Header */}
      <header className="border-b border-zinc-900 fixed w-full bg-black/80 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
            <span className="text-yellow-500 text-3xl">⚡</span> GymFlow IA
          </div>
          <button 
            onClick={onEnterApp}
            className="bg-zinc-100 hover:bg-white text-black font-semibold py-2 px-5 rounded-full text-sm transition-all"
          >
            Entrar no Sistema
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center max-w-4xl mx-auto">
        <div className="inline-block px-4 py-1.5 rounded-full bg-yellow-500/10 text-yellow-400 text-sm font-medium mb-6 border border-yellow-500/20">
          ✨ Organização Financeira com IA
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
          Pare de perder dinheiro <br/>
          <span className="text-zinc-500">na sua academia.</span>
        </h1>
        <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          O GymFlow IA organiza seus alunos e cobra automaticamente pelo WhatsApp. Simples, rápido e sem dor de cabeça.
        </p>
        <button 
          onClick={onEnterApp}
          className="group bg-yellow-500 hover:bg-yellow-400 text-black text-lg font-bold py-4 px-10 rounded-full transition-all flex items-center gap-2 mx-auto transform hover:scale-105"
        >
          Testar Grátis por 7 Dias <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
        <p className="text-zinc-500 text-sm mt-4">Sem cartão de crédito necessário • Cancele quando quiser</p>
      </section>

      {/* Pain Points */}
      <section className="py-20 bg-zinc-950 border-y border-zinc-900">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-black border border-zinc-900 hover:border-zinc-700 transition-colors">
            <ShieldAlert className="text-red-500 mb-4" size={40} />
            <h3 className="text-xl font-bold mb-3">Inadimplência Alta?</h3>
            <p className="text-zinc-400">Esquecer de cobrar é perder dinheiro. O aluno esquece de pagar e você fica no prejuízo.</p>
          </div>
          <div className="p-8 rounded-2xl bg-black border border-zinc-900 hover:border-zinc-700 transition-colors">
            <Clock className="text-blue-500 mb-4" size={40} />
            <h3 className="text-xl font-bold mb-3">Tempo Perdido?</h3>
            <p className="text-zinc-400">Para de mandar mensagem uma por uma. Deixe o robô fazer o trabalho chato.</p>
          </div>
          <div className="p-8 rounded-2xl bg-black border border-zinc-900 hover:border-zinc-700 transition-colors">
            <TrendingUp className="text-yellow-500 mb-4" size={40} />
            <h3 className="text-xl font-bold mb-3">Sem Controle?</h3>
            <p className="text-zinc-400">Caderno e planilha não mostram seu lucro real. Saiba exatamente quanto entra e sai.</p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-4 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Como Funciona</h2>
        <div className="space-y-8">
          {[
            { step: '01', title: 'Cadastre seus alunos', desc: 'Em menos de 30 segundos você adiciona um novo aluno.' },
            { step: '02', title: 'Defina valor e vencimento', desc: 'O sistema organiza tudo em uma lista limpa e visual.' },
            { step: '03', title: 'A IA cobra por você', desc: 'Mensagens automáticas no WhatsApp antes, no dia e depois do vencimento.' },
            { step: '04', title: 'Relatórios automáticos', desc: 'Pergunte para a IA: "Qual meu lucro?" e ela responde na hora.' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-6 p-6 rounded-2xl hover:bg-zinc-900/50 transition-colors border-b border-zinc-900 last:border-0">
              <span className="text-4xl font-bold text-yellow-500/20">{item.step}</span>
              <div>
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-zinc-400 text-lg">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-yellow-500 text-black">
        <div className="max-w-md mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Plano Único</h2>
          <div className="bg-white p-8 rounded-3xl shadow-2xl">
            <div className="text-5xl font-black mb-2">R$49<span className="text-xl text-zinc-500 font-normal">/mês</span></div>
            <p className="text-zinc-600 mb-8">Tudo incluso. Sem surpresas.</p>
            
            <ul className="space-y-4 text-left mb-8">
              <li className="flex items-center gap-3"><CheckCircle className="text-yellow-500" /> Alunos ilimitados</li>
              <li className="flex items-center gap-3"><CheckCircle className="text-yellow-500" /> Cobrança Automática</li>
              <li className="flex items-center gap-3"><CheckCircle className="text-yellow-500" /> IA Organizadora</li>
              <li className="flex items-center gap-3"><CheckCircle className="text-yellow-500" /> Suporte VIP</li>
            </ul>

            <button 
              onClick={onEnterApp}
              className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-zinc-800 transition-colors"
            >
              Começar Agora
            </button>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-black border-t border-zinc-900 text-center text-zinc-600">
        <p>&copy; 2024 GymFlow IA. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};
