import { NextResponse } from "next/server"

// This would typically come from an environment variable
const ODK_API_URL = process.env.ODK_API_URL || "https://odk-central.example.com/v1"
const ODK_API_KEY = process.env.ODK_API_KEY || "your-api-key"

export async function GET() {
  try {
    // In a real implementation, this would fetch from the actual ODK API
    // const response = await fetch(`${ODK_API_URL}/projects/1/forms`, {
    //   headers: {
    //     "Authorization": `Bearer ${ODK_API_KEY}`,
    //     "Content-Type": "application/json"
    //   }
    // })
    // const data = await response.json()

    // For demo purposes, we'll return mock data
    const mockForms = [
      { id: "form1", title: "Health Survey", created: "2023-12-01", status: "active", submissions: 540 },
      { id: "form2", title: "Education Assessment", created: "2023-11-15", status: "active", submissions: 320 },
      { id: "form3", title: "Agriculture Data", created: "2023-10-22", status: "active", submissions: 280 },
      { id: "form4", title: "Water & Sanitation", created: "2023-09-18", status: "active", submissions: 220 },
      { id: "form5", title: "Infrastructure", created: "2023-08-05", status: "inactive", submissions: 123 },
    ]

    return NextResponse.json({ forms: mockForms })
  } catch (error) {
    console.error("Error fetching forms:", error)
    return NextResponse.json({ error: "Failed to fetch forms" }, { status: 500 })
  }
}
