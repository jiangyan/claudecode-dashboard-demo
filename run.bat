@echo off
setlocal
set "WD=%CD%"

rem pane 1 runs pnpm dev
rem Then split vertically: pane 2 runs sqlite init in same folder
rem Then split horizontally: pane 3 runs the websocket server

wt -d "%WD%" -- cmd /k "pnpm dev" ^
; split-pane -V -- cmd /k "cd /d %WD% && pnpm db:init" ^
; split-pane -H -- cmd /k "cd /d %WD% && pnpm ws:server"
