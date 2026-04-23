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
    badge,
    className,
    disabled = false,
    ...props
}) => {
    const navLinkClassName = clsx(classes["link"], className, disabled && classes["link--disabled"])

    const linkContent = (
        <>
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
        </>
    )

    if (disabled) {
        return (
            <span
                aria-disabled="true"
                className={navLinkClassName}
            >
                {linkContent}
            </span>
        )
    }

    return (
        <Link {...props} className={navLinkClassName}>
            {linkContent}
        </Link>
    )
}

export default NavLink
