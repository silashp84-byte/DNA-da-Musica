import { useState } from 'react';
import { motion } from 'motion/react';
import { MUSICAL_NOTES, MusicalNote } from '../types';
import { playNote } from '../utils/audio';
import { Music, Activity, Volume2, Sparkles } from 'lucide-react';

export default function NotasMusicais() {
  const [hoveredNote, setHoveredNote] = useState<MusicalNote | null>(null);
  const [activeNote, setActiveNote] = useState<string | null>(null);

  const handlePlayKey = async (note: MusicalNote) => {
    setActiveNote(note.name);
    await playNote(note.frequency, 0.5, 'sine');
    setActiveNote(null);
  };

  return (
    <section id="notas" className="py-24 bg-slate-950 border-t border-white/5 relative">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-3">
            🎯 Fundamentos Práticos
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            As <span className="text-indigo-400">Notas Musicais</span> & O Teclado
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            No sistema ocidental de música temperada, dividimos a oitava em <span className="text-white font-semibold">12 notas</span>: 7 notas naturais e 5 notas acidentadas (sustenidos/bémóis). Veja como elas são organizadas fisicamente.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Information & Theory Panel (Left) */}
          <div className="lg:col-span-4 bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-xl text-white mb-4">
                Como as Notas se Organizam?
              </h3>
              
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <p>
                  As notas <strong className="text-white">Naturais</strong> (Dó, Ré, Mi, Fá, Sol, Lá, Si) são as teclas brancas do piano. Elas formam a base acústica fundamental.
                </p>
                <p>
                  As notas com <strong className="text-indigo-400">Acidentes</strong> carregam o sinal de sustenido (#) e correspondem às teclas pretas. Elas representam alterações de meio tom (semitom) acima da nota natural.
                </p>
                <p className="bg-slate-950 p-4 rounded-xl border border-white/5 text-xs text-slate-400 leading-relaxed font-mono">
                  💡 <strong>Curiosidade:</strong> A distância entre qualquer tecla vizinha imediata (branca para preta, ou branca para branca quando não há preta) é de exatamente <strong>1 Semitom</strong>. Duas teclas vizinhas brancas separadas por uma preta têm a distância de <strong>1 Tom inteiro</strong>.
                </p>
              </div>
            </div>

            {/* Selected Note Live Stats */}
            <div className="mt-8 pt-6 border-t border-white/5">
              <span className="text-slate-500 text-xs uppercase font-bold tracking-wider block mb-2">
                Inspetor de Notas Ativo
              </span>
              {hoveredNote ? (
                <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/20 flex justify-between items-center animate-fadeIn" id="note-inspector">
                  <div>
                    <span className="text-2xl font-display font-extrabold text-white block">{hoveredNote.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">Cifragem Americana: {hoveredNote.enName}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs text-indigo-400 font-bold block">{hoveredNote.frequency.toFixed(2)} Hz</span>
                    <span className="text-[10px] text-slate-500">Frequência Física</span>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-950/40 p-4 rounded-xl border border-white/5 text-center text-xs text-slate-500 italic py-6">
                  Passe o mouse ou toque em uma tecla do piano para inspecionar
                </div>
              )}
            </div>
          </div>

          {/* Interactive Keyboard & Showcase (Right) */}
          <div className="lg:col-span-8 bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-display font-bold text-lg text-white">
                  Teclado Musical Interativo (Oitava Central)
                </h3>
                <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" /> Áudio Ativo
                </span>
              </div>

              <p className="text-xs text-slate-400 mb-8">
                Clique nas teclas para ouvir o timbre puro das ondas senoidais. Toque as notas sequencialmente para perceber a progressão matemática da frequência.
              </p>

              {/* The Piano Container */}
              <div className="relative flex justify-center pb-4 select-none" id="piano-keyboard-container">
                <div className="relative border border-slate-800 rounded-lg overflow-hidden bg-slate-900 shadow-2xl p-2 w-full max-w-xl">
                  <div className="relative flex w-full">
                    
                    {/* White Keys */}
                    {MUSICAL_NOTES.filter(n => n.type === 'natural').map((note) => {
                      const isNoteActive = activeNote === note.name;
                      return (
                        <button
                          key={note.name}
                          onMouseEnter={() => setHoveredNote(note)}
                          onMouseLeave={() => setHoveredNote(null)}
                          onClick={() => handlePlayKey(note)}
                          className={`flex-1 h-36 sm:h-44 rounded-b-md transition-all relative flex flex-col justify-end pb-3 items-center text-xs font-bold border-r border-slate-200/20 last:border-0 cursor-pointer ${
                            isNoteActive
                              ? 'bg-gradient-to-t from-indigo-500 to-indigo-400 text-white translate-y-0.5 shadow-inner'
                              : 'bg-white text-slate-900 hover:bg-slate-100'
                          }`}
                          style={{ zIndex: 1 }}
                          id={`piano-key-${note.name}`}
                        >
                          <span className="text-[10px] sm:text-xs">{note.name}</span>
                          <span className="text-[8px] opacity-60 font-mono mt-0.5">{note.enName}</span>
                        </button>
                      );
                    })}

                    {/* Black Keys (Overlayed absolute positioned elements relative to the white keys container) */}
                    {/* C# / Db */}
                    <div className="absolute left-[8.75%] top-0 w-[7.5%] h-24 sm:h-28 z-10">
                      {(() => {
                        const note = MUSICAL_NOTES.find(n => n.name === 'Dó#')!;
                        const isNoteActive = activeNote === note?.name;
                        return note ? (
                          <button
                            onMouseEnter={() => setHoveredNote(note)}
                            onMouseLeave={() => setHoveredNote(null)}
                            onClick={() => handlePlayKey(note)}
                            className={`w-full h-full rounded-b-sm border border-black/80 shadow-md transition-all flex flex-col justify-end pb-2 items-center text-[8px] font-mono font-extrabold cursor-pointer ${
                              isNoteActive
                                ? 'bg-indigo-600 text-white translate-y-0.5 shadow-inner'
                                : 'bg-slate-950 text-slate-400 hover:bg-slate-800'
                            }`}
                            id={`piano-key-sharp-c`}
                          >
                            <span>C#</span>
                          </button>
                        ) : null;
                      })()}
                    </div>

                    {/* D# / Eb */}
                    <div className="absolute left-[21.25%] top-0 w-[7.5%] h-24 sm:h-28 z-10">
                      {(() => {
                        const note = MUSICAL_NOTES.find(n => n.name === 'Ré#')!;
                        const isNoteActive = activeNote === note?.name;
                        return note ? (
                          <button
                            onMouseEnter={() => setHoveredNote(note)}
                            onMouseLeave={() => setHoveredNote(null)}
                            onClick={() => handlePlayKey(note)}
                            className={`w-full h-full rounded-b-sm border border-black/80 shadow-md transition-all flex flex-col justify-end pb-2 items-center text-[8px] font-mono font-extrabold cursor-pointer ${
                              isNoteActive
                                ? 'bg-indigo-600 text-white translate-y-0.5 shadow-inner'
                                : 'bg-slate-950 text-slate-400 hover:bg-slate-800'
                            }`}
                            id={`piano-key-sharp-d`}
                          >
                            <span>D#</span>
                          </button>
                        ) : null;
                      })()}
                    </div>

                    {/* F# / Gb */}
                    <div className="absolute left-[46.25%] top-0 w-[7.5%] h-24 sm:h-28 z-10">
                      {(() => {
                        const note = MUSICAL_NOTES.find(n => n.name === 'Fá#')!;
                        const isNoteActive = activeNote === note?.name;
                        return note ? (
                          <button
                            onMouseEnter={() => setHoveredNote(note)}
                            onMouseLeave={() => setHoveredNote(null)}
                            onClick={() => handlePlayKey(note)}
                            className={`w-full h-full rounded-b-sm border border-black/80 shadow-md transition-all flex flex-col justify-end pb-2 items-center text-[8px] font-mono font-extrabold cursor-pointer ${
                              isNoteActive
                                ? 'bg-indigo-600 text-white translate-y-0.5 shadow-inner'
                                : 'bg-slate-950 text-slate-400 hover:bg-slate-800'
                            }`}
                            id={`piano-key-sharp-f`}
                          >
                            <span>F#</span>
                          </button>
                        ) : null;
                      })()}
                    </div>

                    {/* G# / Ab */}
                    <div className="absolute left-[58.75%] top-0 w-[7.5%] h-24 sm:h-28 z-10">
                      {(() => {
                        const note = MUSICAL_NOTES.find(n => n.name === 'Sol#')!;
                        const isNoteActive = activeNote === note?.name;
                        return note ? (
                          <button
                            onMouseEnter={() => setHoveredNote(note)}
                            onMouseLeave={() => setHoveredNote(null)}
                            onClick={() => handlePlayKey(note)}
                            className={`w-full h-full rounded-b-sm border border-black/80 shadow-md transition-all flex flex-col justify-end pb-2 items-center text-[8px] font-mono font-extrabold cursor-pointer ${
                              isNoteActive
                                ? 'bg-indigo-600 text-white translate-y-0.5 shadow-inner'
                                : 'bg-slate-950 text-slate-400 hover:bg-slate-800'
                            }`}
                            id={`piano-key-sharp-g`}
                          >
                            <span>G#</span>
                          </button>
                        ) : null;
                      })()}
                    </div>

                    {/* A# / Bb */}
                    <div className="absolute left-[71.25%] top-0 w-[7.5%] h-24 sm:h-28 z-10">
                      {(() => {
                        const note = MUSICAL_NOTES.find(n => n.name === 'Lá#')!;
                        const isNoteActive = activeNote === note?.name;
                        return note ? (
                          <button
                            onMouseEnter={() => setHoveredNote(note)}
                            onMouseLeave={() => setHoveredNote(null)}
                            onClick={() => handlePlayKey(note)}
                            className={`w-full h-full rounded-b-sm border border-black/80 shadow-md transition-all flex flex-col justify-end pb-2 items-center text-[8px] font-mono font-extrabold cursor-pointer ${
                              isNoteActive
                                ? 'bg-indigo-600 text-white translate-y-0.5 shadow-inner'
                                : 'bg-slate-950 text-slate-400 hover:bg-slate-800'
                            }`}
                            id={`piano-key-sharp-a`}
                          >
                            <span>A#</span>
                          </button>
                        ) : null;
                      })()}
                    </div>

                  </div>
                </div>
              </div>

            </div>

            {/* Micro training guidance */}
            <div className="bg-slate-950/80 p-4 border border-white/5 rounded-xl flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <Sparkles className="w-3.5 h-3.5" /> Treino Mental Prático:
              </span>
              <span>Cante a nota "La" afinando em uníssono com o piano na frequência pura de 440Hz.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
