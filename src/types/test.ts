import type { TStudent } from "@/types/user"

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
    pointsPerAnswer: number
    answerArr: TMultipleChoiceAnswer[]
}

type TTrueFalseQuestion = TBaseQuestion<"trueFalse"> & {
    pointsPerQuestion: number
    answer: boolean | null
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
    pointsPerAnswer: number
    pairArr: TMatchPairsAnswerPair[]
}

type TMatchPairsAnswerPosition = 0 | 1

type TShortAnswerAcceptedAnswer = {
    id: string
    answerText: string
}

type TShortAnswerQuestion = TBaseQuestion<"shortAnswer"> & {
    pointsPerQuestion: number
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
    pointsPerAnswer: number
    items: TFillGapsItem[]
}

type TQuestion =
    | TMultipleChoiceQuestion
    | TTrueFalseQuestion
    | TMatchPairsQuestion
    | TShortAnswerQuestion
    | TFillGapsQuestion

type TTestDraft = {
    name: string
    questionArr: TQuestion[]
    passPoints: number
}

type TTest = TTestDraft & {
    id: string
    createdAt: string
    updatedAt: string
    author: string
    totalPoints: number
    testResultArr: TTestResult[]
}

type TTestResultTest = Omit<TTest, "testResultArr">

type TTestResult = {
    id: string
    answers: TQuestion[]
    completedAt: string
    completedBy: TStudent
    test: TTestResultTest
    points: number
}

type TTestResultItem =
    | { type: 'testResult'; data: TTestResult }
    | { type: 'folder'; data: TTestResultFolder }

type TTestResultFolder = {
    id: string
    name: string
    children: TTestResultItem[]
}

export type {
    TFillGapsFillItem,
    TFillGapsItem,
    TFillGapsQuestion,
    TFillGapsTextItem,
    TMatchPairsAnswer,
    TMatchPairsAnswerPair,
    TMatchPairsAnswerPosition,
    TMatchPairsQuestion,
    TMultipleChoiceAnswer,
    TMultipleChoiceQuestion,
    TQuestion,
    TQuestionType,
    TShortAnswerAcceptedAnswer,
    TShortAnswerQuestion,
    TTest,
    TTestDraft,
    TTestResult,
    TTestResultTest,
    TTestResultFolder,
    TTestResultItem,
    TTrueFalseQuestion,
}
