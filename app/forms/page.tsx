"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Download, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/data-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FormsPage() {
  const router = useRouter()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isImporting, setIsImporting] = useState(false)

  const handleRefreshForms = async () => {
    setIsRefreshing(true)
    try {
      // Fetch updated forms from API
      const response = await fetch("/api/forms")
      // Process response if needed
    } catch (error) {
      console.error("Error refreshing forms:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleImportForm = () => {
    setIsImporting(true)
    // Simulate importing a form
    setTimeout(() => {
      setIsImporting(false)
      router.push("/forms/import")
    }, 500)
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="ODK Forms" text="Manage and view forms from your ODK integration.">
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleRefreshForms} disabled={isRefreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh Forms"}
          </Button>
          <Button onClick={handleImportForm} disabled={isImporting}>
            <Download className="mr-2 h-4 w-4" />
            {isImporting ? "Importing..." : "Import Form"}
          </Button>
        </div>
      </DashboardHeader>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="all">All Forms</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Form List</CardTitle>
              <CardDescription>All forms available in your ODK Central instance</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable type="forms" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Forms</CardTitle>
              <CardDescription>Currently active forms in your ODK Central instance</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable type="forms" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="inactive" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inactive Forms</CardTitle>
              <CardDescription>Currently inactive forms in your ODK Central instance</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable type="forms" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
