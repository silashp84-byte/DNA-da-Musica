import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, CheckCircle2, Lock, Sparkles, User, LogOut, CheckSquare, Square, Printer, Star, Heart, FileText, Trophy } from 'lucide-react';

interface MembersAreaProps {
  isLoggedIn: boolean;
  userName: string;
  userEmail: string;
  completedLessons: string[];
  quizHighScore: number;
  onOpenLogin: () => void;
  onLogout: () => void;
  onToggleLesson: (lessonId: string) => void;
}

export default function MembersArea({
  isLoggedIn,
  userName,
  userEmail,
  completedLessons,
  quizHighScore,
  onOpenLogin,
  onLogout,
  onToggleLesson,
}: MembersAreaProps) {
  const [certificateName, setCertificateName] = useState(userName || '');

  // Keep certificate name in sync with user name
  useEffect(() => {
    if (userName) {
      setCertificateName(userName);
    }
  }, [userName]);

  const curriculum = [
    { id: 'teoria', name: 'Módulo 01: O que é Teoria Musical', category: 'Fundação' },
    { id: 'fundamentos', name: 'Módulo 02: Propriedades Físicas do Som', category: 'Fundação' },
    { id: 'notas', name: 'Módulo 03: Notas no Teclado & Frequências', category: 'Notas' },
    { id: 'pentagrama', name: 'Módulo 04: Pauta, Linhas e Espaços', category: 'Leitura' },
    { id: 'claves', name: 'Módulo 05: As Três Claves Principais', category: 'Leitura' },
    { id: 'figuras', name: 'Módulo 06: Figuras de Ritmo & Compasso', category: 'Ritmo' },
    { id: 'metronomo', name: 'Módulo 07: O Metrônomo e Subdivisões', category: 'Ritmo' },
    { id: 'intervalos', name: 'Módulo 08: Distâncias e Intervalos Harmônicos', category: 'Harmonia' },
    { id: 'escalas', name: 'Módulo 09: Fórmulas de Escalas Diatônicas', category: 'Escalas' },
    { id: 'pentatonicas', name: 'Módulo 10: Escalas Pentatônicas', category: 'Escalas' },
    { id: 'exercicios', name: 'Módulo 11: Treino Auditivo Prático', category: 'Treino' },
    { id: 'quiz', name: 'Módulo 12: Avaliação Geral e Desafios', category: 'Treino' },
  ];

  const totalLessons = curriculum.length;
  const completedCount = completedLessons.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  // Certificate is unlocked if progress is at least 50% (6 lessons)
  const isCertificateUnlocked = completedCount >= 6;

  const handlePrintCertificate = () => {
    if (!isCertificateUnlocked) return;
    
    // Smoothly initiate print. In general, standard print stylesheet handles hiding background or the user can print the iframe/page
    window.print();
  };

  return (
    <section id="members-dashboard" className="py-24 bg-slate-950 border-t border-white/5 relative">
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-3">
            🎓 Portal do Aluno
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            Sua <span className="text-indigo-400">Área de Membros</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Gerencie seus estudos e acompanhe seu progresso de alfabetização musical. Crie uma conta gratuita para registrar suas conquistas e emitir seu certificado de 60 horas.
          </p>
        </div>

        {/* Auth Conditionals */}
        {!isLoggedIn ? (
          /* Logged Out Promotion Card */
          <div className="max-w-4xl mx-auto bg-slate-900/40 backdrop-blur-md border border-white/10 p-8 sm:p-12 rounded-3xl text-center space-y-8 shadow-2xl relative overflow-hidden" id="members-logged-out-card">
            <div className="absolute top-0 right-0 h-1.5 w-full bg-gradient-to-r from-amber-400 via-indigo-500 to-purple-600" />
            
            <div className="max-w-xl mx-auto space-y-4">
              <div className="inline-flex p-3 bg-amber-400/10 border border-amber-400/20 text-amber-400 rounded-full mb-2">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white leading-tight">
                Painel do Aluno Bloqueado
              </h3>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Você está visualizando o site como visitante. Crie sua conta 100% gratuita para salvar seu progresso nos módulos, registrar suas notas do quiz, liberar o download das apostilas premium e destravar a emissão de certificado.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-4 text-left">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-white/5 space-y-1">
                <div className="text-indigo-400 text-base">📈</div>
                <h4 className="text-white text-xs font-bold">Progresso Ativo</h4>
                <p className="text-slate-500 text-[10px]">Salve quais módulos você já dominou para nunca se perder.</p>
              </div>
              <div className="bg-slate-950/80 p-4 rounded-xl border border-white/5 space-y-1">
                <div className="text-indigo-400 text-base">📚</div>
                <h4 className="text-white text-xs font-bold">Apostilas Liberadas</h4>
                <p className="text-slate-500 text-[10px]">Baixe manuais de escalas diatônicas e exercícios sem anúncios ou travas.</p>
              </div>
              <div className="bg-slate-950/80 p-4 rounded-xl border border-white/5 space-y-1">
                <div className="text-indigo-400 text-base">📜</div>
                <h4 className="text-white text-xs font-bold font-display">Certificação 60h</h4>
                <p className="text-slate-500 text-[10px]">Emita seu certificado com seu nome impresso assim que completar os treinos.</p>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onOpenLogin}
                className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-display font-black px-8 py-4 rounded-xl hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:scale-[1.02] transition-all cursor-pointer text-sm w-full sm:w-auto"
                id="btn-members-register-trigger"
              >
                Criar Minha Conta Grátis Agora
              </button>
              <button
                onClick={onOpenLogin}
                className="bg-slate-950 hover:bg-slate-900 border border-white/10 text-slate-300 font-bold px-6 py-4 rounded-xl transition-all cursor-pointer text-sm"
                id="btn-members-login-trigger"
              >
                Já sou cadastrado / Fazer Login
              </button>
            </div>
          </div>
        ) : (
          /* Active Student Dashboard Panel */
          <div className="space-y-8" id="members-active-dashboard">
            {/* Dashboard Header Bar */}
            <div className="bg-slate-900/60 border border-white/10 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-display font-black text-lg">
                  {userName ? userName.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-bold text-lg sm:text-xl">Olá, {userName}!</h3>
                    <span className="text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase">
                      Membro Ativo Grátis
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{userEmail}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <span className="text-[10px] text-slate-500 block font-mono uppercase">Status de Treinos</span>
                  <span className="text-xs font-bold text-amber-400">{completedCount === totalLessons ? '🏆 Formado no DNA' : '📖 Estudando'}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="bg-slate-950 hover:bg-slate-800 border border-white/5 hover:border-white/10 text-slate-400 hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  id="btn-members-logout"
                >
                  <LogOut className="w-4 h-4" />
                  Sair da Conta
                </button>
              </div>
            </div>

            {/* Dashboard Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Lesson Tracker List */}
              <div className="lg:col-span-6 bg-slate-900/40 backdrop-blur-md border border-white/10 p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
                <div>
                  <h3 className="font-display font-extrabold text-xl text-white">Seu Progresso de Estudos</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Marque as aulas que você já concluiu interagindo com o conteúdo do site.
                  </p>
                </div>

                {/* Progress bar container */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-indigo-400">Progresso Geral</span>
                    <span className="font-mono text-white">{progressPercent}% ({completedCount}/{totalLessons})</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                    <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-400 transition-all duration-300" style={{ width: `${progressPercent}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-500 block italic">
                    {completedCount === 0 ? 'Dica: Comece lendo "O que é Teoria Musical" e marque o primeiro check!' : 
                     isCertificateUnlocked ? '🎉 Excelente! Você já completou mais de 50% do curso e seu certificado está liberado para impressão abaixo!' : 
                     `Faltam apenas ${6 - completedCount} módulos marcados para liberar seu certificado de 60 horas.`}
                  </span>
                </div>

                {/* Checklist of curriculum */}
                <div className="space-y-2 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
                  {curriculum.map((lesson) => {
                    const isDone = completedLessons.includes(lesson.id);
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => onToggleLesson(lesson.id)}
                        className={`w-full p-3.5 rounded-xl border text-left flex justify-between items-center transition-all cursor-pointer ${
                          isDone
                            ? 'bg-indigo-600/10 border-indigo-500/30 text-indigo-300'
                            : 'bg-slate-950/80 border-white/5 text-slate-400 hover:bg-slate-900 hover:text-white'
                        }`}
                        id={`members-lesson-item-${lesson.id}`}
                      >
                        <div className="flex gap-3 items-center">
                          {isDone ? (
                            <CheckSquare className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                          ) : (
                            <Square className="w-5 h-5 text-slate-700 flex-shrink-0" />
                          )}
                          <div>
                            <span className="text-xs sm:text-sm font-bold block leading-tight">{lesson.name}</span>
                            <span className="text-[9px] text-slate-500 font-mono tracking-wider uppercase block mt-0.5">{lesson.category}</span>
                          </div>
                        </div>
                        {isDone && (
                          <span className="text-[10px] font-bold bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/10">
                            Completo
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Exercises Score Panel */}
                <div className="p-4 bg-slate-950 border border-white/5 rounded-2xl flex justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-amber-400/10 border border-amber-400/20 text-amber-400 rounded-xl">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-white font-bold text-xs sm:text-sm block">Seu Desafio Teórico (Quiz)</span>
                      <span className="text-[10px] text-slate-500">Avaliação do seu aproveitamento</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 block font-mono">Melhor Nota</span>
                    <span className="text-sm font-bold text-amber-400 font-mono">
                      {quizHighScore > 0 ? `${quizHighScore} / 5` : 'Não realizado'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Free Certificate Generator */}
              <div className="lg:col-span-6 space-y-6">
                <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between">
                  
                  <div>
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
                      <Sparkles className="w-4 h-4" /> Geração de Documento Oficial
                    </div>
                    <h3 className="font-display font-extrabold text-xl text-white mb-2">
                      Certificado de Conclusão (60 Horas)
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed mb-6">
                      Seu esforço e dedicação merecem um reconhecimento formal. Assim que marcar <strong>pelo menos 6 de 12 módulos</strong>, seu certificado será liberado para geração em alta resolução 100% gratuito.
                    </p>

                    {/* Certificate Preview Frame */}
                    <div className="relative border border-amber-500/20 rounded-2xl p-6 bg-slate-950 font-serif leading-relaxed text-center overflow-hidden" id="certificate-preview-printable">
                      {/* Watermark Logo Background */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-5 select-none pointer-events-none">
                        <span className="text-9xl font-sans">DNA</span>
                      </div>

                      {/* Certificate Golden borders */}
                      <div className="absolute inset-2 border border-dashed border-amber-500/30 rounded-xl pointer-events-none" />

                      {/* Content */}
                      <div className="space-y-4 relative z-10 pt-2">
                        <span className="text-[10px] uppercase font-sans font-bold tracking-[0.25em] text-amber-500 block">
                          Certificado de Conclusão de Estudos
                        </span>

                        <h4 className="font-display font-black text-white text-base sm:text-lg tracking-wide uppercase">
                          DNA da Música
                        </h4>

                        <p className="text-[9px] text-slate-400 font-sans leading-relaxed max-w-sm mx-auto">
                          Certificamos para os devidos fins de formação técnica de livre currículo acadêmico que:
                        </p>

                        <div className="py-2 border-b border-white/5 max-w-xs mx-auto">
                          {isCertificateUnlocked ? (
                            <input
                              type="text"
                              value={certificateName}
                              onChange={(e) => setCertificateName(e.target.value)}
                              placeholder="Nome no Certificado"
                              className="w-full text-center bg-transparent border-none text-white font-serif font-black text-sm focus:outline-none placeholder-slate-700 font-bold"
                              id="input-certificate-name"
                            />
                          ) : (
                            <span className="text-slate-600 font-sans italic text-xs block">
                              Nome do Aluno (Bloqueado)
                            </span>
                          )}
                        </div>

                        <p className="text-[9px] text-slate-400 font-sans leading-relaxed max-w-xs mx-auto">
                          concluiu com êxito todas as etapas de estudos teórico-práticos integrados em nossa pauta interativa de teclado, partitura, ritmos e harmonia, perfazendo carga horária estimada de <strong>60 horas</strong> curriculares.
                        </p>

                        {/* Signatures */}
                        <div className="flex justify-around pt-4 font-sans text-[7px] text-slate-500">
                          <div className="text-center">
                            <span className="border-t border-white/10 pt-1 block">Silas Prado</span>
                            <span className="text-[6px] block mt-0.5">Fundador DNA da Música</span>
                          </div>
                          <div className="text-center">
                            <span className="border-t border-white/10 pt-1 block">Código Hash Unificado</span>
                            <span className="text-[6px] block mt-0.5">DNA-VERIFY-{Math.floor(Math.random() * 90000) + 10000}</span>
                          </div>
                        </div>
                      </div>

                      {/* Lock overlay if not unlocked */}
                      {!isCertificateUnlocked && (
                        <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-xs flex flex-col items-center justify-center space-y-3 z-20">
                          <div className="bg-slate-900 border border-white/5 text-amber-500 p-3 rounded-2xl">
                            <Lock className="w-6 h-6" />
                          </div>
                          <div className="text-center">
                            <span className="text-xs font-bold text-white block">Certificado Bloqueado</span>
                            <p className="text-[10px] text-slate-400 max-w-[200px] mt-1 mx-auto leading-normal">
                              Marque mais {6 - completedCount} tópicos como concluídos no painel lateral para liberar!
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-6 border-t border-white/5 mt-6">
                    <button
                      onClick={handlePrintCertificate}
                      disabled={!isCertificateUnlocked}
                      className={`w-full py-3.5 rounded-xl font-display font-black text-xs sm:text-sm tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        isCertificateUnlocked
                          ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-[1.01]'
                          : 'bg-slate-950 text-slate-600 border border-white/5 cursor-not-allowed'
                      }`}
                      id="btn-print-members-certificate"
                    >
                      <Printer className="w-4.5 h-4.5" />
                      Imprimir Certificado de Conclusão (PDF)
                    </button>
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
