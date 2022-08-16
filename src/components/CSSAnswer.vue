<script setup>
import { ref, watch } from 'vue';

const props = defineProps(['answer', 'answerStatus', 'currentQuestionIndex'])
const emit = defineEmits(['update:answer', 'update:currentQuestionIndex', 'update:answerStatus'])
const answerValueRef = ref(null)
const answerInputRef = ref(null)
const buttonTextRef = ref('Submit')
const updateAnswerInput = () => {
  emit('update:answer', answerValueRef.value)
}
const nextQuestion = () => {
  emit('update:currentQuestionIndex', props.currentQuestionIndex + 1)
  emit('update:answerStatus', 'answering')
  answerValueRef.value = ''
  emit('update:answer', answerValueRef.value)
}
const formSubmit = (event) => {
  event.preventDefault()
  if (props.answerStatus === 'answering' || props.answerStatus === 'introduction') {
    updateAnswerInput()
  } else if (props.answerStatus === 'answerCorrect') {
    nextQuestion()
  } else if (props.answerStatus === 'allAnswered') {

  }
}
watch(() => props.answerStatus, () => {
  if (props.answerStatus === 'answering' || props.answerStatus === 'introduction') {
    answerInputRef.value.classList.remove('answer-correct')
    buttonTextRef.value = 'Submit'
  } else if (props.answerStatus === 'answerCorrect') {
    answerInputRef.value.classList.add('answer-correct')
    buttonTextRef.value = 'Next'
  } else if (props.answerStatus === 'allAnswered') {
    buttonTextRef.value = 'Congrats!'
  }
})

</script>

<template>
  <form @submit="formSubmit">
    <input
      class="answer-input"
      ref="answerInputRef"
      placeholder="输入CSS选择器，例如: ol > li"
      autocomplete="off"
      size="24"
      :value="answerValueRef"
      @input="(event) => answerValueRef = event.target.value" />
    <button class="submit-button" type="submit">{{ buttonTextRef }}</button>
  </form>
</template>

<style lang="scss" scoped>
.answer-input {
  background-color: #111111;
  color: white;
  border: 1px solid #222;
  border-radius: 4px;
  padding: 12px;
  font-size: 18px;
  margin-right: 6px;
  &.answer-correct {
    border: 1px solid #5d9e53;
  }
}
.submit-button {
  font-size: 16px;
  padding: 12px 4px;
  border-radius: 4px;
  border: none;
  width: 80px;
  color: white;
  background-color: #4e8ff7;
  &:hover {
  background-color: #2f6eeb;;
}
}
</style>
