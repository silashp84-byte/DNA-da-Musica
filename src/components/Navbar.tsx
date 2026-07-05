import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Menu, X, Sparkles, Award, User, LogOut } from 'lucide-react';

interface NavbarProps {
  onOpenLogin: () => void;
  isLoggedIn: boolean;
  userName: string;
  onLogout: () => void;
}

export default function Navbar({ onOpenLogin, isLoggedIn, userName, onLogout }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = isLoggedIn
    ? [
        { id: 'teoria', name: 'Teoria' },
        { id: 'fundamentos', name: 'Fundamentos' },
        { id: 'notas', name: 'Notas' },
        { id: 'pentagrama', name: 'Pentagrama' },
        { id: 'figuras', name: 'Ritmo' },
        { id: 'escalas', name: 'Escalas' },
        { id: 'exercicios', name: 'Exercícios' },
        { id: 'quiz', name: 'Desafio' },
        { id: 'members-dashboard', name: 'Área de Membros' },
      ]
    : [
        { id: 'hero', name: 'Início' },
        { id: 'members-dashboard', name: 'Área de Membros' },
        { id: 'downloads', name: 'Downloads' },
      ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = ['hero', 'teoria', 'fundamentos', 'notas', 'pentagrama', 'figuras', 'escalas', 'exercicios', 'quiz', 'members-dashboard'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
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
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass-nav py-3 shadow-lg' : 'bg-transparent py-5'
        }`}
        id="navbar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => handleNavClick('hero')}
              id="nav-logo"
            >
              <div className="bg-indigo-500 p-2 rounded-lg text-white shadow-md group-hover:scale-105 transition-transform">
                <Music className="w-5 h-5" />
              </div>
              <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-amber-400 via-amber-200 to-indigo-400 bg-clip-text text-transparent">
                DNA da Música
              </span>
            </div>

            {/* Desktop Nav Items */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                    activeSection === item.id
                      ? 'text-indigo-400 bg-indigo-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                  id={`nav-link-${item.id}`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Premium CTA Button changed to Members login / status */}
            <div className="hidden sm:flex items-center gap-4">
              {isLoggedIn ? (
                <div className="flex items-center gap-3 bg-slate-900/80 border border-white/5 px-4 py-2 rounded-full">
                  <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] text-white font-bold">
                    {userName ? userName.charAt(0).toUpperCase() : <User className="w-3.5 h-3.5" />}
                  </div>
                  <span className="text-slate-300 text-xs font-semibold">
                    Olá, <span className="text-amber-400 font-extrabold">{userName}</span>!
                  </span>
                  <div className="w-[1px] h-3 bg-white/10" />
                  <button
                    onClick={() => handleNavClick('members-dashboard')}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-bold transition-colors cursor-pointer"
                  >
                    Painel
                  </button>
                  <div className="w-[1px] h-3 bg-white/10" />
                  <button
                    onClick={onLogout}
                    className="text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                    title="Sair da Conta"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={onOpenLogin}
                  className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-display font-bold px-5 py-2.5 rounded-full hover:shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all duration-300 hover:scale-[1.03] text-sm cursor-pointer"
                  id="btn-nav-premium"
                >
                  <Sparkles className="w-4 h-4" />
                  Área de Membros Grátis
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Toggle Menu"
                id="btn-mobile-menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden glass-nav border-t border-white/5 mt-3 absolute top-full left-0 right-0 shadow-2xl"
              id="mobile-nav-drawer"
            >
              <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`block w-full text-left px-3 py-3 rounded-md text-base font-semibold cursor-pointer ${
                      activeSection === item.id
                        ? 'text-indigo-400 bg-indigo-500/10'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                    id={`mobile-nav-link-${item.id}`}
                  >
                    {item.name}
                  </button>
                ))}
                <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
                  {isLoggedIn ? (
                    <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-white/5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center text-xs text-white font-bold">
                          {userName ? userName.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                        </div>
                        <span className="text-slate-300 text-sm font-semibold">
                          Entrou como: <strong className="text-amber-400">{userName}</strong>
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          handleNavClick('members-dashboard');
                        }}
                        className="w-full bg-indigo-600 text-white font-display font-bold py-2.5 rounded-lg text-center text-sm cursor-pointer"
                      >
                        Ir para o Meu Painel
                      </button>
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onLogout();
                        }}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white py-2 rounded-lg text-center text-xs cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sair da Conta
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenLogin();
                      }}
                      className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-display font-bold py-3 rounded-lg hover:shadow-lg transition-transform active:scale-95 cursor-pointer text-sm"
                      id="btn-mobile-nav-premium"
                    >
                      <Award className="w-5 h-5" />
                      Cadastrar-se Grátis
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
