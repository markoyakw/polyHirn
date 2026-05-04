import { FC } from "react";
import { TQuestion } from "../../model/types";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion/MultipleChoiceQuestion";
import TrueFalseQuestion from "./TrueFalseQuestion/TrueFalseQuestion";
import MatchPairsQuestion from "./MatchPairsQuestion/MatchPairsQuestion";
import ShortAnswerQuestion from "./ShortAnswerQuestion/ShortAnswerQuestion";
import FillGapsQuestion from "./FillGapsQuestion/FillGapsQuestion";

type TQuestionRendererProps = {
    question: TQuestion
}

const QuestionRenderer: FC<TQuestionRendererProps> = ({ question }) => {
    switch (question.type) {
        case "multipleChoice":
            return <MultipleChoiceQuestion question={question} />;
        case "trueFalse":
            return <TrueFalseQuestion question={question} />;
        case "matchPairs":
            return <MatchPairsQuestion question={question} />;
        case "shortAnswer":
            return <ShortAnswerQuestion question={question} />;
        case "fillGaps":
            return <FillGapsQuestion question={question} />;
        default:
            throw new Error("Unknown question type");
    }
};

export default QuestionRenderer
