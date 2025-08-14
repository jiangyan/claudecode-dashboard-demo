
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
  ('agent_alpha', 'Scanning network perimeter...', 'running', 1755157658494),
  ('agent_bravo', 'Decrypting intercepted comms', 'running', 1755157643494),
  ('agent_charlie', 'Idle - awaiting orders', 'started', 1755157628494),
  ('agent_delta', 'Infiltrating target database', 'running', 1755157613494),
  ('agent_echo', 'Extracting payload from server', 'completed', 1755157598494),
  ('agent_foxtrot', 'Running vulnerability scan', 'running', 1755157583494),
  ('agent_golf', 'Monitoring suspicious traffic', 'completed', 1755157568494),
  ('agent_hotel', 'System maintenance check', 'completed', 1755157553494);
