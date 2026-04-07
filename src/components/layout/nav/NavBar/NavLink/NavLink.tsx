import { ComponentPropsWithoutRef, FC } from "react"
import { TNavLink } from "../navLinks"
import Link from "next/link"
import classes from "./NavLink.module.css"
import clsx from "clsx"

type TNavLinkProps = {
    children: TNavLink["text"]
} & Omit<TNavLink, "text"> & ComponentPropsWithoutRef<"a">

const NavLink: FC<TNavLinkProps> = ({
    children,
    icon: Icon,
    type,
    badge,
    className,
    ...props
}) => {

    const navLinkClassName = clsx(classes["link"], className)

    return (
        <Link {...props} className={navLinkClassName}>
            {Icon && <Icon />}
            {children}
            {badge &&
                <span className={classes["badge"]}
                    style={{
                        "backgroundColor": badge.color
                    }}
                >
                    {badge.text}
                </span>
            }
        </Link>
    )
}

export default NavLink