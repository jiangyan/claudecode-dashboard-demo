#!/bin/bash

# --- Config ---
SESSION="claude-demo"
WINDOW="Claude Code Demo"

# --- Args: exactly 6 ---
if [ "$#" -ne 6 ]; then
  echo "Usage: $0 cmd1 cmd2 cmd3 cmd4 cmd5 cmd6"
  exit 1
fi
cmd=("$@")

# Kill existing session (quietly)
tmux kill-session -t "$SESSION" 2>/dev/null

# Create a roomy detached session so splits won't fail
# Adjust -x/-y if you like; they’re the initial canvas size for a detached session.
tmux new-session -d -s "$SESSION" -n "$WINDOW" -x 200 -y 60 "${cmd[0]}; bash"

# Build top row: 3 columns
tmux split-window -h -t "$SESSION":0 "${cmd[1]}; bash"
tmux split-window -h -t "$SESSION":0 "${cmd[2]}; bash"
tmux select-layout -t "$SESSION":0 even-horizontal

# Split each column vertically to make bottom row
tmux split-window -v -t "$SESSION":0.0 -p 50 "${cmd[3]}; bash"
tmux split-window -v -t "$SESSION":0.1 -p 50 "${cmd[4]}; bash"
tmux split-window -v -t "$SESSION":0.2 -p 50 "${cmd[5]}; bash"

tmux select-layout -t "$SESSION":0 tiled

tmux attach -t "$SESSION"

