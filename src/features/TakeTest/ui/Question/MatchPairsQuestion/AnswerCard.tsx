import { type FC, type Ref } from "react"
import type { TMatchPairsAnswer } from "@/types/test"
import clsx from "clsx"
import classes from "./Question.module.css"
import Card from "@/components/ui/Card/Card"
import { Stack } from "@/components/ui/Stack/Stack"
import Text from "@/components/ui/Text/Text"
import DragableIcon from "@/components/ui/DragableIcon/DragableIcon"

type TAnswerCardProps = {
    item: TMatchPairsAnswer
    ref?: Ref<HTMLDivElement>
    className?: string
}

const AnswerCard: FC<TAnswerCardProps> = ({ item, ref, className }) => {
    return (
        <Card
            ref={ref}
            tone={2}
            spacing="s"
            withBorder
            className={clsx(classes["answer"], className)}
        >
            <Stack direction="row" gap="s" secondaryAxisAlignment="center">
                <Text>{item.answerText}</Text>
                <DragableIcon />
            </Stack>
        </Card>
    )
}

export { AnswerCard }
export type { TAnswerCardProps }
