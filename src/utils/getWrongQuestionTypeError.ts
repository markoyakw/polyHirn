import type { TQuestionType } from "@/types/test"

const getWrongQuestionTypeError = (type: TQuestionType, expectedType: TQuestionType): string => {
    return `Question type mismatch. Expected ${expectedType}, got ${type}`
}

export default getWrongQuestionTypeError 
