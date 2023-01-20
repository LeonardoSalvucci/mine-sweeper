<script setup lang="ts">
import { createRandomGameBoard, createBoardData } from './logic/game';
const size = 10
const gameBoard = createRandomGameBoard(10)
console.log(gameBoard)
const gameBoardData = createBoardData(gameBoard)
console.log(gameBoardData)
</script>

<template>
  <div class="board">
    <div class="row" v-for="(row, i) in gameBoard" :key="`row${i}`">
      <div class="cell" v-for="(cell, j) in row" :key="`cell${j}`">
        {{ cell }}
      </div>
    </div>
  </div>

</template>

<style scoped>
.board {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
}
.row {
  background-color: #fff;
}
.cell {
  padding: 5px;
  border: 1px solid #101010;
  height: 35px;
  width: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
}


</style>
