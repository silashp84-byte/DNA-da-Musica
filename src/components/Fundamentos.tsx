import { useState } from 'react';
import { motion } from 'motion/react';
import { playNote } from '../utils/audio';
import { Music, Volume2, Hourglass, HelpCircle, Activity } from 'lucide-react';

export default function Fundamentos() {
  const [pitch, setPitch] = useState(440); // Standard A4
  const [waveType, setWaveType] = useState<OscillatorType>('triangle');
  const [duration, setDuration] = useState(0.6);
  const [isPlaying, setIsPlaying] = useState(false);

  const playDemo = async () => {
    setIsPlaying(true);
    await playNote(pitch, duration, waveType);
    setIsPlaying(false);
  };

  const wavetypesInfo = [
    { type: 'sine', name: 'Senoide', desc: 'Som puro, doce e suave, semelhante a uma flauta doce ou assobio.', icon: '〰️' },
    { type: 'triangle', name: 'Triangular', desc: 'Som quente, limpo e arredondado, clássico de instrumentos de sopro de madeira.', icon: '▲' },
    { type: 'sawtooth', name: 'Dente de Serra', desc: 'Som brilhante, áspero e rico em harmônicos, parecido com violino ou sintetizadores de rock.', icon: '🪚' },
    { type: 'square', name: 'Quadrada', desc: 'Som oco, nasal e retrô, lembrando flauta de pã, clarinete ou videogames de 8-bits.', icon: '■' },
  ];

  return (
    <section id="fundamentos" className="py-24 bg-slate-900 border-t border-slate-950 relative">
      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-indigo-500/5 rounded-full blur-[80px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-semibold text-xs tracking-wide uppercase rounded-full mb-3">
            Atributos do Som
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            Os 4 <span className="text-amber-400">Grandes Fundamentos</span> do Som
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Qualquer som no universo físico possui 4 características essenciais. Dominar essas propriedades é o primeiro passo para compreender qualquer partitura ou acorde.
          </p>
        </div>

        {/* Core Attributes Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            {
              title: '1. Altura (Frequência)',
              icon: <Activity className="w-5 h-5 text-amber-400" />,
              badge: 'Grave vs Agudo',
              desc: 'Determina se o som é baixo/grosso (grave, vibrações lentas) ou alto/fino (agudo, vibrações rápidas). Medido em Hertz (Hz).'
            },
            {
              title: '2. Intensidade (Volume)',
              icon: <Volume2 className="w-5 h-5 text-amber-400" />,
              badge: 'Fraco vs Forte',
              desc: 'Determina a força ou amplitude da onda. Na partitura, é indicado pelas dinâmicas (Pianíssimo 𝄠, Fortíssimo 𝄡).'
            },
            {
              title: '3. Duração (Tempo)',
              icon: <Hourglass className="w-5 h-5 text-amber-400" />,
              badge: 'Curto vs Longo',
              desc: 'O tempo que a vibração permanece ativa. É controlado pelas Figuras Rítmicas na partitura.'
            },
            {
              title: '4. Timbre (Forma de Onda)',
              icon: <Music className="w-5 h-5 text-amber-400" />,
              badge: 'A "Cor" do Som',
              desc: 'A assinatura sonora. Permite distinguir uma mesma nota tocada por um piano, por um violino ou por um saxofone.'
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-950 border border-slate-850 p-6 rounded-2xl flex flex-col justify-between" id={`fundamento-card-${idx}`}>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-semibold font-mono px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Synthesizer Playground */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-amber-400 text-slate-950 rounded-lg font-bold text-sm">Synth</div>
            <div>
              <h3 className="font-display font-extrabold text-xl text-white">Laboratório Acústico Interativo</h3>
              <p className="text-xs text-slate-400">Experimente as propriedades físicas do som alterando os seletores e ouvindo os resultados.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Control panel (Left) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Slider Altura */}
              <div>
                <div className="flex justify-between items-center text-xs text-slate-300 mb-2">
                  <span className="font-semibold">Frequência (Altura):</span>
                  <span className="font-mono font-bold text-amber-400">{pitch} Hz ({pitch < 200 ? 'Grave' : pitch > 600 ? 'Agudo' : 'Médio'})</span>
                </div>
                <input
                  type="range"
                  min="110"
                  max="880"
                  value={pitch}
                  onChange={(e) => setPitch(Number(e.target.value))}
                  className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  id="pitch-slider"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>110 Hz (A2)</span>
                  <span>440 Hz (A4)</span>
                  <span>880 Hz (A5)</span>
                </div>
              </div>

              {/* Slider Duração */}
              <div>
                <div className="flex justify-between items-center text-xs text-slate-300 mb-2">
                  <span className="font-semibold">Duração:</span>
                  <span className="font-mono font-bold text-amber-400">{duration.toFixed(1)} segundos</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="2.0"
                  step="0.1"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  id="duration-slider"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>0.1s (Curto)</span>
                  <span>1.0s (Médio)</span>
                  <span>2.0s (Longo)</span>
                </div>
              </div>

              {/* Seletor de Timbre (Wave shape) */}
              <div>
                <span className="block text-xs text-slate-300 font-semibold mb-3">Selecione o Timbre (Formato da Onda):</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {wavetypesInfo.map((wave) => (
                    <button
                      key={wave.type}
                      onClick={() => setWaveType(wave.type as OscillatorType)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 border cursor-pointer ${
                        waveType === wave.type
                          ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md'
                          : 'bg-slate-950 text-slate-400 border-slate-850 hover:bg-slate-900 hover:text-white'
                      }`}
                      id={`wave-btn-${wave.type}`}
                    >
                      <span className="text-lg">{wave.icon}</span>
                      <span>{wave.name}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Timbre descriptions (Right) */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full bg-slate-950 border border-slate-850/80 p-5 rounded-2xl">
              <div>
                <h4 className="text-white text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Estudo de Timbre Ativo</h4>
                {wavetypesInfo.filter(w => w.type === waveType).map((w) => (
                  <div key={w.type} className="space-y-2">
                    <span className="text-xl text-amber-400 font-bold block">{w.name} {w.icon}</span>
                    <p className="text-slate-300 text-xs leading-relaxed">{w.desc}</p>
                  </div>
                ))}
              </div>

              {/* Big Trigger Sound button */}
              <div className="pt-6 border-t border-slate-850/60 mt-6">
                <button
                  onClick={playDemo}
                  disabled={isPlaying}
                  className={`w-full py-4 rounded-xl font-display font-extrabold text-sm tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg ${
                    isPlaying
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/20 shadow-inner'
                      : 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:scale-[1.02]'
                  }`}
                  id="btn-trigger-oscillator"
                >
                  {isPlaying ? (
                    <>
                      <div className="flex gap-1 items-end h-3">
                        <span className="w-1 bg-amber-400 animate-pulse h-3 block rounded" />
                        <span className="w-1 bg-amber-400 animate-pulse h-2 block rounded" />
                        <span className="w-1 bg-amber-400 animate-pulse h-3 block rounded" />
                      </div>
                      Oscilando Frequência...
                    </>
                  ) : (
                    <>
                      🔊 Tocar Frequência ({pitch}Hz)
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
