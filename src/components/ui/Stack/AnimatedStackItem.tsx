import { forwardRef, ReactNode, useEffect } from "react"
import { motion, type HTMLMotionProps } from "motion/react"

type AnimatedStackItemProps = {
    children: ReactNode
    width?: string
} & HTMLMotionProps<"div">

const AnimatedStackItem = forwardRef<HTMLDivElement, AnimatedStackItemProps>(
    ({ children, width, style, ...props }, ref) => {

        return (
            <motion.div
                ref={ref}
                initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                animate={{ height: 'auto', opacity: 1, marginBottom: 0 }}
                exit={{ height: 0, opacity: 0, marginBottom: "calc(var(--stack-gap-size, 0px) * -1)" }}
                transition={{
                    type: "spring",
                    stiffness: 2000,
                    damping: 80
                }}
                layout="position"
                style={{
                    transformOrigin: "center center",
                    width,
                    ...style,
                }}
                {...props}
            >
                {children}
            </motion.div>
        )
    }
)

export default AnimatedStackItem