import type { FC } from "react"
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
import AnimatedBlock from "@/components/ui/AnimatedBlock/AnimatedBlock"

type TQuestionProps = {
    question: TQuestion,
    index: number,
    isDragOverlay?: boolean,
}

const QuestionLayout: FC<TQuestionProps> = ({ question, index, isDragOverlay }) => {
    const questionCount = useStore((state) => state.draft.questionArr.length)
    const removeQuestion = useStore((state) => state.removeQuestion)

    const QuestionHeading = `QUESTION ${index + 1} – ${QUESTION_TYPE_LABELS[question.type].toLocaleUpperCase()}`
    const { ref: sortableRef, isDragging } = useSortable({ id: question.id, index, collisionDetector: closestCenter })

    const layoutClassName = clsx(
        classes["card-layout"],
        isDragging && !isDragOverlay && dragClasses["drag-item--dragging"],
        isDragOverlay && dragClasses["drag-item--overlay"]
    )

    return (
        <AnimatedBlock
            key={question.id}
            width="var(--max-question-width)"
            ref={sortableRef}
        >
            <Card
                withBorder
                spacing="m"
                className={layoutClassName}
            >
                <Stack gap="s">
                    <Stack
                        direction="row"
                        alignment="start"
                        secondaryAxisAlignment="center"
                        gap="s"
                    >
                        <DragableIcon />
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
            </Card>
        </AnimatedBlock >
    )
}

export default QuestionLayout
