"use client"
import Input from "@/components/UI/Input/Input"
import { useStore } from "@/store"

const TestConstructor = () => {
    const name = useStore((state) => state.draft.name)
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
        </>
    )
}

export default TestConstructor
