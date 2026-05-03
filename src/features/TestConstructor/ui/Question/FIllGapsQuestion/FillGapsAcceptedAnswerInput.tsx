import type { FC } from "react"
import type { TFillGapsFillItem } from "../../../model/types"
import Card from "@/components/ui/Card/Card"
import IconButton, { ICON_BUTTON_ICON_MAP } from "@/components/ui/IconButton/IconButton"
import Input from "@/components/ui/Input/Input"
import { Stack } from "@/components/ui/Stack/Stack"
import { MINIMUM_FILL_GAPS_ACCEPTED_ANSWER_COUNT } from "@/features/TestConstructor/model/utils/update"

type TFillGapsFillAnswer = TFillGapsFillItem["correctAnswerArr"][number]

type TFillGapsAcceptedAnswerInputProps = {
    answer: TFillGapsFillAnswer
    answerNumber: number
    item: TFillGapsFillItem
    onAnswerDelete: (
        itemId: TFillGapsFillItem["id"],
        answerId: TFillGapsFillAnswer["id"]
    ) => void
    onAnswerUpdate: (
        itemId: TFillGapsFillItem["id"],
        answerId: TFillGapsFillAnswer["id"],
        newValue: string
    ) => void
}

const FillGapsAcceptedAnswerInput: FC<TFillGapsAcceptedAnswerInputProps> = ({
    answer,
    answerNumber,
    item,
    onAnswerDelete,
    onAnswerUpdate,
}) => {
    const answerInputId = `fill-gaps-${item.id}-${answer.id}`

    return (
        <Card spacing="s" tone={3}>
            <Stack direction="row" gap="s" secondaryAxisAlignment="center" >
                <Input
                    id={answerInputId}
                    value={answer.answer}
                    tone={4}
                    fullWidth
                    label={`Accepted answer ${answerNumber}`}
                    placeholder="Answer for this gap"
                    onChange={(event) =>
                        onAnswerUpdate(item.id, answer.id, event.target.value)
                    }
                />
                <IconButton
                    icon={ICON_BUTTON_ICON_MAP.delete}
                    aria-label={`Delete accepted answer ${answerNumber}`}
                    onClick={() => onAnswerDelete(item.id, answer.id)}
                    disabled={
                        item.correctAnswerArr.length <=
                        MINIMUM_FILL_GAPS_ACCEPTED_ANSWER_COUNT
                    }
                />
            </Stack>
        </Card>
    )
}

export default FillGapsAcceptedAnswerInput
