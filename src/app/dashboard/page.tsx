'use client'
import * as React from "react"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { Bar, BarChart, CartesianGrid } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { DateRange } from "react-day-picker"

const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]
const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#2563eb",
    },
    mobile: {
        label: "Mobile",
        color: "#60a5fa",
    },
}

export default function TwitterDashboard() {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(2022, 0, 20),
        to: addDays(new Date(2022, 0, 20), 20),
    })
    return (
        <div className="flex min-h-fit w-full ">
            <div className="w-full sm:mx-5 sm:mt-4 mx-2 my-4">
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-card rounded-lg shadow-lg mt-6">
                    <div className="sm:container sm:mx-auto sm:px-6 sm:py-8 px-1.5 py-4">
                        <div className="flex sm:flex-row flex-col gap-4 justify-between mb-4">
                            <h1 className="mb-4 mx-3 text-2xl font-semibold">Dashboard</h1>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        id="date"
                                        variant={"outline"}
                                        className={cn(
                                            "sm:w-[300px] w-full justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date?.from ? (
                                            date.to ? (
                                                <>
                                                    {format(date.from, "LLL dd, y")} -{" "}
                                                    {format(date.to, "LLL dd, y")}
                                                </>
                                            ) : (
                                                format(date.from, "LLL dd, y")
                                            )
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        initialFocus
                                        mode="range"
                                        defaultMonth={date?.from}
                                        selected={date}
                                        onSelect={setDate}
                                        numberOfMonths={2}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                            <StatCard title="Total Users" value="24,320" trend="+4.6%" />
                            <StatCard title="New Followers" value="1,230" trend="+2.3%" />
                            <StatCard title="Engagement Rate" value="48.9%" trend="+9.2%" />
                            <StatCard title="Average Likes" value="4,320" trend="+11.7%" />
                        </div>

                        <div className="flex sm:flex-row flex-col gap-4 justify-around">
                            <Card className="sm:w-fit w-full shadow-lg">
                                <CardHeader>
                                    <CardTitle>Tweet Activity</CardTitle>
                                    <CardDescription>Tweet engagement over the last 6 months</CardDescription>
                                </CardHeader>
                                <CardContent className="pl-2">
                                    <ChartContainer config={chartConfig} className="min-h-[200px] sm:w-fit w-full">
                                        <BarChart accessibilityLayer data={chartData}>
                                            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                                            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                                        </BarChart>
                                    </ChartContainer>
                                </CardContent>
                            </Card>
                            <Card className="sm:w-fit w-full shadow-lg">
                                <CardHeader>
                                    <CardTitle>Tweet Categories</CardTitle>
                                    <CardDescription>Tweet engagement over the last 6 months</CardDescription>
                                </CardHeader>
                                <CardContent className="pl-2">
                                    <ChartContainer config={chartConfig} className="min-h-[200px] sm:w-fit w-full">
                                        <BarChart accessibilityLayer data={chartData}>
                                            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                                            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                                        </BarChart>
                                    </ChartContainer>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}


function StatCard({ title, value, trend }) {
    return (
        <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">
                    {trend} from last month
                </p>
            </CardContent>
        </Card>
    )
}