<script setup lang="ts">
import { createRandomGameBoard, createBoardData } from './logic/game';
import { MINE } from './constants';
const size = 10
const gameBoardData = createBoardData(createRandomGameBoard(size))
</script>

<template>
  <div class="board">
    <div class="row" v-for="(row, i) in gameBoardData" :key="`row${i}`">
      <div class="cell" v-for="(cell, j) in row" :key="`cell${j}`">
        {{ cell === -1 ? MINE : cell !== 0 ? `${cell}` : '' }}
      </div>
    </div>
  </div>

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
}


</style>
