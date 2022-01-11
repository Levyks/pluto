
export type CellState = {
  letter: string;
  color: 'disabled' | 'default' | 'wrong' | 'wrong-place' | 'right';
}