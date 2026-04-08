import classes from "./NavBar.module.css"
import { NAV_LINKS, TNavBarItem } from "./navLinks"
import NavBarGroup from "./NavBarGroup"
import NavBarItem from "./NavBarGroupItem"
import Card from "@/components/UI/Card/Card"

const isNavGroup = (item: TNavBarItem) => item.type === "group"

const NavBar = () => {
    return (
        <Card as="nav" aria-label="primary-navigation" spacing="none">
            <ul className={classes["stack"]}>
                {NAV_LINKS.map((item, itemId) =>
                    isNavGroup(item) ? (
                        <NavBarGroup key={item.groupName + itemId} group={item} />
                    ) : (
                        <NavBarItem key={item.href + itemId} item={item} />
                    )
                )}
            </ul>
        </Card>
    )
}

export default NavBar