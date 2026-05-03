import type { FC } from "react"
import type {
    TFillGapsQuestion,
    TFillGapsTextItem,
} from "../../../model/types"
import Card from "@/components/ui/Card/Card"
import Input from "@/components/ui/Input/Input"
import { Stack } from "@/components/ui/Stack/Stack"
import FillGapsItemHeader from "./FillGapsItemHeader"

type TFillGapsTextItemProps = {
    item: TFillGapsTextItem
    itemNumber: number
    question: TFillGapsQuestion
    onDelete: (itemId: TFillGapsTextItem["id"]) => void
    onTextUpdate: (itemId: TFillGapsTextItem["id"], newValue: string) => void
}

const FillGapsTextItem: FC<TFillGapsTextItemProps> = ({
    item,
    itemNumber,
    question,
    onDelete,
    onTextUpdate,
}) => {
    const itemTitle = `Text item ${itemNumber}`

    return (
        <Card tone={2} spacing="s" withBorder>
            <Stack gap="s">
                <FillGapsItemHeader
                    item={item}
                    question={question}
                    title={itemTitle}
                    onDelete={onDelete}
                />

                <Input
                    value={item.text}
                    tone={3}
                    fullWidth
                    placeholder="Text shown before, between, or after gaps"
                    onChange={(event) => onTextUpdate(item.id, event.target.value)}
                />
            </Stack>
        </Card>
    )
}

export default FillGapsTextItem
