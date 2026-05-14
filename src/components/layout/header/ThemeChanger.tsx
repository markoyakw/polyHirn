"use client"
import { useIsClient } from "@/hooks/useIsClient";
import { useTheme } from "next-themes";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import classes from "./ThemeChanger.module.css"
import Card from "@/components/ui/Card/Card";
import clsx from "clsx";

const ThemeChanger = () => {

    const isClient = useIsClient()
    const { resolvedTheme, setTheme } = useTheme()

    if (!isClient) return null

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

    const buttonClassName = clsx(
        classes["theme-button"],
        resolvedTheme === "light" && classes["theme-button--light"],
        resolvedTheme === "dark" && classes["theme-button--dark"]
    )

    const lightModeIconClassname = clsx(classes["theme-icon"], classes["theme-icon--light"])
    const darkModeIconClassname = clsx(classes["theme-icon"], classes["theme-icon--dark"])

    return (
        <Card
            as="button"
            onClick={() => toggleTheme(resolvedTheme)}
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