import { useState, useEffect } from 'react';
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
