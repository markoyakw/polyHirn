import type { FC } from "react"
import type { TFillGapsQuestion } from "../../../model/types"
import Button from "@/components/ui/Button/Button"
import Input from "@/components/ui/Input/Input"
import { Stack } from "@/components/ui/Stack/Stack"
import FillGapsQuestionItem from "./FillGapsQuestionItem"
import { useFillGapsQuestionActions } from "./useFillGapsQuestionActions"

type TFillGapsQuestionProps = {
    question: TFillGapsQuestion
}

const FillGapsQuestion: FC<TFillGapsQuestionProps> = ({ question }) => {
    const actions = useFillGapsQuestionActions(question.id)

    return (
        <Stack gap="m">
            <Input
                value={question.questionText}
                tone={2}
                placeholder="Question text"
                onChange={(event) => actions.updateQuestionText(event.target.value)}
            />

            <Stack gap="s">
                {question.items.map((item, index) => (
                    <FillGapsQuestionItem
                        key={item.id}
                        actions={actions}
                        item={item}
                        itemNumber={index + 1}
                        question={question}
                    />
                ))}
            </Stack>

            <Stack direction="row" gap="s" secondaryAxisAlignment="stretch">
                <Button onClick={() => actions.addItem("text")} fullWidth>
                    add text item +
                </Button>
                <Button onClick={() => actions.addItem("fill")} fullWidth>
                    add fill item +
                </Button>
            </Stack>
        </Stack>
    )
}

export default FillGapsQuestion
