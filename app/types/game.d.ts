type RawQuestion = {
  question: string
  answer: string
  wrongAnswers: [string, string, string]
}

type GameQuestion = {
  question: string
  answer: string
  answers: string[]
}
