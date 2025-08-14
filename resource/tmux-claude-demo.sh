#!/bin/bash

tmux kill-session -t claude-demo 2>/dev/null

tmux new-session -d -s claude-demo -n 'Claude Code Demo'

tmux split-window -h -t claude-demo:0

tmux send-keys -t claude-demo:0.0 'claude yolo "update cc.html, change text to \"claude code is updating cc.html\""' C-m

sleep 0.5

tmux send-keys -t claude-demo:0.1 'claude yolo "update codex.html, change text to \"claude code is updating codex.html\""' C-m

tmux attach-session -t claude-demo
