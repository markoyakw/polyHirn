"use client"

import Input from "@/components/ui/Input/Input"
import Button from "@/components/ui/Button/Button"
import DropdownMenu from "@/components/ui/Dropdown/Dropdown"
import StickyActionBar from "@/components/ui/StickyActionBar/StickyActionBar"
import { Stack } from "@/components/ui/Stack/Stack"
import { useStore } from "@/store"
import { useState } from "react"
import {
    selectAddQuestion,
    selectDraftName,
    selectSetTitle,
} from "@/store/slices/testConstructor.selectors"
import {
    QUESTION_TYPE_LABELS,
    QUESTION_TYPE_ORDER,
} from "../../model/constants"
import classes from "./Header.module.css"

const Header = () => {
    const name = useStore(selectDraftName)
    const setTitle = useStore(selectSetTitle)
    const addQuestion = useStore(selectAddQuestion)
    const [isQuestionTypeDropdownOpen, setIsQuestionTypeDropdownOpen] = useState(false)

    const onQuestionDropdownToggle = () => {
        setIsQuestionTypeDropdownOpen((oldValue) => !oldValue)
    }

    return (
        <StickyActionBar className={classes["header"]}>
            <Stack direction="row" gap="s">
                <Input
                    tone={2}
                    inputSize="m"
                    value={name}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Test name"
                />
                <DropdownMenu
                    buttonContent="new question"
                    onToggle={onQuestionDropdownToggle}
                    isOpen={isQuestionTypeDropdownOpen}
                >
                    {QUESTION_TYPE_ORDER.map((type) => (
                        <Button
                            buttonSize="s"
                            radius="s"
                            hover="brandColorBg"
                            tone="ghost"
                            key={type}
                            onClick={() => addQuestion(type)}
                        >
                            {QUESTION_TYPE_LABELS[type]}
                        </Button>
                    ))}
                </DropdownMenu>
            </Stack>
        </StickyActionBar>
    )
}

export { Header }
