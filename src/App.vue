<script setup>
import { ref, watch } from 'vue';
import TopNav from './components/TopNav.vue'
import CSSAnswer from './components/CSSAnswer.vue';
import CSSQuestion from './components/CSSQuestion.vue';
import CSSQuestionSidebar from './components/CSSQuestionSidebar.vue';
import Footer from './components/Footer.vue';

const answerRef = ref(null)
const currentQuestionIndexRef = ref(0)
// possible answer status: answering, answerCorrect
const answerStatusRef = ref('introduction')
const questionsAnsweredRef = ref(0)

watch(answerStatusRef, () => {
  console.log("answerStatusRef", answerStatusRef.value)
})

</script>

<template>
  <div class="content-wrapper">
    <TopNav class="top-nav" />
    <main class="main-content">
      <div class="answer-and-question">
        <CSSAnswer v-model:answer="answerRef" v-model:answerStatus="answerStatusRef"
          v-model:currentQuestionIndex="currentQuestionIndexRef" />
        <CSSQuestion :answer="answerRef" :currentQuestionIndex="currentQuestionIndexRef"
          v-model:answerStatus="answerStatusRef" v-model:questionsAnswered="questionsAnsweredRef" />
      </div>
      <CSSQuestionSidebar :questionsAnswered="questionsAnsweredRef" />
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
  min-width: 100vw;
  .main-content {
  display: flex;
  justify-content: space-between;
  padding-top: 24px;
  padding-left: 30vw;
  padding-right: 30vw;
  background-color: black;
  flex-shrink: 0;
  flex-grow: 1;
  border-bottom: 1px solid #222;
  border-top: 1px solid #222;
}
}
</style>
