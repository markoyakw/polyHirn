import type { FC } from "react"
import { Stack } from "@/components/ui/Stack/Stack"
import Button from "@/components/ui/Button/Button"
import Text from "@/components/ui/Text/Text"
import StickyActionBar from "@/components/ui/StickyActionBar/StickyActionBar"

type TTakeTestHeaderProps = {
    testName: string
    onFinish: () => void
}

const TakeTestHeader: FC<TTakeTestHeaderProps> = ({ testName, onFinish }) => {
    return (
        <StickyActionBar>
            <Stack direction="row" gap="s" secondaryAxisAlignment="center" alignment="spaceBetween">
                <Text weight="bold" size="l">{testName}</Text>
                <Button tone="primary" onClick={onFinish}>
                    Finish Test
                </Button>
            </Stack>
        </StickyActionBar>
    )
}

export { TakeTestHeader }
