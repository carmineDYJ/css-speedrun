<script setup>
import { computed, ref, watch } from 'vue';
import { CSSQuestions } from '../questions/CSSQuestions';

const props = defineProps(['answer', 'answerStatus', 'currentQuestionIndex'])
const emit = defineEmits(['update:answer', 'update:currentQuestionIndex', 'update:answerStatus'])

const answerValueRef = ref(null)
const answerInputRef = ref(null)
const buttonTextRef = ref('提交')

const showAnswerStatusHintRef = ref(false)
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
    showAnswerStatusHintRef.value = false;
  } else if (answerStatus === 'answerCorrect' || answerStatus === 'allAnswered' || answerStatus === 'answerInvalidSelector') {
    showAnswerStatusHintRef.value = true;
  }
})

</script>

<template>
  <div class="css-answer-wrapper">
    <div class="css-answer">
      <form @submit="formSubmit" class="submit-answer-form">
        <input class="answer-input" ref="answerInputRef" placeholder="输入CSS选择器，比如ol > li" autocomplete="off"
          :value="answerValueRef" @input="(event) => answerValueRef = event.target.value" />
        <button class="submit-button" type="submit">{{ buttonTextRef }}</button>
      </form>
      <div class="answer-status-hint" v-if="showAnswerStatusHintRef">
        <div class="correct" v-if="props.answerStatus === 'answerCorrect'">
          示例答案: <code>{{questionAnswer}}</code>
        </div>
        <div class="correct" v-else-if="props.answerStatus === 'allAnswered'">
          示例答案: <code>{{questionAnswer}}</code>
          <br>
          恭喜你，全部答对啦！
        </div>
        <div class="wrong" v-else-if="props.answerStatus === 'answerInvalidSelector'">
          选择器无效哦，请检查后再试
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.css-answer-wrapper {
  display: flex;

  .css-answer {
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    .answer-status-hint {
      white-space: pre-wrap;
      display: flex;
      align-items: center;
      padding: 0 12px;
      font-size: 16px;

      .correct {
        color: #5d9e53;
        code {
          background: #111;
          border: 1px solid #222;
          padding: 2px 6px;
          font-family: Consolas,Monaco,'Andale Mono','Ubuntu Mono',monospace;
        }
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
        // 宽屏时，该组件宽度360px
        width: calc(360px - 24px - 60px - 6px);

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
        min-width: 60px;
        color: white;
        background-color: #4e8ff7;

        &:hover {
          background-color: #2f6eeb;
          cursor: pointer;
        }
      }
    }
  }
}

@media (max-width: 700px) {
  .css-answer-wrapper {
    .css-answer {
      .submit-answer-form {
        .answer-input {
          width: calc(100vw - 24px - 60px - 6px);
        }
      }
    }
  }
}
</style>
