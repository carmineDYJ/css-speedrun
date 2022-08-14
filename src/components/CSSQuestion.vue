<script setup>
import { onBeforeMount, onMounted, reactive, ref, watch } from 'vue';
import CSSQuestions from './CSSQuestions';
import style from './CSSQuestion.module.scss'

const props = defineProps(['answer'])

const questionDisplayCode = CSSQuestions[0]['code']
// console.log(questionDisplayCode.split('\n'))
const questionAnswer = CSSQuestions[0]['goal']
const questionCodeList = questionDisplayCode.split('\n')
const resultList = reactive([])

const questionInvisibleCodeRef = ref(null)
const questionVisibleCodeRef = ref(null)

// based on answer, update resultList
const calculateResult = () => {
  const questionInvisibleCode = questionInvisibleCodeRef.value
  resultList.splice(0)
  try {
    const selectedChildren = questionInvisibleCode.querySelectorAll(props.answer)
    console.log("selected children", selectedChildren)
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
// based on result, update display code
const updateQuestionDisplayCode = () => {
  const questionVisibleCode = questionVisibleCodeRef.value
  console.log("node children: ", questionVisibleCode.children)
  resultList.forEach((value, index) => {
    questionVisibleCode.children[index].classList.remove(style['correct-selected'])
    questionVisibleCode.children[index].classList.remove(style['wrong-selected'])
  })
  resultList.forEach((value, index) => {
    if (value && value === questionAnswer[index]) {
      questionVisibleCode.children[index].classList.add(style['correct-selected'])
    } else if (value && value !== questionAnswer[index]) {
      questionVisibleCode.children[index].classList.add(style['wrong-selected'])
    }
  })
}

watch(() => props.answer, () => {
  calculateResult()
  updateQuestionDisplayCode()
})

watch(resultList, (newResultList) => {
  console.log("newResultList", newResultList)
  if (newResultList.toString() === questionAnswer.toString()) {
    console.log("correct")
  } else {
    console.log("wrong")
  }
})

// onMounted(() => {
//   console.log("node", questionNode)
//   console.log("node children: ", questionNode.children)
//   console.log("all children", questionNode.getElementsByTagName("*"))
// })
</script>

<template>
  <div>
    <div class="question-display" ref="questionVisibleCodeRef">
      <p v-for="(item, index) in questionCodeList">
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
  >p {
    height: 20px;
  }
}
</style>
