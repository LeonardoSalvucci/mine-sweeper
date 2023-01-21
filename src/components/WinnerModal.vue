<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  showModal: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <div class="overlay" v-if="showModal">
    <div class="modal">
      <h2>Congratulations!</h2>
      <p>You won the game!</p>
      <button @click="$emit('close')">Close</button>
    </div>
  </div>
</template>

<style scopped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
}
</style>