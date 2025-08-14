reg add "HKCU\Software\Microsoft\Command Processor" ^
    /v AutoRun /t REG_SZ ^
    /d "doskey /macrofile=C:\Users\jygen\.claude\cc_cmd_aliases.cmd" /f
