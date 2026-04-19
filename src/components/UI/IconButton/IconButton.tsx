import clsx from "clsx"
import type { ButtonHTMLAttributes } from "react"
import type { IconType } from "react-icons"
import classes from "./IconButton.module.css"
import { RiCloseFill } from "react-icons/ri"
import { MdDragIndicator } from "react-icons/md"

const ICON_BUTTON_ICON_MAP = {
    delete: RiCloseFill,
    drag: MdDragIndicator,
} as const

type TIconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    icon: IconType
    className?: string
}

const IconButton = ({
    icon: Icon,
    className,
    type = "button",
    ...props
}: TIconButtonProps) => {
    return (
        <button
            type={type}
            className={clsx(classes["icon-button"], className)}
            {...props}
        >
            <Icon className={classes["icon-button__icon"]} />
        </button>
    )
}

export default IconButton
export { ICON_BUTTON_ICON_MAP }
export type { TIconButtonProps }
