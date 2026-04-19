import { TQuestionType } from "@/features/TestConstructor/model/types"

const getWrongQuestionTypeError = (type: TQuestionType, expectedType: TQuestionType): string => {
    return `Question type mismatch. Expected ${expectedType}, got ${type}`
}

export default getWrongQuestionTypeError 