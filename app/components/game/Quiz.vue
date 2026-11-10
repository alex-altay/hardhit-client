<template>
  <div class="flex w-full max-w-4xl flex-col items-center">
    <GameLogo class="mb-8 size-50 sm:size-68 select-none" />
    <div class="mb-6 text-lg text-muted">{{ number }} / {{ total }}</div>

    <div
      ref="questionEl"
      tabindex="-1"
      role="heading"
      aria-level="1"
      class="mb-12 text-center text-2xl font-bold text-balance outline-none sm:text-4xl"
    >
      <span class="sr-only">Question {{ number }} of {{ total }}. </span>
      {{ question.question }}
    </div>

    <div class="grid w-full gap-4 sm:grid-cols-2">
      <button
        v-for="(answer, index) in question.answers"
        :key="answer"
        type="button"
        class="flex cursor-pointer items-center gap-4 rounded border border-default px-5 py-4 text-left text-lg transition-colors hover:border-brand-primary aria-disabled:cursor-default aria-disabled:hover:border-default"
        :class="getAnswerClass(answer)"
        :aria-disabled="!!chosenAnswer"
        @click="$emit('choose', answer)"
      >
        <span class="font-bold text-brand-primary">{{ LETTERS[index] }}</span>
        {{ answer }}
      </button>
    </div>

    <p class="sr-only" aria-live="polite">{{ screenReaderAnnouncement }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  question: GameQuestion
  number: number
  total: number
  chosenAnswer?: string
}>()
defineEmits<{ choose: [answer: string] }>()

const LETTERS = ['A', 'B', 'C', 'D']

const questionEl = useTemplateRef('questionEl')
watch(
  () => props.number,
  () => nextTick(() => questionEl.value?.focus()),
)
onMounted(() => focusElementForScreenReader(questionEl.value))

function getAnswerClass(answer: string) {
  if (!props.chosenAnswer) {
    return undefined
  }
  if (answer === props.question.answer) {
    return 'border-success! bg-success/15'
  }
  if (answer === props.chosenAnswer) {
    return 'border-error! bg-error/15'
  }
  return 'opacity-40'
}

const screenReaderAnnouncement = computed(() => {
  if (!props.chosenAnswer) {
    return ''
  }
  return props.chosenAnswer === props.question.answer
    ? 'Right'
    : `Wrong, the answer is ${props.question.answer}`
})
</script>
