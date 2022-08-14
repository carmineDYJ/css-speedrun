<script setup>
import { ref, watch } from 'vue';
const props = defineProps(['answer'])
const emit = defineEmits(['update:answer'])
const answerRef = ref(null)
const updateAnswerInput = (event) => {
  event.preventDefault()
  emit('update:answer', answerRef.value)
  console.log("answerRef", answerRef.value)
}

</script>

<template>
  <form @submit="updateAnswerInput">
    <input :value="props.answer" @input="(event)=>answerRef = event.target.value" />
    <button type="submit">Submit</button>
  </form>
</template>

<style lang="scss" scoped>

</style>
