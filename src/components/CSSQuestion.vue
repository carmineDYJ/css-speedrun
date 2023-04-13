<script setup>
import { computed, reactive, ref, watch } from 'vue';
import { useCSSQuestionsStore } from '../hooks/useCSSQuestions';
import { useCSSAnswerStore } from '../hooks/useCSSAnswer';
import { storeToRefs } from 'pinia';

const CSSQuestionsStore = useCSSQuestionsStore()
const { currentQuestionIndex, allCSSQuestions, questionsAnswered } = storeToRefs(CSSQuestionsStore)
const { increaseQuestionsAnswered } = CSSQuestionsStore
const CSSAnswerStore = useCSSAnswerStore()
const { answerStatus, answer } = storeToRefs(CSSAnswerStore)
const { updateAnswerStatus } = CSSAnswerStore

const questionCode = computed(() => allCSSQuestions.value[currentQuestionIndex.value]['code'])
const questionGoal = computed(() => allCSSQuestions.value[currentQuestionIndex.value]['goal'])
const questionTextHint = computed(() => allCSSQuestions.value[currentQuestionIndex.value]['textHint'])
const questionLinkHint = computed(() => allCSSQuestions.value[currentQuestionIndex.value]['linkHint'])

const resultList = reactive([])
const questionInvisibleCodeRef = ref(null)
const questionVisibleCodeRef = ref(null)

const showHintTimeOut = ref(null)
const showTextHint = ref(false)
const showLinkHint = ref(false)
const showTextHintContent = ref(false)

const questionCodeLineArray = computed(() => {
  return questionCode.value.split('\n')
})

// called when question answering changes
watch(currentQuestionIndex, () => {
  if (currentQuestionIndex.value <= allCSSQuestions.value.length - 1) {
    showTextHint.value = false
    showLinkHint.value = false
    showTextHintContent.value = false
    // remove selected style
    for (const children of questionVisibleCodeRef.value.children) {
      children.classList.remove('correct-selected')
      children.classList.remove('wrong-selected')
    }
    clearTimeout(showHintTimeOut.value)
    showHintAfterSeconds()
  }
})

// show hint after designated time
const showHintAfterSeconds = () => {
  showHintTimeOut.value = setTimeout(() => {
    showTextHint.value = true
    setTimeout(() => {
      showLinkHint.value = true
    }, 10000)
  }, 10000)
}
showHintAfterSeconds()

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
  console.log("array", array)
  console.log("indexes", indexes)
  // input false on index of array
  for (const index of indexes) {
    array.splice(index, 0, false)
  }
  console.log("array after insert", array)
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
    const selectedChildren = questionInvisibleCode.querySelectorAll(`.question-html ${answer.value}`)
    console.log("questionInvisibleCode.getElementsByTagName", questionInvisibleCode.getElementsByTagName("*"))
    for (const children of questionInvisibleCode.getElementsByTagName("*")) {
      if (Array.from(selectedChildren).includes(children)) {
        resultList.push(true)
      } else {
        resultList.push(false)
      }
    }
    updateAnswerStatus('answering')
  } catch (error) {
    // otherwise display result cannot be updated when selector is not valid
    const wrongSelectorResultList = Array(questionInvisibleCode.getElementsByTagName("*").length).fill(false)
    Object.assign(resultList, wrongSelectorResultList)
    updateAnswerStatus('answerInvalidSelector')
  }
}
// compare result to see if answer is correct
const compareResult = () => {
  // console.log("resultList", resultList)
  // console.log("questionAnswer", questionAnswer.value)
  if (questionGoal.value.toString() === resultList.toString()) {
    console.log('answer correct')
    if (questionsAnswered.value === allCSSQuestions.value.length - 1) {
      updateAnswerStatus('allAnswered')
    } else {
      updateAnswerStatus('answerCorrect')
    }
    increaseQuestionsAnswered()
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
watch(answer, () => {
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
        <img class="text-hint-svg" src="../assets/icons/question.svg" />
        我是一个提示
        <div class="text-hint-content" v-if="showTextHintContent">
          {{ questionTextHint }}
        </div>
      </div>
      <div class="link-hint" v-if="questionTextHint && questionLinkHint && showLinkHint">
        <img class="link-hint-svg" src="../assets/icons/link.svg" />
        <a :href="questionLinkHint" target="_blank">我是另一个提示</a>
      </div>
      <div class="link-hint" v-else-if="(!questionTextHint) && questionLinkHint && showLinkHint">
        <img class="link-hint-svg" src="../assets/icons/link.svg" />
        <a :href="questionLinkHint" target="_blank">我是一个提示</a>
      </div>
      <div class="placeholder-hint" v-if="questionTextHint || questionLinkHint">
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
          font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;

          >.tag {
            color: #d47d7d;
          }
        }

        &.correct-selected {
          background: #4c6444;
        }

        &.wrong-selected {
          background: #63322c;
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

      >.text-hint-svg {
        height: 1em;
        vertical-align: text-top;
      }

      >.text-hint-content {
        letter-spacing: 0ch;
        width: 32ch;
        word-break: normal;
        font-family: 'NotoSansSC-Regular';
        position: absolute;
        font-size: 16px;
        top: 30px;
        left: 0;
        background-color: #2d2d2d;
        border-radius: 4px;
        padding: 6px;
        color: white;
        // display above Timer component
        z-index: 1;
        // show content in center when content is not enough for one line
        display: flex;
        justify-content: center;
      }
    }

    >.link-hint {
      &:hover {
        color: white;
      }

      >.link-hint-svg {
        height: 1em;
        vertical-align: text-top;
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

@media (max-width: 360px) {
  .css-question-wrapper {
    .question-hint {
      >.text-hint {
        >.text-hint-content {
          width: calc(100vw - 24px);
        }
      }
    }
  }
}
</style>
