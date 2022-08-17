<script setup>
import { reactive, ref, watch } from 'vue';
import CSSQuestions from './CSSQuestions';

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
      children.classList.remove('correct-selected')
      children.classList.remove('wrong-selected')
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
    const selectedChildren = questionInvisibleCode.querySelectorAll(`.question-html > ${props.answer}`)
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
// TODO question like below cannot be displayed correctly when input selectors
// <div>
//   <span></span>
//   <p>
//     <a></a>
//     <span></span>
//   </p>
//   <a>
// </div>

const updateQuestionDisplayCode = () => {
  const questionVisibleCode = questionVisibleCodeRef.value
  // console.log("node children: ", questionVisibleCode.children)
  resultList.forEach((value, index) => {
    questionVisibleCode.children[index].classList.remove('correct-selected')
    questionVisibleCode.children[index].classList.remove('wrong-selected')
  })
  resultList.forEach((value, index) => {
    if (value && value === questionAnswer.value[index]) {
      questionVisibleCode.children[index].classList.add('correct-selected')
    } else if (value && value !== questionAnswer.value[index]) {
      questionVisibleCode.children[index].classList.add('wrong-selected')
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
  <div class="css-question-wrapper">
    <div class="question-hint">
      <div v-for="(item, index) in questionDisplayCode.split('\n')">
        <img v-if="questionAnswer[index]" class="hint-svg" src="../assets/icons/hint_arrow.svg">
        <div v-else class="invisible-hint-placeholder">&nbsp;</div>
      </div>
    </div>
    <div class="question-display" ref="questionVisibleCodeRef">
      <p v-for="(item, index) in questionDisplayCode.split('\n')">
        {{ item }}
      </p>
    </div>
    <div class="question-html" ref="questionInvisibleCodeRef" v-html="questionDisplayCode"></div>
  </div>
</template>

<style lang="scss" scoped>
.css-question-wrapper {
  display: flex;
  background-color: #2d2d2d;
  padding: 12px;

  .question-hint {
    display: flex;
    flex-direction: column;
    margin-right: 18px;
    .hint-svg {
      // svg with 4px margin bottom itself
      margin-top: 5px;
      height: 16px;
      margin-bottom: 1px;
    }
    .invisible-hint-placeholder {
      height: 20px;
      margin-bottom: 6px;
    }
  }
  .question-display {
    // html换行
    white-space: pre-wrap;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    >p {
      height: 20px;
      color: white;
      margin-bottom: 3px;
      margin-top: 3px;

      &.correct-selected {
        border: 1px solid green;
      }

      &.wrong-selected {
        border: 1px solid red;
      }
    }
  }
}
</style>
