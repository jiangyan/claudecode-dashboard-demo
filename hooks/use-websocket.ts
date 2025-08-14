import { useEffect, useState, useRef } from 'react'

export interface Agent {
  id: number
  name: string
  job: string
  status: 'running' | 'completed' | 'started'
  time: number
}

export function useWebSocket() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const connect = () => {
      try {
        // Prefer explicit env override, then current origin host, then localhost
        const envWsUrl = (typeof process !== 'undefined' && (process as any).env?.NEXT_PUBLIC_WS_URL) as string | undefined
        let wsUrl: string
        if (envWsUrl) {
          wsUrl = envWsUrl
        } else if (typeof window !== 'undefined') {
          const host = window.location.hostname || 'localhost'
          wsUrl = `ws://${host}:8080`
        } else {
          wsUrl = 'ws://localhost:8080'
        }

        const ws = new WebSocket(wsUrl)
        wsRef.current = ws

        ws.onopen = () => {
          console.log('WebSocket connected')
          setIsConnected(true)
          // Clear any reconnect timeout
          if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current)
          }
        }

        ws.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data)
            if (message.type === 'agents_update') {
              setAgents(message.data)
            }
          } catch (error) {
            console.error('Failed to parse WebSocket message:', error)
          }
        }

        ws.onerror = (event) => {
          // Reduce noisy error objects; log concise info
          const url = (wsRef.current as any)?.url || 'unknown'
          console.error('WebSocket error on', url)
        }

        ws.onclose = () => {
          console.log('WebSocket disconnected')
          setIsConnected(false)
          wsRef.current = null
          
          // Attempt to reconnect after 3 seconds
          reconnectTimeoutRef.current = setTimeout(() => {
            console.log('Attempting to reconnect...')
            connect()
          }, 3000)
        }
      } catch (error) {
        console.error('Failed to connect WebSocket:', error)
        // Retry connection after 3 seconds
        reconnectTimeoutRef.current = setTimeout(connect, 3000)
      }
    }

    connect()

    // Cleanup on unmount
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [])

  return { agents, isConnected }
}
