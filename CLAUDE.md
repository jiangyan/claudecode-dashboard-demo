# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js-based tactical dashboard application with real-time WebSocket connectivity to display agent status information. The application uses:
- Next.js 15.2.4 with React 19
- TypeScript
- Tailwind CSS with custom shadcn/ui components
- SQLite database for agent data persistence
- WebSocket server for real-time updates

## Common Development Commands

```bash
# Install dependencies
npm install

# Run development server only
npm run dev

# Run full development (WebSocket server + Next.js)
npm run dev:full

# Initialize database with demo data
npm run db:init

# Run WebSocket server standalone
npm run ws:server

# Build for production
npm run build

# Run production build
npm run start

# Run linting
npm run lint
```

## Architecture Overview

### Frontend Structure
- **`app/`**: Next.js App Router pages and API routes
  - `page.tsx`: Main application entry point that renders ClaudeCodeDashboard
  - `api/system-info/`: System information API endpoint returning host, CPU, memory, network data
  - `layout.tsx`: Root layout with Inter and Fira Code fonts

- **`components/`**: React components
  - `claudecode-dashboard.tsx`: Main dashboard component managing WebSocket connection and agent state
  - `dashboard/`: Modular dashboard panels
    - `header.tsx`, `sidebar.tsx`: Navigation and layout
    - `agent-allocation.tsx`: Real-time agent status monitoring
    - `activity-log.tsx`: Agent activity history with filtering
    - `systems-panel.tsx`, `operations-panel.tsx`, `intelligence-panel.tsx`: Specialized monitoring panels
  - `ui/`: shadcn/ui components (extensive library with "new-york" style theme)

- **`hooks/`**: Custom React hooks
  - `use-websocket.ts`: WebSocket connection management with auto-reconnection (3-second retry)

### Backend Components
- **`server/websocket-simple.js`**: WebSocket server that polls SQLite database for agent updates and broadcasts changes to connected clients
  - Runs on port 8080, binds to 0.0.0.0 for WSL compatibility
  - Polls database every 500ms for changes
  - Broadcasts `agents_update` messages to all connected clients
  - Windows-specific process handling

- **`scripts/`**: Development utilities
  - `dev-with-ips.js`: Custom dev server displaying available network interfaces
  - `init-db-simple.js`: Database initialization script generator

- **`init-agents.sql`**: SQL script for database initialization with 8 demo agents

### Database
- **SQLite database** (`agents.db`): Stores agent information with schema:
  - `id`: Primary key
  - `name`: Agent identifier
  - `job`: Current task description
  - `status`: 'running', 'completed', or 'started'
  - `time`: Timestamp

## Key Technical Details

- WebSocket server runs on `ws://localhost:8080` and broadcasts agent updates every 500ms
- Frontend auto-reconnects to WebSocket if connection is lost (3-second retry interval)
- Database is initialized with demo data (8 cybersecurity-themed agents)
- TypeScript build errors and ESLint warnings are ignored in production builds (see next.config.mjs)
- CORS headers configured with `Access-Control-Allow-Origin: *` for development
- Data flow: SQLite → WebSocket Server → React Frontend
- Agent deduplication: Shows only latest record per unique agent name

## Development Workflow

1. Initialize database if needed: `npm run db:init`
2. Start the WebSocket server and Next.js dev server together: `npm run dev:full`
3. The WebSocket server monitors the SQLite database for changes
4. Frontend connects to WebSocket and displays real-time agent updates
5. System information is fetched via the `/api/system-info` endpoint

For standalone development:
- Frontend only: `npm run dev` (displays available network IPs)
- WebSocket only: `npm run ws:server`

## Configuration Details

- **Path Aliases**: `@/*` maps to project root (configured in tsconfig.json)
- **Package Manager**: Uses pnpm (pnpm-lock.yaml present)
- **Styling**: Tailwind CSS v4 with custom configuration
- **Theme**: Dark cybersecurity aesthetic with green accent colors (#00ff00)
- **Fonts**: Inter for UI, Fira Code for monospace elements