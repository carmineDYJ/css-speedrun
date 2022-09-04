import { defineStore } from "pinia";
import { reactive } from "vue";
import CSSQuestions from '../questions/CSSQuestions'

export const useCSSQuestionsStore = defineStore('CSSQuestions', () => {
  const answerTimeEachQuestion = reactive([])
  const addAnswerTime = (currentQuestionAnswerTime) => {
    answerTimeEachQuestion.push(currentQuestionAnswerTime)
  }
  return {
    answerTimeEachQuestion,
    addAnswerTime,
  }
})