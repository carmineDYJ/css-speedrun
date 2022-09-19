<script setup>
import SidebarItem from './SidebarItem.vue';
import { useCSSQuestionsStore } from '../hooks/useCSSQuestions';
import { storeToRefs } from 'pinia';

const store = useCSSQuestionsStore()
const {answerTimeEachQuestion, currentQuestionIndex, allCSSQuestions, questionsAnswered} = storeToRefs(store)

const CSSQuestionTitles = allCSSQuestions.value.map(question => question.title)
const checkAnsweredStatus = (index) => {
  if (index <= questionsAnswered.value - 1) {
    return true
  } else {
    return false
  }
}
</script>

<template>
  <aside class="sidebar-wrapper">
    <ol class="sidebar">
      <li v-for="(title, index) in CSSQuestionTitles">
        <SidebarItem v-if="currentQuestionIndex === index" class="answering" :questionTitle="title" :completionStatus="checkAnsweredStatus(index)" :answerTime="answerTimeEachQuestion[index]" />
        <SidebarItem v-else :questionTitle="title" :completionStatus="checkAnsweredStatus(index)" :answerTime="answerTimeEachQuestion[index]" />
      </li>
    </ol>
  </aside>
</template>

<style lang="scss" scoped>
.sidebar-wrapper {
  padding: 6px 12px;

  .sidebar {
    border-left: 4px solid #222;
    padding-top: 16px;
    padding-bottom: 16px;
    padding-left: 16px;
    padding-right: 36px;
    background-color: #111;

    >li {
      margin-bottom: 12px;
      font-size: 16px;
      > .answering {
        font-weight: bolder;
        font-size: 20px;
      }
    }
  }
}
</style>
