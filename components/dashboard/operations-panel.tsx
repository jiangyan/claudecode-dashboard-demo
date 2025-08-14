"use client"

import { Card } from "@/components/ui/card"
import { Settings, Target, Shield, Clock, AlertTriangle, CheckCircle } from "lucide-react"

export function OperationsPanel() {
  return (
    <div className="h-full overflow-y-auto scrollbar-hide">
      <div className="grid grid-cols-3 gap-6">
        {/* Active Operations */}
        <Card className="bg-gray-900/50 border-gray-700 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-orange-500" />
            <h2 className="text-green-400 font-bold tracking-wider">ACTIVE OPERATIONS</h2>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-gray-800/30 rounded border-l-2 border-orange-500">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-mono text-orange-400">OPERATION PHOENIX</span>
                <span className="text-xs px-2 py-1 bg-green-900/50 text-green-400 rounded">ACTIVE</span>
              </div>
              <div className="text-xs text-gray-400">Location: Berlin • Agents: 3</div>
            </div>
            <div className="p-3 bg-gray-800/30 rounded border-l-2 border-yellow-500">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-mono text-yellow-400">OPERATION BLACKOUT</span>
                <span className="text-xs px-2 py-1 bg-yellow-900/50 text-yellow-400 rounded">PENDING</span>
              </div>
              <div className="text-xs text-gray-400">Location: Tokyo • Agents: 2</div>
            </div>
          </div>
        </Card>

        {/* Mission Stats */}
        <Card className="bg-gray-900/50 border-gray-700 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-green-400" />
            <h2 className="text-green-400 font-bold tracking-wider">MISSION STATS</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Success Rate</span>
              <span className="text-green-400 font-bold">87.3%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Active Missions</span>
              <span className="text-orange-400 font-bold">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Completed Today</span>
              <span className="text-yellow-400 font-bold">5</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Failed</span>
              <span className="text-red-400 font-bold">2</span>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-gray-900/50 border-gray-700 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-blue-400" />
            <h2 className="text-green-400 font-bold tracking-wider">RECENT ACTIVITY</h2>
          </div>
          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-3 h-3 text-green-400 mt-0.5" />
              <div>
                <div className="text-gray-300">Mission #847 completed</div>
                <div className="text-gray-500">2 minutes ago</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-3 h-3 text-yellow-400 mt-0.5" />
              <div>
                <div className="text-gray-300">Alert: Perimeter breach detected</div>
                <div className="text-gray-500">15 minutes ago</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-3 h-3 text-green-400 mt-0.5" />
              <div>
                <div className="text-gray-300">Asset extraction successful</div>
                <div className="text-gray-500">1 hour ago</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Command Structure */}
        <Card className="bg-gray-900/50 border-gray-700 p-6 col-span-3">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-5 h-5 text-gray-400" />
            <h2 className="text-green-400 font-bold tracking-wider">COMMAND STRUCTURE</h2>
          </div>
          <div className="text-center text-gray-500 py-12">
            <Settings className="w-16 h-16 mx-auto mb-4 text-gray-700" />
            <p className="text-lg mb-2">Operations Module Under Development</p>
            <p className="text-sm">Advanced mission planning and coordination features coming soon</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
