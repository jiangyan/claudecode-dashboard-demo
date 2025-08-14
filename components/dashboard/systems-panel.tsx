"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"

function formatBytes(bytes: number) {
  if (!bytes && bytes !== 0) return ""
  const units = ["B", "KB", "MB", "GB", "TB"]
  let value = bytes
  let idx = 0
  while (value >= 1024 && idx < units.length - 1) {
    value = value / 1024
    idx++
  }
  return `${value.toFixed(2)} ${units[idx]}`
}

export function SystemsPanel() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    let isMounted = true
    ;(async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/system-info", { cache: "no-store" })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        if (isMounted) setData(json)
      } catch (e: any) {
        if (isMounted) setError(e?.message || "Failed to load")
      } finally {
        if (isMounted) setLoading(false)
      }
    })()
    return () => {
      isMounted = false
    }
  }, [])

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-gray-400">Loading system information...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-red-400">{error}</div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto scrollbar-hide">
      <div className="grid grid-cols-3 gap-6">
        <Card className="bg-gray-900/50 border-gray-700 p-6 col-span-2">
          <h2 className="text-green-400 font-bold mb-4 tracking-wider font-mono">HOST</h2>
          <div className="text-xs text-gray-300 grid grid-cols-2 gap-3 font-mono">
            <div><span className="text-gray-500">Hostname:</span> {data?.host?.hostname}</div>
            <div><span className="text-gray-500">Platform:</span> {data?.host?.platform} ({data?.host?.type})</div>
            <div><span className="text-gray-500">Release:</span> {data?.host?.release}</div>
            <div><span className="text-gray-500">Arch:</span> {data?.host?.arch}</div>
            <div><span className="text-gray-500">Uptime:</span> {Math.floor((data?.host?.uptimeSeconds || 0) / 3600)}h</div>
            <div><span className="text-gray-500">User:</span> {data?.host?.user?.username}</div>
            <div className="col-span-2"><span className="text-gray-500">Home:</span> {data?.host?.user?.homedir}</div>
          </div>
        </Card>

        <Card className="bg-gray-900/50 border-gray-700 p-6">
          <h2 className="text-green-400 font-bold mb-4 tracking-wider font-mono">MEMORY</h2>
          <div className="text-xs text-gray-300 space-y-2 font-mono">
            <div>Total: {formatBytes(data?.memory?.totalBytes)}</div>
            <div>Free: {formatBytes(data?.memory?.freeBytes)}</div>
            <div>Used: {formatBytes((data?.memory?.totalBytes || 0) - (data?.memory?.freeBytes || 0))}</div>
          </div>
        </Card>

        <Card className="bg-gray-900/50 border-gray-700 p-6 col-span-3">
          <h2 className="text-green-400 font-bold mb-4 tracking-wider font-mono">CPU</h2>
          <div className="text-xs text-gray-300 space-y-2 font-mono">
            <div>Count: {data?.cpu?.count}</div>
            <div>Load Avg: {Array.isArray(data?.cpu?.loadAverage) ? data.cpu.loadAverage.join(" | ") : "N/A"}</div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {data?.cpu?.details?.map((c: any, idx: number) => (
                <div key={idx} className="p-2 bg-gray-800/40 rounded">
                  <div className="text-gray-400">CPU {idx}</div>
                  <div>{c.model}</div>
                  <div>{c.speedMHz} MHz</div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="bg-gray-900/50 border-gray-700 p-6 col-span-3">
          <h2 className="text-green-400 font-bold mb-4 tracking-wider font-mono">NETWORK</h2>
          <div className="text-xs text-gray-300 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 font-mono">
            {Object.entries(data?.network || {}).map(([name, addrs]: any) => (
              <div key={name} className="p-3 bg-gray-800/40 rounded">
                <div className="text-orange-400 mb-2">{name}</div>
                <div className="space-y-1">
                  {(addrs || []).map((a: any, i: number) => (
                    <div key={i} className="text-gray-400">
                      {a.family} {a.address} / {a.netmask} {a.internal ? "(internal)" : ""}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-gray-900/50 border-gray-700 p-6 col-span-3">
          <h2 className="text-green-400 font-bold mb-4 tracking-wider font-mono">NODE PROCESS</h2>
          <div className="text-xs text-gray-300 grid grid-cols-2 gap-3 font-mono">
            <div><span className="text-gray-500">Node:</span> {data?.node?.version}</div>
            <div><span className="text-gray-500">PID:</span> {data?.node?.pid}</div>
            <div><span className="text-gray-500">Platform:</span> {data?.node?.platform} ({data?.node?.arch})</div>
            <div><span className="text-gray-500">Uptime:</span> {Math.floor((data?.node?.uptimeSeconds || 0) / 3600)}h</div>
            <div className="col-span-2"><span className="text-gray-500">CWD:</span> {data?.node?.cwd}</div>
            <div className="col-span-2"><span className="text-gray-500">Memory:</span> RSS {formatBytes(data?.node?.memoryUsage?.rss || 0)} | Heap
              {" "}{formatBytes(data?.node?.memoryUsage?.heapUsed || 0)} / {formatBytes(data?.node?.memoryUsage?.heapTotal || 0)}</div>
          </div>
        </Card>

        <Card className="bg-gray-900/50 border-gray-700 p-6 col-span-3">
          <h2 className="text-green-400 font-bold mb-4 tracking-wider font-mono">ENVIRONMENT (SAFE SUMMARY)</h2>
          <div className="text-xs text-gray-300 space-y-1 font-mono">
            <div>NODE_ENV: {data?.envSummary?.NODE_ENV || ""}</div>
            <div>TERM: {data?.envSummary?.TERM || ""}</div>
            <div>SHELL/COMSPEC: {data?.envSummary?.SHELL || data?.envSummary?.COMSPEC || ""}</div>
            <div>HOME/USERPROFILE: {data?.envSummary?.HOME || data?.envSummary?.USERPROFILE || ""}</div>
            <div>PNPM_HOME: {data?.envSummary?.PNPM_HOME || ""}</div>
            <div>PATH SAMPLE:</div>
            <div className="text-gray-500">
              {(data?.envSummary?.PATH_SAMPLE || []).map((p: string, i: number) => (
                <div key={i}>{p}</div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
