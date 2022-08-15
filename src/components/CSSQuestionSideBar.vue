<script setup>
import CSSQuestions from './CSSQuestions';
import CSSQuestionSidebarTitle from './CSSQuestionSidebarTitle.vue';
const props = defineProps(['currentQuestionIndex'])

const CSSQuestionTitles = CSSQuestions.map(question => question.title)
const checkCompletionStatus = (index) => {
  if (index <= props.currentQuestionIndex - 1) {
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
        <CSSQuestionSidebarTitle :questionTitle="title" :completionStatus="checkCompletionStatus(index)" />
      </li>
    </ol>
  </aside>
</template>

<style lang="scss" scoped>
</style>
