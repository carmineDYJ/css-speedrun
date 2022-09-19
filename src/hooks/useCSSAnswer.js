import { defineStore } from "pinia";
import { ref } from "vue";

export const useCSSAnswerStore = defineStore("CSSAnswer", () => {
  // possible answer status: introduction, answering, answerCorrect, allAnswered
  const answerStatus = ref('introduction')
  const updateAnswerStatus = (newAnswerStatus) => {
    answerStatus.value = newAnswerStatus
  }
  const answer = ref(null)
  const updateAnswer = (newAnswer) => {
    answer.value = newAnswer
  }
  return {
    answerStatus,
    updateAnswerStatus,
    answer,
    updateAnswer,
  }
})
