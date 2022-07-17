import { padEnd, padStart } from 'lodash';

export type Logger = {
  debug(...args: any[]): void;
  info(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
}

export type ColorMap = {
  debug: string;
  info: string;
  warn: string;
  error: string;
}

export type WeightMap = {
  debug: number;
  info: number;
  warn: number;
  error: number;
}

export type LevelHint = (level: Levels) => string;

export type Levels = 'debug' | 'info' | 'warn' | 'error';

export const configs: {
  colors: ColorMap;
  weights: WeightMap;
  levelHint: LevelHint;
} = {
  colors: {
    debug: '#aaa',
    info: '#383',
    warn: '#c83',
    error: '#c33',
  },
  weights: {
    debug: 350,
    info: 400,
    warn: 400,
    error: 400,
  },
  levelHint: (level: Levels) => padEnd(`[${level}]`, 7),
};

export function emojiHint(level: Levels): string {
  return {
    debug: '🛠️',
    info: '💬',
    warn: '⚠️',
    error: '❌',
  }[level];
}

function bindLogger(level: Levels, module: string) {
  return console[level].bind(
    console,
    '%c' + configs.levelHint(level) + `%c${padStart(module, 12)}`,
    `color: ${configs.colors[level]}; font-weight: ${configs.weights[level]};`,
    `color: ${configs.colors[level]}; font-weight: ${configs.weights[level]};`,
  );
}

export function createLogger(module: string): Logger {
  return {
    debug: bindLogger('debug', module),
    info: bindLogger('info', module),
    warn: bindLogger('warn', module),
    error: bindLogger('error', module),
  };
}

export default {
  createLogger,
  emojiHint,
  configs,
};
