import type { TFillGapsQuestion } from "@/types/test";
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
        resizeState
    } = useFillGapsQuestion()

    const gapsMirrorDivClassName = clsx(
        classes["mirror-div"],
        classes["mirror-div--gaps"],
        resizeState && classes["mirror-div--resizing"]
    )

    return (
        <div className={classes["container"]}>
            <div className={classes["mirror-div"]}>
                <FillGapsHighlightedText
                    onInsertGap={handleInsertGap}
                    text={textareaValue}
                    gap={highlightedGap}
                />
            </div>
            <div className={gapsMirrorDivClassName}>
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
