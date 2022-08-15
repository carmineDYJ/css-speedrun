<script setup>
import { ref, watch } from 'vue';
import TopNav from './components/TopNav.vue'
import CSSAnswer from './components/CSSAnswer.vue';
import CSSQuestion from './components/CSSQuestion.vue';
import CSSQuestionSidebar from './components/CSSQuestionSidebar.vue';

const answerRef = ref(null)
const currentQuestionIndexRef = ref(0)
// possible answer status: answering, answerCorrect
const answerStatusRef = ref('answering')

watch(answerStatusRef, ()=>{
  console.log("answerStatusRef", answerStatusRef.value)
})

</script>

<template>
  <TopNav />
  <main class="main-content">
    <div class="answer-and-question">
      <CSSAnswer
        v-model:answer="answerRef"
        v-model:answerStatus="answerStatusRef"
        v-model:currentQuestionIndex="currentQuestionIndexRef"
      />
      <CSSQuestion
        :answer="answerRef"
        :currentQuestionIndex="currentQuestionIndexRef"
        v-model:answerStatus="answerStatusRef"
      />
    </div>
    <CSSQuestionSidebar />
  </main>
</template>

<style lang="scss" scoped>
.main-content {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  padding-left: 30vw;
  padding-right: 30vw;

  .answer-and-question {}
}
</style>
