import { type FC } from "react"
import type { TMultipleChoiceAnswer, TMultipleChoiceQuestion } from "@/types/test"
import Input from "@/components/ui/Input/Input"
import { useStore } from "@/store"
import {
  selectMultipleChoiceAnswerCount,
  selectMultipleChoiceAnswerIds,
  selectMultipleChoiceQuestionById,
  selectUpdateQuestion,
  selectUpdateQuestionFn,
} from "@/store/slices/testConstructor.selectors"
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
import dragClasses from "@/globalStyles/drag.module.css"
import { DragDropProvider, DragOverlay, type DragEndEvent } from "@dnd-kit/react"
import { isSortable } from "@dnd-kit/react/sortable"
import Portal from "@/components/ui/Portal/Portal"
import { AnimatePresence } from "motion/react"
import { useShallow } from "zustand/react/shallow"

type TMultipleChoiceQuestionProps = {
  questionId: TMultipleChoiceQuestion["id"],
}

const MultipleChoiceQuestion: FC<TMultipleChoiceQuestionProps> = ({ questionId }) => {

  const question = useStore(selectMultipleChoiceQuestionById(questionId))
  const answerIds = useStore(useShallow(selectMultipleChoiceAnswerIds(questionId)))
  const answerCount = useStore(selectMultipleChoiceAnswerCount(questionId))
  const onQuestionUpdate = useStore(selectUpdateQuestion)
  const updateQuestionFn = useStore(selectUpdateQuestionFn)

  const { id, questionText } = question

  const applyUpdateAnswer = (answerId: TMultipleChoiceAnswer['id'], newAnswer: TMultipleChoiceAnswer) => {
    return updateQuestionFn(questionId, updateMultipleChoiceAnswer(answerId, newAnswer))
  }

  const handleNewAnswerAdd = () => {
    updateQuestionFn(questionId, () => addMultipleChoiceAnswer(question))
  }

  const handleAnswerDelete = (answerId: TMultipleChoiceAnswer["id"]) => {
    updateQuestionFn(questionId, deleteMultipleChoiceAnswer(answerId))
  }

  const onDragEnd = (e: DragEndEvent) => {
    const { source } = e.operation;
    if (isSortable(source)) {
      const { initialIndex, index } = source
      updateQuestionFn(questionId, reorderMultipleChoiceAnswers(index, initialIndex))
    }
  }

  return (
    <DragDropProvider onDragEnd={onDragEnd}>
      <Stack gap={"m"} secondaryAxisAlignment="stretch" className={classes["type-question"]}>
        <Input
          value={questionText}
          tone={2}
          onChange={(e) => onQuestionUpdate(id, { questionText: e.target.value })}
          placeholder="Question text"
        />
        <Stack gap="s">
          <AnimatePresence>
            {answerIds.map((answerId, index) =>
              <MultipleChoiceAnswer
                index={index}
                updateAnswer={applyUpdateAnswer}
                onDelete={handleAnswerDelete}
                isDeleteDisabled={answerCount <= MINIMUM_MULTIPLE_CHOICE_ANSWER_COUNT}
                key={answerId}
                questionId={questionId}
                answerId={answerId} />
            )}
          </AnimatePresence>
        </Stack>
        <Button onClick={handleNewAnswerAdd} fullWidth>
          add answer option +
        </Button>
      </Stack>

      <Portal>
        <DragOverlay className={dragClasses["drag-overlay"]}>
          {
            (operation) => {
              if (isSortable(operation)) {
                const id = operation.id
                return <MultipleChoiceAnswer
                  index={operation.initialIndex}
                  updateAnswer={() => { }}
                  onDelete={() => { }}
                  isDeleteDisabled={true}
                  questionId={questionId}
                  answerId={id.toString()}
                  isDragOverlay={true}
                />
              }
            }
          }
        </DragOverlay>
      </Portal>
    </DragDropProvider >
  )
}

export default MultipleChoiceQuestion
