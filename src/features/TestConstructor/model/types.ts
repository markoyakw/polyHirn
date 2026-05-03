type TQuestionType =
  | "multipleChoice"
  | "trueFalse"
  | "matchPairs"
  | "shortAnswer"
  | "fillGaps"

type TBaseQuestion<TType extends TQuestionType> = {
  id: string
  type: TType
  questionText: string
}

type TMultipleChoiceAnswer = {
  id: string
  answerText: string
  isRight: boolean
}

type TMultipleChoiceQuestion = TBaseQuestion<"multipleChoice"> & {
  answerArr: TMultipleChoiceAnswer[]
}

type TTrueFalseQuestion = TBaseQuestion<"trueFalse"> & {
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

type TMatchPairsQuestion = TBaseQuestion<"matchPairs"> & {
  pairArr: TMatchPairsAnswerPair[]
}

type TMatchPairsAnswerPosition = 0 | 1

type TShortAnswerAcceptedAnswer = {
  id: string,
  answerText: string
}

type TShortAnswerQuestion = TBaseQuestion<"shortAnswer"> & {
  correctAnswerArr: TShortAnswerAcceptedAnswer[]
}

type TFillGapsFillItem = {
  type: "fill"
  id: string
  correctAnswerArr: {
    id: string
    answer: string
  }[]
}

type TFillGapsTextItem = {
  type: "text"
  id: string
  text: string
}

type TFillGapsItem = TFillGapsFillItem | TFillGapsTextItem

type TFillGapsQuestion = TBaseQuestion<"fillGaps"> & {
  items: TFillGapsItem[]
}

type TQuestion =
  | TMultipleChoiceQuestion
  | TTrueFalseQuestion
  | TMatchPairsQuestion
  | TShortAnswerQuestion
  | TFillGapsQuestion

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
  TMatchPairsAnswerPosition,
  TFillGapsFillItem,
  TFillGapsItem,
  TFillGapsQuestion,
  TFillGapsTextItem
}
