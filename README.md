# Claude Code Dashboard

A real-time tactical operations dashboard built with Next.js, featuring live agent monitoring, system status tracking, and WebSocket-powered updates.

![Dashboard](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![SQLite](https://img.shields.io/badge/SQLite-3-green?logo=sqlite)
![WebSocket](https://img.shields.io/badge/WebSocket-Live-orange)

## 🚀 Quick Start

### One-Command Launch

#### Windows (Windows Terminal)
```batch
run.bat
```

#### Linux/macOS/WSL (tmux)
```bash
./run.sh
```

Both scripts open three panes:
1. Next.js development server (with network IPs display)
2. SQLite database initialization
3. WebSocket server for real-time updates

### Manual Setup
```bash
# Install dependencies
pnpm install

# Initialize database
pnpm db:init

# Start WebSocket server (in one terminal)
pnpm ws:server

# Start Next.js dev server (in another terminal)
pnpm dev
```

The dev server will display all accessible network addresses (useful for WSL/remote access):
```
📡 Server will be available at:
   http://localhost:3000
   http://172.22.96.81:3000  # WSL IP
   http://192.168.1.x:3000   # LAN IP
```

## 📁 Project Structure

```
tactical-dashboard/
├── app/                           # Next.js app directory
│   ├── api/                      # API routes
│   │   └── system-info/          # System information endpoint
│   ├── layout.tsx                # Root layout with fonts
│   ├── page.tsx                  # Main page (renders dashboard)
│   └── globals.css               # Global styles
│
├── components/                    # React components
│   ├── claudecode-dashboard.tsx  # Main dashboard orchestrator
│   ├── dashboard/                # Dashboard modules
│   │   ├── header.tsx           # Title, logo, connection status
│   │   ├── sidebar.tsx          # Navigation & system stats
│   │   ├── agent-allocation.tsx # Agent list & selection
│   │   ├── activity-log.tsx     # Agent activity history
│   │   ├── encrypted-chat.tsx   # Chat activity feed
│   │   ├── systems-panel.tsx    # Detailed system info
│   │   ├── operations-panel.tsx # Operations view (TBD)
│   │   └── intelligence-panel.tsx # Intelligence view (TBD)
│   └── ui/                      # shadcn/ui components
│
├── server/                       # Backend services
│   └── websocket-simple.js      # WebSocket server (port 8080)
│
├── scripts/                      # Utility scripts
│   ├── init-db-simple.js        # Generates SQL initialization
│   └── dev-with-ips.js          # Dev server with network IPs display
│
├── hooks/                        # React hooks
│   └── use-websocket.ts         # WebSocket connection hook
│
├── lib/                         # Shared utilities
│   ├── utils.ts                 # Helper functions
│   └── types.ts                 # TypeScript interfaces
│
├── public/                      # Static assets
│   └── claude-logo.png         # Claude logo
│
├── agents.db                    # SQLite database (generated)
├── init-agents.sql              # Database schema & seed data
├── run.bat                      # Windows quick-start script
└── run.sh                       # Linux/macOS/WSL quick-start script
```

## 🗄️ Database Schema

The SQLite database (`agents.db`) stores agent activity:

```sql
CREATE TABLE agents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,           -- Agent identifier
  job TEXT NOT NULL,            -- Current task description
  status TEXT NOT NULL,         -- 'running', 'completed', or 'started'
  time INTEGER NOT NULL         -- Unix timestamp (milliseconds)
)
```

### Auto-correction Trigger
A database trigger automatically converts timestamps from seconds to milliseconds if needed:
```sql
CREATE TRIGGER fix_timestamp_on_insert
AFTER INSERT ON agents
FOR EACH ROW
WHEN NEW.time < 100000000000
BEGIN
  UPDATE agents SET time = time * 1000 WHERE id = NEW.id;
END;
```

## 🔄 Real-time Architecture

```
┌─────────────┐     WebSocket      ┌──────────────┐     HTTP      ┌─────────────┐
│   SQLite    │ ◄──────────────────►│  WebSocket   │◄─────────────►│   Next.js   │
│  Database   │     Port 8080       │    Server    │               │  Dashboard  │
└─────────────┘                     └──────────────┘               └─────────────┘
     ▲                                                                     │
     │                                                                     │
     └─────────────────── sqlite3 CLI queries ────────────────────────────┘
```

### Data Flow
1. **Database Changes**: Agent records are added/updated in SQLite
2. **Polling**: WebSocket server polls database every 500ms via `sqlite3` CLI
3. **Broadcasting**: Changes are broadcast to all connected clients
4. **UI Updates**: Dashboard receives updates and re-renders in real-time

## 🎨 Features

### Command Center View
- **Agent Allocation**: Live agent status with clickable history
- **Activity Log**: Filtered activity based on selected agent
- **Encrypted Chat**: Simulated secure communications feed

### System Monitoring
- **Uptime Tracking**: Time since first agent record
- **Active Agents**: Count of agents with "running" status
- **Mission Counter**: Total database records
- **Connection Status**: WebSocket connection indicator

### System Information Panel
Displays detailed host information:
- OS details and architecture
- Memory usage statistics
- CPU information
- Network interfaces
- Node.js process details
- Environment variables

## 🛠️ Development

### Available Scripts

```bash
# Development
pnpm dev          # Start Next.js dev server
pnpm ws:server    # Start WebSocket server
pnpm db:init      # Initialize database

# Build
pnpm build        # Build for production
pnpm start        # Start production server

# Utilities
pnpm lint         # Run ESLint
pnpm type-check   # TypeScript type checking
```

### Adding New Agents

Insert records directly into the database:
```sql
sqlite3 agents.db "INSERT INTO agents (name, job, status, time) 
VALUES ('agent_newbie', 'Learning the ropes', 'started', strftime('%s', 'now') * 1000)"
```

### Modifying the Dashboard

1. **Add new panels**: Create components in `components/dashboard/`
2. **Add navigation**: Update `Sidebar` component with new sections
3. **Add data sources**: Extend `useWebSocket` hook or create new API routes

## 🔧 Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: SQLite 3
- **Real-time**: WebSocket (ws library)
- **Fonts**: Inter (sans), Fira Code (mono)
- **Icons**: Lucide React

## 📝 Notes

### Cross-Platform Support
- **Windows**: `run.bat` for Windows Terminal integration
- **Linux/macOS/WSL**: `run.sh` for tmux session management
- **WSL Networking**: Automatic binding to `0.0.0.0` for network access
- **CORS**: Configured to allow connections from any origin in development

### Implementation Details
- Uses `sqlite3` CLI to avoid native module compilation issues
- WebSocket server binds to `0.0.0.0:8080` for network accessibility
- Next.js dev server displays all available network IPs on startup
- Graceful shutdown handling for both Windows and Unix signals

### Performance Considerations
- 500ms polling interval for responsive updates
- Scrollbar hiding while maintaining scroll functionality
- Client-side time rendering to prevent hydration errors
- Efficient deduplication of agent records in UI

## 🚨 Troubleshooting

### WebSocket Connection Issues
- Ensure port 8080 is not in use
- Check firewall settings for local connections
- Verify `pnpm ws:server` is running
- For WSL: WebSocket server automatically binds to all interfaces

### Database Issues
- Run `pnpm db:init` to reset database
- Check file permissions on `agents.db`
- Ensure `sqlite3` is in system PATH

### Build Errors
- Clear node_modules: 
  - Windows: `del /Q node_modules & pnpm install`
  - Linux/macOS: `rm -rf node_modules && pnpm install`
- Update dependencies: `pnpm update`
- Check Node.js version (18+ required)

### WSL/Network Access Issues
- Next.js dev server shows all available IPs on startup
- Access the dashboard from any displayed IP address
- CORS is pre-configured to allow all origins in development

## 📄 License

MIT License

See the LICENSE file for details.

---

Built with ❤️ using Claude AI assistance