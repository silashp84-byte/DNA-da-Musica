import { useState } from 'react';
import { motion } from 'motion/react';
import { Download, FileText, Printer, Sparkles, Check, ChevronRight } from 'lucide-react';

export default function Downloads() {
  const [printing, setPrinting] = useState(false);

  const handlePrintCheatSheet = () => {
    setPrinting(true);
    setTimeout(() => {
      window.print();
      setPrinting(false);
    }, 500);
  };

  const downloadsList = [
    {
      title: 'Guia Visual das Escalas Diatônicas',
      format: 'PDF • 14 MB',
      description: 'Mapa colorido contendo as dedilhadas e fórmulas de todas as escalas maiores e menores naturais.',
      premium: false,
    },
    {
      title: 'Dicionário de Acordes de Teclado & Piano',
      format: 'PDF • 22 MB',
      description: 'Mais de 150 diagramas de acordes básicos e avançados com cifras e inversões.',
      premium: true,
    },
    {
      title: 'Caderno de Partituras em Branco (Pronto para Imprimir)',
      format: 'PDF • 3 MB',
      description: 'Páginas pautadas limpas em formato A4 para você rascunhar suas composições.',
      premium: true,
    },
  ];

  return (
    <section id="downloads" className="py-24 bg-slate-900 border-t border-slate-950 relative">
      <div className="absolute top-1/2 left-0 w-[200px] h-[200px] bg-indigo-500/5 rounded-full blur-[80px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 bg-amber-400/10 border border-amber-400/20 text-amber-400 font-semibold text-xs tracking-wide uppercase rounded-full mb-3">
            Recursos de Apoio
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            Área de <span className="text-amber-400">Downloads e Apoio</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Leve seus estudos com você para qualquer lugar. Baixe nossos guias visuais e apostilas oficiais preparados para acelerar sua leitura musical.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* List of Attachments (Left) */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="font-display font-extrabold text-2xl text-white mb-6">Apostilas Disponíveis</h3>
            
            {downloadsList.map((item, idx) => (
              <div 
                key={idx}
                className="p-5 bg-slate-950 border border-slate-850 rounded-2xl flex justify-between items-start gap-4 hover:border-slate-800 transition-all"
                id={`download-card-${idx}`}
              >
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-amber-400">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-white font-bold text-sm sm:text-base">{item.title}</h4>
                    {item.premium ? (
                      <span className="text-[9px] font-bold bg-amber-400/10 text-amber-400 border border-amber-400/20 px-2 py-0.5 rounded-full uppercase">
                        👑 Premium
                      </span>
                    ) : (
                      <span className="text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase">
                        ✓ Grátis
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono block mt-1">{item.format}</span>
                  <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">{item.description}</p>
                </div>

                <button 
                  onClick={() => alert(item.premium ? 'Este arquivo requer a licença vitalícia DNA da Música Premium. Clique em Garantir Licença para liberar!' : 'Baixando seu PDF de estudos simulado...')}
                  className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                    item.premium 
                      ? 'bg-amber-400 border-amber-400 text-slate-950 hover:bg-amber-500' 
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                  id={`btn-download-${idx}`}
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Interactive Printable Pocket Cheatsheet (Right) */}
          <div className="lg:col-span-6">
            <div className="bg-slate-950 border border-slate-850 p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between h-full min-h-[460px]">
              <div>
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-3">
                  <Sparkles className="w-4 h-4" /> Exclusividade do Aluno
                </div>

                <h3 className="font-display font-extrabold text-2xl text-white mb-2">
                  Gerador de Guia de Consulta Rápida
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                  Precisa de uma "cola" visual na cabeceira do seu instrumento? Nós preparamos um infográfico limpo otimizado para impressão. Clique no botão abaixo para imprimir ou salvar como PDF.
                </p>

                {/* Simulated preview image sheet */}
                <div className="bg-slate-900 border border-slate-850 p-5 rounded-2xl space-y-4 font-mono text-[10px] text-slate-400 leading-normal max-h-56 overflow-y-auto" id="cheatsheet-preview">
                  <div className="text-center border-b border-slate-800 pb-3 mb-2">
                    <span className="font-display font-bold text-white text-xs block">DNA DA MÚSICA - GUIA DE CONSULTA RÁPIDA</span>
                    <span className="text-[8px] text-slate-500 block">IMPRESSÃO EM FORMATO A4 RECOMENDADA</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-white font-bold block mb-1">🎹 CIFRAS UNIVERSAIS:</span>
                      <div>C = Dó • D = Ré • E = Mi</div>
                      <div>F = Fá • G = Sol • A = Lá</div>
                      <div>B = Si</div>
                    </div>
                    <div>
                      <span className="text-white font-bold block mb-1">🎼 CLAVE DE SOL (Linhas):</span>
                      <div>1ª: Mi (E4) • 2ª: Sol (G4)</div>
                      <div>3ª: Si (B4) • 4ª: Ré (D5)</div>
                      <div>5ª: Fá (F5)</div>
                    </div>
                  </div>

                  <div className="border-t border-slate-800 pt-3">
                    <span className="text-white font-bold block mb-1">⏱️ FIGURAS RÍTMICAS:</span>
                    <div>𝅝 Semibreve (4T) • 𝅗𝅥 Mínima (2T)</div>
                    <div>𝅘𝅥 Semínima (1T) • 𝅘𝅥𝅮 Colcheia (0.5T)</div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-850 mt-6">
                <button
                  onClick={handlePrintCheatSheet}
                  disabled={printing}
                  className="w-full py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-display font-black rounded-xl hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
                  id="btn-print-cheatsheet"
                >
                  <Printer className="w-5 h-5" />
                  {printing ? 'Enviando para impressora...' : 'Imprimir / Salvar PDF de Consulta'}
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
