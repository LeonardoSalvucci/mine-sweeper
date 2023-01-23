<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import Modal from './components/Modal.vue'
import Social from './components/Social.vue'

import { 
  type Position, 
  createRandomGameBoard, 
  createBoardData, 
  checkPosition,
  checkWinCondition
} from './logic/game';

import { dispatchConfetti } from './logic/confetti';

import { MINE, gameSettings } from './constants';
import { Board, GameSettings } from './types';

const size = ref(15)
const bombs = ref(5)

const gameBoardData: Board= reactive({board: [[]]})
const overlapBoard: Board= reactive({board: [[]]})
const inGame = ref(true)

// Modal references
const showModal = ref(false)
const title = ref("")
const message = ref("")

onMounted(() => {
  newGame()
})

function showBombs() {
  overlapBoard.board = gameBoardData.board.map(row => row.map(cell => 0))
}

function showWinnerModal() {
  title.value = "Congratulations!"
  message.value = "You won the game."
  showModal.value = true
}

function showLoserModal() {
  title.value = "Sorry!"
  message.value = "You lose the game."
  showModal.value = true
}

function handleClick(position: Position) {
  if(inGame.value) {
    if(!checkPosition(position, gameBoardData.board, overlapBoard.board)) {
      // Show bomb
      overlapBoard.board[position.x][position.y] = 0
      // Show loser modal
      showLoserModal()
      // Set gane as ended
      inGame.value = false
    }

    if(checkWinCondition(gameBoardData.board, overlapBoard.board)) {
      // Show all bomb
      showBombs()
      // Dispatch confetti
      dispatchConfetti()
      // Show winner modal
      showWinnerModal()
      // Set gane as ended
      inGame.value = false
    }
  }
}

function newGame(setting?: GameSettings) {
  if(setting) {
    size.value = setting.size
    bombs.value = setting.bombs
  } else {
    // Default game is junior
    const junior = gameSettings.find(setting => setting.label === 'JUNIOR')
    if (junior) {
      size.value = junior.size
      bombs.value = junior.bombs
    } else {
      // If junior is not defined in constants set hardcoded values
      size.value = 9
      bombs.value = 10
    }
  }
  gameBoardData.board = createBoardData(createRandomGameBoard(size.value, bombs.value))
  overlapBoard.board = Array(size.value).fill(1).map(() => Array(size.value).fill(1)) // 1 means overlaped and 0 means that is visible
  inGame.value = true
}

</script>

<template>
  <Social />
  <section class="actions">
    <button 
      v-for="setting in gameSettings"
      :key="setting.label"
      type="button" @click="newGame(setting)">{{ setting.label }}
    </button>
  </section>
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
    <button type="button" @click="newGame()">New Game</button>
  </section>
  <Modal 
    :show-modal="showModal" 
    @close="showModal = false"
    :title="title"
    :message="message"  />
</template>

<style scoped>
.board {
  display: grid;
  grid-template-columns: repeat(v-bind(size), 1fr);
  background-color: #fff;
  margin: 20px auto 20px auto; 
  inline-size: fit-content;
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
  gap: 20px;
}
.actions button {
  padding: 10px;
  border: 1px solid #101010;
  background-color: #fff;
  color: #101010;
  font-family: inherit;
  font-size: inherit;
  display: flex;
  cursor: pointer;
  vertical-align: text-bottom;
}
.actions button:hover {
  border: 1px solid #fff;
  background-color: #101010;
  color: #fff;
  transition: all 0.2s ease-in-out;
}
.overlap {
  position: relative;
  background-color: #101010;
  display: block;
  border: 1px solid #fff;
  transition: background-color 0.2s ease-in-out;
}
.overlap:hover {
  background-color: #999;
}
.hidden {
  display: none;
}

</style>
