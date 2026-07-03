import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Star, GraduationCap, CheckCircle2, ShieldCheck, Award, BookOpen } from 'lucide-react';

interface HeroProps {
  onOpenLogin: () => void;
  onStartTour: () => void;
  isLoggedIn: boolean;
  userName: string;
}

export default function Hero({ onOpenLogin, onStartTour, isLoggedIn, userName }: HeroProps) {
  const [activeStudentsCount, setActiveStudentsCount] = useState(1280);

  // Simulate dynamic active students joining
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStudentsCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="hero" 
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-radial from-slate-900 via-slate-950 to-black"
    >
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating note vectors (CSS animation) */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-30">
        <div className="absolute top-[20%] left-[10%] text-xl animate-bounce text-slate-700">♪</div>
        <div className="absolute top-[60%] left-[8%] text-3xl rotate-12 text-slate-700">♫</div>
        <div className="absolute top-[30%] right-[15%] text-2xl -rotate-12 text-slate-700">♬</div>
        <div className="absolute bottom-[20%] right-[10%] text-4xl text-slate-700 font-mono">𝄢</div>
        <div className="absolute top-[75%] right-[25%] text-xl text-slate-700">𝄡</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copys and CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tagline / Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-indigo-400 font-semibold text-xs tracking-wide uppercase mx-auto lg:mx-0 animate-fade-in"
              id="hero-badge"
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
              Alfabetização Musical Prática & 100% Gratuita
            </motion.div>

            {/* Main Catchy Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.1]"
              id="hero-title"
            >
              Decodifique a Música do <span className="text-amber-400 bg-gradient-to-r from-amber-400 via-amber-200 to-indigo-400 bg-clip-text text-transparent">Absoluto Zero</span> e Toque de Ouvido
            </motion.h1>

            {/* Compelling Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0"
              id="hero-description"
            >
              Conecte os conceitos lógicos e a prática sensorial de forma divertida. Nosso método decifra notas, ritmos, escalas e intervalos, transformando a teoria musical em liberdade criativa no seu instrumento.
            </motion.p>

            {/* Core Values/Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto lg:mx-0 text-left pt-2"
              id="hero-highlights"
            >
              {[
                'Interação em Tempo Real (Teclado ativo)',
                '12 Módulos Didáticos Completos',
                'Treino auditivo e rítmico integrado',
                'Área de Membros & Certificado de 60h inclusos',
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-300 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start"
              id="hero-actions"
            >
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    const el = document.getElementById('members-dashboard');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-display font-black px-8 py-4 rounded-full shadow-[0_0_30px_rgba(99,102,241,0.2)] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:scale-[1.03] transition-all duration-300 cursor-pointer text-base"
                  id="btn-hero-enroll"
                >
                  Olá {userName}! Acessar Meu Painel
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={onOpenLogin}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-display font-black px-8 py-4 rounded-full shadow-[0_0_30px_rgba(99,102,241,0.2)] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:scale-[1.03] transition-all duration-300 cursor-pointer text-base"
                  id="btn-hero-enroll"
                >
                  Entrar na Área de Membros Grátis
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}

              <button
                onClick={onStartTour}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 border border-slate-800 hover:bg-slate-850 hover:border-slate-700 text-slate-200 hover:text-white px-8 py-4 rounded-full transition-all cursor-pointer text-base"
                id="btn-hero-tour"
              >
                Começar Aula Experimental
              </button>
            </motion.div>

            {/* Social Proof Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-4 justify-center lg:justify-start pt-6 border-t border-slate-900/60"
              id="hero-social-proof"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://images.unsplash.com/photo-${1500000000000 + i * 100000}?auto=format&fit=crop&w=80&h=80&q=80`}
                    alt="Aluno"
                    className="w-8 h-8 rounded-full border border-slate-950 object-cover"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <div className="text-left">
                <div className="flex gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">⭐ 4.9/5 de {activeStudentsCount}+ alunos ativos na plataforma.</p>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Dynamic Visual Showcase / Free Students Counter */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
            id="hero-promo-panel"
          >
            <div className="glass-panel p-6 sm:p-8 rounded-3xl glow-indigo relative border border-slate-800">
              
              {/* Golden Ribbon Badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-display font-extrabold text-[10px] uppercase px-3 py-1 rounded-full shadow-lg tracking-wider flex items-center gap-1">
                <GraduationCap className="w-3 h-3" /> Acesso 100% Livre
              </div>

              <h3 className="font-display font-extrabold text-xl text-white mb-2">
                Seu Aprendizado Sem Limites:
              </h3>
              
              {/* Perks list inside promo card */}
              <div className="space-y-4 my-6 text-slate-300">
                <div className="flex gap-3 items-start text-sm">
                  <div className="text-indigo-400 mt-0.5">🔓</div>
                  <div>
                    <span className="font-bold text-white block">Área de Membros Gratuita</span>
                    Sem mensalidades, sem taxas de renovação e sem pegadinhas.
                  </div>
                </div>
                <div className="flex gap-3 items-start text-sm">
                  <div className="text-indigo-400 mt-0.5">🎯</div>
                  <div>
                    <span className="font-bold text-white block">Teclado & Simulador Ativos</span>
                    Toque as notas no piano interativo e ouça as frequências.
                  </div>
                </div>
                <div className="flex gap-3 items-start text-sm">
                  <div className="text-indigo-400 mt-0.5">📄</div>
                  <div>
                    <span className="font-bold text-white block">Downloads de PDFs Liberados</span>
                    Guia de caligrafia, desenhos de escalas e resumos para imprimir.
                  </div>
                </div>
              </div>

              {/* Dynamic Online Counter Board */}
              <div className="border-t border-slate-800/80 pt-6">
                <div className="flex justify-between items-center text-xs text-slate-400 mb-4">
                  <span>Membros Ativos Hoje:</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                    🟢 142 estudando agora
                  </span>
                </div>

                {/* Benefits Badges */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-850 text-center">
                    <Award className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                    <span className="text-[10px] font-bold text-white block">Certificação 60h</span>
                    <span className="text-[8px] text-slate-500">Inclusa Grátis</span>
                  </div>
                  <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-850 text-center">
                    <BookOpen className="w-5 h-5 text-indigo-400 mx-auto mb-1" />
                    <span className="text-[10px] font-bold text-white block">12 Módulos</span>
                    <span className="text-[8px] text-slate-500">Passo a Passo</span>
                  </div>
                </div>

                {/* Main Action in the Card */}
                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      const el = document.getElementById('members-dashboard');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-display font-black py-3.5 rounded-xl transition-all shadow-md text-xs sm:text-sm cursor-pointer text-center"
                    id="btn-hero-card-cta"
                  >
                    Ir para o Meu Painel de Aluno
                  </button>
                ) : (
                  <button
                    onClick={onOpenLogin}
                    className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-display font-black py-3.5 rounded-xl transition-all shadow-md text-xs sm:text-sm cursor-pointer text-center"
                    id="btn-hero-card-cta"
                  >
                    Cadastrar-se Gratuitamente
                  </button>
                )}

              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
