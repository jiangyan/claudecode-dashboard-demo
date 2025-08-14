"use client"

import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Agent } from "@/lib/types"

interface ActivityLogProps {
  selectedAgent: string | null
  selectedAgentHistory: Agent[]
}

export function ActivityLog({ 
  selectedAgent, 
  selectedAgentHistory
}: ActivityLogProps) {
  return (
    <Card className="bg-gray-900/50 border-gray-700 p-6 flex flex-col overflow-hidden">
      <h2 className="text-green-400 font-bold mb-4 tracking-wider">
        ACTIVITY LOG
        {selectedAgent && (
          <span className="text-orange-400 text-sm ml-2">
            [{selectedAgent.toUpperCase()}]
          </span>
        )}
      </h2>

      <ScrollArea className="flex-1 min-h-0 scrollbar-hide">
        <div className="space-y-4">
          {selectedAgent ? (
            selectedAgentHistory.length > 0 ? (
              selectedAgentHistory.map((record, index) => (
                <div key={index} className="border-l-2 border-orange-500 pl-4">
                  <div className="text-orange-400 text-xs mb-1" suppressHydrationWarning>
                    {typeof window !== 'undefined' ? 
                      `${new Date(record.time).toLocaleDateString('en-GB', { 
                        day: '2-digit', 
                        month: '2-digit', 
                        year: 'numeric' 
                      }).replace(/\//g, '/')} ${new Date(record.time).toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit',
                        hour12: false 
                      })}` : ''
                    }
                  </div>
                  <div className="text-gray-300 text-sm leading-relaxed">
                    <span className="text-orange-400">Agent {record.name}</span> {record.job}{' '}
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      record.status === 'running' ? 'bg-green-900/50 text-green-400' :
                      record.status === 'completed' ? 'bg-yellow-900/50 text-yellow-400' :
                      'bg-blue-900/50 text-blue-400'
                    }`}>
                      {record.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                No history for {selectedAgent}
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <div className="text-6xl mb-4 opacity-20">📋</div>
              <div className="text-lg mb-2">No Activity Selected</div>
              <div className="text-sm">Click an agent to view their activity history</div>
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  )
}
