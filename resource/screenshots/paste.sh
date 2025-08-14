#!/bin/bash
# Save Windows clipboard image to ~/screenshots/screenshot.png from WSL

# Use PowerShell from WSL to access Windows clipboard
/mnt/c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe -Command '
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
$clipboard = [System.Windows.Forms.Clipboard]::GetImage()
if ($clipboard -ne $null) {
    $tempPath = "$env:TEMP\temp_screenshot.png"
    $clipboard.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
    Write-Host $tempPath
    exit 0
} else {
    Write-Host "No image in clipboard"
    exit 1
}
' | while read -r line; do
    if [[ "$line" == *"temp_screenshot.png" ]]; then
        # Convert Windows path to WSL path and copy
        wsl_path=$(echo "$line" | sed 's/\\/\//g' | sed 's/C:/\/mnt\/c/i')
        cp "$wsl_path" ~/screenshots/screenshot.png
        echo "Image saved to ~/screenshots/screenshot.png"
        echo "Path: ~/screenshots/screenshot.png"
    elif [[ "$line" == "No image in clipboard" ]]; then
        echo "No image in clipboard"
    fi
done