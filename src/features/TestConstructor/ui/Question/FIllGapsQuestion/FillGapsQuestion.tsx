import type { TFillGapsQuestion } from "@/types/test";
import { type FC } from "react";
import classes from "./FillGapsQuestion.module.css"
import clsx from "clsx";
import Textarea from "@/components/ui/Textarea/Textarea";
import FillGapsHighlightedText from "./FillGapsHighlightedText";
import FillGapsTextWithGaps from "./FillGapsTextWithGaps";
import { useFillGapsQuestion } from "./useFillGapsQuestion";
import { Stack } from "@/components/ui/Stack/Stack";
import Text from "@/components/ui/Text/Text";

type TFillGapsQuestionProps = {
    question: TFillGapsQuestion
}

const FillGapsQuestion: FC<TFillGapsQuestionProps> = ({ question }) => {
    const {
        gapArr,
        handleGapResizeStart,
        handleInsertGap,
        handleTextareaChange,
        highlightedGap,
        textareaRef,
        textareaValue,
        resizeState,
        isHighlighting,
        handleHighlightEnd,
        deleteGap,
        finishGapEditing,
        setGapElementRef,
        startGapEditing,
    } = useFillGapsQuestion(question)

    const gapsMirrorDivClassName = clsx(
        classes["mirror-div"],
        classes["mirror-div--gaps"],
        resizeState && classes["mirror-div--resizing"]
    )

    return (
        <Stack gap="m">
            <Text size="l">
                To add gaps, highlight the text.
            </Text>
            <div
                className={classes["container"]}
                onPointerUp={handleHighlightEnd}
            >
                <div className={classes["mirror-div"]}>
                    <FillGapsHighlightedText
                        onInsertGap={handleInsertGap}
                        text={textareaValue}
                        gap={highlightedGap}
                        isHighlighting={isHighlighting}
                    />
                </div>
                <div className={gapsMirrorDivClassName}>
                    <FillGapsTextWithGaps
                        text={textareaValue}
                        gapArr={gapArr}
                        onGapResizeStart={handleGapResizeStart}
                        deleteGap={deleteGap}
                        finishGapEditing={finishGapEditing}
                        setGapElementRef={setGapElementRef}
                        startGapEditing={startGapEditing}
                    />
                </div>
                <Textarea
                    onChange={handleTextareaChange}
                    value={textareaValue}
                    ref={textareaRef}
                    className={classes["textarea"]}
                />
            </div>
        </Stack>
    );
};

export default FillGapsQuestion;
