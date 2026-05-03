import type { FC } from "react"
import type { TFillGapsFillItem } from "../../../model/types"
import Button from "@/components/ui/Button/Button"
import { Stack } from "@/components/ui/Stack/Stack"
import FillGapsAcceptedAnswerInput from "./FillGapsAcceptedAnswerInput"

type TFillGapsFillAnswer = TFillGapsFillItem["correctAnswerArr"][number]

type TFillGapsAcceptedAnswerListProps = {
    item: TFillGapsFillItem
    onAnswerAdd: (itemId: TFillGapsFillItem["id"]) => void
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

const FillGapsAcceptedAnswerList: FC<TFillGapsAcceptedAnswerListProps> = ({
    item,
    onAnswerAdd,
    onAnswerDelete,
    onAnswerUpdate,
}) => {
    return (
        <Stack gap="s">
            {item.correctAnswerArr.map((answer, index) => (
                <FillGapsAcceptedAnswerInput
                    key={answer.id}
                    answer={answer}
                    answerNumber={index + 1}
                    item={item}
                    onAnswerDelete={onAnswerDelete}
                    onAnswerUpdate={onAnswerUpdate}
                />
            ))}
            <Button
                buttonSize="s"
                tone={3}
                onClick={() => onAnswerAdd(item.id)}
                fullWidth
            >
                add accepted answer +
            </Button>
        </Stack>
    )
}

export default FillGapsAcceptedAnswerList
