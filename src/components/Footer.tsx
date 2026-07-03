import { useEffect, useState } from 'react';
import { Music, ShieldCheck, HeartHandshake, Award } from 'lucide-react';

export default function Footer() {
  const [onlineStudents, setOnlineStudents] = useState(1492);

  useEffect(() => {
    // Softly oscillate online students to make the app feel alive
    const interval = setInterval(() => {
      setOnlineStudents((prev) => {
        const offset = Math.floor(Math.random() * 5) - 2; // -2 to +2
        return prev + offset;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-slate-950 border-t border-white/5 relative py-12 text-slate-400" id="main-footer">
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-amber-400 via-indigo-500 to-purple-600" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Area */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/5 items-center">
          
          {/* Logo Brand */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            <div className="flex items-center gap-2 cursor-pointer" onClick={handleScrollToTop} id="footer-logo">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg text-white font-bold tracking-tighter italic">
                DNA
              </div>
              <span className="font-display font-black text-xl tracking-tight text-white uppercase">
                DNA da Música
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Uma plataforma de ensino inovadora criada por e para músicos. Transformamos teorias complexas em experiências interativas sensoriais.
            </p>
          </div>

          {/* Quick value props / guarantees */}
          <div className="md:col-span-7 flex flex-wrap gap-6 md:gap-8 justify-center md:justify-end">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>CERTIFICADO DE 60H INCLUSO</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <Award className="w-5 h-5 text-emerald-400" />
              <span>ACESSO 100% GRATUITO</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <HeartHandshake className="w-5 h-5 text-emerald-400" />
              <span>SUPORTE DIRETO DO TUTOR</span>
            </div>
          </div>

        </div>

        {/* Bottom Footer Area */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          
          {/* Rights */}
          <p className="text-slate-600 text-center sm:text-left">
            &copy; {new Date().getFullYear()} DNA da Música. Todos os direitos reservados. Projeto educativo experimental em conformidade de segurança.
          </p>

          {/* Online student indicator matching Sleek layout design guidelines */}
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium text-slate-400 font-mono">
              {onlineStudents} alunos estudando teoria agora
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
}
