import classes from "./NavBar.module.css"
import { NAV_LINKS, TNavBarItem } from "./navLinks"
import NavBarGroup from "./NavBarGroup"
import NavBarItem from "./NavBarGroupItem"
import Card from "@/components/ui/Card/Card"
import { Stack } from "@/components/ui/Stack/Stack"

const isNavGroup = (item: TNavBarItem) => item.type === "group"

const NavBar = () => {
    return (
        <Card as="nav" aria-label="primary-navigation" spacing="none" withBorder>
            <Stack as={"ul"} border={"wholeSize"} gap="s" paddingBlock="m">
                {NAV_LINKS.map((item, itemId) =>
                    isNavGroup(item) ? (
                        <NavBarGroup key={item.groupName + itemId} group={item} />
                    ) : (
                        <NavBarItem key={item.href + itemId} item={item} />
                    )
                )}
            </Stack>
        </Card>
    )
}

export default NavBar