<script setup>
const props = defineProps(['questionTitle', 'completionStatus', 'answerTime'])
const formatTimeUsed = (timeUsed) => {
  let minutes = String(parseInt(timeUsed / 60)).padStart(2, '0');
  let seconds = String(timeUsed % 60).padStart(2, '0');
  return `[${minutes}:${seconds}]`;
}
</script>

<template>
  <div class="question-title-wrapper">
    <div v-if="!props.completionStatus" class="question-title">
      <img class="box-svg" src="../assets/icons/box.svg">
      {{ props.questionTitle }}
    </div>
    <div v-else class="question-title completed">
      <img class="box-svg" src="../assets/icons/ticked_box.svg">
      {{ props.questionTitle }}
    </div>
    <!-- the answer time for warm question is always zero -->
    <div class="time-used" v-if="answerTime >= 0">
      <i>{{ formatTimeUsed(answerTime) }}</i>
    </div>
    <div class="time-used-placeholder" v-else>
      00:00
    </div>
  </div>
</template>

<style lang="scss" scoped>
.question-title-wrapper {
  min-width: 260px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;

  .question-title {
    display: flex;
    align-items: center;

    .box-svg {
      height: 20px;
      margin-right: 16px;
    }

    &.completed {
      color: rgb(93, 158, 83);
    }
  }

  .time-used {
    color: #ccc;
    font-weight: light;
    word-break: break-all;
    &-placeholder {
      visibility: hidden;
      word-break: break-all;
    }
  }
}

@media (max-width: 340px) {
  .question-title-wrapper {
    min-width: calc(100vw - 24px - 16px - 36px);
  }
}
</style>