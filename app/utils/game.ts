const QUESTIONS_PER_GAME = 5

const QUESTIONS: RawQuestion[] = [
  {
    question: 'Which of these bands is NOT a contender for the first metal song ever?',
    answer: 'Metallica',
    wrongAnswers: ['Black Sabbath', 'Iron Butterfly', 'The Beatles'],
  },
  {
    question: 'What is a wall of death?',
    answer: 'Two halves of the crowd charging at each other',
    wrongAnswers: ['A very tall merch stand', 'A haunted IKEA shelf', 'The toilet queue at Wacken'],
  },
  {
    question: 'Which country is Gojira from?',
    answer: 'France',
    wrongAnswers: ['Belgium', 'Sweden', 'Narnia'],
  },
  {
    question: 'Sven de Caluwé is the vocalist of which band?',
    answer: 'Aborted',
    wrongAnswers: ['Gojira', 'Behemoth', 'ABBA'],
  },
  {
    question: "Who played the guitar solo on Michael Jackson's Beat It?",
    answer: 'Eddie van Halen',
    wrongAnswers: ['Michael Jackson', 'Mark Holcomb', 'Tosin Abasi'],
  },
  {
    question: 'Which time signature makes a mathcore drummer yawn?',
    answer: '4/4',
    wrongAnswers: ['7/8', '13/16', '17/8'],
  },
  {
    question: 'A black metal logo is perfect when…',
    answer: 'It looks like a cracked leather chair',
    wrongAnswers: [
      'Your grandma can read it',
      'It is set in Comic Sans',
      'It fits on a business card',
    ],
  },
  {
    question: 'Which Swedish band pioneered the djent sound?',
    answer: 'Meshuggah',
    wrongAnswers: ['Ace of Base', 'In Flames', 'Amon Amarth'],
  },
  {
    question: 'Which two countries have the most metal bands per capita?',
    answer: 'Finland and Sweden',
    wrongAnswers: ['Iceland and France', 'Brazil and USA', 'Norway and Germany'],
  },
]

export function createGameRound(): GameQuestion[] {
  return shuffle(QUESTIONS)
    .slice(0, QUESTIONS_PER_GAME)
    .map(({ question, answer, wrongAnswers }) => ({
      question,
      answer,
      answers: shuffle([answer, ...wrongAnswers]),
    }))
}
