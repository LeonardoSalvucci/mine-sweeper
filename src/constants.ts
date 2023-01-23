import { GameSettings } from "./types";

export const MINE = '💣';
export const gameSettings: GameSettings[] = [
  {
    label: 'JUNIOR',
    size: 9,
    bombs: 10,
  },
  {
    label: 'SEMI-SENIOR',
    size: 16,
    bombs: 40,
  },
  {
    label: 'SENIOR',
    size: 30,
    bombs: 99,
  }
]