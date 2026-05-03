import clsx from "clsx"
import { FC, Fragment, ReactNode } from "react"
import { Stack } from "../Stack/Stack"
import classes from "./Input.module.css"

type TInputContainerProps = {
    fullWidth: boolean
    hasLabel: boolean
    children: ReactNode
}

const InputContainer: FC<TInputContainerProps> = ({ fullWidth, hasLabel, children }) => {
    if (hasLabel) {
        const fieldClassName = clsx(
            classes["field"],
            fullWidth && classes["field--fullWidth"]
        )

        return (
            <Stack gap="xs" className={fieldClassName}>
                {children}
            </Stack>
        )
    }
    return (
        <Fragment>
            {children}
        </Fragment>
    )
}

export default InputContainer
