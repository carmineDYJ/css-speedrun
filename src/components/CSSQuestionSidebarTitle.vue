<script setup>
const props = defineProps(['questionTitle', 'completionStatus'])
</script>

<template>
  <div class="question-title-wrapper">
    <img v-if="!props.completionStatus" class="box-svg" src="../assets/icons/box.svg">
    <img v-else class="box-svg" src="../assets/icons/ticked_box.svg">
    {{props.questionTitle}}
  </div>
</template>

<style lang="scss" scoped>
.question-title-wrapper {
  display: flex;
  align-items: center;
  color: white;
  font-size: 16px;
  .box-svg {
    height: 24px;
    margin-right: 16px;
  }
}
</style>