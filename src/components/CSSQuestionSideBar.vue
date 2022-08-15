<script setup>
import CSSQuestions from './CSSQuestions';
import CSSQuestionSidebarTitle from './CSSQuestionSidebarTitle.vue';
const props = defineProps(['questionsAnswered'])

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
  <aside>
    <ol>
      <li v-for="(title, index) in CSSQuestionTitles">
        <CSSQuestionSidebarTitle :questionTitle="title" :completionStatus="checkAnsweredStatus(index)" />
      </li>
    </ol>
  </aside>
</template>

<style lang="scss" scoped>
</style>
