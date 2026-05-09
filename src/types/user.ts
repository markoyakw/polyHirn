import type { TTestResult, TTestResultFolder } from "@/types/test"

type TRole = "author" | "student" | "admin"

type TBaseUser = {
    id: string
    name: string
    email: string
}

type TAuthor = TBaseUser & {
    role: "author"
    testResultFolderArr: TTestResultFolder[]
    testResultArr: TTestResult[]
}

type TStudent = TBaseUser & {
    role: "student"
    testResultArr: TTestResult[]
}

type TAdmin = TBaseUser & {
    role: "admin"
}

type TUser = TAuthor | TStudent | TAdmin

export type {
    TAdmin,
    TAuthor,
    TRole,
    TStudent,
    TUser,
}
