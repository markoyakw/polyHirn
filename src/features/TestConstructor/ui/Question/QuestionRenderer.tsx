import { FC } from "react";
import type { TQuestion } from "@/types/test";
import { useStore } from "@/store";
import { selectQuestionById } from "@/store/slices/testConstructor.selectors";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion/MultipleChoiceQuestion";
import TrueFalseQuestion from "./TrueFalseQuestion/TrueFalseQuestion";
import MatchPairsQuestion from "./MatchPairsQuestion/MatchPairsQuestion";
import ShortAnswerQuestion from "./ShortAnswerQuestion/ShortAnswerQuestion";
import FillGapsQuestion from "./FIllGapsQuestion/FillGapsQuestion";

type TQuestionRendererProps = {
    questionId: TQuestion["id"]
}

const QuestionRenderer: FC<TQuestionRendererProps> = ({ questionId }) => {
    const question = useStore(selectQuestionById(questionId))

    if (question == null) return null

    switch (question.type) {
        case "multipleChoice":
            return <MultipleChoiceQuestion questionId={question.id} />;
        case "trueFalse":
            return <TrueFalseQuestion questionId={question.id} />;
        case "matchPairs":
            return <MatchPairsQuestion questionId={question.id} />;
        case "shortAnswer":
            return <ShortAnswerQuestion questionId={question.id} />;
        case "fillGaps":
            return <FillGapsQuestion questionId={question.id} />;
        default:
            throw new Error("Unknown question type");
    }
};

export default QuestionRenderer
