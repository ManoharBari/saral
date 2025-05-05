"use client"

import type React from "react"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload } from "lucide-react"

export default function ImportFormPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    xmlFile: null as File | null,
  })
  const [isUploading, setIsUploading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        xmlFile: e.target.files![0],
      }))
    }
  }

  const handleUpload = async () => {
    setIsUploading(true)
    // Simulate API call to upload form
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsUploading(false)
    router.push("/forms")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Import ODK Form" text="Upload an XForm definition to your ODK Central instance.">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </DashboardHeader>

      <Card>
        <CardHeader>
          <CardTitle>Form Details</CardTitle>
          <CardDescription>Enter the details for the form you want to import.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Form Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter form title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter form description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="xmlFile">XForm XML File</Label>
            <Input
              id="xmlFile"
              name="xmlFile"
              type="file"
              accept=".xml"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
            <p className="text-xs text-muted-foreground">Upload an XForm XML file (max 5MB)</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleUpload} disabled={isUploading || !formData.title || !formData.xmlFile}>
            {isUploading ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Form
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </DashboardShell>
  )
}
