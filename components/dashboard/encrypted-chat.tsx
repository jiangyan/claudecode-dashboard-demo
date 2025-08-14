"use client"

import { Card } from "@/components/ui/card"

const chatMessages = [
  "> [AGT:gh0stfire] ::: INIT >> *** loading secure channel",
  "> CH#2 | 1231.90B2464.500 ...x83",
  "> KEY LOCKED",
  '> MSG >> "...mission override initiated... awaiting delta node clearance"',
]

export function EncryptedChat() {
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
            style={{ animationDuration: "4s" }}
          ></div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 mb-6"># 2025-06-17 14:23 UTC</div>

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
