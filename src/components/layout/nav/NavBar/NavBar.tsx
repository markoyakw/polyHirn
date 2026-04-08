import classes from "./NavBar.module.css"
import { NAV_LINKS, TNavBarItem } from "./navLinks"
import NavBarGroup from "./NavBarGroup"
import NavBarItem from "./NavBarGroupItem"

const isNavGroup = (item: TNavBarItem) => item.type === "group"

const NavBar = () => {
    return (
        <nav aria-label="primary-navigation">
            <ul className={classes["stack"]}>
                {NAV_LINKS.map((item, itemId) =>
                    isNavGroup(item) ? (
                        <NavBarGroup key={item.groupName + itemId} group={item} />
                    ) : (
                        <NavBarItem key={item.href + itemId} item={item} />
                    )
                )}
            </ul>
        </nav>
    )
}

export default NavBar