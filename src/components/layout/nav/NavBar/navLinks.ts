import { CSSProperties } from "react"
import { IconType } from "react-icons"
import { BiSolidBank } from "react-icons/bi"
import { CgAlarm, CgMediaLive, CgNotes } from "react-icons/cg"
import { FaCirclePlus, FaRegCalendarDays } from "react-icons/fa6"
import { GoProjectTemplate } from "react-icons/go"
import { IoMdCheckmark } from "react-icons/io"
import { IoSettingsSharp } from "react-icons/io5"
import { PiExportBold } from "react-icons/pi"
import { RiGeminiLine } from "react-icons/ri"

type TBadge = {
    text: string,
    color: CSSProperties["backgroundColor"]
}

export type TNavLink = {
    type: "link",
    text: string,
    icon: IconType | null,
    badge: TBadge | null,
    href: string,
    disabled?: boolean
}

export type TNavLinkGroup = {
    type: "group",
    groupName: string,
    links: TNavLink[]
}

export type TNavBarItem = TNavLink | TNavLinkGroup

const BADGE_COLOR_SUCCESS = "var(--color-success)"

export const NAV_LINKS: TNavBarItem[] = [
    {
        type: "group",
        groupName: "Tests",
        links: [
            {
                type: "link",
                text: "My tests",
                icon: CgNotes,
                badge: null,
                href: "/tests",
                disabled: true,
            },
            {
                type: "link",
                text: "Live now",
                icon: CgMediaLive,
                badge: null,
                href: "/tests/live",
                disabled: true,
            },
            {
                type: "link",
                text: "Upcoming",
                icon: CgAlarm,
                badge: null,
                href: "/tests/upcoming",
                disabled: true,
            },
            {
                type: "link",
                text: "Past & results",
                icon: IoMdCheckmark,
                badge: null,
                href: "/tests/past",
                disabled: true,
            }
        ],
    },
    {
        type: "link",
        text: "New test",
        icon: FaCirclePlus,
        badge: null,
        href: "/tests/new",
    },
    {
        type: "group",
        groupName: "Workspace",
        links: [
            {
                type: "link",
                text: "Activity log",
                icon: FaRegCalendarDays,
                badge: null,
                href: "/activity",
                disabled: true,
            },
            {
                type: "link",
                text: "Question bank",
                icon: BiSolidBank,
                badge: { text: "AI", color: BADGE_COLOR_SUCCESS },
                href: "/questions",
                disabled: true,
            },
        ],
    },
    {
        type: "group",
        groupName: "Settings",
        links: [
            {
                type: "link",
                text: "General",
                icon: IoSettingsSharp,
                badge: null,
                href: "/settings/general",
                disabled: true,
            },
            {
                type: "link",
                text: "Test defaults",
                icon: GoProjectTemplate,
                badge: null,
                href: "/settings/defaults",
                disabled: true,
            },
            {
                type: "link",
                text: "Agents & API keys",
                icon: RiGeminiLine,
                badge: { text: "AI", color: BADGE_COLOR_SUCCESS },
                href: "/settings/api",
                disabled: true,
            },
            {
                type: "link",
                text: "Backup & export",
                icon: PiExportBold,
                badge: null,
                href: "/settings/backup",
                disabled: true,
            },
        ],
    },
    {
        type: "group",
        groupName: "Community",
        links: [
            {
                type: "link",
                text: "Help & docs",
                icon: null,
                badge: null,
                href: "/help",
                disabled: true,
            },
            {
                type: "link",
                text: "GitHub",
                icon: null,
                badge: null,
                href: "https://github.com",
                disabled: true,
            },
            {
                type: "link",
                text: "Contribute",
                icon: null,
                badge: null,
                href: "/contribute",
                disabled: true,
            },
            {
                type: "link",
                text: "Send feedback",
                icon: null,
                badge: null,
                href: "/feedback",
                disabled: true,
            },
        ],
    },
]
