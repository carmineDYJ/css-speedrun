<script setup>
import { ref, watch } from 'vue';
import TopNav from './components/TopNav.vue'
import CSSAnswer from './components/CSSAnswer.vue';
import CSSQuestion from './components/CSSQuestion.vue';
import CSSQuestionList from './components/CSSQuestionList.vue';

const answerRef = ref(null)


</script>

<template>
  <TopNav />
  <main class="main-content">
    <div class="answer-and-question">
      <CSSAnswer v-model:answer="answerRef" />
      <CSSQuestion :answer="answerRef" />
    </div>
    <CSSQuestionList />
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
