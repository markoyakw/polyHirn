export type TMultipleChoiceAnswer = {
    id: string,
    type: "multipleChoice",
    answerwhyText: string,
    isRight: boolean
}

export type TMultipleChoiceQuestion = {
    id: string,
    type: "multipleChoice",
    questionText: string,
    answerArr: TMultipleChoiceAnswer[]
}

export type TTrueFalseQuestion = {
    id: string,
    type: "trueFalse",
    questionText: string,
    correctAnswer: boolean | null
}

export type TConnectPairsQuestionItem = {
    id: string,
    leftText: string,
    rightText: string
}

export type TConnectPairsQuestion = {
    id: string,
    type: "connectPairs",
    questionText: string,
    pairArr: TConnectPairsQuestionItem[]
}

export type TShortAnswerQuestion = {
    id: string,
    type: "shortAnswer",
    questionText: string,
    correctAnswerArr: string[]
}

export type TQuestion =
    | TMultipleChoiceQuestion
    | TTrueFalseQuestion
    | TConnectPairsQuestion
    | TShortAnswerQuestion

export type TQuestionType = TQuestion["type"]

export type TQuestionUpdates = {
    type?: TQuestionType
    questionText?: string
    answerArr?: TMultipleChoiceAnswer[]
    correctAnswer?: boolean | null
    pairArr?: TConnectPairsQuestionItem[]
    correctAnswerArr?: string[]
}

export type TTest = {
    timeLimit?: number
    passMark: number
    name: string,
    questionArr: TQuestion[],
}

export type TestTestConstructorSlice = {
    draft: TTest
    setTitle: (title: string) => void
    addQuestion: (questionType: TQuestionType) => void
    removeQuestion: (id: string) => void
    reorderQuestions: (from: number, to: number) => void
    resetDraft: () => void
}

export type RootStore = TestTestConstructorSlice
