import type { TQuestion, TQuestionType, TTest } from "@/features/TestConstructor/model/types"

type TestTestConstructorSlice = {
    draft: TTest
    setTitle: (title: string) => void
    addQuestion: (questionType: TQuestionType) => void
    removeQuestion: (id: string) => void
    reorderQuestions: (sourceIndex: number, targetIndex: number) => void
    resetDraft: () => void
    updateQuestion<T extends TQuestion>(id: T["id"], update: Partial<Omit<T, "id" | "type">>): void
    updateQuestionFn(questionId: TQuestion["id"], update: (question: TQuestion) => TQuestion): void
}

type RootStore = TestTestConstructorSlice

export type { RootStore, TestTestConstructorSlice }
