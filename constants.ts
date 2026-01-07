import { ConsoleOption } from './types';

export const CONSOLES: ConsoleOption[] = [
  {
    id: 'atari',
    name: 'Atari',
    era: '2ª Geração',
    description: 'O pioneiro. Gráficos em blocos e a magia dos primeiros pixels.',
    color: 'border-amber-600',
    gradient: 'bg-gradient-to-br from-amber-900 to-orange-700'
  },
  {
    id: 'nes',
    name: 'Nintendo 8 bits',
    era: '3ª Geração',
    description: 'O clássico Nintendinho. A era de ouro do pixel art 8-bit.',
    color: 'border-red-600',
    gradient: 'bg-gradient-to-br from-red-800 to-gray-700'
  },
  {
    id: 'master',
    name: 'Master System',
    era: '3ª Geração',
    description: 'Cores vibrantes e o brilho da SEGA nos anos 80.',
    color: 'border-blue-600',
    gradient: 'bg-gradient-to-br from-blue-900 to-slate-800'
  },
  {
    id: 'snes',
    name: 'Super Nintendo',
    era: '4ª Geração',
    description: 'A perfeição dos 16-bits. Gráficos ricos e detalhados.',
    color: 'border-purple-600',
    gradient: 'bg-gradient-to-br from-purple-800 to-indigo-600'
  },
  {
    id: 'mega',
    name: 'Mega Drive',
    era: '4ª Geração',
    description: 'Velocidade e atitude. O contraste preto e dourado da SEGA.',
    color: 'border-yellow-500',
    gradient: 'bg-gradient-to-br from-slate-900 to-yellow-700'
  },
  {
    id: 'gameboy',
    name: 'Gameboy',
    era: 'Portátil',
    description: 'Diversão em qualquer lugar. O icônico estilo verde monocromático.',
    color: 'border-green-600',
    gradient: 'bg-gradient-to-br from-green-800 to-emerald-600'
  },
  {
    id: 'ps1',
    name: 'Playstation 1',
    era: '5ª Geração',
    description: 'A revolução 3D. Polígonos marcantes e nostalgia em CD.',
    color: 'border-slate-400',
    gradient: 'bg-gradient-to-br from-slate-700 to-slate-500'
  },
  {
    id: 'xbox',
    name: 'Xbox',
    era: '6ª Geração',
    description: 'Poder bruto e o clássico brilho verde radioativo da Microsoft.',
    color: 'border-green-500',
    gradient: 'bg-gradient-to-br from-green-900 to-black'
  },
  {
    id: 'ps2',
    name: 'Playstation 2',
    era: '6ª Geração',
    description: 'O console mais vendido. Estética moderna e limpa do início dos 2000.',
    color: 'border-blue-500',
    gradient: 'bg-gradient-to-br from-blue-800 to-indigo-950'
  },
  {
    id: 'xbox360',
    name: 'Xbox 360',
    era: '7ª Geração',
    description: 'Alta definição e a era das conquistas. Estética branca e verde.',
    color: 'border-lime-500',
    gradient: 'bg-gradient-to-br from-lime-600 to-emerald-900'
  }
];