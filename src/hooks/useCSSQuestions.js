import { defineStore } from "pinia";
import { reactive, ref} from "vue";
import { CSSQuestions } from '../questions/CSSQuestions'

export const useCSSQuestionsStore = defineStore('CSSQuestions', () => {
  const currentQuestionIndex = ref(0)
  const increaseCurrentQuestionIndex = () => {
    currentQuestionIndex.value += 1
  }
  const questionsAnswered = ref(0)
  const increaseQuestionsAnswered = () => {
    questionsAnswered.value += 1
  }
  const allCSSQuestions = reactive(CSSQuestions)

  const answerTimeEachQuestion = reactive([])
  const addAnswerTime = (currentQuestionAnswerTime) => {
    answerTimeEachQuestion.push(currentQuestionAnswerTime)
  }
  return {
    currentQuestionIndex,
    increaseCurrentQuestionIndex,
    questionsAnswered,
    increaseQuestionsAnswered,
    allCSSQuestions,
    answerTimeEachQuestion,
    addAnswerTime,
  }
})
