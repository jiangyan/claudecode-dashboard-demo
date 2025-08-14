const { WebSocketServer } = require('ws')
const { exec } = require('child_process')
const path = require('path')
const os = require('os')

const dbPath = path.join(process.cwd(), 'agents.db')

// Create WebSocket server on port 8080 and bind to all interfaces for WSL compatibility
const wss = new WebSocketServer({ port: 8080, host: '0.0.0.0' })

// Log accessible addresses
const interfaces = os.networkInterfaces()
const addresses = new Set([
  'ws://localhost:8080',
  'ws://127.0.0.1:8080',
])
for (const key of Object.keys(interfaces)) {
  for (const net of interfaces[key] || []) {
    if (net.family === 'IPv4' && !net.internal) {
      addresses.add(`ws://${net.address}:8080`)
    }
  }
}
console.log('WebSocket server running on:')
for (const addr of addresses) console.log('  ', addr)

// Get all agents from database using sqlite3 CLI
function getAgents(callback) {
  exec(`sqlite3 ${dbPath} "SELECT * FROM agents ORDER BY time DESC;" --json`, (error, stdout, stderr) => {
    if (error) {
      console.error('Error reading database:', error)
      callback([])
      return
    }
    try {
      const agents = JSON.parse(stdout || '[]')
      callback(agents)
    } catch (e) {
      console.error('Error parsing database output:', e)
      callback([])
    }
  })
}

// Broadcast to all connected clients
function broadcast(data) {
  const message = JSON.stringify(data)
  wss.clients.forEach((client) => {
    if (client.readyState === 1) { // WebSocket.OPEN
      client.send(message)
    }
  })
}

// Watch for database changes (polling approach)
let lastData = ''
let isShuttingDown = false
const pollInterval = setInterval(() => {
  if (isShuttingDown) return
  
  getAgents((agents) => {
    const currentData = JSON.stringify(agents)
    if (currentData !== lastData) {
      lastData = currentData
      console.log('Database changed, broadcasting update...')
      broadcast({
        type: 'agents_update',
        data: agents
      })
    }
  })
}, 500) // Check every 500ms for more responsive updates

// Handle new connections
wss.on('connection', (ws) => {
  console.log('New client connected')
  
  // Send initial data
  getAgents((agents) => {
    ws.send(JSON.stringify({
      type: 'agents_update',
      data: agents
    }))
  })
  
  ws.on('close', () => {
    console.log('Client disconnected')
  })
  
  ws.on('error', (error) => {
    console.error('WebSocket error:', error)
  })
})

// Handle process termination - register only once
let shutdownInProgress = false
const shutdown = () => {
  if (shutdownInProgress) return
  shutdownInProgress = true
  
  console.log('\nShutting down WebSocket server...')
  isShuttingDown = true
  
  // Clear the polling interval
  clearInterval(pollInterval)
  
  // Close all WebSocket connections
  wss.clients.forEach((client) => {
    client.terminate()
  })
  
  // Close the server
  wss.close(() => {
    console.log('WebSocket server closed')
    process.exit(0)
  })
  
  // Force exit after 3 seconds if graceful shutdown fails
  setTimeout(() => {
    console.log('Forcing exit...')
    process.exit(0)
  }, 3000)
}

// Register shutdown handlers only once
process.once('SIGINT', shutdown)
process.once('SIGTERM', shutdown)
process.once('exit', () => {
  if (!shutdownInProgress) {
    isShuttingDown = true
    clearInterval(pollInterval)
  }
})

// Handle Windows-specific signals
if (process.platform === "win32") {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
  })
  
  readline.on("SIGINT", () => {
    process.emit("SIGINT")
  })
}

// Keep the process alive
process.stdin.resume()
