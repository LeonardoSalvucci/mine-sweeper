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

function showCellAndCheckAdjacents(position: Position, gameBoard: number[][], overlapBoard: number[][], visitedPositions: Position[]) {
  // First show current position
  overlapBoard[position.x][position.y] = 0

  // Check base case, this means that we can found a number and must return
  if (gameBoard[position.x][position.y] > 0) {
    return
  }

  // Set this position as visited
  visitedPositions.push(position)

  // Get valid neighbords
  const neighbors = getNeighbors(position, gameBoard).filter(position => !visitedPositions.some(visitedPosition => visitedPosition.x === position.x && visitedPosition.y === position.y))
  neighbors.forEach( (neighbor: Position) => {
    // We have two posible cases here, is a number or is a 0
    // If is a number we have to show it and return
    if (gameBoard[neighbor.x][neighbor.y] > 0) {
      overlapBoard[neighbor.x][neighbor.y] = 0
      return
    }

    // If if a 0 then we have to make a recursion call to verify it
    showCellAndCheckAdjacents(neighbor, gameBoard, overlapBoard, visitedPositions)
  })
}

export function checkPosition(position: Position, gameBoard: number[][], overlapBoard: number[][]) {
  // Check if current position is already visited
  if(overlapBoard[position.x][position.y] === 0) return

  // Verify if current position is a mine
  if(gameBoard[position.x][position.y] === -1) {
    alert('You lose')
    return
  }

  // Verify if current position is a number
  if (gameBoard[position.x][position.y] > 0) {
    overlapBoard[position.x][position.y] = 0
    return
  }

  // Verify if current position is a 0 and we have to show the 0 and the adjacent cells
  showCellAndCheckAdjacents(position, gameBoard, overlapBoard, [])
}