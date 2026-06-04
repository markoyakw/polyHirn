import clsx from "clsx"
import {
    forwardRef,
    type CSSProperties,
    type ComponentPropsWithRef,
    type ElementType,
    type ReactElement,
    type ReactNode,
} from "react"
import classes from "./Stack.module.css"

type TStackDirection = "row" | "column"
type TStackSize = "xxs" | "xs" | "s" | "m" | "l" | "xl" | "none"
type TStackBorder = "wholeSize" | "considerPadding"
type TStackAlignment = "start" | "center" | "end" | "spaceBetween"
type TStackSecondaryAxisAlignment = "start" | "center" | "end" | "stretch"

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
    alignment?: TStackAlignment
    secondaryAxisAlignment?: TStackSecondaryAxisAlignment
}

type TStackProps<T extends ElementType> = TStackOwnProps<T>

type TPolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>["ref"]

type TStackComponent = <T extends ElementType = "div">(
    props: TStackProps<T> & { ref?: TPolymorphicRef<T> }
) => ReactElement

const directionClassNameMap: Record<TStackDirection, string> = {
    row: classes["direction-row"],
    column: classes["direction-column"],
}

const paddingClassNameMap: Record<TStackSize, string> = {
    xxs: classes["padding-xxs"],
    xs: classes["padding-xs"],
    s: classes["padding-s"],
    m: classes["padding-m"],
    l: classes["padding-l"],
    xl: classes["padding-xl"],
    none: classes["padding-none"],
}

const paddingBlockClassNameMap: Record<TStackSize, string> = {
    xxs: classes["padding-block-xxs"],
    xs: classes["padding-block-xs"],
    s: classes["padding-block-s"],
    m: classes["padding-block-m"],
    l: classes["padding-block-l"],
    xl: classes["padding-block-xl"],
    none: classes["padding-block-none"],
}

const paddingInlineClassNameMap: Record<TStackSize, string> = {
    xxs: classes["padding-inline-xxs"],
    xs: classes["padding-inline-xs"],
    s: classes["padding-inline-s"],
    m: classes["padding-inline-m"],
    l: classes["padding-inline-l"],
    xl: classes["padding-inline-xl"],
    none: classes["padding-inline-none"],
}

const gapClassNameMap: Record<TStackSize, string> = {
    xxs: classes["gap-xxs"],
    xs: classes["gap-xs"],
    s: classes["gap-s"],
    m: classes["gap-m"],
    l: classes["gap-l"],
    xl: classes["gap-xl"],
    none: classes["gap-none"],
}

const borderClassNameMap: Record<TStackBorder, string> = {
    wholeSize: classes["border-whole-size"],
    considerPadding: classes["border-consider-padding"],
}

const alignmentClassNameMap: Record<TStackAlignment, string> = {
    start: classes["alignment-start"],
    center: classes["alignment-center"],
    end: classes["alignment-end"],
    spaceBetween: classes["alignment-space-between"],
}

const secondaryAxisAlignmentClassNameMap: Record<TStackSecondaryAxisAlignment, string> = {
    start: classes["secondary-axis-alignment-start"],
    center: classes["secondary-axis-alignment-center"],
    end: classes["secondary-axis-alignment-end"],
    stretch: classes["secondary-axis-alignment-stretch"],
}

const StackInner = <T extends ElementType = "div">({
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
    alignment,
    secondaryAxisAlignment,
    ...props
}: TStackProps<T>, ref: TPolymorphicRef<T>) => {
    const Component = as ?? "div"

  return (
        <Component
            ref={ref}
            className={clsx(
                classes["stack"],
                directionClassNameMap[direction],
                paddingClassNameMap[padding],
                paddingBlock && paddingBlockClassNameMap[paddingBlock],
                paddingInline && paddingInlineClassNameMap[paddingInline],
                gapClassNameMap[gap],
                border && classes["with-border"],
                border && borderClassNameMap[border],
                alignment && alignmentClassNameMap[alignment],
                secondaryAxisAlignment &&
                    secondaryAxisAlignmentClassNameMap[secondaryAxisAlignment],
                className
            )}
            style={style}
            {...props}
        >
            {children}
        </Component>
    )
}

const Stack = forwardRef(StackInner) as TStackComponent

export { Stack }
export type {
    TStackAlignment,
    TStackBorder,
    TStackDirection,
    TStackProps,
    TStackSecondaryAxisAlignment,
    TStackSize,
}
