<script setup>
import { computed, reactive, ref, watch } from 'vue';
import CSSQuestions from './CSSQuestions';

const props = defineProps(['answer', 'currentQuestionIndex', 'answerStatus', 'questionsAnswered'])
const emit = defineEmits(['update:answerStatus', 'update:questionsAnswered'])

const resultList = reactive([])
const questionInvisibleCodeRef = ref(null)
const questionVisibleCodeRef = ref(null)

const questionCode = ref(CSSQuestions[props.currentQuestionIndex]['code'])
const questionAnswer = ref(CSSQuestions[props.currentQuestionIndex]['goal'])
// update question
watch(() => props.currentQuestionIndex, () => {
  if (props.currentQuestionIndex <= CSSQuestions.length - 1) {
    questionCode.value = CSSQuestions[props.currentQuestionIndex]['code']
    questionAnswer.value = CSSQuestions[props.currentQuestionIndex]['goal']
    // remove selected style
    for (const children of questionVisibleCodeRef.value.children) {
      children.classList.remove('correct-selected')
      children.classList.remove('wrong-selected')
    }
  }
})

// when set/update display code style, close tag on a single line should be ignored/jumped
// otherwise style will be appended on wrong position
// therefore, we need to insert false when meet a single line close tag (e.g. </p>)
const singleLineCloseTagIndexes = computed(() => {
  let indexes = []
  const questionDisplayCodeList = questionCode.value.split('\n').map(element => element.trim())
  questionDisplayCodeList.forEach((element, index) => {
    if (element.startsWith('</')) {
      indexes.push(index)
    }
  })
  return indexes
})
// insert false when meet a single line close tag (e.g. </p>)
const insertFalseOnIndexes = (indexes, array) => {
  // input false on index of array
  for (const index of indexes) {
    array.splice(index, 0, false)
  }
  return array
}
// used for comparing and updating selected style by selector input
const questionAnswerAfterInsertFalse = computed(() => {
  // use slice method on array to avoid changing questionAnswer
  return insertFalseOnIndexes(singleLineCloseTagIndexes.value, questionAnswer.value.slice())
})

// based on answer, update resultList
const calculateResult = () => {
  const questionInvisibleCode = questionInvisibleCodeRef.value
  resultList.splice(0)
  try {
    const selectedChildren = questionInvisibleCode.querySelectorAll(`.question-html ${props.answer}`)
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
// compare result to see if answer is correct
const compareResult = () => {
  console.log("resultList", resultList)
  console.log("questionAnswer", questionAnswer.value)
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
  // insert false on single lint close tag index in order to correctly append selected style
  const resultListAfterInsertFalse = insertFalseOnIndexes(singleLineCloseTagIndexes.value, resultList.slice())
  resultListAfterInsertFalse.forEach((value, index) => {
    questionVisibleCode.children[index].classList.remove('correct-selected')
    questionVisibleCode.children[index].classList.remove('wrong-selected')
  })
  resultListAfterInsertFalse.forEach((value, index) => {
    if (value && value === questionAnswerAfterInsertFalse.value[index]) {
      questionVisibleCode.children[index].classList.add('correct-selected')
    } else if (value && value !== questionAnswerAfterInsertFalse.value[index]) {
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
      <div v-for="(item, index) in questionCode.split('\n')">
        <img v-if="questionAnswerAfterInsertFalse[index]" class="hint-svg" src="../assets/icons/hint_arrow.svg">
        <div v-else class="invisible-hint-placeholder">&nbsp;</div>
      </div>
    </div>
    <div class="question-display" ref="questionVisibleCodeRef">
      <p v-for="(item, index) in questionCode.split('\n')">
        {{ item }}
      </p>
    </div>
    <div class="question-html" ref="questionInvisibleCodeRef" v-html="questionCode"></div>
  </div>
</template>

<style lang="scss" scoped>
.css-question-wrapper {
  display: flex;
  padding: 0 12px;
  .question-hint, .question-display {
    padding-top: 12px;
    padding-bottom: 12px;
  }
  .question-hint {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #2d2d2d;
    border-radius: 2px;
    margin-right: 2px;

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
    flex-grow: 15;
    // html换行
    white-space: pre-wrap;
    display: flex;
    flex-direction: column;
    background-color: #2d2d2d;
    border-radius: 2px;
    padding-left: 12px;

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
