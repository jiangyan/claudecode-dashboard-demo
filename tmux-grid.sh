#!/bin/bash
# Usage: ./tmux-simple.sh ROWSxCOLS "cmd1" "cmd2" ...
# Example: ./tmux-simple.sh 2x1 'crazy "hi"' 'crazy "test"'

# Generate unique session name
if command -v uuidgen &> /dev/null; then
    SESSION="claude-$(uuidgen | cut -c1-8)"  # Short UUID
else
    SESSION="claude-$(date +%s)-$$"  # Fallback: timestamp + PID
fi

WINDOW="Grid"

# Parse grid dimensions
if [[ ! $1 =~ ^[0-9]+x[0-9]+$ ]]; then
    echo "Usage: $0 ROWSxCOLS cmd1 cmd2 ..."
    echo "Example: $0 2x1 'crazy \"hi\"' 'crazy \"test\"'"
    exit 1
fi

ROWS=${1%x*}
COLS=${1#*x}
shift

TOTAL=$((ROWS * COLS))
if [ "$#" -ne "$TOTAL" ]; then
    echo "Error: Need exactly $TOTAL commands for a $ROWS x $COLS grid."
    exit 1
fi

echo "Creating tmux session: $SESSION"

# Store commands
COMMANDS=("$@")

# Create temporary script files for each command
TEMP_DIR=$(mktemp -d)
trap "rm -rf $TEMP_DIR" EXIT

for i in "${!COMMANDS[@]}"; do
    cat > "$TEMP_DIR/cmd_$i.sh" << 'SCRIPT_HEADER'
#!/bin/bash -i
# Use interactive bash to ensure aliases work
shopt -s expand_aliases

# Source the necessary files for aliases
[ -f ~/.bashrc ] && source ~/.bashrc
[ -f ~/.bash_aliases ] && source ~/.bash_aliases
[ -f ~/.profile ] && source ~/.profile

# If crazy alias still doesn't exist, try to define it
if ! alias crazy &>/dev/null; then
    # Try to find claude-code in common locations
    if command -v claude-code &>/dev/null; then
        alias crazy='claude-code'
    elif [ -x /usr/local/bin/claude-code ]; then
        alias crazy='/usr/local/bin/claude-code'
    elif [ -x ~/bin/claude-code ]; then
        alias crazy='~/bin/claude-code'
    elif [ -x ~/.local/bin/claude-code ]; then
        alias crazy='~/.local/bin/claude-code'
    fi
fi

# Debug: Show if alias is defined
alias crazy &>/dev/null && echo "Alias 'crazy' is defined" || echo "Warning: 'crazy' alias not found, trying direct command"

SCRIPT_HEADER
    
    # Add the actual command
    echo "# Execute the command" >> "$TEMP_DIR/cmd_$i.sh"
    
    # Check if command starts with 'crazy' and try to expand it
    cmd="${COMMANDS[$i]}"
    if [[ "$cmd" == crazy* ]]; then
        # Try to use the alias or fall back to claude-code
        echo "if alias crazy &>/dev/null; then" >> "$TEMP_DIR/cmd_$i.sh"
        echo "    $cmd" >> "$TEMP_DIR/cmd_$i.sh"
        echo "elif command -v claude-code &>/dev/null; then" >> "$TEMP_DIR/cmd_$i.sh"
        echo "    ${cmd/crazy/claude-code}" >> "$TEMP_DIR/cmd_$i.sh"
        echo "else" >> "$TEMP_DIR/cmd_$i.sh"
        echo "    echo 'Error: Neither crazy alias nor claude-code command found!'" >> "$TEMP_DIR/cmd_$i.sh"
        echo "    echo 'Please ensure claude-code is installed and in your PATH'" >> "$TEMP_DIR/cmd_$i.sh"
        echo "fi" >> "$TEMP_DIR/cmd_$i.sh"
    else
        echo "$cmd" >> "$TEMP_DIR/cmd_$i.sh"
    fi
    
    echo "exec bash" >> "$TEMP_DIR/cmd_$i.sh"
    chmod +x "$TEMP_DIR/cmd_$i.sh"
done

# Create first pane
tmux new-session -d -s "$SESSION" -n "$WINDOW" "bash -i $TEMP_DIR/cmd_0.sh"

cmd_index=1

# Build first row
for ((c=1; c<COLS && cmd_index<${#COMMANDS[@]}; c++)); do
    tmux split-window -h -t "$SESSION:$WINDOW" "bash -i $TEMP_DIR/cmd_$cmd_index.sh"
    ((cmd_index++))
done

tmux select-layout -t "$SESSION:$WINDOW" even-horizontal

# Build remaining rows
for ((r=1; r<ROWS; r++)); do
    for ((c=0; c<COLS && cmd_index<${#COMMANDS[@]}; c++)); do
        tmux select-pane -t "$SESSION:$WINDOW.$c"
        tmux split-window -v -t "$SESSION:$WINDOW" "bash -i $TEMP_DIR/cmd_$cmd_index.sh"
        ((cmd_index++))
    done
    tmux select-layout -t "$SESSION:$WINDOW" tiled
done

# Show all active tmux sessions
echo "Active tmux sessions:"
tmux list-sessions 2>/dev/null || echo "  (none)"

# Attach to session
echo "Attaching to session: $SESSION"
echo "Tip: Use 'tmux kill-session -t $SESSION' to close this session later"
tmux attach -t "$SESSION"
