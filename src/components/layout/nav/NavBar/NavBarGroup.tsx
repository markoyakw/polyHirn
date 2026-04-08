import classes from "./NavBar.module.css"
import NavBarItem from "./NavBarGroupItem"
import { TNavLinkGroup } from "./navLinks"

type TNavBarGroupProps = {
    group: TNavLinkGroup
}

const NavBarGroup = ({ group }: TNavBarGroupProps) => {

    const labelBy = `nav-group-${group.groupName}`

    return (
        <li>
            <h2 id={`nav-group-${group.groupName}`} className={classes["link-group__name"]}>
                {group.groupName}
            </h2>
            <ul aria-labelledby={labelBy} className={classes["link-group__stack"]}>
                {group.links.map((link) => (
                    <NavBarItem key={link.href} item={link} />
                ))}
            </ul>
        </li>
    )
}

export default NavBarGroup
