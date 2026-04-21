import { type FC } from "react"
import type { TMultipleChoiceAnswer, TMultipleChoiceQuestion } from "../../../model/types"
import Input from "@/components/ui/Input/Input"
import { useStore } from "@/store"
import MultipleChoiceAnswer from "./MultipleChoiceAnswer"
import { Stack } from "@/components/ui/Stack/Stack"
import Button from "@/components/ui/Button/Button"
import {
  MINIMUM_MULTIPLE_CHOICE_ANSWER_COUNT,
  addMultipleChoiceAnswer,
  deleteMultipleChoiceAnswer,
  reorderMultipleChoiceAnswers,
  updateMultipleChoiceAnswer,
} from "@/features/TestConstructor/model/utils/update"
import classes from "@/features/TestConstructor/ui/Question/QuestionShared.module.css"
import { DragDropProvider, DragOverlay, type DragEndEvent } from "@dnd-kit/react"
import { isSortable } from "@dnd-kit/react/sortable"
import Portal from "@/components/ui/Portal/Portal"
import { AnimatePresence } from "motion/react"

type TMultipleChoiceQuestionProps = {
  question: TMultipleChoiceQuestion,
}

const MultipleChoiceQuestion: FC<TMultipleChoiceQuestionProps> = ({ question }) => {

  const { id, questionText, answerArr } = question
  const onQuestionUpdate = useStore(state => state.updateQuestion)
  const updateQuestionFn = useStore(state => state.updateQuestionFn)

  const applyUpdateAnswer = (answerId: TMultipleChoiceAnswer['id'], newAnswer: TMultipleChoiceAnswer) => {
    return updateQuestionFn(question.id, updateMultipleChoiceAnswer(answerId, newAnswer))
  }

  const handleNewAnswerAdd = () => {
    updateQuestionFn(question.id, () => addMultipleChoiceAnswer(question))
  }

  const handleAnswerDelete = (answerId: TMultipleChoiceAnswer["id"]) => {
    updateQuestionFn(question.id, deleteMultipleChoiceAnswer(answerId))
  }

  const onDragEnd = (e: DragEndEvent) => {
    const { source } = e.operation;
    if (isSortable(source)) {
      const { initialIndex, index } = source
      updateQuestionFn(question.id, reorderMultipleChoiceAnswers(index, initialIndex))
    }
  }

  return (
    <DragDropProvider onDragEnd={onDragEnd}>
      <AnimatePresence>

        <Stack gap={"m"} secondaryAxisAlignment="stretch" className={classes["type-question"]}>
          <Input
            value={questionText}
            tone={2}
            onChange={(e) => onQuestionUpdate(id, { questionText: e.target.value })}
            placeholder="Question text"
          />
          <Stack gap="s">
            {answerArr.map((answer, index) =>
              <MultipleChoiceAnswer
                index={index}
                updateAnswer={applyUpdateAnswer}
                onDelete={handleAnswerDelete}
                isDeleteDisabled={answerArr.length <= MINIMUM_MULTIPLE_CHOICE_ANSWER_COUNT}
                key={answer.id}
                answer={answer} />
            )}
          </Stack>
          <Button onClick={handleNewAnswerAdd} fullWidth>
            add answer option +
          </Button>
        </Stack>

        <Portal>
          <DragOverlay dropAnimation={null}>
            {
              (operation) => {
                if (isSortable(operation)) {
                  const initialIndex = operation.initialIndex
                  return <MultipleChoiceAnswer
                    index={initialIndex}
                    updateAnswer={() => { }}
                    onDelete={() => { }}
                    isDeleteDisabled={true}
                    answer={answerArr[initialIndex]}
                    isDragOverlay={true}
                  />
                }
              }
            }
          </DragOverlay>
        </Portal>

      </AnimatePresence>
    </DragDropProvider>
  )
}

export default MultipleChoiceQuestion
