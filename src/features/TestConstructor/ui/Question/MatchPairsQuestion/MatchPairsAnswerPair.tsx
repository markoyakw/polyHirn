import Card from "@/components/ui/Card/Card";
import { Stack } from "@/components/ui/Stack/Stack";
import { TMatchPairsAnswerPair, TMatchPairsAnswerPosition } from "@/features/TestConstructor/model/types";
import { FC } from "react";
import classes from "./MatchPairsQuestion.module.css"
import IconButton, { ICON_BUTTON_ICON_MAP } from "@/components/ui/IconButton/IconButton";
import MatchPairsAnswer from "./MatchPairsAnswer";
import AnimatedBlock from "@/components/ui/AnimatedBlock/AnimatedBlock";
import {
    getMatchPairsAnswerFlatIndex,
    getMatchPairsAnswerLabel,
} from "./lib";

type TMatchPairsAnswerPairProps = {
    answerPair: TMatchPairsAnswerPair,
    index: number,
    onAnswerChange: (
        pairId: string,
        answerPosition: TMatchPairsAnswerPosition,
        newValue: string
    ) => void
    onDelete: (pairId: TMatchPairsAnswerPair["id"]) => void
    isDeleteDisabled: boolean
}

const MatchPairsAnswerPair: FC<TMatchPairsAnswerPairProps> = ({
    answerPair,
    index,
    onAnswerChange,
    onDelete,
    isDeleteDisabled,
}) => {
    const leftInputId = `match-pairs-left-${answerPair.id}`
    const rightInputId = `match-pairs-right-${answerPair.id}`
    
    const answerSlots: Array<{
        answerPosition: TMatchPairsAnswerPosition
        inputId: string
    }> = [
        {
            answerPosition: 0,
            inputId: leftInputId,
        },
        {
            answerPosition: 1,
            inputId: rightInputId,
        },
    ]

    return (
        <AnimatedBlock>
            <Card tone={1} withBorder spacing="s" className={classes["pair-card"]}>
                <Stack direction="row" gap="s" secondaryAxisAlignment="stretch">
                    <Stack gap="s" className={classes["pair-stack"]}>
                        {answerSlots.map(({ answerPosition, inputId }) => (
                            <MatchPairsAnswer
                                key={answerPair.items[answerPosition].id}
                                answer={answerPair.items[answerPosition]}
                                answerPosition={answerPosition}
                                pairId={answerPair.id}
                                inputId={inputId}
                                label={getMatchPairsAnswerLabel(index, answerPosition)}
                                onAnswerChange={onAnswerChange}
                                index={getMatchPairsAnswerFlatIndex(index, answerPosition)}
                            />
                        ))}
                    </Stack>
                    <div className={classes["pair-actions"]}>
                        <IconButton
                            icon={ICON_BUTTON_ICON_MAP.delete}
                            aria-label={`Delete match pair ${index + 1}`}
                            onClick={() => onDelete(answerPair.id)}
                            disabled={isDeleteDisabled}
                        />
                    </div>
                </Stack>
            </Card>
        </AnimatedBlock>
    );
};

export default MatchPairsAnswerPair;
