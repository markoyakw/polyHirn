"use client"
import { useIsClient } from "@/hooks/useIsClient";
import { useTheme } from "next-themes";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import classes from "./ThemeChanger.module.css"
import Card from "@/components/ui/Card/Card";
import clsx from "clsx";
import { useState } from "react";

const ThemeChanger = () => {

    const isClient = useIsClient()
    const { resolvedTheme, setTheme } = useTheme()
    const [isInitial, setIsInitial] = useState(true)

    if (!isClient) return null

    const buttonClassName = clsx(
        !isInitial && classes["theme-button--should-animate"],
        classes["theme-button"],
        resolvedTheme === "light" && classes["theme-button--light"],
        resolvedTheme === "dark" && classes["theme-button--dark"]
    )

    const lightModeIconClassname = clsx(classes["theme-icon"], classes["theme-icon--light"])
    const darkModeIconClassname = clsx(classes["theme-icon"], classes["theme-icon--dark"])

    const toggleTheme = (currentTheme: string | undefined) => {
        if (!currentTheme) {
            console.error("currentTheme is undefined")
        }
        if (currentTheme === "dark") {
            setTheme("light")
            return
        }
        if (currentTheme === "light") {
            setTheme("dark")
            return
        }
        console.error(`"${currentTheme}" is not a supported theme value`)
    }

    return (
        <Card
            as="button"
            onClick={() => {
                setIsInitial(false)
                toggleTheme(resolvedTheme)
            }}
            spacing="none"
            withBorder
            className={buttonClassName}
        >
            <MdDarkMode className={darkModeIconClassname} />
            <MdLightMode className={lightModeIconClassname} />
        </Card>
    );
};

export default ThemeChanger;