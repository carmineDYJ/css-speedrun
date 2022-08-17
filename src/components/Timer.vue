<script setup>
import { computed, ref, watch } from 'vue';

const props = defineProps(['answerStatus'])

const currentQuestionSecondsPassed = ref(0)
const previousQuestionsSecondsPassed = ref(0)
const timerIntervalId = ref(null);
const start = ref(Date.now());

const startTimer = () => setInterval(function () {
  let delta = Date.now() - start.value; // seconds elapsed since start
  // total seconds passed equal to seconds used on previous questions and current question
  currentQuestionSecondsPassed.value = Math.floor(delta / 1000) + previousQuestionsSecondsPassed.value;
}, 1000) // update about every second
const timePassed = computed(() => {
  let minutes = String(parseInt(currentQuestionSecondsPassed.value / 60)).padStart(2, '0');
  let seconds = String(currentQuestionSecondsPassed.value % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
})
watch(() => props.answerStatus, (answerStatus, prevAnswerStatus) => {
  if (answerStatus === 'answering' && prevAnswerStatus === 'answerCorrect') {
    start.value = Date.now();
    timerIntervalId.value = startTimer();
  } else if (answerStatus === 'answerCorrect') {
    previousQuestionsSecondsPassed.value += currentQuestionSecondsPassed.value;
    clearInterval(timerIntervalId.value);
  } else if (answerStatus === 'allAnswered') {
    clearInterval(timerIntervalId.value);
  }
})
</script>

<template>
  <div class="timer-wrapper">
    <div class="timer">
      {{ timePassed }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.timer-wrapper {
  padding: 0 12px;

  .timer {
    color: white;
    font-family: 'Silkscreen-Regular';
    font-size: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #222;
    border-radius: 4px;
    background-color: #111;
    padding: 3px 6px;
  }
}
</style>