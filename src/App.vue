<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'

import { 
  type Position, 
  createRandomGameBoard, 
  createBoardData, 
  checkPosition,
  checkWinCondition
} from './logic/game';
import { MINE } from './constants';
interface Board {
  board: number[][];
}
const size = ref(5)
const bombs = ref(2)

const gameBoardData: Board= reactive({board: [[]]})
const overlapBoard: Board= reactive({board: [[]]})
const inGame = ref(true)

onMounted(() => {
  newGame()
})

function handleClick(position: Position) {
  if(inGame.value) {
    if(!checkPosition(position, gameBoardData.board, overlapBoard.board)) {
      alert('You Lose')
      inGame.value = false
    }

    if(checkWinCondition(gameBoardData.board, overlapBoard.board)) {
      alert('You Win')
      inGame.value = false
    }
  }
}

function newGame() {
  gameBoardData.board = createBoardData(createRandomGameBoard(size.value, bombs.value))
  overlapBoard.board = Array(size.value).fill(1).map(() => Array(size.value).fill(1)) // 1 means overlaped and 0 means that is visible
  inGame.value = true
}

</script>

<template>
  <div class="board">
    <div class="row" v-for="(row, i) in gameBoardData.board" :key="`row${i}`">
      <div :class="{
          cell: true,
          overlap: overlapBoard.board[i][j] === 1
      }" v-for="(cell, j) in row" :key="`cell${j}`" @click="handleClick({x:i, y:j})">
        <span :class="{
          hidden: overlapBoard.board[i][j] === 1
        }">{{ cell === -1 ? MINE : cell !== 0 ? `${cell}` : '' }}</span>
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
.overlap {
  position: relative;
  background-color: #101010;
  display: block;
  border: 1px solid #fff;
}
.hidden {
  display: none;
}
</style>
