<script setup>
import { computed, ref, watch } from 'vue';
import CSSQuestions from '../questions/CSSQuestions';

const props = defineProps(['answer', 'answerStatus', 'currentQuestionIndex'])
const emit = defineEmits(['update:answer', 'update:currentQuestionIndex', 'update:answerStatus'])

const answerValueRef = ref(null)
const answerInputRef = ref(null)
const buttonTextRef = ref('提交')

const answerStatusHintRef = ref(null)
const questionAnswer = computed(() => {
  return CSSQuestions[props.currentQuestionIndex]['answer']
})

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
  if (props.answerStatus === 'answering'
    || props.answerStatus === 'introduction'
    || props.answerStatus === 'answerInvalidSelector') {
    updateAnswerInput()
  } else if (props.answerStatus === 'answerCorrect') {
    nextQuestion()
  } else if (props.answerStatus === 'allAnswered') {

  }
}
watch(() => props.answerStatus, () => {
  answerInputRef.value.classList.remove('answer-correct')
  answerInputRef.value.classList.remove('answer-invalid')
  answerInputRef.value.removeAttribute('disabled')
  if (props.answerStatus === 'answering'
    || props.answerStatus === 'introduction') {
    buttonTextRef.value = '提交'
  } else if (props.answerStatus === 'answerCorrect') {
    answerInputRef.value.setAttribute('disabled', '')
    answerInputRef.value.classList.add('answer-correct')
    buttonTextRef.value = '下一题'
  } else if (props.answerStatus === 'allAnswered') {
    answerInputRef.value.setAttribute('disabled', '')
    answerInputRef.value.classList.add('answer-correct')
    buttonTextRef.value = '恭喜!'
  } else if (props.answerStatus === 'answerInvalidSelector') {
    answerInputRef.value.classList.add('answer-invalid')
    buttonTextRef.value = '提交'
  }
})

watch(() => props.answerStatus, (answerStatus) => {
  if (answerStatus === 'answering') {
    answerStatusHintRef.value = null;
  } else if (answerStatus === 'answerCorrect') {
    answerStatusHintRef.value = {
      hintType: 'correct',
      content: `示例答案: ${questionAnswer.value}`
    }
  } else if (answerStatus === 'allAnswered') {
    answerStatusHintRef.value = {
      hintType: 'correct',
      content: `示例答案: ${questionAnswer.value}\n恭喜你，全部答对啦！`
    }
  } else if (answerStatus === 'answerInvalidSelector') {
    answerStatusHintRef.value = {
      hintType: 'wrong',
      content: `选择器无效哦，请检查后再试`
    }
  }
})

</script>

<template>
  <div class="css-answer-wrapper">
    <form @submit="formSubmit" class="submit-answer-form">
      <input class="answer-input" ref="answerInputRef" placeholder="输入CSS选择器，例如: ol > li" autocomplete="off"
        :value="answerValueRef" @input="(event) => answerValueRef = event.target.value" />
      <button class="submit-button" type="submit">{{ buttonTextRef }}</button>
    </form>
    <div class="answer-status-hint" v-if="answerStatusHintRef">
      <div class="correct" v-if="answerStatusHintRef.hintType === 'correct'">
        {{ answerStatusHintRef.content }}
      </div>
      <div class="wrong" v-else-if="answerStatusHintRef.hintType === 'wrong'">
        {{ answerStatusHintRef.content }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.css-answer-wrapper {
  display: flex;
  flex-direction: column;
  min-width: 360px;

  .answer-status-hint {
    white-space: pre-wrap;
    display: flex;
    align-items: center;
    padding: 0 12px;
    font-size: 16px;

    .correct {
      color: #5d9e53;
    }

    .wrong {
      color: #d47d7d;
    }
  }

  .submit-answer-form {
    display: flex;
    padding: 6px 12px;

    .answer-input {
      background-color: #111111;
      color: white;
      border: 1px solid #222;
      border-radius: 4px;
      padding: 12px;
      font-size: 16px;
      margin-right: 6px;
      flex-grow: 1;
      flex-shrink: 1;

      &.answer-correct {
        border: 1px solid #5d9e53;
      }

      &.answer-invalid {
        border: 1px solid #a82e25;
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
        background-color: #2f6eeb;
        cursor: pointer;
      }
    }
  }
}
</style>
