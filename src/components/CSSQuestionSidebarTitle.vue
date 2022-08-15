<script setup>
const props = defineProps(['questionTitle'])
</script>

<template>
  <div class="wrapper">
    <img class="box-svg" src="../assets/icons/box.svg">{{props.questionTitle}}
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
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