"use client"

import { Card } from "@/components/ui/card"
import { Brain, Database, Globe, FileSearch, Lock, TrendingUp } from "lucide-react"

export function IntelligencePanel() {
  return (
    <div className="h-full overflow-y-auto scrollbar-hide">
      <div className="grid grid-cols-3 gap-6">
        {/* Threat Analysis */}
        <Card className="bg-gray-900/50 border-gray-700 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-purple-400" />
            <h2 className="text-green-400 font-bold tracking-wider">THREAT ANALYSIS</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Critical Threats</span>
              <span className="text-red-400 font-bold">3</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Medium Priority</span>
              <span className="text-yellow-400 font-bold">7</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Low Priority</span>
              <span className="text-green-400 font-bold">12</span>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="text-xs text-gray-500">Last Analysis: 5 min ago</div>
            </div>
          </div>
        </Card>

        {/* Data Sources */}
        <Card className="bg-gray-900/50 border-gray-700 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-5 h-5 text-blue-400" />
            <h2 className="text-green-400 font-bold tracking-wider">DATA SOURCES</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">SIGINT Network</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">HUMINT Reports</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span className="text-sm text-gray-300">OSINT Feeds</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">Satellite Imagery</span>
            </div>
          </div>
        </Card>

        {/* Global Intel */}
        <Card className="bg-gray-900/50 border-gray-700 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-cyan-400" />
            <h2 className="text-green-400 font-bold tracking-wider">GLOBAL INTEL</h2>
          </div>
          <div className="space-y-2 text-xs">
            <div className="p-2 bg-gray-800/30 rounded">
              <div className="text-cyan-400 font-mono mb-1">EUROPE</div>
              <div className="text-gray-400">Active surveillance: 14 targets</div>
            </div>
            <div className="p-2 bg-gray-800/30 rounded">
              <div className="text-cyan-400 font-mono mb-1">ASIA-PACIFIC</div>
              <div className="text-gray-400">Active surveillance: 9 targets</div>
            </div>
            <div className="p-2 bg-gray-800/30 rounded">
              <div className="text-cyan-400 font-mono mb-1">AMERICAS</div>
              <div className="text-gray-400">Active surveillance: 6 targets</div>
            </div>
          </div>
        </Card>

        {/* Intelligence Reports */}
        <Card className="bg-gray-900/50 border-gray-700 p-6 col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <FileSearch className="w-5 h-5 text-orange-400" />
            <h2 className="text-green-400 font-bold tracking-wider">RECENT REPORTS</h2>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-gray-800/30 rounded border-l-2 border-purple-500">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-mono text-purple-400">INT-2025-0847</span>
                <Lock className="w-3 h-3 text-red-400" />
              </div>
              <div className="text-xs text-gray-300 mb-1">Suspected cyber intrusion detected in sector 7</div>
              <div className="text-xs text-gray-500">Classification: TOP SECRET • 2 hours ago</div>
            </div>
            <div className="p-3 bg-gray-800/30 rounded border-l-2 border-cyan-500">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-mono text-cyan-400">INT-2025-0846</span>
                <Lock className="w-3 h-3 text-yellow-400" />
              </div>
              <div className="text-xs text-gray-300 mb-1">New communication patterns identified</div>
              <div className="text-xs text-gray-500">Classification: SECRET • 5 hours ago</div>
            </div>
          </div>
        </Card>

        {/* Analytics */}
        <Card className="bg-gray-900/50 border-gray-700 p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <h2 className="text-green-400 font-bold tracking-wider">ANALYTICS</h2>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-xs text-gray-400 mb-1">Pattern Recognition</div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-green-400 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Data Processing</div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-blue-400 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Threat Correlation</div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-purple-400 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Intelligence Module Status */}
        <Card className="bg-gray-900/50 border-gray-700 p-6 col-span-3">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-gray-400" />
            <h2 className="text-green-400 font-bold tracking-wider">INTELLIGENCE MODULE</h2>
          </div>
          <div className="text-center text-gray-500 py-12">
            <Brain className="w-16 h-16 mx-auto mb-4 text-gray-700" />
            <p className="text-lg mb-2">Intelligence Module Under Development</p>
            <p className="text-sm">Advanced analytics and threat detection features coming soon</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
