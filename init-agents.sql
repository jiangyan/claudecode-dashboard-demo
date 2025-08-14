
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
  ('agent_alpha', 'Scanning network perimeter...', 'running', 1755169755933),
  ('agent_bravo', 'Decrypting intercepted comms', 'running', 1755169740933),
  ('agent_charlie', 'Idle - awaiting orders', 'started', 1755169725933),
  ('agent_delta', 'Infiltrating target database', 'running', 1755169710933),
  ('agent_echo', 'Extracting payload from server', 'completed', 1755169695933),
  ('agent_foxtrot', 'Running vulnerability scan', 'running', 1755169680933),
  ('agent_golf', 'Monitoring suspicious traffic', 'completed', 1755169665933),
  ('agent_hotel', 'System maintenance check', 'completed', 1755169650933);
