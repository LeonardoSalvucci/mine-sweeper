export interface Board {
  board: number[][];
}

export interface GameSettings {
  label: string;
  size: number;
  bombs: number;
}

export interface TouchTracker {
  event?: 'start' | 'hold' | 'end';
  position?: Position;
  lastTime?: number;
}

export interface Position {
  x: number;
  y: number;
}