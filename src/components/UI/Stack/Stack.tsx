import clsx from "clsx"
import type { CSSProperties, ComponentPropsWithoutRef, ElementType, ReactNode } from "react"
import classes from "./Stack.module.css"

type TStackDirection = "row" | "column"
type TStackSize = "xxs" | "xs" | "s" | "m" | "l" | "xl" | "none"
type TStackBorder = "wholeSize" | "considerPadding"

type TStackOwnProps<T extends ElementType> = {
    as?: T
    children: ReactNode
    className?: string
    style?: CSSProperties
    direction?: TStackDirection
    padding?: TStackSize
    paddingBlock?: TStackSize
    paddingInline?: TStackSize
    gap?: TStackSize
    border?: TStackBorder
}

type TStackProps<T extends ElementType> = TStackOwnProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof TStackOwnProps<T>>

const directionClassNameMap: Record<TStackDirection, string> = {
    row: classes["directionRow"],
    column: classes["directionColumn"],
}

const paddingClassNameMap: Record<TStackSize, string> = {
    xxs: classes["paddingXxs"],
    xs: classes["paddingXs"],
    s: classes["paddingS"],
    m: classes["paddingM"],
    l: classes["paddingL"],
    xl: classes["paddingXl"],
    none: classes["paddingNone"],
}

const paddingBlockClassNameMap: Record<TStackSize, string> = {
    xxs: classes["paddingBlockXxs"],
    xs: classes["paddingBlockXs"],
    s: classes["paddingBlockS"],
    m: classes["paddingBlockM"],
    l: classes["paddingBlockL"],
    xl: classes["paddingBlockXl"],
    none: classes["paddingBlockNone"],
}

const paddingInlineClassNameMap: Record<TStackSize, string> = {
    xxs: classes["paddingInlineXxs"],
    xs: classes["paddingInlineXs"],
    s: classes["paddingInlineS"],
    m: classes["paddingInlineM"],
    l: classes["paddingInlineL"],
    xl: classes["paddingInlineXl"],
    none: classes["paddingInlineNone"],
}

const gapClassNameMap: Record<TStackSize, string> = {
    xxs: classes["gapXxs"],
    xs: classes["gapXs"],
    s: classes["gapS"],
    m: classes["gapM"],
    l: classes["gapL"],
    xl: classes["gapXl"],
    none: classes["gapNone"],
}

const borderClassNameMap: Record<TStackBorder, string> = {
    wholeSize: classes["borderWholeSize"],
    considerPadding: classes["borderConsiderPadding"],
}

const Stack = <T extends ElementType = "div">({
    as,
    children,
    className,
    style,
    direction = "column",
    padding = "none",
    paddingBlock,
    paddingInline,
    gap = "none",
    border,
    ...props
}: TStackProps<T>) => {
    const Component = as ?? "div"

  return (
        <Component
            className={clsx(
                classes["stack"],
                directionClassNameMap[direction],
                paddingClassNameMap[padding],
                paddingBlock && paddingBlockClassNameMap[paddingBlock],
                paddingInline && paddingInlineClassNameMap[paddingInline],
                gapClassNameMap[gap],
                border && classes["withBorder"],
                border && borderClassNameMap[border],
                className
            )}
            style={style}
            {...props}
        >
            {children}
        </Component>
    )
}

export { Stack }
export type { TStackBorder, TStackDirection, TStackProps, TStackSize }
