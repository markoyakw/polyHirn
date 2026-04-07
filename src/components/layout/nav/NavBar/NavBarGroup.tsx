import classes from "./NavBar.module.css"
import NavBarItem from "./NavBarItem"
import { TNavLinkGroup } from "./navLinks"

type TNavBarGroupProps = {
    group: TNavLinkGroup
}

const NavBarGroup = ({ group }: TNavBarGroupProps) => {
    const headingId = `nav-group-${group.groupName.toLowerCase().replace(/\s+/g, "-")}`

    return (
        <section className={classes["link-group"]} aria-labelledby={headingId}>
            <h2 id={headingId} className={classes["link-group__name"]}>
                {group.groupName}
            </h2>
            <div className={classes["link-group__stack"]}>
                {group.links.map((link) => (
                    <NavBarItem key={link.href} item={link} />
                ))}
            </div>
        </section>
    )
}

export default NavBarGroup
