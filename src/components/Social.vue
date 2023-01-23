<script setup lang="ts">
</script>

<template>
  <header class="container">
    <div class="social-container">
      <a
        class="icon"
        href="https://github.com/LeonardoSalvucci/mine-sweeper"
        target="_blank"
      >
        <img src="/img/github.svg" />
      </a>
      <a
        class="icon"
        href="https://www.linkedin.com/in/leonardosalvucci/"
        target="_blank"
      >
        <img
          src="/img/linkedin.svg"
        />
      </a>
    </div>
  </header>
</template>

<style scopped>
.container {
  position: fixed;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;

}
.social-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}
.social-container::before {
  background-color: #fff;
  height: 20rem;
  width: 10rem;
  position: absolute;
  z-index: 0;
}
.icon {
  width: 100%;
  padding: 10px;
  z-index: 10;
  color: #101010;
}
img {
  height: 28px;
}
img:hover {
  transform: scale(1.2);
  transition: all 0.3s ease-in-out;
}
</style>