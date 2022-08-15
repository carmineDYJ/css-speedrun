<script setup>
import { reactive, ref, watch } from 'vue';
import CSSQuestions from './CSSQuestions';
import style from './CSSQuestion.module.scss'

const props = defineProps(['answer', 'currentQuestionIndex', 'answerStatus', 'questionsAnswered'])
const emit = defineEmits(['update:answerStatus', 'update:questionsAnswered'])

const questionDisplayCode = ref(CSSQuestions[props.currentQuestionIndex]['code'])
const questionAnswer = ref(CSSQuestions[props.currentQuestionIndex]['goal'])
// update question
watch(() => props.currentQuestionIndex, () => {
  if (props.currentQuestionIndex <= CSSQuestions.length - 1) {
    questionDisplayCode.value = CSSQuestions[props.currentQuestionIndex]['code']
    questionAnswer.value = CSSQuestions[props.currentQuestionIndex]['goal']
    // remove selected style
    for (const children of questionVisibleCodeRef.value.children) {
      children.classList.remove(style['correct-selected'])
      children.classList.remove(style['wrong-selected'])
    }
  }
})

const resultList = reactive([])

const questionInvisibleCodeRef = ref(null)
const questionVisibleCodeRef = ref(null)

// based on answer, update resultList
const calculateResult = () => {
  const questionInvisibleCode = questionInvisibleCodeRef.value
  resultList.splice(0)
  try {
    const selectedChildren = questionInvisibleCode.querySelectorAll(props.answer)
    for (const children of questionInvisibleCode.getElementsByTagName("*")) {
      if (Array.from(selectedChildren).includes(children)) {
        resultList.push(true)
      } else {
        resultList.push(false)
      }
    }
  } catch (error) {
    // otherwise display result cannot be updated when selector is not valid
    const wrongSelectorResultList = Array(questionInvisibleCode.getElementsByTagName("*").length).fill(false)
    Object.assign(resultList, wrongSelectorResultList)
    console.log("selector is not valid")
  }
}
const compareResult = () => {
  console.log("resultList", resultList)
  console.log(questionAnswer.value)
  if (questionAnswer.value.toString() === resultList.toString()) {
    console.log('answer correct')
    if (props.questionsAnswered === CSSQuestions.length - 1) {
      emit('update:answerStatus', 'allAnswered')
    } else {
      emit('update:answerStatus', 'answerCorrect')
    }
    emit('update:questionsAnswered', props.questionsAnswered + 1)
  }
}
// based on result, update display code
const updateQuestionDisplayCode = () => {
  const questionVisibleCode = questionVisibleCodeRef.value
  // console.log("node children: ", questionVisibleCode.children)
  resultList.forEach((value, index) => {
    questionVisibleCode.children[index].classList.remove(style['correct-selected'])
    questionVisibleCode.children[index].classList.remove(style['wrong-selected'])
  })
  resultList.forEach((value, index) => {
    if (value && value === questionAnswer.value[index]) {
      questionVisibleCode.children[index].classList.add(style['correct-selected'])
    } else if (value && value !== questionAnswer.value[index]) {
      questionVisibleCode.children[index].classList.add(style['wrong-selected'])
    }
  })
}

watch(() => props.answer, () => {
  calculateResult()
  compareResult()
  updateQuestionDisplayCode()
})
</script>

<template>
  <div>
    <div class="question-display" ref="questionVisibleCodeRef">
      <p v-for="(item, index) in questionDisplayCode.split('\n')">
        {{ item }}
      </p>
    </div>
    <div class="question-html" ref="questionInvisibleCodeRef" v-html="questionDisplayCode"></div>
  </div>
</template>

<style lang="scss" scoped>
.question-display {
  // html换行
  white-space: pre-wrap;
  background-color: #2d2d2d;

  >p {
    height: 20px;
    color: white;
  }
}
</style>
