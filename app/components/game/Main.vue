<template>
  <GameResult
    v-if="hasFinished"
    :has-won
    :correct-count
    :total="questions.length"
    @restart="restart"
  />
  <template v-else>
    <GameQuiz
      :question="question!"
      :number="index + 1"
      :total="questions.length"
      :chosen-answer
      @choose="choose"
    />
    <a
      href="/"
      class="fixed top-4 right-4 sm:top-6 sm:right-8 text-sm text-muted hover:text-highlighted transition-colors"
      @click.prevent="clearError({ redirect: '/' })"
    >
      Back to main
    </a>
  </template>
</template>

<script setup lang="ts">
const {
  index,
  question,
  questions,
  correctCount,
  chosenAnswer,
  hasFailed,
  hasWon,
  choose,
  restart,
} = useGame()
const hasFinished = computed(() => hasWon.value || hasFailed.value)
</script>
