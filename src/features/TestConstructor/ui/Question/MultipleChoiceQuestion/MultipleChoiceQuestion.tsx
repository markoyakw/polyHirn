import type { FC } from "react"
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
import { DragDropProvider, type DragEndEvent } from "@dnd-kit/react"

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

    const sourceId = e.operation.source?.id?.toString()
    const targetId = e.operation.target?.id?.toString()

    if (sourceId == null || targetId == null) {
      throw new Error(
        "No draggable/droppable id was provided, sourceId = " +
        sourceId +
        " targetId = " +
        targetId
      )
    }

    updateQuestionFn(question.id, reorderMultipleChoiceAnswers(targetId, sourceId))
  }
  
  return (
    <Stack gap={"m"} secondaryAxisAlignment="stretch" className={classes["type-question"]}>
      <Input
        value={questionText}
        tone={2}
        onChange={(e) => onQuestionUpdate(id, { questionText: e.target.value })}
        placeholder="Question text"
      />

      <DragDropProvider
        onDragEnd={onDragEnd}
      >
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
      </DragDropProvider>
      <Button onClick={handleNewAnswerAdd} fullWidth>
        add answer option +
      </Button>
    </Stack>
  )
}

export default MultipleChoiceQuestion
