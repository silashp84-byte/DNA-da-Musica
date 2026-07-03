import { useState } from 'react';
import { motion } from 'motion/react';
import { Download, FileText, CheckCircle2, Sparkles, ChevronRight } from 'lucide-react';

interface PdfResource {
  id: string;
  title: string;
  category: string;
  description: string;
  pages: number;
  fileSize: string;
  isPremium: boolean;
}

interface DownloadsProps {
  isLoggedIn: boolean;
  onOpenLogin: () => void;
}

export default function Downloads({ isLoggedIn, onOpenLogin }: DownloadsProps) {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [downloadedResources, setDownloadedResources] = useState<string[]>([]);

  const resources: PdfResource[] = [
    {
      id: 'guia-notas',
      title: 'Guia Visual das 12 Notas & Oitava Central',
      category: 'Notas & Teclado',
      description: 'Mapa colorido mostrando a correspondência exata entre teclas brancas, pretas, frequências em Hertz e cifragem americana.',
      pages: 4,
      fileSize: '3.4 MB',
      isPremium: false,
    },
    {
      id: 'tabela-intervalos',
      title: 'Tabela Geral de Sentimentos dos Intervalos',
      category: 'Intervalos & Harmonia',
      description: 'Um resumo rápido de bolso contendo as relações físicas (razões acústicas) e sentimentos de cada intervalo para imprimir.',
      pages: 2,
      fileSize: '1.8 MB',
      isPremium: false,
    },
    {
      id: 'apostila-pentagramas',
      title: 'Apostila Completa de Exercícios de Caligrafia Musical',
      category: 'Pentagramas & Claves',
      description: 'Páginas em branco e exercícios de fixação para você imprimir e desenhar claves de Sol, Fá e notas à mão livre.',
      pages: 18,
      fileSize: '12.6 MB',
      isPremium: true,
    },
    {
      id: 'escalas-mestre',
      title: 'Manual de Escalas Maiores, Menores e Modos Gregos',
      category: 'Escalas Avançadas',
      description: 'A fórmula secreta e os desenhos das 12 tonalidades das escalas pentatônicas e diatônicas para violão, guitarra e piano.',
      pages: 24,
      fileSize: '15.2 MB',
      isPremium: true,
    },
  ];

  const handleDownload = (resource: PdfResource) => {
    if (downloadingId) return;

    setDownloadingId(resource.id);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloadingId(null);
          setDownloadedResources([...downloadedResources, resource.id]);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  return (
    <section id="downloads" className="py-24 bg-slate-950 border-t border-white/5 relative">
      <div className="absolute top-1/2 left-1/4 w-[350px] h-[350px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-3">
            📚 Material de Apoio
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            Área de <span className="text-indigo-400">Downloads & Apostilas</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Gosta de estudar com papel e caneta? Baixe nossos infográficos e resumos em alta resolução (PDF). Os materiais adicionais são 100% gratuitos para membros!
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {resources.map((res) => {
            const isDownloading = downloadingId === res.id;
            const isCompleted = downloadedResources.includes(res.id);
            const isLocked = res.isPremium && !isLoggedIn;
            
            return (
              <div
                key={res.id}
                className="bg-slate-900/40 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-white/20 transition-all animate-fade-in"
                id={`download-card-${res.id}`}
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-4">
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {res.category}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      {res.pages} páginas • {res.fileSize}
                    </span>
                  </div>

                  <div className="flex gap-4 items-start mb-4">
                    <div className="p-3 bg-slate-950 border border-white/5 rounded-xl text-indigo-400 flex-shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-base sm:text-lg mb-1">{res.title}</h3>
                      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{res.description}</p>
                    </div>
                  </div>
                </div>

                {/* Download State Controls */}
                <div className="pt-6 border-t border-white/5 mt-4">
                  {isDownloading ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Baixando arquivo em alta resolução...</span>
                        <span className="font-mono font-bold text-indigo-400">{progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 transition-all duration-150" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  ) : isCompleted ? (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 flex items-center gap-2.5 text-emerald-400 text-xs sm:text-sm font-semibold">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Arquivo baixado com sucesso! Verifique sua pasta de downloads.</span>
                    </div>
                  ) : isLocked ? (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        🔒 Conteúdo Gratuito para Membros
                      </span>
                      <button
                        onClick={onOpenLogin}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer w-full sm:w-auto"
                        id={`btn-premium-lock-${res.id}`}
                      >
                        Entrar para Baixar Grátis
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleDownload(res)}
                      className="w-full sm:w-auto bg-slate-950 hover:bg-slate-900 border border-white/10 text-slate-200 hover:text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                      id={`btn-download-pdf-${res.id}`}
                    >
                      <Download className="w-4 h-4 text-indigo-400" />
                      Baixar PDF Grátis
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Free Member Invitation Box */}
        <div className="bg-gradient-to-r from-indigo-950 to-slate-950 border border-indigo-500/20 p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wide flex items-center gap-1 justify-center sm:justify-start">
              <Sparkles className="w-3.5 h-3.5" /> Acesso de Estudante Ativo
            </span>
            <h3 className="font-display font-extrabold text-white text-lg sm:text-xl">
              Deseja baixar todos os nossos manuais e apostilas?
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Crie uma conta gratuita de membro para liberar downloads ilimitados em 1 clique e receber suporte direto.
            </p>
          </div>
          {isLoggedIn ? (
            <div className="bg-emerald-500/10 border border-emerald-500/20 px-5 py-3 rounded-xl text-emerald-400 text-xs sm:text-sm font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Sua conta está ativa e liberada!
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-display font-bold px-6 py-3 rounded-xl transition-all hover:scale-105 cursor-pointer text-xs sm:text-sm w-full sm:w-auto text-center"
              id="btn-downloads-bottom-cta"
            >
              Criar Conta Grátis & Baixar Tudo
            </button>
          )}
        </div>

      </div>
    </section>
  );
}
