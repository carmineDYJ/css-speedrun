import { defineStore } from "pinia";
import { ref } from "vue";

export const useCSSAnswerStore = defineStore("CSSAnswer", () => {
  const answerStatus = ref('introduction')
  const updateAnswerStatus = (newAnswerStatus) => {
    console.log('newAnswerStatus', newAnswerStatus)
    answerStatus.value = newAnswerStatus
  }
  return {
    answerStatus,
    updateAnswerStatus
  }
})
