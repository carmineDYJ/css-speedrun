<script setup>
import { computed, ref } from 'vue';
const secondsPassed = ref(0)
let start = Date.now();
setInterval(function () {
  let delta = Date.now() - start; // seconds elapsed since start
  secondsPassed.value = Math.floor(delta / 1000); // in seconds
}, 1000); // update about every second
const timePassed = computed(() => {
  let minutes  = String(parseInt(secondsPassed.value / 60)).padStart(2, '0');
  let seconds = String(secondsPassed.value % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
})
</script>

<template>
  <div class="timer">
    {{ timePassed }}
  </div>
</template>

<style lang="scss" scoped>
.timer {
  color: white;
}
</style>