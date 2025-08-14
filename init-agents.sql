
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
  ('agent_alpha', 'Scanning network perimeter...', 'running', 1755203541444),
  ('agent_bravo', 'Decrypting intercepted comms', 'running', 1755203526444),
  ('agent_charlie', 'Idle - awaiting orders', 'started', 1755203511444),
  ('agent_delta', 'Infiltrating target database', 'running', 1755203496444),
  ('agent_echo', 'Extracting payload from server', 'completed', 1755203481444),
  ('agent_foxtrot', 'Running vulnerability scan', 'running', 1755203466444),
  ('agent_golf', 'Monitoring suspicious traffic', 'completed', 1755203451444),
  ('agent_hotel', 'System maintenance check', 'completed', 1755203436444);
