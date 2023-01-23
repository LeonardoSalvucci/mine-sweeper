<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  elapsedTime: number
}

const props: Props = defineProps({
  elapsedTime: {
    type: Number,
    default: 0
  }
})

const showTime = computed(() => {
  const minutes = Math.floor(props.elapsedTime / 60)
  const seconds = props.elapsedTime % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})
</script>

<template>
<section>
  <h1 class="clock">{{ showTime }}</h1>
</section>
</template>

<style scoped>
.clock {
  font-size: 2rem;
  line-height: 2rem;
  font-weight: 700;
  color: #fff;
  text-align: center;
  margin: 0;
  letter-spacing: 1rem;
}
</style>