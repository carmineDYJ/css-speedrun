<script setup>
import CSSQuestions from './CSSQuestions';
import CSSQuestionSidebarTitle from './CSSQuestionSidebarTitle.vue';
const CSSQuestionTitles = CSSQuestions.map(question => question.title)
</script>

<template>
  <aside>
    <ol>
      <li v-for="(title, index) in CSSQuestionTitles">
        <CSSQuestionSidebarTitle :questionTitle="title" />
      </li>
    </ol>
  </aside>
</template>

<style lang="scss" scoped>
</style>
