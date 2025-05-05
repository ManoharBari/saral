"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save, RefreshCw, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

export default function ConfigureDataSourcePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "error" | null>(null)

  const [dataSource, setDataSource] = useState({
    id: params.id,
    name: "",
    type: "",
    url: "",
    apiKey: "",
    username: "",
    password: "",
    isActive: true,
    refreshInterval: "60",
    lastSync: "",
  })

  useEffect(() => {
    // Simulate fetching data source details
    const mockDataSources = {
      odk1: {
        id: "odk1",
        name: "ODK Central",
        type: "ODK",
        url: "https://odk-central.example.com",
        apiKey: "odk_api_key_12345",
        username: "admin",
        password: "••••••••",
        isActive: true,
        refreshInterval: "60",
        lastSync: "2023-12-15 14:30",
      },
      csv1: {
        id: "csv1",
        name: "CSV Import",
        type: "CSV",
        url: "N/A",
        apiKey: "",
        username: "",
        password: "",
        isActive: true,
        refreshInterval: "0",
        lastSync: "2023-12-10 09:15",
      },
      api1: {
        id: "api1",
        name: "External API",
        type: "REST",
        url: "https://api.example.com/data",
        apiKey: "api_key_67890",
        username: "",
        password: "",
        isActive: false,
        refreshInterval: "30",
        lastSync: "2023-12-05 11:45",
      },
    }

    if (params.id in mockDataSources) {
      setDataSource(mockDataSources[params.id as keyof typeof mockDataSources])
      setConnectionStatus(params.id === "api1" ? "error" : "connected")
    }
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDataSource((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setDataSource((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleToggleChange = (name: string, checked: boolean) => {
    setDataSource((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleTestConnection = () => {
    setIsTesting(true)

    // Simulate API call to test connection
    setTimeout(() => {
      setIsTesting(false)

      // Randomly succeed or fail for demo purposes
      const success = Math.random() > 0.3

      if (success) {
        setConnectionStatus("connected")
        toast({
          title: "Connection successful",
          description: "Successfully connected to the data source.",
        })
      } else {
        setConnectionStatus("error")
        toast({
          title: "Connection failed",
          description: "Failed to connect to the data source. Please check your credentials.",
          variant: "destructive",
        })
      }
    }, 1500)
  }

  const handleSave = () => {
    setIsSaving(true)

    // Simulate API call to save data source
    setTimeout(() => {
      setIsSaving(false)

      toast({
        title: "Data source updated",
        description: "Your data source has been updated successfully.",
      })

      // Optionally navigate back
      // router.push("/data-sources")
    }, 1000)
  }

  const handleDelete = () => {
    setIsDeleting(true)

    // Simulate API call to delete data source
    setTimeout(() => {
      setIsDeleting(false)

      toast({
        title: "Data source deleted",
        description: "Your data source has been deleted successfully.",
      })

      router.push("/data-sources")
    }, 1000)
  }

  return (
    <DashboardShell>
      <DashboardHeader heading={`Configure ${dataSource.name}`} text="Manage your data source connection and settings.">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </DashboardHeader>

      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-medium">Connection Status:</h2>
        {connectionStatus === "connected" ? (
          <Badge variant="default">Connected</Badge>
        ) : connectionStatus === "error" ? (
          <Badge variant="destructive">Error</Badge>
        ) : (
          <Badge variant="outline">Unknown</Badge>
        )}
      </div>

      <Tabs defaultValue="connection" className="space-y-4">
        <TabsList>
          <TabsTrigger value="connection">Connection</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="connection" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Connection Details</CardTitle>
              <CardDescription>Configure how to connect to your data source</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" value={dataSource.name} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select value={dataSource.type} onValueChange={(value) => handleSelectChange("type", value)}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ODK">ODK Central</SelectItem>
                      <SelectItem value="CSV">CSV Import</SelectItem>
                      <SelectItem value="REST">REST API</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  name="url"
                  value={dataSource.url}
                  onChange={handleChange}
                  placeholder="https://example.com/api"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <Input id="apiKey" name="apiKey" value={dataSource.apiKey} onChange={handleChange} type="password" />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="username">Username (Optional)</Label>
                  <Input id="username" name="username" value={dataSource.username} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password (Optional)</Label>
                  <Input
                    id="password"
                    name="password"
                    value={dataSource.password}
                    onChange={handleChange}
                    type="password"
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button onClick={handleTestConnection} disabled={isTesting} variant="outline">
                  {isTesting ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Testing...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Test Connection
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Source Settings</CardTitle>
              <CardDescription>Configure how this data source behaves</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="active-status">Active Status</Label>
                  <p className="text-sm text-muted-foreground">Enable or disable this data source</p>
                </div>
                <Switch
                  id="active-status"
                  checked={dataSource.isActive}
                  onCheckedChange={(checked) => handleToggleChange("isActive", checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="refresh-interval">Refresh Interval (minutes)</Label>
                <Input
                  id="refresh-interval"
                  name="refreshInterval"
                  value={dataSource.refreshInterval}
                  onChange={handleChange}
                  type="number"
                  min="0"
                />
                <p className="text-sm text-muted-foreground">Set to 0 for manual refresh only</p>
              </div>

              <div className="space-y-2">
                <Label>Last Synchronized</Label>
                <p className="text-sm">{dataSource.lastSync || "Never"}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Advanced configuration options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="timeout">Request Timeout (seconds)</Label>
                <Input id="timeout" placeholder="30" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="retry-attempts">Retry Attempts</Label>
                <Input id="retry-attempts" placeholder="3" />
              </div>

              <div className="pt-6">
                <h3 className="text-lg font-medium text-destructive mb-2">Danger Zone</h3>
                <p className="text-sm text-muted-foreground mb-4">These actions cannot be undone. Please be certain.</p>
                <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                  {isDeleting ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Data Source
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </DashboardShell>
  )
}
