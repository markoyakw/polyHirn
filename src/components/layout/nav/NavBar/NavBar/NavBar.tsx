import classes from "./NavBar.module.css"
import { NAV_LINKS } from "../navLinks"
import NavLink from "../NavLink/NavLink"

const NavBar = () => {

    return (
        <nav className={classes["stack"]}>
            {NAV_LINKS.map((item, itemId) => {
                if (item.type === "link") return (
                    <NavLink key={itemId} {...item} className={classes["link"]}>
                        {item.text}
                    </NavLink>
                )
                else return (
                    <div key={itemId} className={classes["link-group"]}>
                        <span className={classes["link-group__name"]}>
                            {item.groupName}
                        </span>
                        <div className={classes["link-group__stack"]}>
                            {item.links.map((link, linkId) =>
                                <NavLink key={linkId} {...link} className={classes["link"]}>
                                    {link.text}
                                </NavLink>
                            )}
                        </div>
                    </div>
                )
            })}
        </nav>
    )
}

export default NavBar