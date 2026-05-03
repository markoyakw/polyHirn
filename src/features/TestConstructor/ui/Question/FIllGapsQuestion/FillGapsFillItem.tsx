import type { FC } from "react"
import type {
    TFillGapsFillItem,
    TFillGapsQuestion,
} from "../../../model/types"
import Card from "@/components/ui/Card/Card"
import { Stack } from "@/components/ui/Stack/Stack"
import FillGapsAcceptedAnswerList from "./FillGapsAcceptedAnswerList"
import FillGapsItemHeader from "./FillGapsItemHeader"

type TFillGapsFillAnswer = TFillGapsFillItem["correctAnswerArr"][number]

type TFillGapsFillItemProps = {
    item: TFillGapsFillItem
    itemNumber: number
    question: TFillGapsQuestion
    onDelete: (itemId: TFillGapsFillItem["id"]) => void
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

const FillGapsFillItem: FC<TFillGapsFillItemProps> = ({
    item,
    itemNumber,
    question,
    onDelete,
    onAnswerAdd,
    onAnswerDelete,
    onAnswerUpdate,
}) => {
    const itemTitle = `Fill item ${itemNumber}`

    return (
        <Card tone={2} spacing="s" withBorder>
            <Stack gap="s">
                <FillGapsItemHeader
                    item={item}
                    question={question}
                    title={itemTitle}
                    onDelete={onDelete}
                    />

                <FillGapsAcceptedAnswerList
                            item={item}
                    onAnswerAdd={onAnswerAdd}
                            onAnswerDelete={onAnswerDelete}
                            onAnswerUpdate={onAnswerUpdate}
                        />
            </Stack>
        </Card>
    )
}

export default FillGapsFillItem
