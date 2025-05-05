/**
 * @saral/dashboards
 * A library of reusable dashboard components for data visualization
 */

// Update the imports to directly reference each chart component file
// Replace this line:
// import { BarChart, LineChart, PieChart } from "@/components/charts"

// With these direct imports:
import { BarChart } from "@/components/charts/bar-chart"
import { LineChart } from "@/components/charts/line-chart"
import { PieChart } from "@/components/charts/pie-chart"

// Re-export the chart components
export { BarChart, LineChart, PieChart }

// Export types for dashboard configuration
export interface DashboardConfig {
  id: string
  title: string
  description?: string
  layout: DashboardLayoutItem[]
}

export interface DashboardLayoutItem {
  id: string
  type: "chart" | "table" | "metric" | "text"
  title: string
  description?: string
  width: 1 | 2 | 3 | 4
  height: 1 | 2 | 3
  config: Record<string, any>
}

export interface ChartConfig {
  type: "bar" | "line" | "pie"
  dataSource: string
  xAxis?: string
  yAxis?: string
  filters?: Record<string, any>
}

export interface TableConfig {
  dataSource: string
  columns: string[]
  filters?: Record<string, any>
  pagination?: boolean
}

export interface MetricConfig {
  dataSource: string
  calculation: "count" | "sum" | "average" | "min" | "max"
  field?: string
  filters?: Record<string, any>
  comparison?: {
    period: "day" | "week" | "month" | "year"
    value: number
  }
}

// Utility functions for dashboard management
export function createDashboard(config: DashboardConfig): DashboardConfig {
  return {
    ...config,
    id: config.id || `dashboard-${Date.now()}`,
  }
}

export function updateDashboard(dashboard: DashboardConfig, updates: Partial<DashboardConfig>): DashboardConfig {
  return {
    ...dashboard,
    ...updates,
    layout: updates.layout || dashboard.layout,
  }
}

export function addDashboardItem(dashboard: DashboardConfig, item: DashboardLayoutItem): DashboardConfig {
  return {
    ...dashboard,
    layout: [...dashboard.layout, item],
  }
}

export function removeDashboardItem(dashboard: DashboardConfig, itemId: string): DashboardConfig {
  return {
    ...dashboard,
    layout: dashboard.layout.filter((item) => item.id !== itemId),
  }
}

// Data processing utilities
export function processChartData(data: Record<string, any>[], config: ChartConfig): Record<string, any>[] {
  // This would contain logic to transform the data based on the chart type
  // For example, aggregating data for bar charts, formatting for line charts, etc.
  return data
}

export function calculateMetric(
  data: Record<string, any>[],
  config: MetricConfig,
): { value: number; change?: number; changeDirection?: "up" | "down" | "none" } {
  // This would contain logic to calculate metrics based on the configuration
  // For example, counting records, summing values, calculating averages, etc.
  return { value: 0 }
}
