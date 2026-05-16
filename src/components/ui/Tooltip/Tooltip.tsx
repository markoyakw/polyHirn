"use client"

import clsx from "clsx"
import { useEffect, useId, useState, type ReactNode } from "react"
import classes from "./Tooltip.module.css"
import { AnimatePresence, motion } from "motion/react"

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
    //dependency to stop size recalculation.
    //use when the tooltop changes position
    layoutDependency?: any
}

const placementClassNameMap: Record<TTooltipPlacement, string> = {
    top: classes["tooltip--top"],
    right: classes["tooltip--right"],
    bottom: classes["tooltip--bottom"],
    left: classes["tooltip--left"],
}

const Tooltip = ({
    children,
    content,
    className,
    contentClassName,
    id,
    isActive,
    activateOnHover = true,
    placement = "top",
    onActiveChange,
    layoutDependency
}: TTooltipProps) => {
    const generatedId = useId()
    const tooltipId = id ?? generatedId
    const [isHoverActive, setIsHoverActive] = useState(false)
    const shouldShowTooltip = Boolean(isActive || (activateOnHover && isHoverActive))
    const [isTooltipActive, setIsTooltipActive] = useState(false)

    useEffect(() => {
        if (!shouldShowTooltip) {
            setIsTooltipActive(false)
            return
        }

        const animationFrame = requestAnimationFrame(() => {
            setIsTooltipActive(true)
        })

        return () => {
            cancelAnimationFrame(animationFrame)
        }
    }, [shouldShowTooltip])

    const setHoverActive = (nextIsActive: boolean) => {
        if (!activateOnHover) {
            return
        }

        setIsHoverActive(nextIsActive)
        onActiveChange?.(nextIsActive)
    }

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

            <AnimatePresence>
                <motion.div
                    id={tooltipId}
                    role="tooltip"
                    className={clsx(
                        classes["tooltip__content"],
                        isTooltipActive && classes["tooltip__content--active"],
                        contentClassName
                    )}
                    initial={{
                        scale: 0,
                        translateY: "50%"
                    }}
                    animate={{
                        scale: 1,
                        translateY: 0
                    }}
                    style={{
                        left: "50%",
                        bottom: "calc(100% + var(--spacing-s))"
                    }}
                    layout="y"
                    transformTemplate={(_, generatedTransform) =>
                        `translateX(-50%) ${generatedTransform}`
                    }
                    transition={{ duration: 0.3, type: "spring" }}
                >
                    <span className={classes["tooltip__arrow"]} />
                    <motion.div
                        data-is-fill-gaps-tooltip={true}
                        layout="x"
                        transition={{ duration: 0.3, type: "spring" }}
                        layoutDependency={layoutDependency}
                    >
                        {content}
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </span >
    )
}

export default Tooltip
export type { TTooltipPlacement, TTooltipProps }
