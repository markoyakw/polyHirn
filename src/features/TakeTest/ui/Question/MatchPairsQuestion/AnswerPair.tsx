import { type FC } from "react"
import type { TMatchPairsAnswer, TMatchPairsAnswerPair } from "@/types/test"
import { Stack } from "@/components/ui/Stack/Stack"
import Text from "@/components/ui/Text/Text"
import { DropSlot } from "./DropSlot"
import classes from "./Question.module.css"

type TAnswerPairProps = {
    pair: TMatchPairsAnswerPair
    assignedRightItem: TMatchPairsAnswer | undefined
}

const AnswerPair: FC<TAnswerPairProps> = ({ pair, assignedRightItem }) => {
    const leftItem = pair.items[0]

    return (
        <Stack direction="row" gap="s" secondaryAxisAlignment="center">
            <Text className={classes["left-label"]}>{leftItem.answerText}</Text>
            <DropSlot leftItemId={leftItem.id} assignedItem={assignedRightItem} />
        </Stack>
    )
}

export { AnswerPair }
export type { TAnswerPairProps }
