<script setup>
import { reactive, ref, watch } from 'vue';
import TopNav from './components/TopNav.vue'
import CSSAnswer from './components/CSSAnswer.vue';
import CSSQuestion from './components/CSSQuestion.vue';
import CSSQuestionSidebar from './components/CSSQuestionSidebar.vue';
import Timer from './components/Timer.vue';
import Footer from './components/Footer.vue';

const answerRef = ref(null)
const currentQuestionIndexRef = ref(0)
// possible answer status: introduction, answering, answerCorrect, allAnswered
const answerStatusRef = ref('introduction')
const questionsAnsweredRef = ref(0)
const answerTimeArray = reactive([])
const currentQuestionAnswerTimeRef = ref(null)

watch(answerStatusRef, () => {
  console.log("answerStatusRef", answerStatusRef.value)
})
watch(currentQuestionAnswerTimeRef, () => {
  answerTimeArray.push(currentQuestionAnswerTimeRef.value)
})

</script>

<template>
  <div class="content-wrapper">
    <TopNav class="top-nav" />
    <main class="main-content">
      <div class="answer-and-question">
        <CSSAnswer class="answer" v-model:answer="answerRef" v-model:answerStatus="answerStatusRef"
          v-model:currentQuestionIndex="currentQuestionIndexRef" />
        <CSSQuestion class="question" :answer="answerRef" :currentQuestionIndex="currentQuestionIndexRef"
          v-model:answerStatus="answerStatusRef" v-model:questionsAnswered="questionsAnsweredRef" />
      </div>
      <div class="timer-and-sidebar">
        <Timer class="timer" :answerStatus="answerStatusRef" :currentQuestionIndex="currentQuestionIndexRef" v-model:currentQuestionAnswerTime="currentQuestionAnswerTimeRef" />
        <CSSQuestionSidebar :questionsAnswered="questionsAnsweredRef" :currentQuestionIndex="currentQuestionIndexRef" :answerTimeArray="answerTimeArray" />
      </div>
    </main>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  max-width: 100vw;
  background-color: black;

  .main-content {
    display: flex;
    justify-content: center;
    flex-shrink: 0;
    flex-grow: 1;
    border-bottom: 1px solid #222;
    border-top: 1px solid #222;
    padding-top: 24px;

    .answer-and-question {
      margin-right: 12px;
      .answer {
        margin-bottom: 12px;
      }
    }
    .timer-and-sidebar {
      .timer {
        margin-bottom: 12px;
      }
    }
  }
}

@media (max-width: 560px) {
  .content-wrapper{
    .main-content{
      flex-direction: column;
      justify-content: flex-start;
      .answer-and-question{
        margin-right: 0;
        margin-bottom: 24px;
        .answer{
          margin-bottom: 6px;
        }
      }
      .timer-and-sidebar {
        .timer {
          margin-bottom: 6px;
        }
      }
    }
  }
}
</style>
