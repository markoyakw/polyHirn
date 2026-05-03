import type { FC } from "react"
import type {
    TFillGapsItem,
    TFillGapsQuestion,
} from "../../../model/types"
import IconButton, { ICON_BUTTON_ICON_MAP } from "@/components/ui/IconButton/IconButton"
import { Stack } from "@/components/ui/Stack/Stack"
import Text from "@/components/ui/Text/Text"
import { isFillGapsItemDeleteDisabled } from "@/features/TestConstructor/model/utils/update"
import classes from "../QuestionShared.module.css"

type TFillGapsItemHeaderProps = {
    item: TFillGapsItem
    question: TFillGapsQuestion
    title: string
    onDelete: (itemId: TFillGapsItem["id"]) => void
}

const FillGapsItemHeader: FC<TFillGapsItemHeaderProps> = ({
    item,
    question,
    title,
    onDelete,
}) => {
    return (
        <Stack direction="row" gap="s" secondaryAxisAlignment="center">
            <Text size="s" color="secondary" weight="medium">
                {title}
            </Text>
            <IconButton
                icon={ICON_BUTTON_ICON_MAP.delete}
                aria-label={`Delete ${title.toLocaleLowerCase()}`}
                onClick={() => onDelete(item.id)}
                disabled={isFillGapsItemDeleteDisabled(question, item)}
                className={classes["delete-button"]}
            />
        </Stack>
    )
}

export default FillGapsItemHeader
