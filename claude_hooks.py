#!/usr/bin/env python3
"""
Claude Code Hooks Handler for SQLite Agent Monitoring
Updates agents.db with session events from Claude Code
"""

import sys
import json
import sqlite3
import time
import os
from pathlib import Path

DB_PATH = "agents.db"

def get_session_name(session_id, transcript_path=None):
    """
    Try to extract a meaningful session name from transcript or use session_id
    """
    if transcript_path and os.path.exists(transcript_path):
        try:
            with open(transcript_path, 'r', encoding='utf-8') as f:
                first_line = f.readline()
                if first_line:
                    data = json.loads(first_line)
                    if 'summary' in data and 'title' in data['summary']:
                        return data['summary']['title']
        except:
            pass
    
    # Fallback to shortened session_id for readability
    return f"session_{session_id[:8]}"

def update_agent_db(name, job, status):
    """
    Insert or update agent record in SQLite database
    """
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        # Ensure table exists
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS agents (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                job TEXT NOT NULL,
                status TEXT NOT NULL CHECK(status IN ('running', 'completed', 'started')),
                time INTEGER NOT NULL
            )
        ''')
        
        # Insert new record (time in milliseconds for JavaScript Date compatibility)
        cursor.execute(
            "INSERT INTO agents (name, job, status, time) VALUES (?, ?, ?, ?)",
            (name, job, status, int(time.time() * 1000))
        )
        
        conn.commit()
        conn.close()
        
        # Log success to stderr (won't interfere with hook output)
        print(f"✓ Updated agents.db: {name} - {status} - {job}", file=sys.stderr)
        
    except Exception as e:
        print(f"Error updating database: {e}", file=sys.stderr)
        sys.exit(1)

def handle_session_start(hook_data):
    """
    Handle SessionStart hook event
    """
    session_id = hook_data.get('session_id', 'unknown')
    transcript_path = hook_data.get('transcript_path')
    
    name = get_session_name(session_id, transcript_path)
    job = f"{name} is started"
    status = "started"
    
    update_agent_db(name, job, status)

def handle_stop(hook_data):
    """
    Handle Stop hook event (session end)
    """
    session_id = hook_data.get('session_id', 'unknown')
    transcript_path = hook_data.get('transcript_path')
    
    name = get_session_name(session_id, transcript_path)
    job = f"{name} response completed"
    status = "completed"
    
    update_agent_db(name, job, status)

def handle_user_prompt_submit(hook_data):
    """
    Handle UserPromptSubmit hook event
    """
    session_id = hook_data.get('session_id', 'unknown')
    transcript_path = hook_data.get('transcript_path')
    user_input = hook_data.get('prompt', '')  # Changed from 'user_input' to 'prompt'
    
    name = get_session_name(session_id, transcript_path)
    
    # Truncate job text if too long (first 100 chars of user input)
    job = user_input[:100] if user_input else f"{name} processing prompt"
    if len(user_input) > 100:
        job += "..."
    
    status = "running"
    
    update_agent_db(name, job, status)

def main():
    """
    Main entry point for hook handler
    """
    # Read JSON input from stdin
    try:
        input_data = sys.stdin.read()
        hook_data = json.loads(input_data)
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON input: {e}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"Error reading input: {e}", file=sys.stderr)
        sys.exit(1)
    
    # Determine hook event type
    hook_event = hook_data.get('hook_event_name', '')
    
    # Route to appropriate handler
    if hook_event == 'SessionStart':
        handle_session_start(hook_data)
    elif hook_event == 'Stop':
        handle_stop(hook_data)
    elif hook_event == 'UserPromptSubmit':
        handle_user_prompt_submit(hook_data)
    else:
        print(f"Unhandled hook event: {hook_event}", file=sys.stderr)
    
    # Echo input back (required for hooks to not block)
    print(input_data)

if __name__ == "__main__":
    main()