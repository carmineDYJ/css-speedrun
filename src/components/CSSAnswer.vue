<script setup>
import { ref, watch } from 'vue';
const props = defineProps(['answer', 'answerStatus', 'currentQuestionIndex'])
const emit = defineEmits(['update:answer', 'update:currentQuestionIndex', 'update:answerStatus'])
const answerRef = ref(null)
const buttonTextRef = ref('Submit')
const updateAnswerInput = () => {
  emit('update:answer', answerRef.value)
  // console.log("answerRef", answerRef.value)
}
const nextQuestion = () => {
  emit('update:currentQuestionIndex', props.currentQuestionIndex + 1)
  emit('update:answerStatus', 'answering')
  answerRef.value = ''
}
const formSubmit = (event) => {
  event.preventDefault()
  if (props.answerStatus === 'answering') {
    updateAnswerInput()
  } else if (props.answerStatus === 'answerCorrect') {
    nextQuestion()
  }
}

watch(() => props.answerStatus, () => {
  if (props.answerStatus === 'answering') {
    buttonTextRef.value = 'Submit'
  } else if (props.answerStatus === 'answerCorrect') {
    buttonTextRef.value = 'Next'
  }
})

</script>

<template>
  <form @submit="formSubmit">
    <input :value="answerRef" @input="(event) => answerRef = event.target.value" />
    <button type="submit">{{ buttonTextRef }}</button>
  </form>
</template>

<style lang="scss" scoped>
</style>
