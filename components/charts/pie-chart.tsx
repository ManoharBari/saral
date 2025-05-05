"use client"

import { Cell, Pie, PieChart as RechartsPieChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Health Survey", value: 540 },
  { name: "Education Assessment", value: 320 },
  { name: "Agriculture Data", value: 280 },
  { name: "Water & Sanitation", value: 220 },
  { name: "Infrastructure", value: 123 },
]

export function PieChart() {
  return (
    <ChartContainer
      config={{
        value: {
          label: "Responses",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={`hsl(${index * 50}, 70%, 50%)`} />
          ))}
        </Pie>
        <ChartTooltip content={<ChartTooltipContent />} />
      </RechartsPieChart>
    </ChartContainer>
  )
}
