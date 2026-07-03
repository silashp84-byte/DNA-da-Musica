import { useState } from 'react';
import { motion } from 'motion/react';
import { PRACTICAL_EXERCISES, Exercise } from '../types';
import { playNote, playInterval } from '../utils/audio';
import { Sparkles, HelpCircle, Volume2, CheckCircle2, AlertCircle, RefreshCw, Trophy, Award } from 'lucide-react';

export default function Exercicios() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const activeExercise = PRACTICAL_EXERCISES[currentIdx];

  const handlePlaySound = async () => {
    setIsPlayingAudio(true);
    if (activeExercise.type === 'identify-note') {
      // Play high C5 frequency (523.25 Hz)
      await playNote(523.25, 0.8, 'sine');
    } else if (activeExercise.type === 'interval-ear') {
      // Play Terça Maior: C4 (261.63Hz) + E4 (329.63Hz) harmonically
      await playInterval(261.63, 329.63, true);
    }
    setIsPlayingAudio(false);
  };

  const handleSelectOption = (option: string) => {
    if (hasAnswered) return;
    setSelectedOption(option);
    setHasAnswered(true);

    const isAnswerCorrect = 
      (activeExercise.type === 'identify-note' && option === 'Dó (C5) - Som Agudo') ||
      (activeExercise.type === 'interval-ear' && option === 'Alegre / Aberto (Terça Maior)');

    setIsCorrect(isAnswerCorrect);
    if (isAnswerCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setHasAnswered(false);
    setIsCorrect(false);
    if (currentIdx < PRACTICAL_EXERCISES.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Wrap around or restart
      setCurrentIdx(0);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setIsCorrect(false);
    setScore(0);
  };

  return (
    <section id="exercicios" className="py-24 bg-slate-950 border-t border-white/5 relative">
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-semibold text-xs tracking-wide uppercase rounded-full mb-3">
            👂 Treino Auditivo
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            Laboratório de <span className="text-indigo-400">Exercícios Interativos</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Desenvolva seu ouvido absoluto e relativo. Pratique identificando propriedades sonoras e relações harmônicas diretamente no navegador de forma gamificada.
          </p>
        </div>

        {/* Content Layout */}
        <div className="max-w-3xl mx-auto bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
          
          {/* Game Header */}
          <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-amber-400 text-slate-950 rounded font-display font-bold text-xs uppercase">Estágio Ativo</span>
              <span className="text-xs font-semibold text-slate-300">Exercício {currentIdx + 1} de {PRACTICAL_EXERCISES.length}</span>
            </div>
            
            {/* Score counter */}
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              <Trophy className="w-3.5 h-3.5" />
              Pontos: {score}
            </div>
          </div>

          {/* Exercise card */}
          <div className="space-y-6">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                {activeExercise.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {activeExercise.description}
              </p>
            </div>

            {/* Sound trigger section */}
            <div className="bg-slate-950/85 p-6 rounded-2xl border border-white/5 text-center flex flex-col items-center justify-center space-y-4">
              <p className="text-xs text-slate-400 font-medium">
                {activeExercise.instruction}
              </p>

              <button
                onClick={handlePlaySound}
                disabled={isPlayingAudio}
                className={`py-3.5 px-8 rounded-full font-display font-extrabold text-sm tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  isPlayingAudio
                    ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                    : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/10'
                }`}
                id="btn-play-exercise-audio"
              >
                <Volume2 className="w-4 h-4 fill-white" />
                {isPlayingAudio ? 'Reproduzindo...' : '🔊 Tocar Som Secreto'}
              </button>
            </div>

            {/* Options display */}
            <div className="space-y-3" id="exercise-options">
              {activeExercise.options.map((option, index) => {
                const isSelected = selectedOption === option;
                return (
                  <button
                    key={index}
                    onClick={() => handleSelectOption(option)}
                    disabled={hasAnswered}
                    className={`w-full p-4 rounded-xl border text-left font-semibold text-xs sm:text-sm transition-all cursor-pointer flex justify-between items-center ${
                      hasAnswered
                        ? isSelected
                          ? isCorrect
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                            : 'bg-rose-500/20 border-rose-500 text-rose-400'
                          : 'bg-slate-950/40 border-white/5 text-slate-600'
                        : 'bg-slate-950 border-white/5 text-slate-300 hover:bg-slate-900 hover:border-white/10'
                    }`}
                    id={`exercise-option-${index}`}
                  >
                    <span>{option}</span>
                    {hasAnswered && isSelected && (
                      isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-rose-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Response result feedback */}
            {hasAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-5 rounded-2xl border text-xs sm:text-sm ${
                  isCorrect
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-slate-300'
                    : 'bg-rose-500/10 border-rose-500/20 text-slate-300'
                }`}
                id="exercise-feedback"
              >
                <div className="flex gap-2 items-start">
                  {isCorrect ? (
                    <Award className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4 className="font-bold text-white mb-1">
                      {isCorrect ? 'Resposta Correta!' : 'Quase lá! Tente mais uma vez.'}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      {isCorrect ? activeExercise.successMessage : activeExercise.hint}
                    </p>

                    {/* Next Step / Reset Trigger */}
                    <button
                      onClick={handleNext}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                      id="btn-exercise-next"
                    >
                      Avançar para Próximo Desafio
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

          </div>

          {/* Reset Progress anchor */}
          <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-xs text-slate-500">
            <span>Quer recomeçar do início?</span>
            <button
              onClick={handleReset}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-semibold"
              id="btn-exercise-reset"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Limpar Progresso
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
