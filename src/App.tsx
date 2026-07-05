import { useState, useEffect } from 'react';
import { Sparkles, MessageCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TeoriaMusical from './components/TeoriaMusical';
import Fundamentos from './components/Fundamentos';
import NotasMusicais from './components/NotasMusicais';
import Pentagrama from './components/Pentagrama';
import Claves from './components/Claves';
import FigurasRitmicas from './components/FigurasRitmicas';
import Intervalos from './components/Intervalos';
import Escalas from './components/Escalas';
import Exercicios from './components/Exercicios';
import Quiz from './components/Quiz';
import MembersArea from './components/MembersArea';
import Downloads from './components/Downloads';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

export interface UserSession {
  isLoggedIn: boolean;
  name: string;
  email: string;
  completedLessons: string[];
  quizHighScore: number;
}

export default function App() {
  const [session, setSession] = useState<UserSession>(() => {
    const saved = localStorage.getItem('dna_musical_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Safe fallback
      }
    }
    return {
      isLoggedIn: false,
      name: '',
      email: '',
      completedLessons: [],
      quizHighScore: 0,
    };
  });

  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Sync state changes with localStorage
  useEffect(() => {
    localStorage.setItem('dna_musical_session', JSON.stringify(session));
  }, [session]);

  const handleOpenLogin = () => {
    setIsAuthOpen(true);
  };

  const handleCloseLogin = () => {
    setIsAuthOpen(false);
  };

  const handleLogin = (name: string, email: string) => {
    setSession((prev) => ({
      ...prev,
      isLoggedIn: true,
      name: name || email.split('@')[0],
      email: email,
    }));
  };

  const handleLogout = () => {
    setSession({
      isLoggedIn: false,
      name: '',
      email: '',
      completedLessons: [],
      quizHighScore: 0,
    });
  };

  const handleToggleLesson = (lessonId: string) => {
    setSession((prev) => {
      const isCompleted = prev.completedLessons.includes(lessonId);
      const updatedLessons = isCompleted
        ? prev.completedLessons.filter((id) => id !== lessonId)
        : [...prev.completedLessons, lessonId];
      
      return {
        ...prev,
        completedLessons: updatedLessons,
      };
    });
  };

  const handleSaveQuizScore = (score: number) => {
    setSession((prev) => {
      const currentHighScore = prev.quizHighScore;
      return {
        ...prev,
        quizHighScore: Math.max(currentHighScore, score),
        // Mark the quiz lesson as completed automatically if they finished it!
        completedLessons: prev.completedLessons.includes('quiz')
          ? prev.completedLessons
          : [...prev.completedLessons, 'quiz'],
      };
    });
  };

  const handleStartTour = () => {
    if (!session.isLoggedIn) {
      handleOpenLogin();
      return;
    }
    const element = document.getElementById('teoria');
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-200 overflow-x-hidden selection:bg-indigo-500 selection:text-white" id="app-root-container">
      
      {/* Sleek Design Theme Ambient Glow Background Circles */}
      <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Glassmorphism Fixed Header / Navbar */}
      <Navbar 
        onOpenLogin={handleOpenLogin} 
        isLoggedIn={session.isLoggedIn}
        userName={session.name}
        onLogout={handleLogout}
      />

      {/* Main progress sequence requested by the user */}
      <main className="relative">
        {/* 1. Hero */}
        <Hero 
          onOpenLogin={handleOpenLogin} 
          onStartTour={handleStartTour} 
          isLoggedIn={session.isLoggedIn}
          userName={session.name}
        />

        {session.isLoggedIn ? (
          <>
            {/* WhatsApp Group Banner - Before Teoria Musical */}
            <section className="py-10 bg-slate-950 border-b border-white/5 relative overflow-hidden" id="whatsapp-banner-section">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[150px] bg-emerald-600/5 rounded-full blur-[80px] pointer-events-none" />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="bg-gradient-to-r from-emerald-600/10 to-teal-600/10 border border-emerald-500/20 p-6 sm:p-8 rounded-3xl flex flex-col lg:flex-row justify-between items-center gap-6 shadow-xl">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">
                    <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-2xl flex-shrink-0">
                      <MessageCircle className="w-8 h-8 animate-pulse" />
                    </div>
                    <div>
                      <div className="flex items-center justify-center md:justify-start gap-2 mb-1.5">
                        <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
                          Grupo VIP Exclusivo
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        <span className="text-[10px] font-bold text-emerald-400">Comunidade Ativa</span>
                      </div>
                      <h3 className="font-display font-black text-xl text-white">
                        Grupo Oficial de Alunos no WhatsApp
                      </h3>
                      <p className="text-slate-400 text-sm max-w-2xl leading-relaxed mt-1">
                        Não estude sozinho! Clique no botão ao lado para entrar no nosso grupo oficial, tirar dúvidas diretamente com o <strong className="text-amber-400">Silas Prado</strong>, compartilhar seus treinos de teclado virtual e interagir com centenas de outros estudantes.
                      </p>
                    </div>
                  </div>
                  <a
                    href="https://chat.whatsapp.com/HUz9JeJhWWS0wjWdG2pKsL"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full lg:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-display font-black px-8 py-4 rounded-xl transition-all hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:scale-[1.03] cursor-pointer text-sm sm:text-base text-center flex items-center justify-center gap-2 flex-shrink-0 font-bold"
                    id="btn-whatsapp-group-top"
                  >
                    <MessageCircle className="w-5 h-5 fill-slate-950" />
                    Entrar no Grupo de WhatsApp
                  </a>
                </div>
              </div>
            </section>

            {/* 2. O que é Teoria Musical */}
            <TeoriaMusical />

            {/* 3. Primeiros Fundamentos */}
            <Fundamentos />

            {/* 4. Notas Musicais */}
            <NotasMusicais />

            {/* 5. Pentagrama */}
            <Pentagrama />

            {/* 6. Claves */}
            <Claves />

            {/* 7. Figuras Rítmicas */}
            <FigurasRitmicas />

            {/* 8. Intervalos */}
            <Intervalos />

            {/* 9. Escalas */}
            <Escalas />

            {/* 10. Exercícios Interativos */}
            <Exercicios />

            {/* 11. Quiz */}
            <Quiz 
              onOpenLogin={handleOpenLogin} 
              onSaveScore={handleSaveQuizScore}
              isLoggedIn={session.isLoggedIn}
            />
          </>
        ) : (
          /* Locked Content Preview/Callout Section */
          <section className="py-20 bg-slate-900/20 border-t border-b border-white/5 relative" id="content-locked-preview">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
              <div className="inline-flex p-3.5 bg-indigo-500/10 text-indigo-400 rounded-2xl border border-indigo-500/20 animate-pulse">
                <Sparkles className="w-8 h-8" />
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
                Conteúdo Teórico & Simuladores Interativos
              </h2>
              <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                As lições dinâmicas de notas, o piano virtual interativo, simuladores de figuras rítmicas e claves, treinos auditivos avançados e o quiz de certificação estão ocultos para visitantes. 
                Crie sua conta gratuita em poucos cliques para liberar imediatamente todo o conteúdo passo a passo.
              </p>
              <div>
                <button
                  onClick={handleOpenLogin}
                  className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-display font-black px-8 py-4 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-[1.01] cursor-pointer text-sm font-bold"
                  id="btn-locked-preview-unlock"
                >
                  Cadastrar-se Gratuitamente & Liberar Aulas
                </button>
              </div>
            </div>
          </section>
        )}

        {/* 12. Área de Membros Dashboard */}
        <MembersArea 
          isLoggedIn={session.isLoggedIn}
          userName={session.name}
          userEmail={session.email}
          completedLessons={session.completedLessons}
          quizHighScore={session.quizHighScore}
          onOpenLogin={handleOpenLogin}
          onLogout={handleLogout}
          onToggleLesson={handleToggleLesson}
        />

        {/* 13. Área de Download (PDFs) */}
        <Downloads 
          isLoggedIn={session.isLoggedIn}
          onOpenLogin={handleOpenLogin}
        />
      </main>

      {/* 14. Rodapé */}
      <Footer />

      {/* Authentication and Registration Modal Dialog */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={handleCloseLogin} 
        onLogin={handleLogin}
      />

    </div>
  );
}
