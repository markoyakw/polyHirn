"use client"

import clsx from "clsx"
import { AnimatePresence, motion } from "motion/react"
import { Ref, useId, useImperativeHandle, useState, type CSSProperties, type ReactNode } from "react"
import classes from "./Tooltip.module.css"

type TExposedMethods = {
    remount: () => void
}

type TTooltipPlacement = "top" | "right" | "bottom" | "left"

type TTooltipProps = {
    children: ReactNode
    content: ReactNode
    className?: string
    contentClassName?: string
    id?: string
    isActive?: boolean
    activateOnHover?: boolean
    placement?: TTooltipPlacement
    onActiveChange?: (isActive: boolean) => void
    ref?: Ref<TExposedMethods>
}

type TTooltipMotionConfig = {
    style: CSSProperties
    initial: Record<string, number | string>
    animate: Record<string, number | string>
    exit: Record<string, number | string>
}

const placementClassNameMap: Record<TTooltipPlacement, string> = {
    top: classes["tooltip--top"],
    right: classes["tooltip--right"],
    bottom: classes["tooltip--bottom"],
    left: classes["tooltip--left"],
}

const tooltipMotionConfigMap: Record<TTooltipPlacement, TTooltipMotionConfig> = {
    top: {
        style: {
            left: "50%",
            bottom: "calc(100% + var(--spacing-s))",
            transformOrigin: "bottom center",
        },
        initial: {
            opacity: 0,
            scale: 0.96,
            x: "-50%",
            y: "var(--spacing-xs)",
        },
        animate: {
            opacity: 1,
            scale: 1,
            x: "-50%",
            y: 0,
        },
        exit: {
            opacity: 0,
            scale: 0.96,
            x: "-50%",
            y: "var(--spacing-xs)",
        },
    },
    right: {
        style: {
            top: "50%",
            left: "calc(100% + var(--spacing-s))",
            transformOrigin: "left center",
        },
        initial: {
            opacity: 0,
            scale: 0.96,
            x: "calc(var(--spacing-xs) * -1)",
            y: "-50%",
        },
        animate: {
            opacity: 1,
            scale: 1,
            x: 0,
            y: "-50%",
        },
        exit: {
            opacity: 0,
            scale: 0.96,
            x: "calc(var(--spacing-xs) * -1)",
            y: "-50%",
        },
    },
    bottom: {
        style: {
            top: "calc(100% + var(--spacing-s))",
            left: "50%",
            transformOrigin: "top center",
        },
        initial: {
            opacity: 0,
            scale: 0.96,
            x: "-50%",
            y: "calc(var(--spacing-xs) * -1)",
        },
        animate: {
            opacity: 1,
            scale: 1,
            x: "-50%",
            y: 0,
        },
        exit: {
            opacity: 0,
            scale: 0.96,
            x: "-50%",
            y: "calc(var(--spacing-xs) * -1)",
        },
    },
    left: {
        style: {
            top: "50%",
            right: "calc(100% + var(--spacing-s))",
            transformOrigin: "right center",
        },
        initial: {
            opacity: 0,
            scale: 0.96,
            x: "var(--spacing-xs)",
            y: "-50%",
        },
        animate: {
            opacity: 1,
            scale: 1,
            x: 0,
            y: "-50%",
        },
        exit: {
            opacity: 0,
            scale: 0.96,
            x: "var(--spacing-xs)",
            y: "-50%",
        },
    },
}

const Tooltip = ({
    children,
    content,
    className,
    contentClassName,
    id,
    isActive,
    activateOnHover = false,
    placement = "top",
    onActiveChange,
    ref
}: TTooltipProps) => {

    const generatedId = useId()
    const tooltipId = id ?? generatedId
    const [isHoverActive, setIsHoverActive] = useState(false)
    const shouldShowTooltip = Boolean(isActive || (activateOnHover && isHoverActive))
    const motionConfig = tooltipMotionConfigMap[placement]

    const setHoverActive = (nextIsActive: boolean) => {
        if (!activateOnHover) {
            return
        }
        setIsHoverActive(nextIsActive)
        onActiveChange?.(nextIsActive)
    }

    const [key, setKey] = useState(() => crypto.randomUUID())

    useImperativeHandle(ref, () => ({
        remount: () => setKey(crypto.randomUUID())
    }))

    return (
        <span
            className={clsx(classes["tooltip"], placementClassNameMap[placement], className)}
            onBlur={() => setHoverActive(false)}
            onFocus={() => setHoverActive(true)}
            onMouseEnter={() => { setHoverActive(true) }}
            onMouseLeave={() => setHoverActive(false)}
        >
            <span
                aria-describedby={shouldShowTooltip ? tooltipId : undefined}
            >
                {children}
            </span>

            <AnimatePresence propagate>
                {shouldShowTooltip && (
                    <motion.div
                        key={key}
                        id={tooltipId}
                        role="tooltip"
                        className={clsx(classes["tooltip__content"], contentClassName)}
                        initial={motionConfig.initial}
                        animate={motionConfig.animate}
                        exit={motionConfig.exit}
                        style={{
                            position: "absolute",
                            ...motionConfig.style,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 900,
                            damping: 55,
                            mass: 0.6
                        }}
                    >
                        {content}
                        <span className={classes["tooltip__arrow"]} />
                    </motion.div>
                )}
            </AnimatePresence>
        </span >
    )
}

export default Tooltip
export type { TTooltipPlacement, TTooltipProps }
