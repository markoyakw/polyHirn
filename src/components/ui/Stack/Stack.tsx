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

type PolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>["ref"]

type TStackComponent = <T extends ElementType = "div">(
    props: TStackProps<T> & { ref?: PolymorphicRef<T> }
) => ReactElement

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

const alignmentClassNameMap: Record<TStackAlignment, string> = {
    start: classes["alignmentStart"],
    center: classes["alignmentCenter"],
    end: classes["alignmentEnd"],
    spaceBetween: classes["alignmentSpaceBetween"],
}

const secondaryAxisAlignmentClassNameMap: Record<TStackSecondaryAxisAlignment, string> = {
    start: classes["secondaryAxisAlignmentStart"],
    center: classes["secondaryAxisAlignmentCenter"],
    end: classes["secondaryAxisAlignmentEnd"],
    stretch: classes["secondaryAxisAlignmentStretch"],
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
}: TStackProps<T>, ref: PolymorphicRef<T>) => {
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
                border && classes["withBorder"],
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
