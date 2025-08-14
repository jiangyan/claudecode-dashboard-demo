"use client"

import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Agent } from "@/lib/types"

interface AgentAllocationProps {
  uniqueAgents: Agent[]
  totalAgents: number
  selectedAgent: string | null
  setSelectedAgent: (agent: string | null) => void
  isConnected: boolean
}

export function AgentAllocation({ 
  uniqueAgents, 
  totalAgents, 
  selectedAgent, 
  setSelectedAgent,
  isConnected 
}: AgentAllocationProps) {
  return (
    <Card className="bg-gray-900/50 border-gray-700 p-6 flex flex-col overflow-hidden">
      <h2 className="text-green-400 font-bold mb-4 tracking-wider">AGENT ALLOCATION</h2>

      <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-700">
        <div className="text-5xl font-bold text-green-400">{totalAgents}</div>
        <div className="text-lg text-gray-400 tracking-wider">AGENTS</div>
      </div>

      <ScrollArea className="flex-1 min-h-0 scrollbar-hide">
        <div className="space-y-3">
          {uniqueAgents.length > 0 ? (
            uniqueAgents.map((agent) => (
              <div 
                key={agent.name} 
                className={`flex items-start gap-3 p-3 bg-gray-800/30 rounded cursor-pointer transition-all hover:bg-gray-800/50 ${
                  selectedAgent === agent.name ? 'ring-2 ring-green-400/50 bg-gray-800/60' : ''
                }`}
                onClick={() => setSelectedAgent(agent.name === selectedAgent ? null : agent.name)}
              >
                <div
                  className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    agent.status === 'completed' ? "bg-yellow-500" : 
                    agent.status === 'started' ? "bg-blue-400" : 
                    "bg-green-400"
                  }`}
                ></div>
                <div className="flex-1 min-w-0">
                  <div className="text-green-400 font-bold text-sm uppercase">{agent.name}</div>
                  <div className={`text-xs px-1.5 py-0.5 rounded inline-block mt-1 ${
                    agent.status === 'running' ? 'bg-green-900/50 text-green-400' :
                    agent.status === 'completed' ? 'bg-yellow-900/50 text-yellow-400' :
                    'bg-blue-900/50 text-blue-400'
                  }`}>
                    {agent.status.toUpperCase()}
                  </div>
                  <div className="text-gray-400 text-xs truncate mt-1">{agent.job}</div>
                  <div className="text-gray-500 text-xs mt-1" suppressHydrationWarning>
                    {typeof window !== 'undefined' ? new Date(agent.time).toLocaleTimeString() : ''}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-8">
              {isConnected ? 'No agents found' : 'Connecting to server...'}
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  )
}
