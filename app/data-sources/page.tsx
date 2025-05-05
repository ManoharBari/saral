"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DataSourcesPage() {
  const router = useRouter()
  const [isAdding, setIsAdding] = useState(false)
  const [dataSources, setDataSources] = useState([
    {
      id: "odk1",
      name: "ODK Central",
      type: "ODK",
      url: "https://odk-central.example.com",
      status: "connected",
      lastSync: "2023-12-15 14:30",
    },
    {
      id: "csv1",
      name: "CSV Import",
      type: "CSV",
      url: "N/A",
      status: "active",
      lastSync: "2023-12-10 09:15",
    },
    {
      id: "api1",
      name: "External API",
      type: "REST API",
      url: "https://api.example.com/data",
      status: "error",
      lastSync: "2023-12-05 11:45",
    },
  ])

  const handleAddDataSource = () => {
    setIsAdding(true)
    // Simulate adding a data source
    setTimeout(() => {
      setIsAdding(false)
      router.push("/data-sources/add")
    }, 500)
  }

  const handleConfigure = (id: string) => {
    router.push(`/data-sources/configure/${id}`)
  }

  const handleSync = async (id: string) => {
    // Find the data source to update
    const updatedSources = dataSources.map((source) => {
      if (source.id === id) {
        return {
          ...source,
          status: "connected",
          lastSync: new Date().toLocaleString(),
        }
      }
      return source
    })

    setDataSources(updatedSources)
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Data Sources" text="Manage your external data sources and integrations.">
        <Button onClick={handleAddDataSource} disabled={isAdding}>
          <PlusCircle className="mr-2 h-4 w-4" />
          {isAdding ? "Adding..." : "Add Data Source"}
        </Button>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {dataSources.map((source) => (
          <Card key={source.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{source.name}</CardTitle>
                <Badge
                  variant={
                    source.status === "connected" ? "default" : source.status === "active" ? "outline" : "destructive"
                  }
                >
                  {source.status}
                </Badge>
              </div>
              <CardDescription>{source.type}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-sm font-medium">URL:</div>
                  <div className="text-sm truncate">{source.url}</div>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-sm font-medium">Last Sync:</div>
                  <div className="text-sm">{source.lastSync}</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" onClick={() => handleConfigure(source.id)}>
                Configure
              </Button>
              <Button variant="default" size="sm" onClick={() => handleSync(source.id)}>
                Sync Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </DashboardShell>
  )
}
