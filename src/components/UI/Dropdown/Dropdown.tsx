"use client"

import { FC, ReactNode, useEffect, useRef } from "react";
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
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const dropdown = dropdownRef.current
        if (!dropdown) return

        const onClickOutside = (e: MouseEvent) => {
            if (!isOpen) return
            if (!dropdown.contains(e.target as Node)) {
                onToggle()
            }
        }

        window.addEventListener("click", onClickOutside)

        return () => window.removeEventListener("click", onClickOutside)
    }, [isOpen])

    return (
        <div ref={dropdownRef} className={classes["container"]}>
            <Button onClick={onToggle} className={classes["button"]}>
                <Stack direction="row" gap="s" secondaryAxisAlignment="center">
                    <span className={classes["button__content"]}>{buttonContent}</span>
                    <IoIosArrowDown className={buttonIconClassName} />
                </Stack>
            </Button>
            <DropdownMenu isOpen={isOpen}>
                {children}
            </DropdownMenu>
        </div>
    );
};

export default Dropdown;
