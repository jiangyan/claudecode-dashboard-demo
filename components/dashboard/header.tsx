"use client"

import Image from "next/image"
import { Bell, RotateCcw, Wifi, WifiOff } from "lucide-react"

interface HeaderProps {
  currentTime: Date | null
  isConnected: boolean
}

export function Header({ currentTime, isConnected }: HeaderProps) {
  const formatTime = (date: Date) => {
    return date.toISOString().replace("T", " ").slice(0, 19) + " UTC"
  }

  return (
    <div className="border-b border-gray-800 bg-gray-900/50 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Image 
              src="/claude-logo.png" 
              alt="Claude Logo" 
              width={32} 
              height={32}
              className="w-8 h-8"
            />
            <h1 className="text-xl font-bold tracking-wider font-mono" style={{ color: '#CD6B4F' }}>
              CLAUDE CODE DASHBOARD
            </h1>
          </div>
          <div className="text-gray-500 text-sm font-mono">v0.1 CLASSFIED</div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-orange-500 text-sm font-mono">MULTIPLE AGENTS / OVERVIEW</div>
          <div className="text-gray-400 text-sm font-mono">
            LAST UPDATE: {currentTime ? formatTime(currentTime) : 'LOADING...'}
          </div>
          <div className="flex items-center gap-1">
            {isConnected ? (
              <Wifi className="w-4 h-4 text-green-400" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-500" />
            )}
            <span className={`text-xs ${isConnected ? 'text-green-400' : 'text-red-500'}`}>
              {isConnected ? 'LIVE' : 'OFFLINE'}
            </span>
          </div>
          <Bell className="w-4 h-4 text-gray-400" />
          <RotateCcw className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>
  )
}
