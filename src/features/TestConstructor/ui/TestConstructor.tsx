"use client"
import { useStore } from "@/store"
import { Stack } from "@/components/ui/Stack/Stack"
import { Header } from "./Header/Header"
import { DragDropProvider, DragEndEvent, DragOverlay } from "@dnd-kit/react"
import { isSortable } from "@dnd-kit/react/sortable"
import QuestionLayout from "./Question/QuestionLayout"
import Portal from "@/components/ui/Portal/Portal"
import { AnimatePresence } from "motion/react"

const TestConstructor = () => {
    const questionArr = useStore(state => state.draft.questionArr)
    const reorderQuestions = useStore(state => state.reorderQuestions)

    const handleDragEnd = (e: DragEndEvent) => {
        const { source } = e.operation;
        if (isSortable(source)) {
            const { initialIndex, index } = source
            reorderQuestions(initialIndex, index)
        }
    }

    return (
        <DragDropProvider onDragEnd={handleDragEnd}>
            <Stack gap="m">
                <Header />
                <Stack gap="m">
                    <AnimatePresence>
                        {
                            questionArr.map((question, index) =>
                                <QuestionLayout
                                    key={question.id}
                                    question={question}
                                    index={index}
                                />
                            )
                        }
                    </AnimatePresence>
                </Stack>
            </Stack >

            <Portal>
                <DragOverlay dropAnimation={null}>
                    {source => {
                        if (!isSortable(source)) return null

                        const draggedQuestion = questionArr[source.initialIndex]
                        if (!draggedQuestion) return null

                        return (
                            <QuestionLayout
                                question={draggedQuestion}
                                index={source.initialIndex}
                                isDragOverlay
                            />
                        )
                    }}
                </DragOverlay>
            </Portal>

        </DragDropProvider >
    )
}

export default TestConstructor
