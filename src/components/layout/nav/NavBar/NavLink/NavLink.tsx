import { ComponentPropsWithoutRef, FC } from "react"
import { TNavLink } from "../navLinks"
import Link from "next/link"

type TNavLinkProps = {
    children: TNavLink["text"]
} & Omit<TNavLink, "text"> & ComponentPropsWithoutRef<"a">

const NavLink: FC<TNavLinkProps> = ({ children, icon, type, badge, ...props }) => {
    return (
        <Link {...props}>
            {children}
        </Link>
    )
}

export default NavLink