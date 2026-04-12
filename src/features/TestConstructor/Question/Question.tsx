import { TQuestion } from "@/store/types";
import { FC } from "react";
import ConnectPairsQuestion from "./ConnectPairsQuestion/ConnectPairsQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion/MultipleChoiceQuestion";
import ShortAnswerQuestion from "./ShortAnswerQuestion/ShortAnswerQuestion";
import TrueFalseQuestion from "./TrueFalseQuestion/TrueFalseQuestion";

type TQuestionProps = {
    question: TQuestion
}

const Question: FC<TQuestionProps> = ({ question }) => {
    {
        switch (question.type) {
            case "multipleChoice": return <MultipleChoiceQuestion />
            case "trueFalse": return <TrueFalseQuestion />
            case "connectPairs": return <ConnectPairsQuestion />
            case "shortAnswer": return <ShortAnswerQuestion />
            default: throw new Error("Unknown question type");
        }
    }
};

export default Question;
