"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"

interface DataTableProps {
  type?: "forms" | "responses"
  loading?: boolean
}

export function DataTable({ type = "responses", loading = false }: DataTableProps) {
  const [data, setData] = useState(() => {
    if (type === "forms") {
      return [
        { id: "form1", title: "Health Survey", created: "2023-12-01", status: "active", submissions: 540 },
        { id: "form2", title: "Education Assessment", created: "2023-11-15", status: "active", submissions: 320 },
        { id: "form3", title: "Agriculture Data", created: "2023-10-22", status: "active", submissions: 280 },
        { id: "form4", title: "Water & Sanitation", created: "2023-09-18", status: "active", submissions: 220 },
        { id: "form5", title: "Infrastructure", created: "2023-08-05", status: "inactive", submissions: 123 },
      ]
    }

    return [
      {
        id: "resp1",
        form: "Health Survey",
        submittedBy: "John Doe",
        submittedAt: "2023-12-15 09:45",
        status: "complete",
      },
      {
        id: "resp2",
        form: "Education Assessment",
        submittedBy: "Jane Smith",
        submittedAt: "2023-12-14 14:22",
        status: "complete",
      },
      {
        id: "resp3",
        form: "Agriculture Data",
        submittedBy: "Robert Johnson",
        submittedAt: "2023-12-14 11:05",
        status: "complete",
      },
      {
        id: "resp4",
        form: "Water & Sanitation",
        submittedBy: "Emily Davis",
        submittedAt: "2023-12-13 16:30",
        status: "incomplete",
      },
      {
        id: "resp5",
        form: "Health Survey",
        submittedBy: "Michael Wilson",
        submittedAt: "2023-12-13 10:15",
        status: "complete",
      },
    ]
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = type === "forms" ? "/api/forms" : "/api/responses"
        const response = await fetch(endpoint)
        const result = await response.json()

        if (type === "forms" && result.forms) {
          setData(result.forms)
        } else if (type === "responses" && result.responses) {
          setData(result.responses)
        }
      } catch (error) {
        console.error(`Error fetching ${type}:`, error)
      }
    }

    // Uncomment to enable actual API fetching
    // fetchData();
  }, [type])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (type === "forms") {
    return (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Submissions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((form) => (
              <TableRow key={form.id}>
                <TableCell className="font-medium">{form.title}</TableCell>
                <TableCell>{form.created}</TableCell>
                <TableCell>
                  <Badge variant={form.status === "active" ? "default" : "secondary"}>{form.status}</Badge>
                </TableCell>
                <TableCell className="text-right">{form.submissions}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Form</TableHead>
            <TableHead>Submitted By</TableHead>
            <TableHead>Submitted At</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((response) => (
            <TableRow key={response.id}>
              <TableCell className="font-medium">{response.form}</TableCell>
              <TableCell>{response.submittedBy}</TableCell>
              <TableCell>{response.submittedAt}</TableCell>
              <TableCell>
                <Badge variant={response.status === "complete" ? "default" : "outline"}>{response.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
