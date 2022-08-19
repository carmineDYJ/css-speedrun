<script setup>
const props = defineProps(['questionTitle', 'completionStatus', 'answerTimeObj'])
const formatTimeUsed = (timeUsed) => {
  let minutes = String(parseInt(timeUsed / 60)).padStart(2, '0');
  let seconds = String(timeUsed % 60).padStart(2, '0');
  return `[${minutes}:${seconds}]`;
}
</script>

<template>
  <div class="question-title-wrapper">
    <div class="question-title">
      <img v-if="!props.completionStatus" class="box-svg" src="../assets/icons/box.svg">
      <img v-else class="box-svg" src="../assets/icons/ticked_box.svg">
      {{ props.questionTitle }}
    </div>
    <div class="time-used" v-if="answerTimeObj">
      <i>{{ formatTimeUsed(answerTimeObj['timeUsed']) }}</i>
    </div>
    <div class="time-used-placeholder" v-else>
      00:00
    </div>
  </div>
</template>

<style lang="scss" scoped>
.question-title-wrapper {
  display: flex;
  align-items: center;
  color: white;

  .question-title {
    display: flex;
    align-items: center;
    margin-right: 12px;

    .box-svg {
      height: 20px;
      margin-top: 3px;
      margin-bottom: 3px;
      margin-right: 16px;
    }
  }
  .time-used {
    color: #ccc;
    font-weight: light;
  }
  .time-used-placeholder {
    visibility: hidden;
  }
}
</style>