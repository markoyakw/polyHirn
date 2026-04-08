import NavLink from "./NavLink/NavLink"
import classes from "./NavBar.module.css"
import { TNavLink } from "./navLinks"

type TNavBarItemProps = {
    item: TNavLink
}

const NavBarGroupItem = ({ item }: TNavBarItemProps) => {
    return (
        <li>
            <NavLink {...item} className={classes["link"]}>
                {item.text}
            </NavLink>
        </li>
    )
}

export default NavBarGroupItem
