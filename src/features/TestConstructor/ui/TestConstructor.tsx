"use client"
import Input from "@/components/ui/Input/Input"
import { useStore } from "@/store"
import Button from "@/components/ui/Button/Button"
import { useState } from "react"
import DropdownMenu from "@/components/ui/Dropdown/Dropdown"
import {
    QUESTION_TYPE_LABELS,
    QUESTION_TYPE_ORDER,
} from "../model/constants"
import Question from "./Question/Question"
import { Stack } from "@/components/ui/Stack/Stack"

const TestConstructor = () => {
    const name = useStore((state) => state.draft.name)
    const setTitle = useStore((state) => state.setTitle)
    const questionArr = useStore(state => state.draft.questionArr)
    const addQuestion = useStore(store => store.addQuestion)
    const [isQuestionTypeDropdownOpen, setIsQuestionTypeDropdownOpen] = useState(false)
    const onQuestionDropdownToggle = () => {
        setIsQuestionTypeDropdownOpen(oldValue => !oldValue)
    }

    return (
        <>
            {/* <Input
                tone={2}
                inputSize="l"
                value={name}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Test name"
            /> */}
            <Stack gap="s">
                {
                    questionArr.map((question) => <Question key={question.id} question={question} />)
                }
            </Stack>
            <DropdownMenu buttonContent={"new question"} onToggle={onQuestionDropdownToggle} isOpen={isQuestionTypeDropdownOpen} >
                {QUESTION_TYPE_ORDER.map((type) => (
                    <Button buttonSize="s" radius="s" hover="brandColorBg" tone={"ghost"} key={type} onClick={() => addQuestion(type)}>
                        {QUESTION_TYPE_LABELS[type]}
                    </Button>
                ))}
            </DropdownMenu>
        </>
    )
}

export default TestConstructor
