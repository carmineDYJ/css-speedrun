<script setup>
import { computed, ref, watch } from 'vue';

const props = defineProps(['answerStatus', 'currentQuestionAnswerTime', 'currentQuestionIndex'])
const emit = defineEmits(['update:currentQuestionAnswerTime'])

const currentQuestionSecondsPassed = ref(0)
const previousQuestionsSecondsPassed = ref(0)
const totalSecondsPassed = ref(0)
const timerIntervalId = ref(null);
const start = ref(Date.now());

const startTimer = () => setInterval(function () {
  let delta = Date.now() - start.value; // seconds elapsed since start
  // total seconds passed equal to seconds used on previous questions and current question
  currentQuestionSecondsPassed.value = Math.floor(delta / 1000)
  totalSecondsPassed.value = currentQuestionSecondsPassed.value + previousQuestionsSecondsPassed.value;
}, 1000) // update about every second
const timePassed = computed(() => {
  let minutes = String(parseInt(totalSecondsPassed.value / 60)).padStart(2, '0');
  let seconds = String(totalSecondsPassed.value % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
})
watch(() => props.answerStatus, (answerStatus, prevAnswerStatus) => {
  if (answerStatus === 'answering' && prevAnswerStatus === 'answerCorrect') {
    start.value = Date.now();
    timerIntervalId.value = startTimer();
  } else if (answerStatus === 'answerCorrect') {
    // the reason for emitting a obj instead of a int is when answer time for two questions are the same,
    // the emitted value will be the same, so the answer time for the second question cannot be detected in App watch
    emit('update:currentQuestionAnswerTime', {
      currentQuestionIndex: props.currentQuestionIndex,
      timeUsed: currentQuestionSecondsPassed.value,
    })
    previousQuestionsSecondsPassed.value += currentQuestionSecondsPassed.value;
    clearInterval(timerIntervalId.value);
  } else if (answerStatus === 'allAnswered') {
    emit('update:currentQuestionAnswerTime', {
      currentQuestionIndex: props.currentQuestionIndex,
      timeUsed: currentQuestionSecondsPassed.value,
    })
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
  }
}
</style>