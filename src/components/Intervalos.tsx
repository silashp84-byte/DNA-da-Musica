import { useState } from 'react';
import { motion } from 'motion/react';
import { INTERVALS, Interval } from '../types';
import { playInterval } from '../utils/audio';
import { Sparkles, Music, Volume2, ShieldCheck, PlayCircle, HelpCircle } from 'lucide-react';

export default function Intervalos() {
  const [selectedInterval, setSelectedInterval] = useState<Interval>(INTERVALS[4]); // default to Terca Maior
  const [isPlayingMelodic, setIsPlayingMelodic] = useState(false);
  const [isPlayingHarmonic, setIsPlayingHarmonic] = useState(false);

  const handlePlay = async (simultaneous: boolean) => {
    if (simultaneous) {
      setIsPlayingHarmonic(true);
    } else {
      setIsPlayingMelodic(true);
    }

    const freq1 = 261.63; // Base note is C4 (261.63Hz)
    // Calculate second frequency based on the physical ratios defined
    const freq2 = freq1 * selectedInterval.ratio;

    await playInterval(freq1, freq2, simultaneous);

    setIsPlayingHarmonic(false);
    setIsPlayingMelodic(false);
  };

  return (
    <section id="intervalos" className="py-24 bg-slate-950 border-t border-white/5 relative">
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-indigo-500/5 rounded-full blur-[80px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-semibold text-xs tracking-wide uppercase rounded-full mb-3">
            📏 A Régua da Harmonia
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            Os <span className="text-indigo-400">Intervalos Musicais</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            O tijolo de construção de qualquer melodia ou acorde. Um intervalo é a <span className="text-white font-semibold">distância de altura</span> entre duas notas, medida pelo número de tons e semitones.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Interval Menu List (Left) */}
          <div className="lg:col-span-5 flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-2" id="intervals-list-container">
            <h3 className="font-display font-bold text-lg text-white mb-2 sticky top-0 bg-slate-950 py-2 z-10">
              Escolha uma Distância (Intervalo):
            </h3>

            {INTERVALS.map((interval) => {
              const isSelected = selectedInterval.id === interval.id;
              return (
                <button
                  key={interval.id}
                  onClick={() => setSelectedInterval(interval)}
                  className={`p-3.5 px-4 rounded-xl text-left border transition-all flex justify-between items-center cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600/10 border-indigo-500 shadow-md'
                      : 'bg-slate-900/40 border-white/5 hover:bg-slate-900'
                  }`}
                  id={`interval-item-${interval.id}`}
                >
                  <div>
                    <h4 className="text-white font-bold text-xs sm:text-sm">{interval.name}</h4>
                    <span className="text-[10px] text-slate-500 font-mono">Dó (C4) até {interval.soundExample.split('->')[1] || 'Oitava'}</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-slate-950 px-2 py-1 rounded text-amber-400 border border-white/5">
                    {interval.semitones} {interval.semitones === 1 ? 'semitom' : 'semitons'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Detail Visual Board (Right) */}
          <div className="lg:col-span-7 bg-slate-900/40 backdrop-blur-md border border-white/10 p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20 uppercase tracking-wide">
                  Laboratório Harmônico
                </span>
                <span className="text-xs text-slate-500 font-mono">Nota de partida: Dó (C4 = 261.63Hz)</span>
              </div>

              <h3 className="font-display font-black text-2xl text-white mb-2">
                {selectedInterval.name}
              </h3>
              
              {/* Semitones Indicator bar */}
              <div className="flex gap-1 my-4">
                {[...Array(12)].map((_, i) => {
                  const isActive = i < selectedInterval.semitones;
                  return (
                    <div
                      key={i}
                      className={`h-2 flex-1 rounded transition-colors ${
                        isActive ? 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]' : 'bg-slate-800'
                      }`}
                    />
                  );
                })}
              </div>

              <div className="space-y-6 text-sm text-slate-300 mt-6">
                <p className="leading-relaxed text-slate-200">
                  {selectedInterval.description}
                </p>

                {/* Mathematical proportional fact */}
                <div className="bg-slate-950 p-4 border border-white/5 rounded-xl text-xs font-mono text-slate-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Razão de Frequência Física:</span>
                    <strong className="text-white">1 : {selectedInterval.ratio.toFixed(3)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Sons executados:</span>
                    <strong className="text-amber-400">{selectedInterval.soundExample}</strong>
                  </div>
                </div>

                {/* Play Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Melodic Button */}
                  <button
                    onClick={() => handlePlay(false)}
                    disabled={isPlayingMelodic || isPlayingHarmonic}
                    className="py-3.5 bg-slate-950 hover:bg-slate-900 border border-white/10 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                    id="btn-play-melodic"
                  >
                    <PlayCircle className="w-4 h-4 text-indigo-400" />
                    {isPlayingMelodic ? 'Reproduzindo...' : 'Tocar Melódico (Sucessivo)'}
                  </button>

                  {/* Harmonic Button */}
                  <button
                    onClick={() => handlePlay(true)}
                    disabled={isPlayingMelodic || isPlayingHarmonic}
                    className="py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                    id="btn-play-harmonic"
                  >
                    <Volume2 className="w-4 h-4" />
                    {isPlayingHarmonic ? 'Sinfonizando...' : 'Tocar Harmônico (Acorde)'}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 text-xs text-slate-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Exercício: O <strong>Trítono</strong> soa tenso e pede "resolução". Toque o Trítono e logo em seguida toque a Quinta Justa para sentir o alívio acústico imediato!</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
