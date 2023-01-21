<script setup lang="ts">
import { reactive, onMounted, toRefs } from 'vue'

import { 
  type Position, 
  createRandomGameBoard, 
  createBoardData, 
  isMine, 
  getNeighbors } from './logic/game';
import { MINE } from './constants';
interface Board {
  board: number[][];
}
const size = 5
const bombs = 2
const gameBoardData: Board= reactive({board: [[]]})
const overlapBoard: Board= reactive({board: [[]]})

onMounted(() => {
  gameBoardData.board = createBoardData(createRandomGameBoard(size, bombs))
  overlapBoard.board = Array(size).fill(1).map(() => Array(size).fill(1)) // 1 means overlaped and 0 means that is visible
})

function checkPosition(position: Position) {
  // Check if current position is already visited
  if(overlapBoard.board[position.x][position.y] === 0) return

  // Verify if current position is a mine
  if(gameBoardData.board[position.x][position.y] === -1) {
    alert('You lose')
    return
  }

  // Verify if current position is a number
  if (gameBoardData.board[position.x][position.y] > 0) {
    overlapBoard.board[position.x][position.y] = 0
    return
  }

  // Verify if current position is a 0 and we have to show the 0 and the adjacent cells
  showCellAndCheckAdjacents(position, gameBoardData, overlapBoard, [])
}

function showCellAndCheckAdjacents(position: Position, gameBoard: Board, overlapBoard: Board, visitedPositions: Position[]) {
  // First show current position
  overlapBoard.board[position.x][position.y] = 0

  // Check base case, this means that we can found a number and must return
  if (gameBoard.board[position.x][position.y] > 0) {
    return
  }

  // Set this position as visited
  visitedPositions.push(position)

  // Get valid neighbords
  const neighbors = getNeighbors(position, gameBoard.board).filter(position => !visitedPositions.some(visitedPosition => visitedPosition.x === position.x && visitedPosition.y === position.y))
  neighbors.forEach( (neighbor: Position) => {
    // We have two posible cases here, is a number or is a 0
    // If is a number we have to show it and return
    if (gameBoard.board[neighbor.x][neighbor.y] > 0) {
      overlapBoard.board[neighbor.x][neighbor.y] = 0
      return
    }

    // If if a 0 then we have to make a recursion call to verify it
    showCellAndCheckAdjacents(neighbor, gameBoard, overlapBoard, visitedPositions)
  })
}

function newGame() {
  gameBoardData.board = createBoardData(createRandomGameBoard(size, bombs))
  overlapBoard.board = Array(size).fill(1).map(() => Array(size).fill(1)) // 1 means overlaped and 0 means that is visible
}

// function showCellAndCheckAdjacents(position: Position, gameBoardData: Board, overlapBoard: Board, visitedPositions: Position[]) {
//   // This function is called when cell data is 0, so we must check neighbors
//   visitedPositions.push(position)
//   console.log(visitedPositions)
//   overlapBoard.board[position.x][position.y] = 0
//   if (gameBoardData.board[position.x][position.y] > 0) return
//   const neighbors = getNeighbors(position, gameBoardData.board).filter(position => !visitedPositions.some(visitedPosition => visitedPosition.x === position.x && visitedPosition.y === position.y))
//   console.log(neighbors)
//   neighbors.forEach(neighbor: Position => {
//     if(gameBoardData[neighbor.x][neighbor.y] === 0) { // This means that the cell is empty and must check it's adjacents too
//       showCellAndCheckAdjacents(neighbor, gameBoardData, overlapBoard, visitedPositions)
//     } else {
//       overlapBoard[neighbor.x][neighbor.y] = 0
//     }
//   })
// }

// function checkPosition(position: Position) {
//   // We have to check if the position has a mine and we lose the game
//   console.log(gameBoardData[position.x][position.y])
//   if(isMine(position, gameBoardData)) {
//     alert('You lose')
//   }
//   // We have to check if the position has a number and we show the number
//   if(gameBoardData[position.x][position.y] > 0) {
//     overlapBoard[position.x][position.y] = 0
//   } else {
//     // We have to check if the position has a 0 and we show the 0 and the adjacent cells
//     showCellAndCheckAdjacents(position, gameBoardData, overlapBoard, [])
//   }
//   console.log(position)
//   console.log(overlapBoard)
// }
</script>

<template>
  <div class="board">
    <div class="row" v-for="(row, i) in gameBoardData.board" :key="`row${i}`">
      <div class="cell" v-for="(cell, j) in row" :key="`cell${j}`" @click="checkPosition({x:j, y:i})">
        {{ cell === -1 ? MINE : cell !== 0 ? `${cell}` : '' }}
      </div>
    </div>
  </div>
  <section class="actions">
    <button type="button" @click="newGame">New Game</button>
  </section>
</template>

<style scoped>
.board {
  display: grid;
  grid-template-columns: repeat(v-bind(size), 1fr);
  background-color: #fff;
}
.cell {
  border: 1px solid #101010;
  height: 35px;
  width: 35px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  cursor: pointer;
}
.actions {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
