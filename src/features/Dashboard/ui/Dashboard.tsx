"use client"

import {
    Bar,
    BarChart,
} from "recharts"
import Card from "@/components/ui/Card/Card"
import Heading from "@/components/ui/Heading/Heading"
import { Stack } from "@/components/ui/Stack/Stack"
import Text from "@/components/ui/Text/Text"
import { mockAuthor } from "../mockData"
import classes from "./Dashboard.module.css"
import { TAuthor } from "@/types/user"

type TTestResultChartRow = {
    testId: string
    testName: string
    averageResult: number
    completedCount: number
}

const getTestResultChartRows = (mockAuthor: TAuthor): TTestResultChartRow[] => {

    const chartRowMap = new Map<string, TTestResultChartRow & {
        totalPercent: number
    }>()

    mockAuthor.testResultArr.forEach((result) => {
        const totalPoints = result.test.totalPoints || 1
        const percent = (result.points / totalPoints) * 100
        const currentRow = chartRowMap.get(result.test.id)

        if (!currentRow) {
            chartRowMap.set(result.test.id, {
                testId: result.test.id,
                testName: result.test.name,
                averageResult: percent,
                completedCount: 1,
                totalPercent: percent,
            })
            return
        }

        const completedCount = currentRow.completedCount + 1
        const totalPercent = currentRow.totalPercent + percent

        chartRowMap.set(result.test.id, {
            ...currentRow,
            averageResult: totalPercent / completedCount,
            completedCount,
            totalPercent,
        })
    })

    return Array.from(chartRowMap.values())
        .map(({ totalPercent, ...row }) => row)
        .sort((firstRow, secondRow) => {
            return secondRow.averageResult - firstRow.averageResult
        })
}

// const formatPercent = (value: number) => {
//     return `${Math.round(value)}%`
// }

// const measureText = (text: string, fontSize = 12, font = "manrope") => {
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return 0
//     ctx.font = `${fontSize}px ${font}`;
//     return ctx.measureText(text).width
// };

const Dashboard = () => {
    const chartRows = getTestResultChartRows(mockAuthor)

    return (
        <main className={classes["dashboard"]}>
            <Stack gap="m">
                <Heading as="h1">Dashboard</Heading>

                <Card spacing="m" withBorder className={classes["chart-card"]} radius="xl">
                    <Stack gap="xs">
                        <Stack gap="xs">
                            <Text size="m">Test results</Text>
                            <Text color="primary" size="l">
                                {chartRows.length} tests,{" "}
                                {mockAuthor.testResultArr.length} completed attempts.
                            </Text>
                            <Text color="secondary" size="xs">
                                Average score across completed student attempts.
                            </Text>
                        </Stack>

                        <BarChart width={400} height={400} data={chartRows}>
                            <Bar dataKey={"averageResult"} type="horizontal" />
                        </BarChart>
                    </Stack>
                </Card>
            </Stack>
        </main>
    )
}

export default Dashboard;
