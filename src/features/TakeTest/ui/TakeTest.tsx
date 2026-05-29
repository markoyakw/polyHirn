"use client"

import { useState, type FC } from "react"
import type { TTest } from "@/types/test"
import { Stack } from "@/components/ui/Stack/Stack"
import { TakeTestHeader } from "./Header/TakeTestHeader"
import QuestionCard from "./Question/QuestionCard"
import { initializeStudentAnswers, type TStudentAnswer, type TStudentAnswers } from "../model/studentAnswer"

type TTakeTestProps = {
    test: TTest
}

const TakeTest: FC<TTakeTestProps> = ({ test }) => {
    const [studentAnswers, setStudentAnswers] = useState<TStudentAnswers>(() => initializeStudentAnswers(test))

    const handleAnswerChange = (questionId: string, studentAnswer: TStudentAnswer) => {
        setStudentAnswers((prev) => ({ ...prev, [questionId]: studentAnswer }))
    }

    const handleFinish = () => {
        console.log("Test submitted:", {
            testId: test.id,
            testName: test.name,
            submittedAt: new Date().toISOString(),
            studentAnswers,
        })
    }

    const testableQuestions = test.questionArr.filter((q) => q.type !== "fillGaps")

    return (
        <Stack gap="m">
            <TakeTestHeader testName={test.name} onFinish={handleFinish} />
            <Stack gap="m">
                {testableQuestions.map((question, index) => (
                    <QuestionCard
                        key={question.id}
                        question={question}
                        index={index}
                        studentAnswer={studentAnswers[question.id]}
                        onAnswerChange={(studentAnswer) => handleAnswerChange(question.id, studentAnswer)}
                    />
                ))}
            </Stack>
        </Stack>
    )
}

export default TakeTest
