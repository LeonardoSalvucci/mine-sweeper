<script setup lang="ts">
import { reactive, onMounted, ref, onBeforeUnmount } from 'vue'
import Modal from './components/Modal.vue'
import Social from './components/Social.vue'
import Clock from './components/Clock.vue'

import { 
  type Position, 
  createRandomGameBoard, 
  createBoardData, 
  checkPosition,
  checkWinCondition
} from './logic/game';

import { dispatchConfetti } from './logic/confetti';

import { MINE, FLAG, gameSettings } from './constants';
import { Board, GameSettings } from './types';

const size = ref(15)
const bombs = ref(5)

const gameBoardData: Board= reactive({board: [[]]})
const overlapBoard: Board= reactive({board: [[]]})
const flagsBoard: Board= reactive({board: [[]]})
const inGame = ref(true)

// Modal references
const showModal = ref(false)
const title = ref("")
const message = ref("")

// Clock
const elapsedTime = ref(10)
let clockInterval: number;

onMounted(() => {
  // Disable context menu
  document.addEventListener('contextmenu', event => event.preventDefault())
  newGame()
})

onBeforeUnmount(() => {
  // Clear interval
  clearInterval(clockInterval)
  // Clear Listener
  document.removeEventListener('contextmenu', event => event.preventDefault())
})

function showBombs() {
  overlapBoard.board = gameBoardData.board.map(row => row.map(cell => 0)) // ahow all cells
  flagsBoard.board = flagsBoard.board.map(row => row.map(cell => 0)) // remove all flags
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

  if(inGame.value && flagsBoard.board[position.x][position.y] === 0) { // Verify if there's a flag and prevent click
    if(!checkPosition(position, gameBoardData.board, overlapBoard.board)) {
      // Show bomb
      overlapBoard.board[position.x][position.y] = -1 // -1 means that is a bomb and exploded
      // Show loser modal
      showLoserModal()
      // Set gane as ended
      inGame.value = false
      // Stop clock
      clearInterval(clockInterval)
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
      // Stop clock
      clearInterval(clockInterval)
    }
  }
}

function toggleFlag(position: Position) {
  console.log('RIGHT CLICK')
  if(inGame.value) { // Only when game is started
    if(overlapBoard.board[position.x][position.y] === 1) { // Only when is not visible
      flagsBoard.board[position.x][position.y] = flagsBoard.board[position.x][position.y] === 0 ? 1 : 0
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
  flagsBoard.board = Array(size.value).fill(0).map(() => Array(size.value).fill(0)) // 1 means that is a flag and 0 means that is not a flag
  
  // Set game as started
  inGame.value = true
  
  // Start clock
  clearInterval(clockInterval) // prevent if clock is already running
  elapsedTime.value = 0
  clockInterval = setInterval(increaseTime, 1000)
}

function increaseTime() {
  if(inGame.value) {
    elapsedTime.value += 1
  }
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
          overlap: overlapBoard.board[i][j] === 1,
          explosion: overlapBoard.board[i][j] === -1
        }" v-for="(cell, j) in row" :key="`cell${j}`" 
        @click="handleClick({x:i, y:j})" 
        @click.right="toggleFlag({x:i, y:j})">
        <span :class="{
          hidden: overlapBoard.board[i][j] === 1
        }">
        {{ cell === -1 ? MINE : cell !== 0 ? `${cell}` : '' }}
      </span>
      <span v-if="flagsBoard.board[i][j] === 1" class="flag">{{ FLAG }}</span>
      </div>
    </div>
  </div>
  <section class="actions">
    <Clock :elapsed-time="elapsedTime"/>
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
  align-items: center;
  cursor: pointer;
}
@keyframes explosion {
  0% {
    transform: scale(1);
  }
  20% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
.explosion {
  background-color: #f58686;
  animation-duration: 1s;
  animation-name: explosion;
  animation-iteration-count: infinite;
  z-index: 1;
  position: sticky;
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
.flag {
  font-size: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  height: 100%;
  background: radial-gradient(transparent 60%, white);
}
.hidden {
  display: none;
}

</style>
