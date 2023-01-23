<script setup lang="ts">
defineProps({
  showModal: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="overlay" v-if="showModal">
    <div class="modal">
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>
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
  z-index: 2;
}
.modal {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  z-index: 2;
}
button {
  border: 2px solid #101010;
  background-color: #fff;
  color: #101010;
  font-family: inherit;
  font-size: inherit;
  padding: 10px 20px;
  cursor: pointer;
}
button:hover {
  border: 2px solid #fff;
  background-color: #101010;
  color: #fff;
  transition: all 0.2s ease-in-out;
}
</style>