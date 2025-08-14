#!/bin/bash
SESSION="claude-demo"

tmux kill-session -t "$SESSION" 2>/dev/null

tmux new-session -d -s "$SESSION" "bash -i -c crazy; bash"
sleep 0.2

tmux send-keys -t "$SESSION" "what's your model"
tmux send-keys -t "$SESSION" C-m

sleep 2

tmux send-keys -t "$SESSION" "show me a simple python hello world"
tmux send-keys -t "$SESSION" C-m

sleep 5

tmux send-keys -t "$SESSION" "show me a simple insertion sort in js"
tmux send-keys -t "$SESSION" C-m

tmux attach -t "$SESSION" 
