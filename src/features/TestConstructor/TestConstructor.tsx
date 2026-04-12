"use client"
import Input from "@/components/UI/Input/Input"
import { useStore } from "@/store"
import Question from "./Question/Question"
import Button from "@/components/UI/Button/Button"

const TestConstructor = () => {
    const name = useStore((state) => state.draft.name)
    const questionArr = useStore(state => state.draft.questionArr)
    const setTitle = useStore((state) => state.setTitle)

    return (
        <>
            <Input
                tone={2}
                inputSize="l"
                value={name}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Test name"
            />
            {
                questionArr.map((question) => <Question question={question} />)
            }
            <Button tone={"primary"}>
                new question
            </Button>
        </>
    )
}

export default TestConstructor
