"use client"

import { FC, ReactNode } from "react";
import { IoIosArrowDown } from "react-icons/io";
import classes from "./Dropdown.module.css"
import clsx from "clsx";
import Button from "../Button/Button";
import { Stack } from "../Stack/Stack";
import DropdownMenu from "./DropdownMenu";

type TDropdownProps = {
    isOpen: boolean
    onToggle: () => void
    children: ReactNode[]
    buttonContent: ReactNode
}

const Dropdown: FC<TDropdownProps> = ({ isOpen, children, buttonContent, onToggle }) => {
    const buttonIconClassName = clsx(classes["dropdown-button__icon"], isOpen && classes["dropdown-button__icon--open"])

    return (
        <div className={classes["container"]}>
            <Button onClick={onToggle} className={classes["button"]}>
                <Stack direction="row" gap="s" secondaryAxisAlignment="center">
                    {buttonContent} <IoIosArrowDown className={buttonIconClassName} />
                </Stack>
            </Button>
            <DropdownMenu isOpen={isOpen}>
                {children}
            </DropdownMenu>
        </div>
    );
};

export default Dropdown;
