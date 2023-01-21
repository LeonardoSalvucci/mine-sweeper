const MINE = -1;
export interface Position {
  x: number;
  y: number;
}

function isValidPosition(position: Position, grid: number[][]) {
  return (position.x >= 0) && (position.x < grid[0].length) &&
         (position.y >= 0) && (position.y < grid[1].length)
}

export function isMine(position: Position, grid: number[][]): boolean {
  return grid[position.x][position.y] === MINE;
}

export function getNeighbors(position: Position, grid: number[][]): Position[] {
  const neighbors = [
    {x: position.x, y: position.y - 1}, // North
    {x: position.x + 1, y: position.y - 1}, // North-East
    {x: position.x + 1, y: position.y}, // East
    {x: position.x + 1, y: position.y + 1}, // South-East
    {x: position.x, y: position.y + 1}, // South
    {x: position.x - 1, y: position.y + 1}, // South-West
    {x: position.x - 1, y: position.y}, // West
    {x: position.x - 1, y: position.y - 1}, // North-West
  ]
  return neighbors.filter(point => isValidPosition(point, grid))
}

function countMines(position: Position, grid: number[][]) {
  const neighbors = getNeighbors(position, grid)
  let count = 0;
  neighbors.forEach(point => {
    if(isMine(point, grid)) {
      count+=1
    }
  })
  return count
}

export function createBoardData(mineBoard: number[][]): number[][] {
  const board = Array(mineBoard.length).fill('').map(() => Array(mineBoard[0].length).fill(''))
  for(let i = 0; i < mineBoard.length; i++) {
    for (let j = 0; j < mineBoard[i].length; j++) {
      const currentPos: Position = {x: i, y: j}
      board[i][j] = isMine(currentPos, mineBoard) ? MINE : countMines(currentPos, mineBoard)
    }
  }
  return board
}

export function createRandomGameBoard(size = 10, bombs = 5): number[][] {
  console.log('CREATE')
  const mineBoard = Array(size).fill('').map(() => Array(size).fill(''))
  for(let i = 0; i < bombs; i++) {
    let x = Math.floor(Math.random()*(size-1))
    let y = Math.floor(Math.random()*(size-1))
    
    // Ensure that the mine is not placed on an existing mine
    while(mineBoard[x][y] === MINE) {
      x = Math.floor(Math.random()*(size-1))
      y = Math.floor(Math.random()*(size-1))
    }

    mineBoard[x][y] = MINE
  }
  return [...mineBoard]
}