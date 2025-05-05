/**
 * @saral/data-odk
 * A library for integrating with ODK Central API
 */

interface ODKConfig {
  baseUrl: string
  apiKey: string
  projectId?: number
}

interface ODKForm {
  id: string
  name: string
  title: string
  version: string
  state: string
  createdAt: string
}

interface ODKSubmission {
  instanceId: string
  submitterId: string
  submitterName?: string
  createdAt: string
  updatedAt: string
  formId: string
  data: Record<string, any>
}

export class ODKClient {
  private config: ODKConfig

  constructor(config: ODKConfig) {
    this.config = {
      projectId: 1,
      ...config,
    }
  }

  /**
   * Get all forms for the configured project
   */
  async getForms(): Promise<ODKForm[]> {
    const url = `${this.config.baseUrl}/v1/projects/${this.config.projectId}/forms`
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch forms: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Get a specific form by ID
   */
  async getForm(formId: string): Promise<ODKForm> {
    const url = `${this.config.baseUrl}/v1/projects/${this.config.projectId}/forms/${formId}`
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch form: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Get submissions for a specific form
   */
  async getSubmissions(formId: string): Promise<ODKSubmission[]> {
    const url = `${this.config.baseUrl}/v1/projects/${this.config.projectId}/forms/${formId}/submissions`
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch submissions: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Process and normalize form data
   */
  normalizeFormData(forms: ODKForm[]): Record<string, any>[] {
    return forms.map((form) => ({
      id: form.id,
      title: form.title || form.name,
      created: new Date(form.createdAt).toISOString().split("T")[0],
      status: form.state === "open" ? "active" : "inactive",
    }))
  }

  /**
   * Process and normalize submission data
   */
  normalizeSubmissionData(submissions: ODKSubmission[], formTitle?: string): Record<string, any>[] {
    return submissions.map((submission) => ({
      id: submission.instanceId,
      form: formTitle || submission.formId,
      submittedBy: submission.submitterName || `User ${submission.submitterId}`,
      submittedAt: new Date(submission.createdAt).toLocaleString(),
      status: this.determineSubmissionStatus(submission),
      data: submission.data,
    }))
  }

  /**
   * Determine submission status based on data
   */
  private determineSubmissionStatus(submission: ODKSubmission): string {
    // This is a simplified example - in a real implementation,
    // you would check for required fields or other validation
    return Object.keys(submission.data).length > 0 ? "complete" : "incomplete"
  }
}

export default ODKClient
