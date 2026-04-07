import { CSSProperties } from "react"
import { IconType } from "react-icons"
import { CgAlarm, CgNotes } from "react-icons/cg"


type TBadge = {
    text: string,
    color: CSSProperties["backgroundColor"]
}

export type TNavLink = {
    type: "link",
    text: string,
    icon: IconType | null,
    badge: TBadge | null,
    href: string
}

type TNavLinkGroup = {
    type: "group",
    groupName: string,
    links: TNavLink[]
}

export const NAV_LINKS: (TNavLinkGroup | TNavLink)[] = [
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
            },
            {
                type: "link",
                text: "Live now",
                icon: CgAlarm,
                badge: null,
                href: "/tests/live",
            },
            {
                type: "link",
                text: "Upcoming",
                icon: null,
                badge: null,
                href: "/tests/upcoming",
            },
            {
                type: "link",
                text: "Past & results",
                icon: null,
                badge: null,
                href: "/tests/past",
            }
        ],
    },
    {
        type: "link",
        text: "New test",
        icon: null,
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
                icon: null,
                badge: null,
                href: "/activity",
            },
            {
                type: "link",
                text: "Question bank",
                icon: null,
                badge: { text: "AI", color: "green" },
                href: "/questions",
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
                icon: null,
                badge: null,
                href: "/settings/general",
            },
            {
                type: "link",
                text: "Test defaults",
                icon: null,
                badge: null,
                href: "/settings/defaults",
            },
            {
                type: "link",
                text: "Scoring & grading",
                icon: null,
                badge: null,
                href: "/settings/scoring",
            },
            {
                type: "link",
                text: "Timer & access",
                icon: null,
                badge: null,
                href: "/settings/timer",
            },
            {
                type: "link",
                text: "Question types",
                icon: null,
                badge: null,
                href: "/settings/types",
            },
            {
                type: "link",
                text: "AI & API keys",
                icon: null,
                badge: { text: "AI", color: "green" },
                href: "/settings/api",
            },
            {
                type: "link",
                text: "Backup & export",
                icon: null,
                badge: null,
                href: "/settings/backup",
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
            },
            {
                type: "link",
                text: "GitHub",
                icon: null,
                badge: null,
                href: "https://github.com",
            },
            {
                type: "link",
                text: "Contribute",
                icon: null,
                badge: null,
                href: "/contribute",
            },
            {
                type: "link",
                text: "Send feedback",
                icon: null,
                badge: null,
                href: "/feedback",
            },
        ],
    },
]