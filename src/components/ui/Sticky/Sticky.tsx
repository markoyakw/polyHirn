"use client"

import clsx from "clsx"
import {
    type CSSProperties,
    type ComponentPropsWithRef,
    type ComponentPropsWithoutRef,
    type ElementType,
    type ReactNode,
} from "react"
import classes from "./Sticky.module.css"
import { useSticky } from "./useSticky"

type TStickyOwnProps<T extends ElementType> = {
    as?: T
    children: ReactNode
    className?: string
    style?: CSSProperties
    top?: number | string
    showOnScrollUp?: boolean
    onStuckChange?: (isStuck: boolean) => any
}

type TStickyProps<T extends ElementType> = TStickyOwnProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof TStickyOwnProps<T>>

type TPolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>["ref"]

const Sticky = <T extends ElementType = "div">({
    as,
    children,
    className,
    style,
    top = 0,
    showOnScrollUp = false,
    onStuckChange,
    ...props
}: TStickyProps<T>) => {
    
    const Component = as ?? "div"
    const { elementRef, isSticky, isVisible } = useSticky({
        onStuckChange,
        showOnScrollUp,
        top,
    })

    return (
        <Component
            ref={elementRef as TPolymorphicRef<T>}
            className={clsx(
                classes["sticky"],
                (!showOnScrollUp || !isSticky || isVisible) && classes["sticky--visible"],
                showOnScrollUp && isSticky && !isVisible && classes["sticky--hidden"],
                className
            )}
            style={{
                "--sticky-top": typeof top === "number" ? `${top}px` : top,
                ...style,
            } as CSSProperties}
            {...props}
        >
            {children}
        </Component>
    )
}

export default Sticky
export type { TStickyProps }
