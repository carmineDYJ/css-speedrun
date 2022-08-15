<script setup>
import CSSQuestions from './CSSQuestions';
const CSSQuestionTitles = CSSQuestions.map(question => question.title)
</script>

<template>
  <div>
    <ol>
      <li v-for="(title, index) in CSSQuestionTitles">
        {{ title }}
      </li>
    </ol>
  </div>
</template>

<style lang="scss" scoped>
</style>
