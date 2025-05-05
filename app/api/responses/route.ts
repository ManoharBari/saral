import { NextResponse } from "next/server"

// This would typically come from an environment variable
const ODK_API_URL = process.env.ODK_API_URL || "https://odk-central.example.com/v1"
const ODK_API_KEY = process.env.ODK_API_KEY || "your-api-key"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const formId = searchParams.get("formId")

    // In a real implementation, this would fetch from the actual ODK API
    // const url = formId
    //   ? `${ODK_API_URL}/projects/1/forms/${formId}/submissions`
    //   : `${ODK_API_URL}/projects/1/forms/submissions`
    //
    // const response = await fetch(url, {
    //   headers: {
    //     "Authorization": `Bearer ${ODK_API_KEY}`,
    //     "Content-Type": "application/json"
    //   }
    // })
    // const data = await response.json()

    // For demo purposes, we'll return mock data
    const mockResponses = [
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

    // Filter by form if formId is provided
    const responses = formId
      ? mockResponses.filter((r) => r.form.toLowerCase().replace(/\s+/g, "-") === formId)
      : mockResponses

    return NextResponse.json({ responses })
  } catch (error) {
    console.error("Error fetching responses:", error)
    return NextResponse.json({ error: "Failed to fetch responses" }, { status: 500 })
  }
}
