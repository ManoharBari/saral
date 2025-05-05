"use client"

import type React from "react"

import { useState, useRef } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Upload, FileUp, Database, Check, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"

export default function ImportDataPage() {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [importType, setImportType] = useState("csv")
  const [dataTarget, setDataTarget] = useState("new-dataset")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [previewData, setPreviewData] = useState<any[] | null>(null)
  const [importHistory, setImportHistory] = useState([
    {
      id: "imp1",
      name: "Health Survey Data",
      type: "CSV",
      records: 1245,
      date: "2023-12-15",
      status: "completed",
    },
    {
      id: "imp2",
      name: "Education Assessment",
      type: "JSON",
      records: 867,
      date: "2023-12-10",
      status: "completed",
    },
    {
      id: "imp3",
      name: "Agriculture Data",
      type: "Excel",
      records: 532,
      date: "2023-12-05",
      status: "failed",
    },
  ])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)

      // Generate mock preview data
      if (file.name.endsWith(".csv") || file.name.endsWith(".xlsx") || file.name.endsWith(".json")) {
        const mockData = [
          { id: 1, name: "John Doe", age: 32, location: "North Region" },
          { id: 2, name: "Jane Smith", age: 28, location: "South Region" },
          { id: 3, name: "Robert Johnson", age: 45, location: "East Region" },
          { id: 4, name: "Emily Davis", age: 36, location: "West Region" },
          { id: 5, name: "Michael Wilson", age: 29, location: "Central Region" },
        ]
        setPreviewData(mockData)
      }
    }
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleImport = () => {
    if (!selectedFile) return

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 300)

    // Simulate API call
    setTimeout(() => {
      clearInterval(interval)
      setUploadProgress(100)

      setTimeout(() => {
        setIsUploading(false)
        setSelectedFile(null)
        setPreviewData(null)

        // Add to import history
        const newImport = {
          id: `imp${importHistory.length + 1}`,
          name: selectedFile.name.split(".")[0],
          type: importType.toUpperCase(),
          records: Math.floor(Math.random() * 1000) + 500,
          date: new Date().toISOString().split("T")[0],
          status: "completed",
        }

        setImportHistory([newImport, ...importHistory])

        toast({
          title: "Import successful",
          description: `${newImport.records} records have been imported successfully.`,
        })
      }, 500)
    }, 3000)
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Import Data" text="Import data from various sources into your Saral dashboard." />

      <Tabs defaultValue="file" className="space-y-4">
        <TabsList>
          <TabsTrigger value="file">File Import</TabsTrigger>
          <TabsTrigger value="history">Import History</TabsTrigger>
        </TabsList>

        <TabsContent value="file" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Import Data from File</CardTitle>
              <CardDescription>Upload a file to import data into your dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="import-type">Import Type</Label>
                  <Select value={importType} onValueChange={setImportType}>
                    <SelectTrigger id="import-type">
                      <SelectValue placeholder="Select import type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">CSV File</SelectItem>
                      <SelectItem value="excel">Excel File</SelectItem>
                      <SelectItem value="json">JSON File</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="data-target">Import To</Label>
                  <Select value={dataTarget} onValueChange={setDataTarget}>
                    <SelectTrigger id="data-target">
                      <SelectValue placeholder="Select target" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new-dataset">New Dataset</SelectItem>
                      <SelectItem value="health-survey">Health Survey</SelectItem>
                      <SelectItem value="education-assessment">Education Assessment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept=".csv,.xlsx,.xls,.json"
                  onChange={handleFileChange}
                />

                {!selectedFile ? (
                  <>
                    <FileUp className="h-10 w-10 text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium">Drag and drop or click to upload</h3>
                    <p className="text-sm text-muted-foreground mb-4">Supports CSV, Excel, and JSON files (max 10MB)</p>
                    <Button onClick={triggerFileInput}>
                      <Upload className="mr-2 h-4 w-4" />
                      Select File
                    </Button>
                  </>
                ) : (
                  <>
                    <Database className="h-10 w-10 text-primary mb-2" />
                    <h3 className="text-lg font-medium">File selected</h3>
                    <p className="text-sm mb-2">
                      {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
                    </p>

                    {isUploading ? (
                      <div className="w-full max-w-md space-y-2">
                        <Progress value={uploadProgress} className="w-full" />
                        <p className="text-sm text-center">{uploadProgress}% uploaded</p>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={triggerFileInput}>
                          Change File
                        </Button>
                        <Button onClick={handleImport}>Start Import</Button>
                      </div>
                    )}
                  </>
                )}
              </div>

              {previewData && !isUploading && (
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Data Preview</h3>
                  <div className="border rounded-md overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {Object.keys(previewData[0]).map((key) => (
                            <TableHead key={key}>{key}</TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {previewData.map((row, index) => (
                          <TableRow key={index}>
                            {Object.values(row).map((value, i) => (
                              <TableCell key={i}>{value as React.ReactNode}</TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Showing 5 of {Math.floor(Math.random() * 1000) + 500} records
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Import History</CardTitle>
              <CardDescription>View your previous data imports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Records</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {importHistory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>{item.records}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>
                          {item.status === "completed" ? (
                            <span className="flex items-center text-green-600">
                              <Check className="mr-1 h-4 w-4" />
                              Completed
                            </span>
                          ) : (
                            <span className="flex items-center text-red-600">
                              <AlertCircle className="mr-1 h-4 w-4" />
                              Failed
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
