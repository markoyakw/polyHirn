import type { TFillGapsQuestion } from "@/features/TestConstructor/model/types";
import type { FC } from "react";
import classes from "./FillGapsQuestion.module.css"
import clsx from "clsx";
import Textarea from "@/components/ui/Textarea/Textarea";
import FillGapsHighlightedText from "./FillGapsHighlightedText";
import FillGapsTextWithGaps from "./FillGapsTextWithGaps";
import { useFillGapsQuestion } from "./useFillGapsQuestion";

type TFillGapsQuestionProps = {
    question: TFillGapsQuestion
}

const FillGapsQuestion: FC<TFillGapsQuestionProps> = () => {
    const {
        gapArr,
        handleGapResizeStart,
        handleInsertGap,
        handleTextareaChange,
        highlightedGap,
        textareaRef,
        textareaValue,
    } = useFillGapsQuestion()

    return (
        <div className={classes["container"]}>
            <div className={classes["mirror-div"]}>
                <FillGapsHighlightedText
                    onInsertGap={handleInsertGap}
                    text={textareaValue}
                    gap={highlightedGap}
                />
            </div>
            <div className={clsx(classes["mirror-div"], classes["mirror-div--gaps"])}>
                <FillGapsTextWithGaps
                    text={textareaValue}
                    gapArr={gapArr}
                    onGapResizeStart={handleGapResizeStart}
                />
            </div>
            <Textarea
                onChange={handleTextareaChange}
                value={textareaValue}
                ref={textareaRef}
                className={classes["textarea"]}
            />
        </div>
    );
};

export default FillGapsQuestion;
