import { FC, ReactNode } from "react";
import Card from "../Card/Card";
import { Stack } from "../Stack/Stack";
import classes from "./Dropdown.module.css"
import clsx from "clsx";

type TDropdownMenuProps = {
    children: ReactNode[]
    isOpen: boolean
}

const DropdownMenu: FC<TDropdownMenuProps> = ({ children, isOpen }) => {
    return (
        <Card
            withBorder
            spacing="s"
            width="fitContent"
            className={clsx(classes["card"], isOpen ? classes["card--open"] : classes["card--closed"])}
            aria-hidden={!isOpen}
        >
            <Stack className={classes["stack"]}>
                {children}
            </Stack>
        </Card>
    );
};

export default DropdownMenu;
