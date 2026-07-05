export interface MusicalNote {
  name: string;
  enName: string; // English notation
  frequency: number;
  type: 'natural' | 'accidental';
  pianoKeyIndex: number;
}

export interface Clef {
  id: string;
  name: string;
  icon: string;
  description: string;
  usage: string;
  exampleNote: string;
}

export interface RhythmFigure {
  id: string;
  name: string;
  duration: number; // relative to whole note (1 = semibreve, 0.5 = minima, etc)
  beats: number; // in 4/4 time
  symbol: string;
  restSymbol: string;
  silenceDescription: string;
}

export interface Interval {
  id: string;
  name: string;
  semitones: number;
  description: string;
  ratio: number;
  soundExample: string;
}

export interface Scale {
  id: string;
  name: string;
  formula: string; // e.g. T - T - ST - T - T - T - ST
  intervals: number[]; // semitone steps from root
  description: string;
  useCase: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
}

export interface Exercise {
  id: number;
  title: string;
  description: string;
  instruction: string;
  type: 'identify-note' | 'identify-clef' | 'rhythm-tap' | 'interval-ear';
  target: string;
  options: string[];
  successMessage: string;
  hint: string;
}

// Global Static Data to maintain modularity
export const MUSICAL_NOTES: MusicalNote[] = [
  { name: 'Dó', enName: 'C4', frequency: 261.63, type: 'natural', pianoKeyIndex: 0 },
  { name: 'Dó#', enName: 'C#4', frequency: 277.18, type: 'accidental', pianoKeyIndex: 1 },
  { name: 'Ré', enName: 'D4', frequency: 293.66, type: 'natural', pianoKeyIndex: 2 },
  { name: 'Ré#', enName: 'D#4', frequency: 311.13, type: 'accidental', pianoKeyIndex: 3 },
  { name: 'Mi', enName: 'E4', frequency: 329.63, type: 'natural', pianoKeyIndex: 4 },
  { name: 'Fá', enName: 'F4', frequency: 349.23, type: 'natural', pianoKeyIndex: 5 },
  { name: 'Fá#', enName: 'F#4', frequency: 369.99, type: 'accidental', pianoKeyIndex: 6 },
  { name: 'Sol', enName: 'G4', frequency: 392.00, type: 'natural', pianoKeyIndex: 7 },
  { name: 'Sol#', enName: 'G#4', frequency: 415.30, type: 'accidental', pianoKeyIndex: 8 },
  { name: 'Lá', enName: 'A4', frequency: 440.00, type: 'natural', pianoKeyIndex: 9 },
  { name: 'Lá#', enName: 'A#4', frequency: 466.16, type: 'accidental', pianoKeyIndex: 10 },
  { name: 'Si', enName: 'B4', frequency: 493.88, type: 'natural', pianoKeyIndex: 11 },
  { name: 'Dó (Agudo)', enName: 'C5', frequency: 523.25, type: 'natural', pianoKeyIndex: 12 },
];

export const CLEFS: Clef[] = [
  {
    id: 'sol',
    name: 'Clave de Sol',
    icon: '🎼',
    description: 'Fixa a nota Sol na segunda linha do pentagrama. É a clave mais popular da música.',
    usage: 'Utilizada para instrumentos agudos como violino, flauta, saxofone, trompete e a mão direita do piano/teclado.',
    exampleNote: 'Sol4 (392Hz)',
  },
  {
    id: 'fa',
    name: 'Clave de Fá',
    icon: '𝄢',
    description: 'Fixa a nota Fá na quarta linha do pentagrama. Indica notas graves.',
    usage: 'Utilizada por instrumentos graves como violoncelo, contrabaixo, trombone, tuba e a mão esquerda do piano.',
    exampleNote: 'Fá3 (174.61Hz)',
  },
  {
    id: 'do',
    name: 'Clave de Dó',
    icon: '𝄡',
    description: 'Fixa a nota Dó central na terceira linha. É uma clave intermediária.',
    usage: 'Principalmente utilizada pela Viola (de orquestra) e ocasionalmente pelo fagote e violoncelo em registros médios.',
    exampleNote: 'Dó4 (261.63Hz)',
  },
];

export const RHYTHM_FIGURES: RhythmFigure[] = [
  {
    id: 'semibreve',
    name: 'Semibreve',
    duration: 1,
    beats: 4,
    symbol: '𝅝',
    restSymbol: '𝄻',
    silenceDescription: 'Pausa pendurada sob a 4ª linha',
  },
  {
    id: 'minima',
    name: 'Mínima',
    duration: 0.5,
    beats: 2,
    symbol: '𝅗𝅥',
    restSymbol: '𝄼',
    silenceDescription: 'Pausa apoiada sobre a 3ª linha',
  },
  {
    id: 'seminima',
    name: 'Semínima',
    duration: 0.25,
    beats: 1,
    symbol: '𝅘𝅥',
    restSymbol: '𝄽',
    silenceDescription: 'Pausa ondulada no centro do pentagrama',
  },
  {
    id: 'colcheia',
    name: 'Colcheia',
    duration: 0.125,
    beats: 0.5,
    symbol: '𝅘𝅥𝅮',
    restSymbol: '𝄾',
    silenceDescription: 'Pausa com uma bandeirola',
  },
  {
    id: 'semicolcheia',
    name: 'Semicolcheia',
    duration: 0.0625,
    beats: 0.25,
    symbol: '𝅘𝅥𝅯',
    restSymbol: '𝄿',
    silenceDescription: 'Pausa com duas bandeirolas',
  },
  {
    id: 'fusa',
    name: 'Fusa',
    duration: 0.03125,
    beats: 0.125,
    symbol: '𝅘𝅥𝅰',
    restSymbol: '𝅀',
    silenceDescription: 'Pausa com três bandeirolas',
  },
  {
    id: 'semifusa',
    name: 'Semifusa',
    duration: 0.015625,
    beats: 0.0625,
    symbol: '𝅘𝅥𝅱',
    restSymbol: '𝅁',
    silenceDescription: 'Pausa com quatro bandeirolas',
  },
];

export const INTERVALS: Interval[] = [
  { id: 'unissono', name: 'Uníssono', semitones: 0, description: 'A mesma nota exata reproduzida simultaneamente.', ratio: 1.0, soundExample: 'C4 + C4' },
  { id: 'segunda_m', name: 'Segunda Menor', semitones: 1, description: 'Intervalo de meio tom (semitom). Soa dissonante e tenso (Tema do filme Tubarão).', ratio: 1.059, soundExample: 'C4 -> C#4' },
  { id: 'segunda_M', name: 'Segunda Maior', semitones: 2, description: 'Intervalo de um tom completo. Base para construção de melodias fluidas.', ratio: 1.122, soundExample: 'C4 -> D4' },
  { id: 'terca_m', name: 'Terça Menor', semitones: 3, description: 'Intervalo triste e introspectivo. Define o caráter do Acorde Menor.', ratio: 1.189, soundExample: 'C4 -> D#4' },
  { id: 'terca_M', name: 'Terça Maior', semitones: 4, description: 'Intervalo alegre e aberto. Define o caráter do Acorde Maior.', ratio: 1.260, soundExample: 'C4 -> E4' },
  { id: 'quarta_j', name: 'Quarta Justa', semitones: 5, description: 'Intervalo de som neutro e estável, muito comum em arranjos harmônicos.', ratio: 1.335, soundExample: 'C4 -> F4' },
  { id: 'tritono', name: 'Trítono (Quarta Aumentada)', semitones: 6, description: 'O "Diabolus in Musica". Extremamente tenso, pede resolução imediata.', ratio: 1.414, soundExample: 'C4 -> F#4' },
  { id: 'quinta_j', name: 'Quinta Justa', semitones: 7, description: 'A harmonia perfeita. Base para os power chords do rock e o ciclo das quintas.', ratio: 1.498, soundExample: 'C4 -> G4' },
  { id: 'oitava', name: 'Oitava Justa', semitones: 12, description: 'Dobro da frequência. Som em fusão perfeita com a nota fundamental.', ratio: 2.0, soundExample: 'C4 -> C5' },
];

export const SCALES: Scale[] = [
  {
    id: 'maior',
    name: 'Escala Maior (Diatônica)',
    formula: 'Tom - Tom - Semitom - Tom - Tom - Tom - Semitom',
    intervals: [0, 2, 4, 5, 7, 9, 11, 12],
    description: 'A fundação da harmonia ocidental. Transmite sentimentos de brilho, alegria, claridade e estabilidade.',
    useCase: 'Usada em hinos, baladas alegres, pop moderno e a grande maioria das composições eruditas clássicas.',
  },
  {
    id: 'menor_natural',
    name: 'Escala Menor Natural',
    formula: 'Tom - Semitom - Tom - Tom - Semitom - Tom - Tom',
    intervals: [0, 2, 3, 5, 7, 8, 10, 12],
    description: 'Som introspectivo, melancólico, épico ou dramático. Muito rica para contar histórias e baladas profundas.',
    useCase: 'Presente no Heavy Metal, trilhas sonoras de filmes de aventura, blues e música folclórica.',
  },
  {
    id: 'pentatonica_maior',
    name: 'Escala Pentatônica Maior',
    formula: 'Tom - Tom - 1.5 Tom - Tom - 1.5 Tom',
    intervals: [0, 2, 4, 7, 9, 12],
    description: 'Uma escala antiga de 5 notas que não possui semitons. Impossível soar dissonante, soa natural e limpa.',
    useCase: 'A base definitiva para improvisação em solos de guitarra, rock, folk, pop e música tradicional oriental.',
  },
  {
    id: 'pentatonica_menor',
    name: 'Escala Pentatônica Menor',
    formula: '1.5 Tom - Tom - Tom - 1.5 Tom - Tom',
    intervals: [0, 3, 5, 7, 10, 12],
    description: 'Escala super expressiva de 5 notas. Perfeita para solar com sentimento de "alma" e melancolia com groove.',
    useCase: 'O coração do Blues, Rock n\' Roll e solos de Jazz.',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Qual é a distância em semitons entre as notas Dó (C4) e Mi (E4)?',
    options: [
      '2 semitons (1 tom)',
      '3 semitons (1 tom e meio)',
      '4 semitons (2 tons)',
      '5 semitons (2 tons e meio)',
    ],
    correctAnswer: '4 semitons (2 tons)',
    explanation: 'A distância de Dó a Mi é de 4 semitons: Dó -> Dó# (1), Dó# -> Ré (2), Ré -> Ré# (3), Ré# -> Mi (4). Isso representa uma Terça Maior.',
    difficulty: 'Fácil',
  },
  {
    id: 2,
    question: 'Na Clave de Sol, qual nota musical fica posicionada EXATAMENTE na segunda linha do pentagrama?',
    options: ['Dó', 'Mi', 'Sol', 'Si'],
    correctAnswer: 'Sol',
    explanation: 'A Clave de Sol é desenhada a partir da segunda linha do pentagrama, determinando que qualquer nota posicionada sobre essa linha chama-se Sol.',
    difficulty: 'Fácil',
  },
  {
    id: 3,
    question: 'Quantos tempos dura uma Semínima em um compasso padrão de 4/4?',
    options: ['4 tempos', '2 tempos', '1 tempo', 'Meio tempo'],
    correctAnswer: '1 tempo',
    explanation: 'Em um compasso 4/4, a Semínima é a figura rítmica padrão que equivale a 1 tempo. A semibreve dura 4, a mínima dura 2 e a colcheia dura meio tempo.',
    difficulty: 'Médio',
  },
  {
    id: 4,
    question: 'O que caracteriza o temido intervalo de Trítono na teoria musical?',
    options: [
      'Uma distância exata de 3 tons inteiros (6 semitons), famosa pela sua tensão e som sombrio.',
      'Uma combinação perfeita de três notas idênticas afinadas.',
      'Uma escala de três notas usada exclusivamente no folclore celta.',
      'O nome dado ao acorde de Dó maior na flauta doce.',
    ],
    correctAnswer: 'Uma distância exata de 3 tons inteiros (6 semitons), famosa pela sua tensão e som sombrio.',
    explanation: 'O trítono é formado por 3 tons inteiros (6 semitons). Ele gera uma forte dissonância acústica chamada de "o diabo na música" no período medieval.',
    difficulty: 'Médio',
  },
  {
    id: 5,
    question: 'Qual é a fórmula de intervalos que define uma Escala Maior Natural?',
    options: [
      'Tom - Semitom - Tom - Tom - Semitom - Tom - Tom',
      'Tom - Tom - Semitom - Tom - Tom - Tom - Semitom',
      'Tom - Tom - Tom - Semitom - Tom - Tom - Semitom',
      'Tom - Semitom - Tom - Semitom - Tom - Semitom - Tom',
    ],
    correctAnswer: 'Tom - Tom - Semitom - Tom - Tom - Tom - Semitom',
    explanation: 'A escala maior natural segue rigorosamente a fórmula: Tom, Tom, Semitom, Tom, Tom, Tom, Semitom. Exemplo de Dó Maior: C - D - E - F - G - A - B - C.',
    difficulty: 'Difícil',
  },
];

export const PRACTICAL_EXERCISES: Exercise[] = [
  {
    id: 1,
    title: 'Treinamento de Ouvido: Identificar a Nota',
    description: 'Ouça o som reproduzido e identifique se a nota ouvida é aguda ou grave comparada ao padrão.',
    instruction: 'Clique no botão para tocar e escolha a resposta correta.',
    type: 'identify-note',
    target: 'C5',
    options: ['Dó (C4) - Som Médio', 'Dó (C5) - Som Agudo', 'Mi (E4) - Som Intermediário'],
    successMessage: 'Incrível! Você identificou corretamente a frequência aguda do C5 (523Hz).',
    hint: 'As notas agudas têm vibrações mais rápidas e frequências maiores.',
  },
  {
    id: 2,
    title: 'Discernimento de Intervalos (Harmonia)',
    description: 'Identifique o sentimento do intervalo acústico tocado.',
    instruction: 'Toque o intervalo secreto de Terça Maior e avalie a "emoção" do acorde.',
    type: 'interval-ear',
    target: 'terca_M',
    options: ['Triste / Melancólico (Terça Menor)', 'Alegre / Aberto (Terça Maior)', 'Tenso / Assustador (Trítono)'],
    successMessage: 'Perfeito! A Terça Maior é o intervalo da felicidade na música ocidental.',
    hint: 'Tente sentir se o som parece expansivo e alegre ou focado e tristonho.',
  },
];
