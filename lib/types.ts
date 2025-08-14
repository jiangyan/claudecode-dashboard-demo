export interface Agent {
  id: number
  name: string
  job: string
  status: 'running' | 'completed' | 'started'
  time: number
}

export type ActiveSection = "COMMAND" | "OPERATIONS" | "INTELLIGENCE" | "SYSTEMS"
