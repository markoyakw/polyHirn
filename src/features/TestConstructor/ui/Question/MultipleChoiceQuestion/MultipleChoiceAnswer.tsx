import Card from "@/components/ui/Card/Card";
import Input from "@/components/ui/Input/Input";
import { Stack } from "@/components/ui/Stack/Stack";
import { TMultipleChoiceAnswer } from "@/features/TestConstructor/model/types";
import { FC } from "react"
import getLetterByIndex from "@/utils/getLetterByIndex";

type TMultipleChoiceAnswerProps = {
    answer: TMultipleChoiceAnswer,
    updateAnswer: (answerId: TMultipleChoiceAnswer['id'], newAnswer: TMultipleChoiceAnswer) => void,
    index: number
}

const MultipleChoiceAnswer: FC<TMultipleChoiceAnswerProps> = ({ answer, updateAnswer, index }) => {

    const onIsRightChange = (isRight: boolean) => updateAnswer(answer.id, { ...answer, isRight: isRight })
    const onAnswerTextChange = (answerText: string) => updateAnswer(answer.id, { ...answer, answerText: answerText })

    return (
        <Card tone={2} spacing="s" withBorder>
            <Stack gap="s" direction="row">
                <Input tone={3} label={(getLetterByIndex(index, true)) + ") answer option "} value={answer.answerText} onChange={(e) => onAnswerTextChange(e.target.value)} />
                <input type="checkbox" checked={answer.isRight} onChange={(e) => onIsRightChange(e.target.checked)} />
            </Stack>
        </Card>
    );
};

export default MultipleChoiceAnswer;