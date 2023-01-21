<script setup lang="ts">
import { reactive, onMounted, toRefs } from 'vue'

import { 
  type Position, 
  createRandomGameBoard, 
  createBoardData, 
  checkPosition, } from './logic/game';
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

function handleClick(position: Position) {
  checkPosition(position, gameBoardData.board, overlapBoard.board)
}

function newGame() {
  gameBoardData.board = createBoardData(createRandomGameBoard(size, bombs))
  overlapBoard.board = Array(size).fill(1).map(() => Array(size).fill(1)) // 1 means overlaped and 0 means that is visible
}

</script>

<template>
  <div class="board">
    <div class="row" v-for="(row, i) in gameBoardData.board" :key="`row${i}`">
      <div :class="{
          cell: true,
          overlap: overlapBoard.board[i][j] === 1
      }" v-for="(cell, j) in row" :key="`cell${j}`" @click="handleClick({x:i, y:j})">
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
.overlap {
  position: relative;
  background-color: #101010;
}
</style>
