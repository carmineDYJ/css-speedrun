<script setup>
import { computed, reactive, ref, watch } from 'vue';
import CSSQuestions from '../questions/CSSQuestions';

const props = defineProps(['answer', 'currentQuestionIndex', 'answerStatus', 'questionsAnswered'])
const emit = defineEmits(['update:answerStatus', 'update:questionsAnswered'])

const questionCode = ref(CSSQuestions[props.currentQuestionIndex]['code'])
const questionGoal = ref(CSSQuestions[props.currentQuestionIndex]['goal'])
const questionAnswer = ref(CSSQuestions[props.currentQuestionIndex]['answer'])
const questionTextHint = ref(CSSQuestions[props.currentQuestionIndex]['textHint'])
const questionLinkHint = ref(CSSQuestions[props.currentQuestionIndex]['linkHint'])

const resultList = reactive([])
const questionInvisibleCodeRef = ref(null)
const questionVisibleCodeRef = ref(null)

const showTextHint = ref(false)
const showLinkHint = ref(false)
const showTextHintContent = ref(false)

const questionCodeLineArray = computed(() => {
  return questionCode.value.split('\n')
})

// update question
watch(() => props.currentQuestionIndex, () => {
  if (props.currentQuestionIndex <= CSSQuestions.length - 1) {
    questionCode.value = CSSQuestions[props.currentQuestionIndex]['code']
    questionGoal.value = CSSQuestions[props.currentQuestionIndex]['goal']
    questionAnswer.value = CSSQuestions[props.currentQuestionIndex]['answer']
    questionTextHint.value = CSSQuestions[props.currentQuestionIndex]['textHint']
    questionLinkHint.value = CSSQuestions[props.currentQuestionIndex]['linkHint']
    showTextHint.value = false
    showLinkHint.value = false
    // remove selected style
    for (const children of questionVisibleCodeRef.value.children) {
      children.classList.remove('correct-selected')
      children.classList.remove('wrong-selected')
    }
  }
})

// show text hint after first 10 seconds
if (questionTextHint.value) {
  setTimeout(() => {
    showTextHint.value = true
  }, 10000)
  setTimeout(() => {
    showLinkHint.value = true
  }, 20000)
} else {
  setTimeout(() => {
    showLinkHint.value = true
  }, 10000)
}


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
  return insertFalseOnIndexes(singleLineCloseTagIndexes.value, questionGoal.value.slice())
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
    emit('update:answerStatus', 'answering')
  } catch (error) {
    // otherwise display result cannot be updated when selector is not valid
    const wrongSelectorResultList = Array(questionInvisibleCode.getElementsByTagName("*").length).fill(false)
    Object.assign(resultList, wrongSelectorResultList)
    emit('update:answerStatus', 'answerInvalidSelector')
  }
}
// compare result to see if answer is correct
const compareResult = () => {
  // console.log("resultList", resultList)
  // console.log("questionAnswer", questionAnswer.value)
  if (questionGoal.value.toString() === resultList.toString()) {
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

// when answer updated, calculate result, compare result with answer, and update display code
watch(() => props.answer, () => {
  calculateResult()
  compareResult()
  updateQuestionDisplayCode()
})


</script>

<template>
  <div class="css-question-wrapper">
    <div class="question-display">
      <div class="question-hint-arrow">
        <div v-for="(item, index) in questionCode.split('\n')">
          <img v-if="questionAnswerAfterInsertFalse[index]" class="hint-arrow-svg" src="../assets/icons/hint_arrow.svg">
          <div v-else class="invisible-hint-placeholder">&nbsp;</div>
        </div>
      </div>
      <div class="question-code" ref="questionVisibleCodeRef">
        <code class="question-code-line" v-for="(item, index) in questionCodeLineArray">
          <span>
            {{ item }}
          </span>
        </code>
      </div>
      <div class="question-html" ref="questionInvisibleCodeRef" v-html="questionCode"></div>
    </div>
    <div class="question-hint">
      <div class="text-hint" v-if="questionTextHint && showTextHint" @mouseover="showTextHintContent = true"
        @mouseleave="showTextHintContent = false">
        我是一个提示
        <div class="text-hint-content" v-if="showTextHintContent" v-html="questionTextHint">
        </div>
      </div>
      <div class="link-hint" v-if="questionTextHint && questionLinkHint && showLinkHint">
        <a :href="questionLinkHint" target="_blank">我是另一个提示</a>
      </div>
      <div class="link-hint" v-if="!questionTextHint && questionLinkHint && showLinkHint">
        <a :href="questionLinkHint" target="_blank">我是一个提示</a>
      </div>
      <div class="placeholder-hint">
        &#12288;
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.css-question-wrapper {
  display: flex;
  flex-direction: column;
  padding: 0 12px;

  .question-display {
    margin-bottom: 6px;
    display: flex;

    .question-hint-arrow,
    .question-code {
      padding-top: 12px;
      padding-bottom: 12px;
    }

    .question-hint-arrow {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #2d2d2d;
      border-radius: 2px;
      margin-right: 2px;
      padding-left: 8px;
      padding-right: 8px;

      .hint-arrow-svg {
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

    .question-code {
      flex-grow: 1;
      max-width: 302px;
      // html换行
      white-space: pre-wrap;
      display: flex;
      overflow: auto;
      flex-direction: column;
      background-color: #2d2d2d;
      border-radius: 2px;
      padding-left: 12px;
      padding-right: 12px;

      >.question-code-line {
        span {
          min-width: max-content;
          height: 26px;
          color: #ccc;
          display: flex;
          align-items: center;
          font-size: 16px;
          font-family: Consolas,Monaco,'Andale Mono','Ubuntu Mono',monospace;

          >.tag {
            color: #d47d7d;
          }
        }

        &.correct-selected {
          background: hsl(112, 31%, 47%, 0.5);
        }

        &.wrong-selected {
          background: hsl(4, 64%, 40%, 0.5);
        }
      }

    }
  }

  .question-hint {
    color: #ccc;
    display: flex;

    >.text-hint {
      position: relative;
      margin-right: 12px;

      &:hover {
        color: white;
      }

      >.text-hint-content {
        font-weight: bolder;
        width: max-content;
        position: absolute;
        font-size: 16px;
        top: 24px;
        left: 0;
        background-color: #2d2d2d;
        border-radius: 4px;
        padding: 6px;
        color: white;
        // display above Timer component
        z-index: 1;
      }
    }

    >.link-hint {
      &:hover {
        color: white;
      }
    }

    >.placeholder-hint {
      visibility: hidden;
    }
  }
}

@media (max-width: 700px) {
  .css-question-wrapper {
    .question-display {
      .question-code {
        max-width: 100%;
      }
    }
  }
}
</style>
