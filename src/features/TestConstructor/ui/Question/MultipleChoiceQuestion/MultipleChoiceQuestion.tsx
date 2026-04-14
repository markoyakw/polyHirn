import type { FC } from "react"
import type { TMultipleChoiceAnswer, TMultipleChoiceQuestion } from "../../../model/types"
import Input from "@/components/ui/Input/Input"
import { useStore } from "@/store"
import MultipleChoiceAnswer from "./MultipleChoiceAnswer"
import { Stack } from "@/components/ui/Stack/Stack"
import Button from "@/components/ui/Button/Button"
import { addMultipleChoiceAnswer, updateMultipleChoiceAnswer } from "@/features/TestConstructor/model/utils/updateQuestion"

type TMultipleChoiceQuestionProps = {
  question: TMultipleChoiceQuestion
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

  return (
    <Stack gap={"m"} secondaryAxisAlignment="start">

      <Input value={questionText}
        tone={2}
        onChange={(e) => onQuestionUpdate(id, { questionText: e.target.value })}
        label="Question" />

      <Stack gap="s">
        {answerArr.map((answer, index) =>
          <MultipleChoiceAnswer
            index={index}
            updateAnswer={applyUpdateAnswer}
            key={answer.id}
            answer={answer} />
        )}
      </Stack>
      <Button onClick={handleNewAnswerAdd} fullWidth tone={"secondary"}>
        add answer option +
      </Button>
    </Stack>
  )
}

export default MultipleChoiceQuestion
