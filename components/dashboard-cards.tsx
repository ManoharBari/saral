"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart } from "@/components/charts/bar-chart"
import { LineChart } from "@/components/charts/line-chart"
import { PieChart } from "@/components/charts/pie-chart"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { Download, RefreshCw } from "lucide-react"
import { useState } from "react"

export function DashboardCards() {
  const [isLoading, setIsLoading] = useState(false)

  const handleRefresh = async () => {
    setIsLoading(true)
    try {
      // Fetch updated data from API
      const formsResponse = await fetch("/api/forms")
      const responsesResponse = await fetch("/api/responses")

      // Process responses if needed
      // const formsData = await formsResponse.json();
      // const responsesData = await responsesResponse.json();

      // You could update state here with the new data
    } catch (error) {
      console.error("Error refreshing data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleExport = () => {
    // Create CSV content from the current data
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Form,Submitted By,Submitted At,Status\n" +
      "Health Survey,John Doe,2023-12-15 09:45,complete\n" +
      "Education Assessment,Jane Smith,2023-12-14 14:22,complete\n"

    // Create download link
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "saral_dashboard_export.csv")
    document.body.appendChild(link)

    // Trigger download
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="forms">Forms</TabsTrigger>
          <TabsTrigger value="responses">Responses</TabsTrigger>
        </TabsList>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Forms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Responses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,483</div>
              <p className="text-xs text-muted-foreground">+248 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+4 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87.4%</div>
              <p className="text-xs text-muted-foreground">+2.3% from last month</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Response Trends</CardTitle>
              <CardDescription>Daily form submissions over time</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <LineChart />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Form Distribution</CardTitle>
              <CardDescription>Responses by form type</CardDescription>
            </CardHeader>
            <CardContent>
              <PieChart />
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Response by Region</CardTitle>
              <CardDescription>Geographic distribution of responses</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <BarChart />
            </CardContent>
          </Card>
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Responses</CardTitle>
              <CardDescription>Latest form submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable />
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="forms" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Available Forms</CardTitle>
            <CardDescription>List of all forms available in the ODK system</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable type="forms" />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="responses" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Form Responses</CardTitle>
            <CardDescription>All responses collected from ODK forms</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable type="responses" />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
