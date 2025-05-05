"use client"

import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { DashboardCards } from "@/components/dashboard-cards"

// Import useState and useRouter
import { useState } from "react"
import { useRouter } from "next/navigation"

// Update the Home component to include state and functionality
export default function Home() {
  const [isCreating, setIsCreating] = useState(false)
  const router = useRouter()

  const handleCreateDashboard = () => {
    setIsCreating(true)
    // Simulate dashboard creation
    setTimeout(() => {
      setIsCreating(false)
      // Navigate to a new dashboard (in a real app, this would use the ID of the created dashboard)
      router.push("/dashboard/new")
    }, 1000)
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Visualize and analyze your data from ODK and other sources.">
        <Button onClick={handleCreateDashboard} disabled={isCreating}>
          {isCreating ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              Creating...
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Dashboard
            </>
          )}
        </Button>
      </DashboardHeader>
      <DashboardCards />
    </DashboardShell>
  )
}
