type TQuestionType =
  | "multipleChoice"
  | "trueFalse"
  | "matchPairs"
  | "shortAnswer"

type TBaseQuestion = {
  id: string
  type: TQuestionType
  questionText: string
}

type TMultipleChoiceAnswer = {
  id: string
  answerText: string
  isRight: boolean
}

type TMultipleChoiceQuestion = TBaseQuestion & {
  type: "multipleChoice"
  answerArr: TMultipleChoiceAnswer[]
}

type TTrueFalseQuestion = TBaseQuestion & {
  type: "trueFalse"
  correctAnswer: boolean | null
}

type TMatchPairsAnswer = {
  id: string
  answerText: string
}

type TMatchPairsAnswerPair = {
  id: string
  items: [TMatchPairsAnswer, TMatchPairsAnswer]
}

type TMatchPairsQuestion = TBaseQuestion & {
  type: "matchPairs"
  pairArr: TMatchPairsAnswerPair[]
}

type TMatchPairsAnswerPosition = 0 | 1

type TShortAnswerAcceptedAnswer = {
  id: string,
  answerText: string
}

type TShortAnswerQuestion = TBaseQuestion & {
  type: "shortAnswer"
  correctAnswerArr: TShortAnswerAcceptedAnswer[]
}

type TQuestion =
  | TMultipleChoiceQuestion
  | TTrueFalseQuestion
  | TMatchPairsQuestion
  | TShortAnswerQuestion

type TTest = {
  timeLimit?: number
  passMark: number
  name: string
  questionArr: TQuestion[]
}

export type {
  TMatchPairsQuestion,
  TMatchPairsAnswerPair,
  TMultipleChoiceAnswer,
  TMultipleChoiceQuestion,
  TQuestion,
  TQuestionType,
  TShortAnswerQuestion,
  TTest,
  TTrueFalseQuestion,
  TMatchPairsAnswer,
  TShortAnswerAcceptedAnswer,
  TMatchPairsAnswerPosition
}
