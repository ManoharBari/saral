"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { PlusCircle, Save } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { BarChart } from "@/components/charts/bar-chart"
import { LineChart } from "@/components/charts/line-chart"
import { PieChart } from "@/components/charts/pie-chart"
import { useToast } from "@/hooks/use-toast"

export default function VisualizationsPage() {
  const { toast } = useToast()
  const [activeChart, setActiveChart] = useState<"bar" | "line" | "pie">("bar")
  const [chartTitle, setChartTitle] = useState("New Visualization")
  const [dataSource, setDataSource] = useState("health-survey")
  const [isSaving, setIsSaving] = useState(false)
  const [savedVisualizations, setSavedVisualizations] = useState([
    {
      id: "viz1",
      title: "Health Survey Responses by Region",
      type: "bar",
      dataSource: "health-survey",
      createdAt: "2023-12-10",
    },
    {
      id: "viz2",
      title: "Response Trends Over Time",
      type: "line",
      dataSource: "all-forms",
      createdAt: "2023-12-05",
    },
    {
      id: "viz3",
      title: "Form Distribution",
      type: "pie",
      dataSource: "all-forms",
      createdAt: "2023-11-28",
    },
  ])

  const handleCreateVisualization = () => {
    // Reset form for new visualization
    setActiveChart("bar")
    setChartTitle("New Visualization")
    setDataSource("health-survey")
  }

  const handleSaveVisualization = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      const newVisualization = {
        id: `viz${savedVisualizations.length + 1}`,
        title: chartTitle,
        type: activeChart,
        dataSource: dataSource,
        createdAt: new Date().toISOString().split("T")[0],
      }

      setSavedVisualizations([newVisualization, ...savedVisualizations])
      setIsSaving(false)

      toast({
        title: "Visualization saved",
        description: "Your visualization has been saved successfully.",
      })
    }, 1000)
  }

  const renderChart = () => {
    switch (activeChart) {
      case "bar":
        return <BarChart />
      case "line":
        return <LineChart />
      case "pie":
        return <PieChart />
      default:
        return <BarChart />
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Visualizations" text="Create and manage data visualizations.">
        <Button onClick={handleCreateVisualization}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Visualization
        </Button>
      </DashboardHeader>

      <Tabs defaultValue="create" className="space-y-4">
        <TabsList>
          <TabsTrigger value="create">Create</TabsTrigger>
          <TabsTrigger value="saved">Saved Visualizations</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Visualization Settings</CardTitle>
                <CardDescription>Configure your visualization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={chartTitle}
                    onChange={(e) => setChartTitle(e.target.value)}
                    placeholder="Enter visualization title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chart-type">Chart Type</Label>
                  <Select value={activeChart} onValueChange={(value: "bar" | "line" | "pie") => setActiveChart(value)}>
                    <SelectTrigger id="chart-type">
                      <SelectValue placeholder="Select chart type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bar">Bar Chart</SelectItem>
                      <SelectItem value="line">Line Chart</SelectItem>
                      <SelectItem value="pie">Pie Chart</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="data-source">Data Source</Label>
                  <Select value={dataSource} onValueChange={setDataSource}>
                    <SelectTrigger id="data-source">
                      <SelectValue placeholder="Select data source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-forms">All Forms</SelectItem>
                      <SelectItem value="health-survey">Health Survey</SelectItem>
                      <SelectItem value="education-assessment">Education Assessment</SelectItem>
                      <SelectItem value="agriculture-data">Agriculture Data</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleSaveVisualization} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Visualization
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>{chartTitle}</CardTitle>
                <CardDescription>Preview your visualization</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">{renderChart()}</CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {savedVisualizations.map((viz) => (
              <Card key={viz.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{viz.title}</CardTitle>
                  <CardDescription>Created on {viz.createdAt}</CardDescription>
                </CardHeader>
                <CardContent className="h-[200px]">
                  {viz.type === "bar" && <BarChart />}
                  {viz.type === "line" && <LineChart />}
                  {viz.type === "pie" && <PieChart />}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="default" size="sm">
                    View
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
