// Simple database initialization script that creates SQL file
const fs = require('fs')
const path = require('path')

const sqlScript = `
-- Drop existing table if exists
DROP TABLE IF EXISTS agents;

-- Create new table with updated schema
CREATE TABLE agents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  job TEXT NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('running', 'completed', 'started')),
  time INTEGER NOT NULL
);

-- Insert demo data
INSERT INTO agents (name, job, status, time) VALUES 
  ('agent_alpha', 'Scanning network perimeter...', 'running', ${Date.now() - 15000}),
  ('agent_bravo', 'Decrypting intercepted comms', 'running', ${Date.now() - 30000}),
  ('agent_charlie', 'Idle - awaiting orders', 'started', ${Date.now() - 45000}),
  ('agent_delta', 'Infiltrating target database', 'running', ${Date.now() - 60000}),
  ('agent_echo', 'Extracting payload from server', 'completed', ${Date.now() - 75000}),
  ('agent_foxtrot', 'Running vulnerability scan', 'running', ${Date.now() - 90000}),
  ('agent_golf', 'Monitoring suspicious traffic', 'completed', ${Date.now() - 105000}),
  ('agent_hotel', 'System maintenance check', 'completed', ${Date.now() - 120000});
`

// Write SQL script to file
const sqlPath = path.join(process.cwd(), 'init-agents.sql')
fs.writeFileSync(sqlPath, sqlScript)

console.log('SQL script created: init-agents.sql')
console.log('\nTo initialize the database, run:')
console.log('sqlite3 agents.db < init-agents.sql\n')

