"use client"

import { CartesianGrid, Line, LineChart as RechartsLineChart, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { date: "Jan 1", responses: 45 },
  { date: "Jan 2", responses: 52 },
  { date: "Jan 3", responses: 49 },
  { date: "Jan 4", responses: 63 },
  { date: "Jan 5", responses: 58 },
  { date: "Jan 6", responses: 72 },
  { date: "Jan 7", responses: 68 },
  { date: "Jan 8", responses: 74 },
  { date: "Jan 9", responses: 92 },
  { date: "Jan 10", responses: 86 },
  { date: "Jan 11", responses: 95 },
  { date: "Jan 12", responses: 78 },
  { date: "Jan 13", responses: 84 },
  { date: "Jan 14", responses: 67 },
]

export function LineChart() {
  return (
    <ChartContainer
      config={{
        responses: {
          label: "Responses",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <RechartsLineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="date" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          type="monotone"
          dataKey="responses"
          stroke="var(--color-responses)"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </RechartsLineChart>
    </ChartContainer>
  )
}
