import os from "os"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const cpuInfo = os.cpus().map((cpu) => ({
      model: cpu.model,
      speedMHz: cpu.speed,
    }))

    const networkInterfaces = os.networkInterfaces()
    const network = Object.fromEntries(
      Object.entries(networkInterfaces).map(([name, addrs]) => [
        name,
        (addrs || []).map((a) => ({
          address: a.address,
          family: a.family,
          mac: a.mac,
          internal: a.internal,
          netmask: a.netmask,
          cidr: a.cidr,
          scopeid: (a as any).scopeid,
        })),
      ])
    )

    const data = {
      timestamp: new Date().toISOString(),
      host: {
        hostname: os.hostname(),
        platform: os.platform(),
        type: os.type(),
        release: os.release(),
        arch: os.arch(),
        uptimeSeconds: os.uptime(),
        user: (() => {
          try {
            const u = os.userInfo()
            return {
              username: u.username,
              homedir: u.homedir,
              shell: (u as any).shell,
            }
          } catch {
            return undefined
          }
        })(),
      },
      cpu: {
        count: cpuInfo.length,
        details: cpuInfo,
        loadAverage: os.loadavg(),
      },
      memory: {
        totalBytes: os.totalmem(),
        freeBytes: os.freemem(),
      },
      network,
      node: {
        version: process.version,
        versions: process.versions,
        pid: process.pid,
        platform: process.platform,
        arch: process.arch,
        cwd: process.cwd(),
        uptimeSeconds: process.uptime(),
        memoryUsage: process.memoryUsage(),
      },
      envSummary: {
        // Only safe, non-secret indicative vars
        NODE_ENV: process.env.NODE_ENV,
        TERM: process.env.TERM,
        SHELL: process.env.SHELL,
        COMSPEC: process.env.COMSPEC,
        USERPROFILE: process.env.USERPROFILE,
        HOME: process.env.HOME,
        PNPM_HOME: process.env.PNPM_HOME,
        PATH_SAMPLE: (process.env.PATH || "").split(os.platform() === "win32" ? ";" : ":").slice(0, 5),
      },
    }

    return NextResponse.json(data, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Unknown error" }, { status: 500 })
  }
}


