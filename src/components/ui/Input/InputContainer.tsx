import { FC, Fragment, ReactNode } from "react"
import { Stack } from "../Stack/Stack"

type TInputContainerProps = {
    hasLabel: boolean
    children: ReactNode
}

const InputContainer: FC<TInputContainerProps> = ({ hasLabel, children }) => {
    if (hasLabel) {
        return (
            <Stack gap="xs">
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