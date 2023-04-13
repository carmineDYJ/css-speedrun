<script setup>
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
import { useCSSQuestionsStore } from '../hooks/useCSSQuestions';
import { useCSSAnswerStore } from '../hooks/useCSSAnswer';

const CSSQuestionsStore = useCSSQuestionsStore()
const {questionsAnswered} = storeToRefs(CSSQuestionsStore)
const {addAnswerTime} = CSSQuestionsStore
const CSSAnswerStore = useCSSAnswerStore()
const {answerStatus} = storeToRefs(CSSAnswerStore)

const currentQuestionSecondsPassed = ref(0)
const previousQuestionsSecondsPassed = ref(0)
const totalSecondsPassed = ref(0)
const timerIntervalId = ref(null);
const start = ref(Date.now());
const showTimerJumpRef = ref(false)

const startTimer = () => setInterval(function () {
  let delta = Date.now() - start.value; // seconds elapsed since start
  // total seconds passed equal to seconds used on previous questions and current question
  currentQuestionSecondsPassed.value = Math.floor(delta / 1000)
  totalSecondsPassed.value = currentQuestionSecondsPassed.value + previousQuestionsSecondsPassed.value;
}, 1000) // update about every second
const formatTime = (secondsPassed) => {
  const minutes = String(parseInt(secondsPassed / 60)).padStart(2, '0');
  const seconds = String(secondsPassed % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}
const totalTimePassed = computed(() => formatTime(totalSecondsPassed.value))
const currentQuestionTimePassed = computed(() => formatTime(currentQuestionSecondsPassed.value))
watch(answerStatus, (answerStatus, prevAnswerStatus) => {
  if (answerStatus === 'answering' && prevAnswerStatus === 'answerCorrect') {
    start.value = Date.now();
    timerIntervalId.value = startTimer();
  } else if (answerStatus === 'answerCorrect') {
    addAnswerTime(currentQuestionSecondsPassed.value)
    previousQuestionsSecondsPassed.value += currentQuestionSecondsPassed.value;
    clearInterval(timerIntervalId.value);
  } else if (answerStatus === 'allAnswered') {
    addAnswerTime(currentQuestionSecondsPassed.value)
    clearInterval(timerIntervalId.value);
  }
})
watch(questionsAnswered, () => {
  showTimerJumpRef.value = true
  setTimeout(() => {
    showTimerJumpRef.value = false
  }, 1000)
})
</script>

<template>
  <div class="timer-wrapper">
    <div class="timer">
      {{ totalTimePassed }}
      <div v-if="showTimerJumpRef" class="timer-jump">
        {{ currentQuestionTimePassed }}
      </div>
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
    position: relative;

    &-jump {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: rgb(93, 158, 83);
      animation: timer-jump-animation 1s ease-in;
    }
  }
}
@keyframes timer-jump-animation {
  0% {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) translateY(-48px);
    opacity: 0;
  }
}
</style>
