const { spawn } = require('child_process')
const os = require('os')

// Print network addresses
console.log('\n📡 Server will be available at:')
console.log('   http://localhost:3000')

const interfaces = os.networkInterfaces()
for (const name of Object.keys(interfaces)) {
  for (const net of interfaces[name] || []) {
    if (net.family === 'IPv4' && !net.internal) {
      console.log(`   http://${net.address}:3000`)
    }
  }
}
console.log('')

// Start Next.js dev server
const next = spawn('next', ['dev', '--hostname', '0.0.0.0'], {
  stdio: 'inherit',
  shell: true
})

next.on('exit', (code) => {
  process.exit(code)
})
