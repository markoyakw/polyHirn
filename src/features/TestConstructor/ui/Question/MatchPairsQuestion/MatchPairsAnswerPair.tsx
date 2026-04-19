import Card from "@/components/ui/Card/Card";
import { Stack } from "@/components/ui/Stack/Stack";
import { TMatchPairsAnswerPair, TMatchPairsAnswerPosition } from "@/features/TestConstructor/model/types";
import getLetterByIndex from "@/utils/getLetterByIndex";
import { FC } from "react";
import classes from "./MatchPairsQuestion.module.css"
import IconButton, { ICON_BUTTON_ICON_MAP } from "@/components/ui/IconButton/IconButton";
import MatchPairsAnswer from "./MatchPairsAnswer";

type TMatchPairsAnswerPairProps = {
    answerPair: TMatchPairsAnswerPair,
    index: number,
    onAnswerChange: (newValue: string, answerPosition: TMatchPairsAnswerPosition) => void
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

    return (
        <Card tone={1} withBorder spacing="s">
            <Stack direction="row" gap="s">
                <Stack gap="s" className={classes["pair-stack"]}>
                    <MatchPairsAnswer
                        answer={answerPair.leftPair}
                        answerPosition="leftPair"
                        inputId={leftInputId}
                        label={`${index + 1})`}
                        pairId={answerPair.id}
                        onAnswerChange={onAnswerChange}
                    />
                    <MatchPairsAnswer
                        answer={answerPair.rightPair}
                        answerPosition="rightPair"
                        inputId={rightInputId}
                        label={`${getLetterByIndex(index + 1, true)})`}
                        pairId={answerPair.id}
                        onAnswerChange={onAnswerChange}
                    />
                </Stack>
                <IconButton
                    icon={ICON_BUTTON_ICON_MAP.delete}
                    aria-label={`Delete match pair ${index + 1}`}
                    onClick={() => onDelete(answerPair.id)}
                    disabled={isDeleteDisabled}
                />
            </Stack>
        </Card>
    );
};

export default MatchPairsAnswerPair;
