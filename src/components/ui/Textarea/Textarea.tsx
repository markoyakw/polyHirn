import clsx from "clsx"
import { useEffect, useRef, type ComponentProps } from "react"
import classes from "./Textarea.module.css"

type TTextareaTone = 1 | 2 | 3 | 4
type TTextareaRadius = "s" | "m" | "l" | "xl"

const toneClassNameMap: Record<TTextareaTone, string> = {
    1: classes["tone1"],
    2: classes["tone2"],
    3: classes["tone3"],
    4: classes["tone4"],
}

const radiusClassNameMap: Record<TTextareaRadius, string> = {
    s: classes["radiusS"],
    m: classes["radiusM"],
    l: classes["radiusL"],
    xl: classes["radiusXl"],
}

type TTextareaProps = ComponentProps<"textarea"> & {
    className?: string
    radius?: TTextareaRadius
    tone?: TTextareaTone
}

const Textarea = ({
    className,
    ref,
    tone = 2,
    radius = "m",
    ...props
}: TTextareaProps) => {

    const textareaClassName = clsx(
        classes["textarea"],
        toneClassNameMap[tone],
        radiusClassNameMap[radius],
        className,
    )

    const internalRef = useRef<HTMLTextAreaElement>(null)

    const setRef = (el: HTMLTextAreaElement | null) => {
        internalRef.current = el;
        if (typeof ref === "function") ref(el);
        else if (ref) ref.current = el;
    };

    useEffect(() => {
        const textarea = internalRef.current
        if (!textarea) return
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    }, [props.value])

    return (
        <textarea
            ref={setRef}
            className={textareaClassName}
            {...props}
        />
    )
}

export default Textarea
export type {
    TTextareaRadius,
    TTextareaProps,
    TTextareaTone,
}
