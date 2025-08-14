#!/bin/bash
# Usage: ./tmux-grid.sh ROWSxCOLS "cmd1" "cmd2" ...

SESSION="claude-demo"
WINDOW="Dynamic Grid"

# --- Parse NxM pattern ---
if [[ ! $1 =~ ^[0-9]+x[0-9]+$ ]]; then
    echo "Usage: $0 ROWSxCOLS cmd1 cmd2 ..."
    exit 1
fi

ROWS=${1%x*}   # part before 'x'
COLS=${1#*x}   # part after 'x'
shift

TOTAL=$((ROWS * COLS))
if [ "$#" -ne "$TOTAL" ]; then
    echo "Error: Need exactly $TOTAL commands for a $ROWS x $COLS grid."
    exit 1
fi

# Kill old session quietly
tmux kill-session -t "$SESSION" 2>/dev/null

# --- Helper: run command with alias support ---
run_with_aliases() {
    local cmd="$1"
    bash -i -c "shopt -s expand_aliases; ${cmd} ; exec bash"
}

# Start first pane
tmux new-session -d -s "$SESSION" -n "$WINDOW" "$(declare -f run_with_aliases); run_with_aliases \"$1\""
shift

# Build first row horizontally
for ((c=1; c<COLS; c++)); do
    tmux split-window -h "$(declare -f run_with_aliases); run_with_aliases \"$1\""
    shift
done
tmux select-layout -t "$SESSION":0 even-horizontal

# Build remaining rows
for ((r=1; r<ROWS; r++)); do
    for ((c=0; c<COLS; c++)); do
        tmux select-pane -t "$SESSION":0.$c
        tmux split-window -v "$(declare -f run_with_aliases); run_with_aliases \"$1\""
        shift
    done
    tmux select-layout -t "$SESSION":0 tiled
done

# Attach to the session
tmux attach -t "$SESSION"

