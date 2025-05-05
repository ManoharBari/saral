import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DocumentationPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Documentation" text="Learn how to use Saral Data Integration & Dashboards." />

      <Tabs defaultValue="setup" className="space-y-4">
        <TabsList>
          <TabsTrigger value="setup">Setup</TabsTrigger>
          <TabsTrigger value="odk">ODK Integration</TabsTrigger>
          <TabsTrigger value="dashboards">Dashboards</TabsTrigger>
          <TabsTrigger value="packages">NPM Packages</TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>Setup steps for Saral Data Integration & Dashboards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-medium">Installation</h3>
              <p>Clone the repository and install dependencies:</p>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code>{`git clone https://github.com/yourusername/saral-dashboards.git
cd saral-dashboards
npm install`}</code>
              </pre>

              <h3 className="text-lg font-medium mt-6">Environment Setup</h3>
              <p>Create a .env file with the following variables:</p>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code>{`ODK_API_URL=https://your-odk-central-instance.com/v1
ODK_API_KEY=your-api-key
ODK_PROJECT_ID=1`}</code>
              </pre>

              <h3 className="text-lg font-medium mt-6">Running the Application</h3>
              <p>Start the development server:</p>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code>{`npm run dev`}</code>
              </pre>
              <p>The application will be available at http://localhost:3000</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="odk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ODK Integration</CardTitle>
              <CardDescription>How to integrate with ODK Central</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-medium">Configuration</h3>
              <p>The ODK integration requires the following environment variables:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <code>ODK_API_URL</code>: The URL of your ODK Central instance API
                </li>
                <li>
                  <code>ODK_API_KEY</code>: Your ODK Central API key
                </li>
                <li>
                  <code>ODK_PROJECT_ID</code>: The ID of the project in ODK Central
                </li>
              </ul>

              <h3 className="text-lg font-medium mt-6">Using the @saral/data-odk Package</h3>
              <p>Import and initialize the ODK client:</p>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code>{`import { ODKClient } from '@saral/data-odk';

const odkClient = new ODKClient({
  baseUrl: process.env.ODK_API_URL,
  apiKey: process.env.ODK_API_KEY,
  projectId: Number(process.env.ODK_PROJECT_ID)
});

// Fetch forms
const forms = await odkClient.getForms();

// Fetch submissions for a specific form
const submissions = await odkClient.getSubmissions('form-id');

// Normalize data for use in dashboards
const normalizedForms = odkClient.normalizeFormData(forms);
const normalizedSubmissions = odkClient.normalizeSubmissionData(submissions);`}</code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dashboards" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dashboards</CardTitle>
              <CardDescription>How to use and customize dashboards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-medium">Using Dashboard Components</h3>
              <p>Import and use the dashboard components:</p>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code>{`import { BarChart, LineChart, PieChart } from '@saral/dashboards';

// In your React component
return (
  <div className="dashboard-container">
    <BarChart 
      data={responsesByRegion} 
      xAxis="region" 
      yAxis="count" 
      title="Responses by Region" 
    />
    
    <LineChart 
      data={responsesOverTime} 
      xAxis="date" 
      yAxis="count" 
      title="Responses Over Time" 
    />
    
    <PieChart 
      data={responsesByForm} 
      nameKey="form" 
      valueKey="count" 
      title="Responses by Form" 
    />
  </div>
);`}</code>
              </pre>

              <h3 className="text-lg font-medium mt-6">Creating Custom Dashboards</h3>
              <p>Use the dashboard configuration utilities to create custom dashboards:</p>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code>{`import { 
  createDashboard, 
  addDashboardItem 
} from '@saral/dashboards';

// Create a new dashboard
const dashboard = createDashboard({
  id: 'health-survey-dashboard',
  title: 'Health Survey Dashboard',
  description: 'Dashboard for Health Survey data',
  layout: []
});

// Add items to the dashboard
const dashboardWithItems = addDashboardItem(dashboard, {
  id: 'responses-by-region',
  type: 'chart',
  title: 'Responses by Region',
  width: 2,
  height: 1,
  config: {
    type: 'bar',
    dataSource: '/api/visualize',
    xAxis: 'region',
    yAxis: 'count'
  }
});`}</code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="packages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>NPM Packages</CardTitle>
              <CardDescription>How to use and publish the @saral/* NPM packages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-medium">Package Structure</h3>
              <p>The Saral project includes two main NPM packages:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <code>@saral/data-odk</code>: For ODK integration
                </li>
                <li>
                  <code>@saral/dashboards</code>: For reusable dashboard components
                </li>
              </ul>

              <h3 className="text-lg font-medium mt-6">Publishing Packages</h3>
              <p>To publish the packages to NPM:</p>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code>{`# Navigate to the package directory
cd lib/saral-data-odk

# Update version in package.json
npm version patch

# Build the package
npm run build

# Publish to NPM
npm publish --access public`}</code>
              </pre>

              <h3 className="text-lg font-medium mt-6">Using Published Packages</h3>
              <p>To use the published packages in another project:</p>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code>{`# Install the packages
npm install @saral/data-odk @saral/dashboards

# Import and use in your code
import { ODKClient } from '@saral/data-odk';
import { BarChart, LineChart, PieChart } from '@saral/dashboards';`}</code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
