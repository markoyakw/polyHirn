import NavLink from "./NavLink/NavLink"
import classes from "./NavBar.module.css"
import { TNavLink } from "./navLinks"

type TNavBarItemProps = {
    item: TNavLink
}

const NavBarItem = ({ item }: TNavBarItemProps) => {
    return (
        <NavLink {...item} className={classes["link"]}>
            {item.text}
        </NavLink>
    )
}

export default NavBarItem
