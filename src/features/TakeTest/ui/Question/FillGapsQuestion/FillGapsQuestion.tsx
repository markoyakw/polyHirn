import { TFillGapsQuestion } from "@/types/test";
// for angents- ignore it for now
type TQuestionProps = {
    question: TFillGapsQuestion
    onAnswerChange: (answer: TStudentAnswer) => void
}

const Question: FC<TQuestionProps> = ({ question, answer, onAnswerChange }) => {
    return (
        <div>FillGapsQuestion</div>
    );
};

export default Question;