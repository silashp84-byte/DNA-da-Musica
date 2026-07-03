import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../types';
import { Award, RefreshCw, Trophy, Sparkles, HelpCircle, ChevronRight, Check, X } from 'lucide-react';

interface QuizProps {
  onOpenLogin: () => void;
  onSaveScore: (score: number) => void;
  isLoggedIn: boolean;
}

export default function Quiz({ onOpenLogin, onSaveScore, isLoggedIn }: QuizProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const activeQuestion = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (option: string) => {
    if (hasSubmitted) return;
    setSelectedOption(option);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption || hasSubmitted) return;
    setHasSubmitted(true);

    if (selectedOption === activeQuestion.correctAnswer) {
      setScore((prev) => {
        const newScore = prev + 1;
        return newScore;
      });
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setHasSubmitted(false);

    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setQuizComplete(true);
      // Save final score
      onSaveScore(score);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setHasSubmitted(false);
    setScore(0);
    setQuizComplete(false);
  };

  return (
    <section id="quiz" className="py-24 bg-slate-900 border-t border-white/5 relative">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-semibold text-xs tracking-wide uppercase rounded-full mb-3">
            🏆 Desafio Teórico
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            Testes Seus <span className="text-indigo-400">Conhecimentos</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Será que você assimilou os principais fundamentos da harmonia e leitura? Faça o teste agora e descubra seu nível de alfabetização musical!
          </p>
        </div>

        {/* Content Box */}
        <div className="max-w-3xl mx-auto bg-slate-950 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {!quizComplete ? (
              <motion.div
                key="quiz-active"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                {/* Progress bar */}
                <div className="flex justify-between items-center text-xs text-slate-500 mb-2">
                  <span>Questão {currentIdx + 1} de {QUIZ_QUESTIONS.length}</span>
                  <span>{Math.round(((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100)}% concluído</span>
                </div>
                <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 transition-all duration-300"
                    style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                  />
                </div>

                {/* Question title */}
                <div className="space-y-3">
                  <span className="inline-block text-[10px] uppercase tracking-wider font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/10">
                    Dificuldade: {activeQuestion.difficulty}
                  </span>
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white leading-snug">
                    {activeQuestion.question}
                  </h3>
                </div>

                {/* Option list */}
                <div className="space-y-2.5 pt-2" id="quiz-options-list">
                  {activeQuestion.options.map((option, idx) => {
                    const isSelected = selectedOption === option;
                    const isCorrect = option === activeQuestion.correctAnswer;
                    
                    let buttonStyle = "bg-slate-900 border-white/5 text-slate-300 hover:bg-slate-850 hover:border-white/10";
                    if (isSelected) buttonStyle = "bg-indigo-600/10 border-indigo-500 text-indigo-400";
                    
                    if (hasSubmitted) {
                      if (isCorrect) {
                        buttonStyle = "bg-emerald-500/10 border-emerald-500 text-emerald-400";
                      } else if (isSelected) {
                        buttonStyle = "bg-rose-500/10 border-rose-500 text-rose-400";
                      } else {
                        buttonStyle = "bg-slate-900/40 border-white/5 text-slate-600";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(option)}
                        disabled={hasSubmitted}
                        className={`w-full p-4 rounded-xl border text-left font-semibold text-xs sm:text-sm transition-all cursor-pointer flex justify-between items-center ${buttonStyle}`}
                        id={`quiz-option-button-${idx}`}
                      >
                        <span>{option}</span>
                        {hasSubmitted && isCorrect && <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                        {hasSubmitted && isSelected && !isCorrect && <X className="w-4 h-4 text-rose-400 flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Control Action Button */}
                <div className="pt-4 border-t border-white/5 flex justify-end gap-3">
                  {!hasSubmitted ? (
                    <button
                      onClick={handleSubmitAnswer}
                      disabled={!selectedOption}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-display font-bold px-6 py-3 rounded-xl transition-all disabled:opacity-50 cursor-pointer flex items-center gap-1 text-sm"
                      id="btn-quiz-submit"
                    >
                      Confirmar Resposta
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-display font-bold px-6 py-3 rounded-xl transition-all cursor-pointer flex items-center gap-1 text-sm"
                      id="btn-quiz-next"
                    >
                      {currentIdx === QUIZ_QUESTIONS.length - 1 ? 'Ver Resultado Final' : 'Próxima Questão'}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Elaborate explanation */}
                {hasSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-5 bg-slate-900 border border-white/5 rounded-2xl text-xs sm:text-sm text-slate-300 space-y-2 mt-4"
                    id="quiz-explanation-box"
                  >
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">Explicação Didática:</span>
                    <p className="leading-relaxed text-slate-400">
                      {activeQuestion.explanation}
                    </p>
                  </motion.div>
                )}

              </motion.div>
            ) : (
              /* Celebration / Complete Score screen */
              <motion.div
                key="quiz-complete"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 flex flex-col items-center justify-center"
                id="quiz-complete-screen"
              >
                <div className="bg-indigo-600/20 text-indigo-400 p-4 rounded-full mb-6 ring-4 ring-indigo-500/10">
                  <Award className="w-12 h-12" />
                </div>

                <h3 className="font-display font-extrabold text-3xl text-white mb-2">
                  Desafio Concluído!
                </h3>
                
                {/* Score feedback text */}
                <p className="text-amber-400 font-semibold text-sm mb-4">
                  {score === QUIZ_QUESTIONS.length 
                    ? 'Incrível! Você gabaritou e provou ter o DNA de um Músico Profissional!' 
                    : `Bom trabalho! Você acertou ${score} de ${QUIZ_QUESTIONS.length} questões.`
                  }
                </p>

                {/* Big Score tag */}
                <div className="bg-slate-900 border border-white/5 p-6 rounded-2xl max-w-sm w-full my-6 flex justify-around items-center">
                  <div className="text-center">
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">Nota Final</span>
                    <span className="text-3xl font-mono font-black text-white">{Math.round((score / QUIZ_QUESTIONS.length) * 10)} / 10</span>
                  </div>
                  <div className="w-[1px] h-10 bg-white/10" />
                  <div className="text-center">
                    <span className="text-[10px] text-slate-500 block uppercase font-mono">Acertos</span>
                    <span className="text-3xl font-mono font-black text-indigo-400">{score} / {QUIZ_QUESTIONS.length}</span>
                  </div>
                </div>

                 <div className="max-w-md bg-slate-900/60 border border-white/5 p-5 rounded-xl text-left text-xs text-slate-400 mb-8 leading-relaxed">
                  📢 <strong>O que isso significa?</strong> Sua compreensão teórica já te destaca de quem tenta aprender sem direção. Salve seu resultado na sua <strong>Área de Membros Gratuita</strong> para registrar seu progresso nos 12 módulos e emitir seu Certificado Oficial de 60 horas sem custos!
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                  <button
                    onClick={handleRestart}
                    className="bg-slate-900 border border-white/10 hover:bg-slate-800 text-slate-300 font-semibold px-6 py-3.5 rounded-xl transition-colors cursor-pointer text-sm flex items-center justify-center gap-1"
                    id="btn-quiz-restart"
                  >
                    <RefreshCw className="w-4 h-4" /> Refazer Teste
                  </button>

                  <button
                    onClick={() => {
                      if (isLoggedIn) {
                        const el = document.getElementById('members-dashboard');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        onOpenLogin();
                      }
                    }}
                    className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-display font-black px-8 py-3.5 rounded-xl transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer text-sm flex items-center justify-center"
                    id="btn-quiz-complete-premium"
                  >
                    {isLoggedIn ? 'Ver Meu Certificado no Painel' : 'Salvar Resultado & Emitir Certificado'}
                  </button>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
