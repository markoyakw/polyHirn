import type { FC } from "react"
import type {
    TFillGapsItem,
    TFillGapsQuestion,
} from "../../../model/types"
import FillGapsFillItem from "./FillGapsFillItem"
import FillGapsTextItem from "./FillGapsTextItem"
import type { TFillGapsQuestionActions } from "./useFillGapsQuestionActions"

type TFillGapsQuestionItemProps = {
    actions: TFillGapsQuestionActions
    item: TFillGapsItem
    itemNumber: number
    question: TFillGapsQuestion
}

const FillGapsQuestionItem: FC<TFillGapsQuestionItemProps> = ({
    actions,
    item,
    itemNumber,
    question,
}) => {
    if (item.type === "text") {
        return (
            <FillGapsTextItem
                item={item}
                itemNumber={itemNumber}
                question={question}
                onDelete={actions.deleteItem}
                onTextUpdate={actions.updateTextItem}
            />
        )
    }

    return (
        <FillGapsFillItem
            item={item}
            itemNumber={itemNumber}
            question={question}
            onDelete={actions.deleteItem}
            onAnswerAdd={actions.addAcceptedAnswer}
            onAnswerDelete={actions.deleteAcceptedAnswer}
            onAnswerUpdate={actions.updateAnswer}
        />
    )
}

export default FillGapsQuestionItem
