"use client"

import { Users, Settings, BarChart3, Monitor, MessageSquare } from "lucide-react"
import { ActiveSection } from "@/lib/types"

interface SidebarProps {
  activeSection: ActiveSection
  setActiveSection: (section: ActiveSection) => void
  uptimeHours: number
  uptimeMinutes: number
  runningCount: number
  totalMissions: number
}

export function Sidebar({ 
  activeSection, 
  setActiveSection, 
  uptimeHours, 
  uptimeMinutes,
  runningCount, 
  totalMissions 
}: SidebarProps) {
  return (
    <div className="w-64 bg-gray-900/30 border-r border-gray-800 overflow-y-auto">
      <div className="p-4">
        {/* Command Center */}
        <div className="mb-6">
          <div
            className="bg-orange-600 text-black px-4 py-2 rounded font-bold text-sm flex items-center gap-2 cursor-pointer"
            onClick={() => setActiveSection("COMMAND")}
          >
            <MessageSquare className="w-4 h-4" />
            AGENTS CENTER
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <div
            className="flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-green-400 cursor-pointer"
            onClick={() => setActiveSection("COMMAND")}
          >
            <Users className="w-4 h-4" />
            AGENT GRID
          </div>
          <div
            className="flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-green-400 cursor-pointer"
            onClick={() => setActiveSection("OPERATIONS")}
          >
            <Settings className="w-4 h-4" />
            OPERATIONS
          </div>
          <div
            className="flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-green-400 cursor-pointer"
            onClick={() => setActiveSection("INTELLIGENCE")}
          >
            <BarChart3 className="w-4 h-4" />
            INTELLIGENCE
          </div>
          <div
            className="flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-green-400 cursor-pointer"
            onClick={() => setActiveSection("SYSTEMS")}
          >
            <Monitor className="w-4 h-4" />
            SYSTEMS
          </div>
        </nav>

        {/* System Status */}
        <div className="mt-8 p-4 bg-gray-800/50 rounded">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-bold">SYSTEM ONLINE</span>
          </div>
          <div className="text-xs text-gray-400 space-y-1">
            <div>UPTIME: {uptimeHours}h {uptimeMinutes}m</div>
            <div>AGENTS: <span className="text-green-400">{runningCount} RUNNING</span></div>
            <div>MISSIONS: <span className="text-yellow-400">{totalMissions} ACCOMPLISHED</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
