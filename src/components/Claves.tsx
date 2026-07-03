import { useState } from 'react';
import { motion } from 'motion/react';
import { CLEFS, Clef } from '../types';
import { playNote } from '../utils/audio';
import { Sparkles, Music, Play, CheckCircle } from 'lucide-react';

export default function Claves() {
  const [selectedClef, setSelectedClef] = useState<Clef>(CLEFS[0]);
  const [playingClefId, setPlayingClefId] = useState<string | null>(null);

  const handlePlayClefNote = async (clef: Clef) => {
    setPlayingClefId(clef.id);
    let freq = 440; // Default
    if (clef.id === 'sol') freq = 392.00; // G4
    if (clef.id === 'fa') freq = 174.61; // F3
    if (clef.id === 'do') freq = 261.63; // C4

    await playNote(freq, 0.8, 'triangle');
    setPlayingClefId(null);
  };

  return (
    <section id="claves" className="py-24 bg-slate-950 border-t border-white/5 relative">
      <div className="absolute top-1/4 left-1/4 w-[250px] h-[250px] bg-indigo-600/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-3">
            🗝️ As Chaves da Leitura
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            As <span className="text-indigo-400">Claves</span> Musicais
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            As pautas têm apenas 5 linhas, mas a voz e os instrumentos têm centenas de notas possíveis. A <span className="text-white font-semibold">Clave</span> serve como uma âncora que determina qual nota cada linha e espaço representam.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Clefs Selection (Left) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h3 className="font-display font-extrabold text-xl text-white mb-2">
              Escolha uma Clave:
            </h3>

            {CLEFS.map((clef) => {
              const isSelected = selectedClef.id === clef.id;
              return (
                <button
                  key={clef.id}
                  onClick={() => setSelectedClef(clef)}
                  className={`p-5 rounded-2xl text-left border transition-all flex items-center justify-between cursor-pointer group ${
                    isSelected
                      ? 'bg-gradient-to-br from-indigo-950 to-slate-900 border-indigo-500 shadow-lg shadow-indigo-500/10'
                      : 'bg-slate-900/40 border-white/5 hover:bg-slate-900 hover:border-white/10'
                  }`}
                  id={`clef-card-${clef.id}`}
                >
                  <div className="flex items-center gap-4">
                    {/* Icon Circle */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-serif text-3xl shadow-inner ${
                      isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 group-hover:text-white'
                    }`}>
                      {clef.icon}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-white text-base sm:text-lg">{clef.name}</h4>
                      <p className="text-slate-400 text-xs mt-0.5">Clique para ler as propriedades</p>
                    </div>
                  </div>
                  <div className={`w-2 h-2 rounded-full transition-all ${
                    isSelected ? 'bg-indigo-400 scale-125' : 'bg-slate-800'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Clef Details Display (Right) */}
          <div className="lg:col-span-7 bg-slate-900/40 backdrop-blur-md border border-white/10 p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20 uppercase tracking-wide">
                  Dossiê Completo de Teoria
                </span>
                <span className="text-3xl font-serif text-white opacity-40">{selectedClef.icon}</span>
              </div>

              <h3 className="font-display font-black text-2xl text-white mb-4">
                {selectedClef.name}
              </h3>

              <div className="space-y-6 text-sm text-slate-300">
                <p className="leading-relaxed text-slate-200">
                  {selectedClef.description}
                </p>

                {/* Usage block */}
                <div className="bg-slate-950 p-4 border border-white/5 rounded-xl space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Instrumentos e Vozes:</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedClef.usage}
                  </p>
                </div>

                {/* Example note playback */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-white/5 bg-slate-950/40 rounded-xl">
                  <div>
                    <span className="text-xs text-slate-400 block">Nota de Referência Prática:</span>
                    <strong className="text-white text-sm font-display">{selectedClef.exampleNote}</strong>
                  </div>
                  <button
                    onClick={() => handlePlayClefNote(selectedClef)}
                    disabled={playingClefId !== null}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg shadow transition-transform active:scale-95 cursor-pointer disabled:opacity-50"
                    id={`btn-play-clef-${selectedClef.id}`}
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    {playingClefId === selectedClef.id ? 'Tocando Frequência...' : 'Tocar Som de Referência'}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 text-xs text-slate-500 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Dica: Teclados e pianistas usam a <strong>Clave de Sol</strong> para a mão direita e a <strong>Clave de Fá</strong> para a mão esquerda simultaneamente!</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
