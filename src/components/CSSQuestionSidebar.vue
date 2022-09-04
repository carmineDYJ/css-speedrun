<script setup>
import CSSQuestions from '../questions/CSSQuestions';
import CSSQuestionSidebarTitle from './CSSQuestionSidebarTitle.vue';
import { useCSSQuestionsStore } from '../hooks/useCSSQuestions';
import { storeToRefs } from 'pinia';

const props = defineProps(['questionsAnswered', 'currentQuestionIndex', ])
const store = useCSSQuestionsStore()
const {answerTimeEachQuestion} = storeToRefs(store)

const CSSQuestionTitles = CSSQuestions.map(question => question.title)
const checkAnsweredStatus = (index) => {
  if (index <= props.questionsAnswered - 1) {
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
        <CSSQuestionSidebarTitle v-if="props.currentQuestionIndex === index" class="answering" :questionTitle="title" :completionStatus="checkAnsweredStatus(index)" :answerTime="answerTimeEachQuestion[index]" />
        <CSSQuestionSidebarTitle v-else :questionTitle="title" :completionStatus="checkAnsweredStatus(index)" :answerTime="answerTimeEachQuestion[index]" />
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
