"use client"

import { useState, useEffect } from "react"
import { useWebSocket } from "@/hooks/use-websocket"
import { ActiveSection, Agent } from "@/lib/types"
import { Header } from "@/components/dashboard/header"
import { Sidebar } from "@/components/dashboard/sidebar"
import { AgentAllocation } from "@/components/dashboard/agent-allocation"
import { ActivityLog } from "@/components/dashboard/activity-log"
import { EncryptedChat } from "@/components/dashboard/encrypted-chat"
import { SystemsPanel } from "@/components/dashboard/systems-panel"
import { OperationsPanel } from "@/components/dashboard/operations-panel"
import { IntelligencePanel } from "@/components/dashboard/intelligence-panel"

export function ClaudeCodeDashboard() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [activeSection, setActiveSection] = useState<ActiveSection>("COMMAND")
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const { agents, isConnected } = useWebSocket()

  useEffect(() => {
    // Set initial time on client side only
    setCurrentTime(new Date())
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Get latest record for each unique agent
  const latestAgentRecords = agents.reduce((acc, agent) => {
    if (!acc[agent.name] || agent.time > acc[agent.name].time) {
      acc[agent.name] = agent
    }
    return acc
  }, {} as Record<string, Agent>)
  
  // Sort agents by time DESC (newest first)
  const uniqueAgents = Object.values(latestAgentRecords).sort((a, b) => b.time - a.time)
  const totalAgents = uniqueAgents.length
  
  // Get all records for selected agent, sorted DESC (newest first)
  const selectedAgentHistory = selectedAgent 
    ? agents.filter(a => a.name === selectedAgent).sort((a, b) => b.time - a.time)
    : []

  // Calculate system stats
  const earliestTime = agents.length > 0 ? Math.min(...agents.map(a => a.time)) : Date.now()
  const uptimeHours = Math.floor((Date.now() - earliestTime) / (1000 * 60 * 60))
  const uptimeMinutes = Math.floor(((Date.now() - earliestTime) % (1000 * 60 * 60)) / (1000 * 60))
  const runningCount = uniqueAgents.filter(a => a.status === 'running').length
  const totalMissions = agents.length

  return (
    <div className="h-screen bg-black text-green-400 overflow-hidden flex flex-col">
      <Header currentTime={currentTime} isConnected={isConnected} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          uptimeHours={uptimeHours}
          uptimeMinutes={uptimeMinutes}
          runningCount={runningCount}
          totalMissions={totalMissions}
        />

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-hidden">
          {activeSection === "COMMAND" && (
            <div className="grid grid-cols-3 gap-6 h-full">
              <AgentAllocation 
                uniqueAgents={uniqueAgents}
                totalAgents={totalAgents}
                selectedAgent={selectedAgent}
                setSelectedAgent={setSelectedAgent}
                isConnected={isConnected}
              />

              <ActivityLog 
                selectedAgent={selectedAgent}
                selectedAgentHistory={selectedAgentHistory}
              />

              <EncryptedChat currentTime={currentTime} />
            </div>
          )}

          {activeSection === "OPERATIONS" && <OperationsPanel />}

          {activeSection === "INTELLIGENCE" && <IntelligencePanel />}

          {activeSection === "SYSTEMS" && <SystemsPanel />}
        </div>
      </div>
    </div>
  )
}
