
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
  ('agent_alpha', 'Scanning network perimeter...', 'running', 1755162436677),
  ('agent_bravo', 'Decrypting intercepted comms', 'running', 1755162421677),
  ('agent_charlie', 'Idle - awaiting orders', 'started', 1755162406677),
  ('agent_delta', 'Infiltrating target database', 'running', 1755162391677),
  ('agent_echo', 'Extracting payload from server', 'completed', 1755162376677),
  ('agent_foxtrot', 'Running vulnerability scan', 'running', 1755162361677),
  ('agent_golf', 'Monitoring suspicious traffic', 'completed', 1755162346677),
  ('agent_hotel', 'System maintenance check', 'completed', 1755162331677);
