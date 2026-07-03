import { motion } from 'motion/react';
import { BookOpen, HelpCircle, Flame, Shield, Check } from 'lucide-react';

export default function TeoriaMusical() {
  const pillars = [
    {
      icon: '🧠',
      title: 'O Idioma Universal',
      description: 'A teoria não cria regras, ela descreve o que seu ouvido já entende naturalmente. É o mapa que traduz seus sentimentos em notas tocáveis.',
    },
    {
      icon: '⚙️',
      title: 'A Lógica dos Acordes',
      description: 'Por que certas notas se atraem e outras colidem? Entender a teoria é descobrir a lógica matemática por trás dos maiores clássicos da história.',
    },
    {
      icon: '⚡',
      title: 'Improvisação Fluida',
      description: 'Tocar sem teoria é tatear no escuro. Com a teoria, você visualiza as escalas e os intervalos ideais, tocando qualquer solo com convicção.',
    },
  ];

  return (
    <section id="teoria" className="py-24 bg-slate-950 border-t border-slate-900 relative">
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:20px_20px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            Afinal, o que é <span className="text-amber-400">Teoria Musical</span>?
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Muitos acham que teoria engessa a criatividade, mas é exatamente o oposto: a teoria musical é o mapa que te dá <span className="text-white font-semibold">liberdade absoluta</span> para criar e tocar de ouvido.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block: Visual Demonstration */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl relative overflow-hidden border border-slate-800">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-4">
                <BookOpen className="w-4 h-4" /> Fundamentação Científica
              </div>

              <h3 className="font-display font-extrabold text-2xl text-white mb-4">
                A Física Encontra a Emoção
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Todo som é uma vibração no ar (frequência). A teoria musical agrupa essas frequências em proporções matemáticas puras que estimulam nossos hormônios e emoções.
              </p>

              <blockquote className="border-l-2 border-amber-400 pl-4 py-1.5 text-slate-400 italic text-xs mb-6">
                "A música é a aritmética secreta da alma, que não sabe que está calculando."
                <span className="block text-[10px] text-slate-500 font-sans font-semibold mt-1">— Gottfried Leibniz</span>
              </blockquote>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-300 text-xs">
                  <span className="text-emerald-400">✔</span>
                  <span><strong>Afinidade natural:</strong> Algumas notas vibram em harmonia física perfeita.</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300 text-xs">
                  <span className="text-emerald-400">✔</span>
                  <span><strong>Dissonância e Resolução:</strong> A base da tensão e do alívio emocional.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Block: Three Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white text-center lg:text-left">
              Os 3 Pilares que Você Vai Dominar
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
              {pillars.map((pillar, idx) => (
                <motion.div
                  whileHover={{ x: 5 }}
                  key={idx}
                  className="bg-slate-900/60 hover:bg-slate-900 border border-slate-850 p-5 rounded-xl flex gap-4 items-start transition-all"
                  id={`pillar-card-${idx}`}
                >
                  <div className="text-3xl bg-slate-950 p-3 rounded-xl border border-slate-800 shadow-inner flex-shrink-0">
                    {pillar.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base sm:text-lg mb-1">{pillar.title}</h4>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{pillar.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
