import type { FC } from "react"
import type { TShortAnswerAcceptedAnswer } from "@/types/test"
import Card from "@/components/ui/Card/Card"
import IconButton, { ICON_BUTTON_ICON_MAP } from "@/components/ui/IconButton/IconButton"
import Input from "@/components/ui/Input/Input"
import Label from "@/components/ui/Label/Label"
import { Stack } from "@/components/ui/Stack/Stack"
import AnimatedStackItem from "@/components/ui/Stack/AnimatedStackItem"

type TShortAnswerQuestionAnswerProps = {
    answer: TShortAnswerAcceptedAnswer
    inputId: string
    index: number
    isDeleteDisabled: boolean
    onAnswerChange: (answerId: TShortAnswerAcceptedAnswer["id"], newValue: string) => void
    onAnswerRemove: (answerId: TShortAnswerAcceptedAnswer["id"]) => void
}

const ShortAnswerQuestionAnswer: FC<TShortAnswerQuestionAnswerProps> = ({
    answer,
    inputId,
    index,
    isDeleteDisabled,
    onAnswerChange,
    onAnswerRemove,
}) => {
    const answerId = `short-answer-answer-${answer.id}`

    return (
        <AnimatedStackItem id={answerId}>
            <Card tone={2} spacing="s" withBorder>
                <Stack gap="s">
                    <Label htmlFor={inputId}>
                        Accepted answer {index + 1}
                    </Label>
                    <Stack direction="row" gap="s" secondaryAxisAlignment="center">
                        <Input
                            id={inputId}
                            value={answer.answerText}
                            tone={3}
                            fullWidth
                            placeholder="Accepted answer"
                            onChange={(event) =>
                                onAnswerChange(answer.id, event.target.value)
                            }
                        />
                        <IconButton
                            icon={ICON_BUTTON_ICON_MAP.delete}
                            aria-label={`Delete accepted answer ${index + 1}`}
                            onClick={() => onAnswerRemove(answer.id)}
                            disabled={isDeleteDisabled}
                        />
                    </Stack>
                </Stack>
            </Card>
        </AnimatedStackItem>
    )
}

export default ShortAnswerQuestionAnswer
