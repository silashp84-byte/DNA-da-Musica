import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { RHYTHM_FIGURES, RhythmFigure } from '../types';
import { playNote } from '../utils/audio';
import { Play, Square, Activity, Sparkles, Sliders, Volume2, Fingerprint } from 'lucide-react';

export default function FigurasRitmicas() {
  const [bpm, setBpm] = useState(80);
  const [isPlayingMetronome, setIsPlayingMetronome] = useState(false);
  const [activeBeat, setActiveBeat] = useState<number | null>(null);
  const [tapTimestamps, setTapTimestamps] = useState<number[]>([]);
  const [tappedBpm, setTappedBpm] = useState<number | null>(null);

  const metronomeInterval = useRef<NodeJS.Timeout | null>(null);
  const currentBeat = useRef<number>(0);

  // Metronome Sound logic
  useEffect(() => {
    if (isPlayingMetronome) {
      startMetronome();
    } else {
      stopMetronome();
    }
    return () => stopMetronome();
  }, [isPlayingMetronome, bpm]);

  const startMetronome = () => {
    stopMetronome();
    const intervalMs = (60 / bpm) * 1000;
    
    // Play immediately
    playTick();

    metronomeInterval.current = setInterval(() => {
      playTick();
    }, intervalMs);
  };

  const playTick = () => {
    currentBeat.current = (currentBeat.current % 4) + 1;
    setActiveBeat(currentBeat.current);
    
    // High tick on beat 1, lower on beats 2,3,4
    const freq = currentBeat.current === 1 ? 1000 : 600;
    playNote(freq, 0.08, 'triangle');
  };

  const stopMetronome = () => {
    if (metronomeInterval.current) {
      clearInterval(metronomeInterval.current);
      metronomeInterval.current = null;
    }
    setActiveBeat(null);
    currentBeat.current = 0;
  };

  // Demo sequence of a rhythm figure
  const handlePlayFigureRhythm = async (figure: RhythmFigure) => {
    // Plays a 4-beat measure containing notes of that figure
    const intervalMs = (60 / bpm) * 1000;
    const noteDuration = figure.beats * (60 / bpm);
    
    const count = Math.ceil(4 / figure.beats);
    for (let i = 0; i < count; i++) {
      playNote(330, noteDuration * 0.8, 'sine'); // E4 sound
      await new Promise((resolve) => setTimeout(resolve, figure.beats * (60 / bpm) * 1000));
    }
  };

  // Tap Tempo logic
  const handleTap = () => {
    const now = Date.now();
    const newTimestamps = [...tapTimestamps, now].slice(-5); // keep last 5 taps
    setTapTimestamps(newTimestamps);

    if (newTimestamps.length >= 2) {
      const differences: number[] = [];
      for (let i = 1; i < newTimestamps.length; i++) {
        differences.push(newTimestamps[i] - newTimestamps[i - 1]);
      }
      const averageDiff = differences.reduce((a, b) => a + b, 0) / differences.length;
      const calculatedBpm = Math.round(60000 / averageDiff);
      if (calculatedBpm >= 30 && calculatedBpm <= 250) {
        setTappedBpm(calculatedBpm);
        setBpm(calculatedBpm);
      }
    }
  };

  return (
    <section id="figuras" className="py-24 bg-slate-900 border-t border-white/5 relative">
      <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-semibold text-xs tracking-wide uppercase rounded-full mb-3">
            O Pulso do Som
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            As <span className="text-indigo-400">Figuras Rítmicas</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            O ritmo é o que move a alma. Na teoria, cada nota possui uma forma geométrica que define sua <span className="text-white font-semibold">duração exata</span> proporcional em relação a um pulso constante (BPM).
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Metronome Control Panel (Left) */}
          <div className="lg:col-span-4 bg-slate-950 border border-white/5 p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-display font-bold text-lg text-white">
                  O Metrônomo
                </h3>
                <span className="text-xs font-mono text-indigo-400 font-semibold">BPM Simulator</span>
              </div>

              <div className="space-y-6">
                {/* BPM Slider */}
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-2 font-semibold">
                    <span>Velocidade (Tempo):</span>
                    <span className="font-mono text-amber-400 font-black text-sm">{bpm} BPM</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="180"
                    value={bpm}
                    onChange={(e) => setBpm(Number(e.target.value))}
                    className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    id="bpm-slider"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                    <span>40 (Grave)</span>
                    <span>120 (Moderado)</span>
                    <span>180 (Acelerado)</span>
                  </div>
                </div>

                {/* Beats visualization dots */}
                <div className="flex justify-center gap-3 py-4">
                  {[1, 2, 3, 4].map((b) => (
                    <div
                      key={b}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-xs transition-all border ${
                        activeBeat === b
                          ? b === 1
                            ? 'bg-amber-400 text-slate-950 border-amber-400 scale-110 shadow-lg shadow-amber-400/20'
                            : 'bg-indigo-500 text-white border-indigo-400 scale-110 shadow-lg shadow-indigo-500/20'
                          : 'bg-slate-900 text-slate-500 border-white/5'
                      }`}
                      id={`metronome-dot-${b}`}
                    >
                      {b}
                    </div>
                  ))}
                </div>

                {/* Metronome button trigger */}
                <button
                  onClick={() => setIsPlayingMetronome(!isPlayingMetronome)}
                  className={`w-full py-3.5 rounded-xl font-display font-extrabold text-sm tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    isPlayingMetronome
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/10'
                  }`}
                  id="btn-trigger-metronome"
                >
                  {isPlayingMetronome ? (
                    <>
                      <Square className="w-4 h-4 fill-rose-400 text-rose-400" />
                      Parar Metrônomo
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-white" />
                      Iniciar Metrônomo
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Tap Tempo utility */}
            <div className="mt-8 pt-6 border-t border-white/5">
              <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block mb-2">
                Descubra o Tempo (Tap Tempo)
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleTap}
                  className="flex-1 bg-slate-900 hover:bg-slate-850 active:scale-95 transition-all py-3.5 border border-white/5 rounded-xl text-xs font-bold text-slate-300 flex items-center justify-center gap-2 cursor-pointer"
                  id="btn-tap-tempo"
                >
                  <Fingerprint className="w-4 h-4 text-indigo-400" />
                  Bater Ritmo Aqui
                </button>
                <div className="w-20 bg-slate-900 border border-white/5 p-2 rounded-xl text-center">
                  <span className="text-[9px] text-slate-500 block uppercase font-mono leading-none">BPM</span>
                  <span className="text-sm font-mono font-bold text-emerald-400 block mt-1">
                    {tappedBpm ? `${tappedBpm}` : '--'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Rhythm Figures interactive table (Right) */}
          <div className="lg:col-span-8 bg-slate-950 border border-white/5 p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-display font-bold text-lg text-white">
                  Tabela Proporcional de Duração
                </h3>
                <span className="text-xs text-slate-400 font-mono">Compasso 4/4</span>
              </div>

              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                Clique no botão de áudio de cada figura para ouvir uma frase rítmica inteira com aquela subdivisão baseada na velocidade configurada ao lado.
              </p>

              {/* Grid of figures */}
              <div className="space-y-3" id="rhythm-figures-list">
                {RHYTHM_FIGURES.map((figure) => (
                  <div
                    key={figure.id}
                    className="p-4 bg-slate-900/40 border border-white/5 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-white/10 transition-colors"
                    id={`rhythm-figure-row-${figure.id}`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Character symbol display */}
                      <span className="text-4xl text-indigo-400 select-none w-8 text-center">{figure.symbol}</span>
                      <div>
                        <div className="flex items-baseline gap-2">
                          <h4 className="text-white font-bold text-sm sm:text-base">{figure.name}</h4>
                          <span className="text-[10px] text-slate-500 font-mono">Pausa correspondente: {figure.restSymbol}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{figure.silenceDescription}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
                      <div className="text-right">
                        <span className="text-xs text-slate-300 block font-semibold font-mono">{figure.beats} {figure.beats === 1 ? 'tempo' : 'tempos'}</span>
                        <span className="text-[9px] text-slate-500 block uppercase">Fórmula de valor: 1/{1 / figure.duration}</span>
                      </div>

                      <button
                        onClick={() => handlePlayFigureRhythm(figure)}
                        className="bg-indigo-600/20 hover:bg-indigo-600 border border-indigo-500/30 text-indigo-400 hover:text-white px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                        id={`btn-play-figure-${figure.id}`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        Ouvir Ritmo
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs text-slate-400">
              <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Dica: Uma <strong>Semibreve</strong> (4 tempos) dura o mesmo tempo que quatro <strong>Semínimas</strong> (1 tempo cada)! A música é uma divisão perfeita.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
