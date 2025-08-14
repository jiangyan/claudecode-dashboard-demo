"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

interface EncryptedChatProps {
  currentTime: Date | null
}

const chatMessages = [
  "> [AGT:gh0stfire] ::: INIT >> *** loading secure channel",
  "> CH#2 | 1231.90B2464.500 ...x83",
  "> KEY LOCKED",
  '> MSG >> "...mission override initiated... awaiting delta node clearance"',
]

export function EncryptedChat({ currentTime }: EncryptedChatProps) {
  const [radarSpeed, setRadarSpeed] = useState([4])
  
  const formatTime = (date: Date) => {
    return date.toISOString().replace("T", " ").slice(0, 19) + " UTC"
  }

  return (
    <Card className="bg-gray-900/50 border-gray-700 p-6">
      <h2 className="text-green-400 font-bold mb-6 tracking-wider">ENCRYPTED CHAT ACTIVITY</h2>

      {/* Radar Circle */}
      <div className="flex justify-center mb-8">
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 border-2 border-green-400/30 rounded-full"></div>
          <div className="absolute inset-2 border border-green-400/20 rounded-full"></div>
          <div className="absolute inset-4 border border-green-400/10 rounded-full"></div>
          <div className="absolute top-1/2 left-0 right-0 h-px bg-green-400/20"></div>
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-green-400/20"></div>
          {/* Sweep line */}
          <div
            className="absolute top-1/2 left-1/2 w-16 h-px bg-green-400 origin-left transform -translate-y-px animate-spin"
            style={{ animationDuration: `${radarSpeed[0]}s` }}
          ></div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 mb-6"># {currentTime ? formatTime(currentTime) : 'LOADING...'}</div>

      {/* Speed Control */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400 font-mono">RADAR SPEED</span>
          <span className="text-xs text-green-400 font-mono">{radarSpeed[0].toFixed(1)}s</span>
        </div>
        <Slider
          value={radarSpeed}
          onValueChange={setRadarSpeed}
          min={0.5}
          max={8}
          step={0.1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Fast</span>
          <span>Slow</span>
        </div>
      </div>

      <div className="space-y-2 text-xs font-mono">
        {chatMessages.map((message, index) => (
          <div key={index} className="text-green-400">
            {message}
          </div>
        ))}
      </div>
    </Card>
  )
}
