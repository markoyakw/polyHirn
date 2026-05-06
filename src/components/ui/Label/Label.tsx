import clsx from "clsx"
import type { ComponentPropsWithoutRef, FC, ReactNode } from "react"
import classes from "./Label.module.css"

type TLabelProps = ComponentPropsWithoutRef<"label"> & {
    children: ReactNode
}

const Label: FC<TLabelProps> = ({ children, className, ...props }) => {
    return (
        <label className={clsx(classes["label"], className)} {...props}>
            {children}
        </label>
    )
}

export default Label
export type { TLabelProps }
