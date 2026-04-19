"use client"

import Input from "@/components/ui/Input/Input"
import Button from "@/components/ui/Button/Button"
import DropdownMenu from "@/components/ui/Dropdown/Dropdown"
import Card from "@/components/ui/Card/Card"
import Sticky from "@/components/ui/Sticky/Sticky"
import { Stack } from "@/components/ui/Stack/Stack"
import { useStore } from "@/store"
import { useState } from "react"
import {
    QUESTION_TYPE_LABELS,
    QUESTION_TYPE_ORDER,
} from "../../model/constants"
import clsx from "clsx"
import classes from "./Header.module.css"

const Header = () => {
    const name = useStore((state) => state.draft.name)
    const setTitle = useStore((state) => state.setTitle)
    const addQuestion = useStore((state) => state.addQuestion)
    const [isQuestionTypeDropdownOpen, setIsQuestionTypeDropdownOpen] = useState(false)
    const [isHeaderStuck, setIsHeaderStuck] = useState(false)

    const onQuestionDropdownToggle = () => {
        setIsQuestionTypeDropdownOpen((oldValue) => !oldValue)
    }

    const stickyContainerClassName = clsx(classes["sticky-container"], isHeaderStuck && classes["sticky-container--stuck"])

    return (
        <Sticky as="header" onStuckChange={(isStuck) => setIsHeaderStuck(isStuck)} className={stickyContainerClassName}>
            <Card withBorder className={classes["header"]}>
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
            </Card>
        </Sticky >
    )
}

export { Header }
