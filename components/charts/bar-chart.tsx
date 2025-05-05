"use client"

import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { region: "North", count: 420 },
  { region: "South", count: 362 },
  { region: "East", count: 389 },
  { region: "West", count: 312 },
  { region: "Central", count: 487 },
]

export function BarChart() {
  return (
    <ChartContainer
      config={{
        count: {
          label: "Responses",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <RechartsBarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="region" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ChartContainer>
  )
}
