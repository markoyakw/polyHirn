import { useRef, type FC } from "react"
import type { TQuestion } from "../../model/types"
import Card from "@/components/ui/Card/Card"
import Heading from "@/components/ui/Heading/Heading"
import { Stack } from "@/components/ui/Stack/Stack"
import { QUESTION_TYPE_LABELS } from "../../model/constants"
import classes from "./QuestionShared.module.css"
import { useStore } from "@/store"
import IconButton, { ICON_BUTTON_ICON_MAP } from "@/components/ui/IconButton/IconButton"
import DragableIcon from "@/components/ui/DragableIcon/DragableIcon"
import { useSortable } from "@dnd-kit/react/sortable"
import clsx from "clsx"
import QuestionRenderer from "./QuestionRenderer"
import { closestCenter } from '@dnd-kit/collision'
import dragClasses from "@/globalStyles/drag.module.css"
import AnimatedStackItem from "@/components/ui/Stack/AnimatedStackItem"
import { ParentDragDropProvider } from "@/hooks/useParentDragDrop"

type TQuestionProps = {
    question: TQuestion,
    index: number,
    isDragOverlay?: boolean,
    isDragging?: boolean,
    isDropping?: boolean,
}

const QuestionLayout: FC<TQuestionProps> = ({
    question,
    index,
    isDragOverlay,
    isDragging: passedIsDragging,
    isDropping: passedIsDropping,
}) => {
    const questionCount = useStore((state) => state.draft.questionArr.length)
    const removeQuestion = useStore((state) => state.removeQuestion)
    const handleRef = useRef<HTMLDivElement>(null)

    const QuestionHeading = `QUESTION ${index + 1} – ${QUESTION_TYPE_LABELS[question.type].toLocaleUpperCase()}`
    const { ref: sortableRef, isDragging, isDropping } = useSortable({
        id: question.id,
        index,
        collisionDetector: closestCenter,
        data: question,
        handle: handleRef
    })
    const effectiveIsDragging = passedIsDragging ?? isDragging
    const effectiveIsDropping = passedIsDropping ?? isDropping

    const layoutClassName = clsx(
        classes["card-layout"],
        dragClasses["drag-item"],
        effectiveIsDragging && !isDragOverlay && dragClasses["drag-item--is-dragging"],
        isDragOverlay && dragClasses["drag-item--overlay"]
    )

    return (
        <AnimatedStackItem
            width="var(--max-question-width)"
            ref={sortableRef}
        >
            <Card
                withBorder
                spacing="m"
                className={layoutClassName}
            >
                <ParentDragDropProvider
                    isDragging={effectiveIsDragging}
                    isDropping={effectiveIsDropping}
                >
                    <Stack gap="s">
                        <Stack
                            className={classes["question__header"]}
                            direction="row"
                            alignment="start"
                            secondaryAxisAlignment="center"
                            gap="s"
                        >
                            <DragableIcon ref={handleRef} />
                            <Heading as={"h4"}>
                                {QuestionHeading}
                            </Heading>
                            <IconButton
                                icon={ICON_BUTTON_ICON_MAP.delete}
                                aria-label={`Delete question ${index + 1}`}
                                onClick={() => removeQuestion(question.id)}
                                disabled={questionCount <= 1}
                                className={classes["delete-button"]}
                            />
                        </Stack>
                        <QuestionRenderer question={question} />
                    </Stack>
                </ParentDragDropProvider>
            </Card>
        </AnimatedStackItem >
    )
}

export default QuestionLayout
