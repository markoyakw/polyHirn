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
  answerText: string
}

type TMatchPairsAnswerPosition = "leftPair" | "rightPair"

type TMatchPairsAnswerPair = {
  id: string
} & {
  [K in TMatchPairsAnswerPosition]: TMatchPairsAnswer
}

type TMatchPairsQuestion = TBaseQuestion & {
  type: "matchPairs"
  pairArr: TMatchPairsAnswerPair[]
}

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
  TMatchPairsAnswerPosition,
  TMultipleChoiceAnswer,
  TMultipleChoiceQuestion,
  TQuestion,
  TQuestionType,
  TShortAnswerQuestion,
  TTest,
  TTrueFalseQuestion,
  TMatchPairsAnswer,
  TShortAnswerAcceptedAnswer
}
