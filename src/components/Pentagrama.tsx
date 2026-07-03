import { useState } from 'react';
import { motion } from 'motion/react';
import { playNote } from '../utils/audio';
import { HelpCircle, Volume2, Sparkles, Compass } from 'lucide-react';

interface StaffNote {
  id: string;
  name: string;
  frequency: number;
  y: number; // Y position offset on the staff
  isLine: boolean;
  positionLabel: string;
}

export default function Pentagrama() {
  const [activeNote, setActiveNote] = useState<StaffNote | null>(null);

  // Notes on Treble Clef from E4 to F5
  const staffNotes: StaffNote[] = [
    { id: 'F5', name: 'Fá (Agudo)', frequency: 698.46, y: 15, isLine: false, positionLabel: '5º Espaço (superior)' },
    { id: 'E5', name: 'Mi (Agudo)', frequency: 659.25, y: 30, isLine: true, positionLabel: '5ª Linha' },
    { id: 'D5', name: 'Ré (Agudo)', frequency: 587.33, y: 45, isLine: false, positionLabel: '4º Espaço' },
    { id: 'C5', name: 'Dó (Agudo)', frequency: 523.25, y: 60, isLine: true, positionLabel: '4ª Linha' },
    { id: 'B4', name: 'Si', frequency: 493.88, y: 75, isLine: false, positionLabel: '3º Espaço' },
    { id: 'A4', name: 'Lá', frequency: 440.00, y: 90, isLine: true, positionLabel: '3ª Linha' },
    { id: 'G4', name: 'Sol', frequency: 392.00, y: 105, isLine: false, positionLabel: '2º Espaço' },
    { id: 'F4', name: 'Fá', frequency: 349.23, y: 120, isLine: true, positionLabel: '2ª Linha' },
    { id: 'E4', name: 'Mi', frequency: 329.63, y: 135, isLine: false, positionLabel: '1º Espaço' },
    { id: 'D4', name: 'Ré', frequency: 293.66, y: 150, isLine: true, positionLabel: '1ª Linha' },
  ];

  const handleNotePlay = async (note: StaffNote) => {
    setActiveNote(note);
    await playNote(note.frequency, 0.6, 'sine');
  };

  return (
    <section id="pentagrama" className="py-24 bg-slate-900 border-t border-white/5 relative">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[90px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-semibold text-xs tracking-wide uppercase rounded-full mb-3">
            Leitura Visual
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            O <span className="text-indigo-400">Pentagrama</span> (Pauta Musical)
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            O pentagrama é o conjunto de <span className="text-white font-semibold">5 linhas</span> e <span className="text-white font-semibold">4 espaços</span> onde escrevemos as notas. A leitura é feita sempre de baixo para cima.
          </p>
        </div>

        {/* Interactive Interactive Staff Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Theory Panel (Left) */}
          <div className="lg:col-span-4 bg-slate-950 border border-white/5 p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <h3 className="font-display font-extrabold text-xl text-white mb-4">
                Regras Universais
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <div className="flex gap-2 items-start">
                  <span className="text-amber-400">❶</span>
                  <p><strong>Linhas e Espaços:</strong> Cada linha e cada espaço representam uma nota específica. Não saltamos posições.</p>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-amber-400">❷</span>
                  <p><strong>De Baixo para Cima:</strong> A primeira linha é a de baixo, a quinta é a de cima. Notas mais baixas são mais graves; notas mais altas são mais agudas.</p>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-amber-400">❸</span>
                  <p><strong>Linhas Suplementares:</strong> Quando a música exige notas que ultrapassam os limites das 5 linhas, usamos pequenas linhas extras horizontais temporárias.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Nota Selecionada na Pauta
              </span>
              {activeNote ? (
                <div className="bg-slate-900 border border-indigo-500/20 p-4 rounded-xl flex items-center justify-between" id="staff-inspector">
                  <div>
                    <span className="text-white font-bold text-base block">{activeNote.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{activeNote.positionLabel}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-amber-400 font-mono block font-bold">{activeNote.frequency.toFixed(1)} Hz</span>
                    <span className="text-[9px] text-slate-500 font-mono">Frequência</span>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-900/40 border border-white/5 p-4 rounded-xl text-center text-xs text-slate-500 italic">
                  Inspecione clicando nas bolinhas da pauta interativa
                </div>
              )}
            </div>
          </div>

          {/* Graphical Staff (Right) */}
          <div className="lg:col-span-8 bg-slate-950 border border-white/5 p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-display font-bold text-lg text-white">
                  Simulador de Pentagrama (Pauta Ativa)
                </h3>
                <span className="text-xs text-slate-400 font-mono">Clave de Sol</span>
              </div>

              <p className="text-xs text-slate-400 mb-8 leading-relaxed">
                Clique nas notas (círculos laranjas) dispostas sobre a pauta para reproduzir seus respectivos sons e ver onde ficam localizadas na partitura.
              </p>

              {/* The SVG Staff Grid */}
              <div className="relative bg-slate-900/60 p-6 sm:p-10 rounded-2xl border border-white/5 flex items-center justify-center overflow-x-auto">
                <div className="relative min-w-[500px] w-full h-[180px]">
                  
                  {/* Clave de Sol Visual (Standard Background SVG or character) */}
                  <div className="absolute left-4 top-[35px] text-6xl sm:text-7xl select-none pointer-events-none opacity-80 text-white font-serif font-light">
                    🎼
                  </div>

                  {/* 5 Lines of staff */}
                  <div className="absolute inset-x-0 top-[30px] h-[1px] bg-slate-700" />
                  <div className="absolute inset-x-0 top-[60px] h-[1px] bg-slate-700" />
                  <div className="absolute inset-x-0 top-[90px] h-[1px] bg-slate-700" />
                  <div className="absolute inset-x-0 top-[120px] h-[1px] bg-slate-700" />
                  <div className="absolute inset-x-0 top-[150px] h-[1px] bg-slate-700" />

                  {/* Lines Labels (1 to 5) */}
                  <div className="absolute left-0 top-[144px] text-[9px] font-mono font-bold text-slate-500">1ª Linha</div>
                  <div className="absolute left-0 top-[114px] text-[9px] font-mono font-bold text-slate-500">2ª Linha</div>
                  <div className="absolute left-0 top-[84px] text-[9px] font-mono font-bold text-slate-500">3ª Linha</div>
                  <div className="absolute left-0 top-[54px] text-[9px] font-mono font-bold text-slate-500">4ª Linha</div>
                  <div className="absolute left-0 top-[24px] text-[9px] font-mono font-bold text-slate-500">5ª Linha</div>

                  {/* Interactive Notes Circles mapped horizontally */}
                  <div className="absolute inset-0 flex justify-around pl-16 pr-8">
                    {staffNotes.map((note, index) => {
                      const isNoteActive = activeNote?.id === note.id;
                      return (
                        <div
                          key={note.id}
                          className="relative flex flex-col items-center cursor-pointer group"
                          style={{ top: `${note.y}px` }}
                          onClick={() => handleNotePlay(note)}
                          id={`staff-note-node-${note.id}`}
                        >
                          {/* Note circle head */}
                          <div
                            className={`w-6 h-4 sm:w-7 sm:h-5 rounded-full rotate-[-15deg] transition-all relative flex items-center justify-center border ${
                              isNoteActive
                                ? 'bg-indigo-400 border-indigo-300 shadow-[0_0_15px_rgba(129,140,248,0.6)] scale-110'
                                : 'bg-amber-400 border-amber-300 hover:bg-amber-300'
                            }`}
                          >
                            {/* Stem */}
                            <div className="absolute right-0 bottom-1 w-[1.5px] h-10 bg-slate-400 group-hover:bg-slate-300 origin-bottom" />
                          </div>

                          {/* Note Label floating above/under */}
                          <span className="absolute top-6 font-mono text-[9px] font-bold text-slate-400 group-hover:text-white transition-colors bg-slate-950/80 px-1 rounded">
                            {note.name.split(' ')[0]}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                </div>
              </div>

            </div>

            {/* Hint */}
            <div className="mt-6 flex items-center gap-2 text-xs text-slate-400">
              <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Experimente ler de baixo para cima: <strong>Dó, Ré, Mi, Fá, Sol, Lá, Si, Dó, Ré, Mi, Fá...</strong> Veja como a altura do som acompanha perfeitamente a posição do círculo na partitura!</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
