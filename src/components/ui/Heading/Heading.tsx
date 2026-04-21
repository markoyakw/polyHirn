import clsx from "clsx"
import type { ComponentPropsWithoutRef, ReactNode } from "react"
import classes from "./Heading.module.css"

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

type HeadingProps<T extends HeadingTag = "h2"> = {
    as?: T
    children: ReactNode
    className?: string
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">

const Heading = <T extends HeadingTag = "h2">({
    as,
    children,
    className,
    ...props
}: HeadingProps<T>) => {
    const Component = as ?? "h2"

    return (
        <Component className={clsx(classes["heading"], classes[Component], className)} {...props}>
            {children}
        </Component>
    )
}

export default Heading
export type { HeadingProps, HeadingTag }
