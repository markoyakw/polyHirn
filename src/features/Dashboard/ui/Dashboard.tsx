"use client"

import {
    Bar,
    BarChart,
    LabelList,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
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

const formatPercent = (value: number) => {
    return `${Math.round(value)}%`
}

const Dashboard = () => {
    const chartRows = getTestResultChartRows(mockAuthor)

    const measureText = (text: string, fontSize = 12, font = "manrope") => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return 0
        ctx.font = `${fontSize}px ${font}`;
        return ctx.measureText(text).width
    };

    const OffsetBar = (props: CustomBarProps): ReactElement => {
        const { x = 0, y = 0, width = 0, value, completedCount, testName } = props
        const submissionsText = `(${completedCount} submissions)`
        const testNameWidth = measureText(testName)
        const spaceWidth = measureText(" ")
        const submissionsWidth = measureText(submissionsText)
        const spacingM = 8
        const spacingS = 4
        const testNameAndSubmissionsWidth = testNameWidth + spacingM + submissionsWidth

        return (
            <g>
                <rect
                    x={x + testNameAndSubmissionsWidth + spaceWidth}
                    y={y - LABEL_HEIGHT / 2 - 4.5}
                    width={measureText(formatPercent(value)) + spacingS * 2}
                    height={LABEL_HEIGHT}
                    fill={"var(--color-success-bg)"}
                    rx={3}
                    ry={3}
                />
                <rect
                    x={x + testNameWidth + spacingM}
                    y={y - LABEL_HEIGHT / 2 - 4.5}
                    width={submissionsWidth}
                    height={LABEL_HEIGHT}
                    fill={"var(--color-bg-card-2)"}
                    rx={3}
                    ry={3}
                />
                <text y={y} x={x} textAnchor="start" fill="var(--color-text-primary)" fontSize={12}>
                    <tspan>
                        {testName}
                    </tspan>
                    <tspan x={x + testNameWidth + spacingM} fill="var(--color-text-secondary)">
                        {submissionsText}
                    </tspan>
                    <tspan x={x + testNameAndSubmissionsWidth + spaceWidth + spacingS}>
                        {formatPercent(value)}
                    </tspan>
                </text>
                <rect
                    x={x}
                    y={y + LABEL_HEIGHT / 2}
                    width={width / value * 100}
                    height={BAR_THICKNESS}
                    fill={"var(--color-bg-card-2)"}
                    rx={3}
                    ry={3}
                />
                <rect
                    x={x}
                    y={y + LABEL_HEIGHT / 2}
                    width={width}
                    height={BAR_THICKNESS}
                    fill={"var(--color-success)"}
                    rx={3}
                    ry={3}
                />
            </g>
        )
    }

    const LABEL_HEIGHT = 16
    const BAR_THICKNESS = 7
    const BAR_GAP = 5
    const LINE_HEIGHT_ADDITION = 9

    const chartHeight = chartRows.length * (BAR_THICKNESS + BAR_GAP + LABEL_HEIGHT + LINE_HEIGHT_ADDITION)

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

                        <ResponsiveContainer width={400} height={chartHeight}>
                            <BarChart
                                data={chartRows}
                                layout="vertical"
                            >
                                <XAxis
                                    type="number"
                                    domain={[0, 100]}
                                    tickFormatter={formatPercent}
                                    stroke="var(--color-text-secondary)"
                                    tickLine={true}
                                    axisLine={false}
                                    tick={false}
                                    height={-4}
                                />
                                <YAxis
                                    type="category"
                                    dataKey="testName"
                                    tickLine={false}
                                    tick={false}
                                    axisLine={false}
                                    interval={0}
                                    width={-4}
                                />
                                <Tooltip
                                    cursor={{ fill: "var(--color-bg-card-2)" }}
                                    formatter={(value) => {
                                        return [
                                            `${Number(value).toFixed(1)}%`,
                                            "Average result",
                                        ]
                                    }}
                                    labelFormatter={(label) => String(label)}
                                    contentStyle={{
                                        backgroundColor: "var(--color-bg-card-1)",
                                        borderColor: "var(--box-shadow-border-color)",
                                        borderRadius: "var(--radius-m)",
                                        color: "var(--color-text-primary)",
                                    }}
                                />
                                <Bar
                                    dataKey="averageResult"
                                    barSize={BAR_THICKNESS}
                                    shape={OffsetBar}
                                    name="Average result"
                                >
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </Stack>
                </Card>
            </Stack>
        </main>
    )
}

export default Dashboard;
