import classes from "./NavBar.module.css"
import { NAV_LINKS, TNavBarItem } from "./navLinks"
import NavBarGroup from "./NavBarGroup"
import NavBarItem from "./NavBarItem"

const isNavGroup = (item: TNavBarItem) => item.type === "group"

const NavBar = () => {
    return (
        <nav className={classes["stack"]} aria-label="Primary">
            {NAV_LINKS.map((item) =>
                isNavGroup(item) ? (
                    <NavBarGroup key={item.groupName} group={item} />
                ) : (
                    <NavBarItem key={item.href} item={item} />
                )
            )}
        </nav>
    )
}

export default NavBar
