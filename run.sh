#!/usr/bin/env bash
set -euo pipefail

# Config
SESSION="${SESSION:-agents}"   # override with: SESSION=name ./tmux_agents.sh
USE_SCRIPT_DIR="${USE_SCRIPT_DIR:-0}"  # set to 1 to run in the script's folder

# Working directory
if [ "$USE_SCRIPT_DIR" = "1" ]; then
  WD="$(cd "$(dirname "$0")" && pwd -P)"
else
  WD="$PWD"
fi

# If session exists, make a unique one
if tmux has-session -t "$SESSION" 2>/dev/null; then
  SESSION="${SESSION}-$(date +%H%M%S)"
fi

# Create session detached in WD
tmux new-session -d -s "$SESSION" -c "$WD"
tmux rename-window -t "$SESSION":0 agents

# Left pane: pnpm dev
tmux send-keys -t "$SESSION":0 'pnpm dev' C-m

# Right top: database initialization
tmux split-window -h -t "$SESSION":0 -c "$WD"
tmux send-keys  -t "$SESSION":0.1 'pnpm db:init' C-m

# Right bottom: pnpm ws:server
tmux split-window -v -t "$SESSION":0.1 -c "$WD"
tmux send-keys  -t "$SESSION":0.2 'pnpm ws:server' C-m

# Layout: big left, stacked right
tmux select-pane   -t "$SESSION":0.0
tmux select-layout -t "$SESSION":0 main-vertical

# Attach or switch
if [ -n "${TMUX:-}" ]; then
  tmux switch-client -t "$SESSION"
else
  tmux attach -t "$SESSION"
fi
