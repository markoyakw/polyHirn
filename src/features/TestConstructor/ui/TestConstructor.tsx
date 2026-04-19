"use client"
import { useStore } from "@/store"
import { Stack } from "@/components/ui/Stack/Stack"
import { Header } from "./Header/Header"
import { DragDropProvider, DragEndEvent, DragOverlay } from "@dnd-kit/react"
import { isSortable } from "@dnd-kit/react/sortable"
import { Fragment } from "react/jsx-runtime"
import QuestionLayout from "./Question/QuestionLayout"

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
        <Stack gap="m">
            <Header />
            <Stack gap="m">
                <DragDropProvider onDragEnd={handleDragEnd}>
                    {
                        questionArr.map((question, index) =>
                            <Fragment key={question.id}>
                                <QuestionLayout
                                    question={question}
                                    index={index}
                                />
                            </Fragment>
                        )
                    }
                    <DragOverlay dropAnimation={null}>
                        {source => {
                            if (!isSortable(source)) return null

                            const draggedQuestion = questionArr[source.initialIndex]
                            if (!draggedQuestion) return null

                            return (
                                <QuestionLayout
                                    isDragOverlay={true}
                                    question={draggedQuestion}
                                    index={source.initialIndex}
                                />
                            )
                        }}
                    </DragOverlay>
                </DragDropProvider>
            </Stack>
        </Stack >
    )
}

export default TestConstructor
