import clsx from "clsx"
import type { ComponentPropsWithRef } from "react"
import classes from "./BouncingItem.module.css"

type TBouncingItemProps = ComponentPropsWithRef<"span"> & {
    isBouncing?: boolean
}

const BouncingItem = ({
    children,
    className,
    isBouncing,
    ...props
}: TBouncingItemProps) => {
    const shouldBounce = isBouncing ?? true

    return (
        <span
            className={clsx(
                classes["bouncing-item"],
                shouldBounce && classes["bouncing-item--bouncing"],
                className
            )}
            {...props}
        >
            {children}
        </span>
    )
}

export default BouncingItem
export type { TBouncingItemProps }
