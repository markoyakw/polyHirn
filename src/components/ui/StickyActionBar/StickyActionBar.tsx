"use client"

import { useState, type ReactNode } from "react"
import Sticky from "@/components/ui/Sticky/Sticky"
import Card from "@/components/ui/Card/Card"

type TStickyActionBarProps = {
    children: ReactNode
    className?: string
}

const StickyActionBar = ({ children, className }: TStickyActionBarProps) => {
    const [isStuck, setIsStuck] = useState(false)

    return (
        <Sticky style={{width: "var(--max-question-width)"}} as="header" onStuckChange={setIsStuck}>
            <Card
                withBorder
                style={isStuck ? { borderTopLeftRadius: 0, borderTopRightRadius: 0 } : undefined}
                className={className}
            >
                {children}
            </Card>
        </Sticky>
    )
}

export default StickyActionBar
export type { TStickyActionBarProps }
