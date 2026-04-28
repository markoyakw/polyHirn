import { forwardRef, ReactNode } from "react"
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
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ height: 0, opacity: 0, marginBottom: "calc(var(--stack-gap-size, 0px) * -1)" }}
                transition={{
                    type: "spring",
                    stiffness: 2000,
                    damping: 80
                }}
                layout="y"
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