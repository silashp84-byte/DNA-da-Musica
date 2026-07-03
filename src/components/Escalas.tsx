import { useState } from 'react';
import { motion } from 'motion/react';
import { SCALES, Scale } from '../types';
import { playScaleSequence } from '../utils/audio';
import { Sparkles, PlayCircle, HelpCircle, Activity, Music } from 'lucide-react';

export default function Escalas() {
  const [selectedScale, setSelectedScale] = useState<Scale>(SCALES[0]); // default to Major
  const [rootNote, setRootNote] = useState({ name: 'Dó', freq: 261.63 });
  const [isPlayingScale, setIsPlayingScale] = useState(false);

  // Available Root Notes for Scale Demonstration
  const roots = [
    { name: 'Dó (C)', freq: 261.63 },
    { name: 'Ré (D)', freq: 293.66 },
    { name: 'Mi (E)', freq: 329.63 },
    { name: 'Fá (F)', freq: 349.23 },
    { name: 'Sol (G)', freq: 392.00 },
    { name: 'Lá (A)', freq: 440.00 },
    { name: 'Si (B)', freq: 493.88 },
  ];

  const handlePlayScale = async () => {
    setIsPlayingScale(true);

    // Generate frequencies based on selected scale intervals and root note
    const scaleFrequencies = selectedScale.intervals.map((semitones) => {
      // ratio calculation: freq * 2^(semitones / 12)
      return rootNote.freq * Math.pow(2, semitones / 12);
    });

    // Play sequentially
    await playScaleSequence(scaleFrequencies, 350);
    setIsPlayingScale(false);
  };

  return (
    <section id="escalas" className="py-24 bg-slate-900 border-t border-white/5 relative">
      <div className="absolute top-1/4 right-0 w-[200px] h-[200px] bg-indigo-500/5 rounded-full blur-[80px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-semibold text-xs tracking-wide uppercase rounded-full mb-3">
            🧪 A Cor da Música
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            As <span className="text-indigo-400">Escalas Musicais</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Se as notas são as letras, as escalas são o vocabulário. Uma escala é uma sequência de notas organizadas que criam a <span className="text-white font-semibold">paleta de emoções</span> de uma composição.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Scale selection & Formula details (Left) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h3 className="font-display font-bold text-lg text-white mb-2">
              Escolha uma Escala e Tom:
            </h3>

            {/* Root Note Selector Row */}
            <div className="bg-slate-950 p-4 rounded-xl border border-white/5 space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Nota Tônica (Fundamental):</span>
              <div className="flex gap-1 overflow-x-auto pb-1" id="scale-roots-selector">
                {roots.map((root) => (
                  <button
                    key={root.name}
                    onClick={() => setRootNote(root)}
                    className={`flex-1 min-w-[50px] py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      rootNote.name === root.name
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-850'
                    }`}
                    id={`scale-root-btn-${root.name}`}
                  >
                    {root.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Scale Formula Selector Cards */}
            <div className="space-y-2">
              {SCALES.map((scale) => {
                const isSelected = selectedScale.id === scale.id;
                return (
                  <button
                    key={scale.id}
                    onClick={() => setSelectedScale(scale)}
                    className={`w-full p-4 rounded-xl text-left border transition-all flex justify-between items-center cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600/10 border-indigo-500'
                        : 'bg-slate-950 border-white/5 hover:bg-slate-900'
                    }`}
                    id={`scale-formula-btn-${scale.id}`}
                  >
                    <div>
                      <h4 className="text-white font-bold text-xs sm:text-sm">{scale.name}</h4>
                      <p className="text-[10px] text-slate-400 mt-1 truncate max-w-[240px] sm:max-w-xs">{scale.formula}</p>
                    </div>
                    <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${
                      isSelected ? 'border-indigo-400 bg-indigo-500' : 'border-slate-800'
                    }`}>
                      {isSelected && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scale Active Detail Panel (Right) */}
          <div className="lg:col-span-7 bg-slate-950 border border-white/5 p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20 uppercase tracking-wide">
                  Laboratório Melódico Ativo
                </span>
                <span className="text-xs text-slate-500 font-mono">Tonalidade: {rootNote.name}</span>
              </div>

              <h3 className="font-display font-black text-2xl text-white mb-2">
                {selectedScale.name} de {rootNote.name.split(' ')[0]}
              </h3>

              <div className="space-y-6 text-sm text-slate-300">
                <p className="leading-relaxed text-slate-200">
                  {selectedScale.description}
                </p>

                {/* Formula display board */}
                <div className="p-4 bg-slate-900 border border-white/5 rounded-xl space-y-3">
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold block uppercase">Fórmula de Tons (Estrutura):</span>
                    <p className="text-xs text-white font-semibold mt-1">{selectedScale.formula}</p>
                  </div>
                  <div className="border-t border-white/5 pt-3">
                    <span className="text-[10px] text-slate-500 font-bold block uppercase">Estilo e Sentimento Sugerido:</span>
                    <p className="text-xs text-amber-400 font-semibold mt-1">{selectedScale.useCase}</p>
                  </div>
                </div>

                {/* Big Scale playback button */}
                <button
                  onClick={handlePlayScale}
                  disabled={isPlayingScale}
                  className={`w-full py-4 rounded-xl font-display font-extrabold text-xs sm:text-sm tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg ${
                    isPlayingScale
                      ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                      : 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-[1.01]'
                  }`}
                  id="btn-play-scale-pattern"
                >
                  {isPlayingScale ? (
                    <>
                      <div className="flex gap-1 items-end h-3">
                        <span className="w-1 bg-amber-400 animate-pulse h-3 block rounded" />
                        <span className="w-1 bg-amber-400 animate-pulse h-2 block rounded" />
                        <span className="w-1 bg-amber-400 animate-pulse h-3 block rounded" />
                      </div>
                      Solfejando Escala...
                    </>
                  ) : (
                    <>
                      <PlayCircle className="w-5 h-5" />
                      Ouvir Escala Inteira (Ascendente)
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 text-xs text-slate-500 flex items-center gap-2">
              <Music className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              <span>Dica de Ouro: A <strong>Escala Pentatônica</strong> tem apenas 5 notas e não possui dissonâncias naturais. É a escala perfeita para improvisação de solos!</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
