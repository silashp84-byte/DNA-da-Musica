import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Award, Sparkles, BookOpen, ShieldCheck, HeartHandshake, LogIn, UserPlus } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (name: string, email: string) => void;
}

export default function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [tab, setTab] = useState<'register' | 'login'>('register');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (tab === 'register' && !formData.name) return;
    if (!formData.email) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        // Log in the user
        const finalName = tab === 'register' ? formData.name : formData.email.split('@')[0];
        onLogin(finalName, formData.email);
        onClose();
        // Scroll to the members area if it exists on the page
        const el = document.getElementById('members-dashboard');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md" id="auth-modal-container">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto"
        id="auth-modal-card"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          id="btn-close-auth-modal"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="flex-1 p-12 text-center flex flex-col items-center justify-center space-y-4 bg-slate-950">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center border border-emerald-500/20"
            >
              <Check className="w-8 h-8" />
            </motion.div>
            <h3 className="font-display font-black text-2xl text-white">
              {tab === 'register' ? 'Conta Criada com Sucesso!' : 'Login Efetuado!'}
            </h3>
            <p className="text-slate-400 text-sm max-w-sm">
              Seja bem-vindo ao DNA da Música. Redirecionando você para o seu painel do aluno...
            </p>
          </div>
        ) : (
          <>
            {/* Left Column: Benefits of Member Area */}
            <div className="flex-1 p-8 bg-gradient-to-br from-slate-950 to-slate-900 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/5">
              <div>
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs tracking-wider uppercase mb-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" /> Área de Membros 100% Gratuita
                </div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-4">
                  Crie sua conta e comece a <span className="text-amber-400">Estudar Grátis</span>
                </h3>
                <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                  Não cobramos nada. Tenha acesso completo e vitalício aos resumos, acompanhamento de progresso e gerador de certificado profissional.
                </p>

                {/* Benefits List */}
                <ul className="space-y-4">
                  {[
                    { title: 'Progresso em Tempo Real', desc: 'Marque as aulas concluídas e salve seus recordes do Quiz.' },
                    { title: 'Downloads PDF Liberados', desc: 'Acesse manuais de escalas e apostilas de partituras sem bloqueios.' },
                    { title: 'Certificado de Conclusão de 60h', desc: 'Gere e imprima seu certificado oficial gratuito com seu nome.' },
                    { title: 'Comunidade de Alunos VIP', desc: 'Espaço integrado para discussões e exercícios práticos.' },
                  ].map((benefit, index) => (
                    <li key={index} className="flex gap-3 items-start" id={`auth-benefit-${index}`}>
                      <div className="bg-indigo-500/10 text-indigo-400 p-1.5 rounded-lg mt-0.5 border border-indigo-500/20">
                        <Check className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-white text-sm font-bold">{benefit.title}</h4>
                        <p className="text-slate-400 text-xs mt-0.5">{benefit.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Secure Trust Footer */}
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-6 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Privacidade Assegurada
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  Certificação Sem Custos
                </div>
              </div>
            </div>

            {/* Right Column: Auth Form Box */}
            <div className="w-full md:w-[380px] p-8 flex flex-col justify-center bg-slate-900">
              {/* Tab Selector */}
              <div className="flex bg-slate-950 p-1 rounded-xl mb-6 border border-white/5">
                <button
                  type="button"
                  onClick={() => setTab('register')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    tab === 'register'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  id="tab-btn-register"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  Criar Conta
                </button>
                <button
                  type="button"
                  onClick={() => setTab('login')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    tab === 'login'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  id="tab-btn-login"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Entrar (Login)
                </button>
              </div>

              <h4 className="text-white font-display font-black text-lg mb-4">
                {tab === 'register' ? 'Cadastre-se Gratuitamente' : 'Acesse seu Painel'}
              </h4>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4" id="auth-form-fields">
                {tab === 'register' && (
                  <div>
                    <label className="block text-slate-400 text-xs font-semibold mb-1.5">Seu Nome Completo</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: Silas Alves"
                      className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                      id="input-auth-name"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-slate-400 text-xs font-semibold mb-1.5">Seu E-mail</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Ex: silas.hp84@gmail.com"
                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                    id="input-auth-email"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-slate-400 text-xs font-semibold">Sua Senha</label>
                    {tab === 'login' && (
                      <button
                        type="button"
                        onClick={() => alert('Como a área de membros é demonstrativa e gratuita, você pode entrar digitando qualquer senha!')}
                        className="text-[10px] text-indigo-400 hover:underline cursor-pointer"
                        id="btn-forgot-password"
                      >
                        Esqueceu?
                      </button>
                    )}
                  </div>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                    id="input-auth-password"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-display font-black rounded-xl hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                  id="btn-auth-submit"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      {tab === 'register' ? 'Criar Minha Conta Grátis' : 'Entrar no Painel do Aluno'}
                    </>
                  )}
                </button>
              </form>

              <p className="text-[10px] text-slate-500 text-center mt-4 leading-normal">
                Ao prosseguir, você concorda em receber acesso imediato aos materiais. Seus dados de progresso serão salvos localmente de forma segura.
              </p>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
