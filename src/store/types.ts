import type { TQuestion, TQuestionType, TTestDraft } from "@/types/test"

type TestTestConstructorSlice = {
    draft: TTestDraft
    setTitle: (title: string) => void
    addQuestion: (questionType: TQuestionType) => void
    removeQuestion: (id: string) => void
    reorderQuestions: (sourceIndex: number, targetIndex: number) => void
    resetDraft: () => void
    updateQuestion<T extends TQuestion>(id: T["id"], update: Partial<Omit<T, "id" | "type">>): void
    updateQuestionFn<T extends TQuestion>(questionId: T["id"], update: (question: T) => T): void
}

type RootStore = TestTestConstructorSlice

export type { RootStore, TestTestConstructorSlice }
