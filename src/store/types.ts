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
export type TQuestion = TMultipleChoiceQuestion

export type TTest = {
    timeLimit?: number
    passMark: number
    name: string,
    questionArr: TQuestion[],
}

export type TestTestConstructorSlice = {
    draft: TTest
    setTitle: (title: string) => void
    addQuestion: (question: TQuestion) => void
    updateQuestion: (id: string, updates: Partial<TQuestion>) => void
    removeQuestion: (id: string) => void
    reorderQuestions: (from: number, to: number) => void
    resetDraft: () => void
}

export type RootStore = TestTestConstructorSlice
