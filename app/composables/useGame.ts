const ANSWER_PAUSE = 600

export function useGame() {
  let nextQuestionTimer: ReturnType<typeof setTimeout> | undefined

  const index = ref(0)
  const questions = ref(createGameRound())
  const correctCount = ref(0)
  const chosenAnswer = ref<string>()

  const hasFailed = ref(false)
  const hasWon = computed(() => correctCount.value == questions.value.length)
  const question = computed(() => questions.value[index.value])

  function choose(answer: string) {
    if (chosenAnswer.value || !question.value) {
      return
    }
    chosenAnswer.value = answer
    const isRight = answer === question.value.answer
    nextQuestionTimer = setTimeout(() => {
      if (!isRight) {
        hasFailed.value = true
        return
      }
      correctCount.value++
      if (hasWon.value) {
        return
      }
      chosenAnswer.value = undefined
      index.value++
    }, ANSWER_PAUSE)
  }

  function restart() {
    clearTimeout(nextQuestionTimer)
    questions.value = createGameRound()
    index.value = 0
    correctCount.value = 0
    chosenAnswer.value = undefined
    hasFailed.value = false
  }

  onBeforeUnmount(() => clearTimeout(nextQuestionTimer))

  return {
    questions,
    index,
    question,
    correctCount,
    chosenAnswer,
    hasFailed,
    hasWon,
    choose,
    restart,
  }
}
