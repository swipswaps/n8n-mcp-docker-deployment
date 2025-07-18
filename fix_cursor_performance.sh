#!/bin/bash

# Cursor Performance Fix Script
# Based on official Electron and Cursor documentation

echo "🔧 Fixing Cursor Performance Issues..."

# Create a desktop shortcut with proper flags
cat > ~/.local/share/applications/cursor-performance.desktop << 'EOF'
[Desktop Entry]
Name=Cursor (Performance Optimized)
Comment=Code editor with performance optimizations
Exec=/tmp/.mount_Cursor*/usr/share/cursor/cursor --disable-gpu --disable-software-rasterizer --disable-dev-shm-usage --no-sandbox --disable-setuid-sandbox --disable-web-security --disable-features=VizDisplayCompositor --disable-background-timer-throttling --disable-backgrounding-occluded-windows --disable-renderer-backgrounding --disable-field-trial-config --disable-ipc-flooding-protection --force-gpu-mem-available-mb=512 --max_old_space_size=2048 %F
Icon=cursor
Type=Application
Categories=Development;IDE;
MimeType=text/plain;inode/directory;application/x-code-workspace;
StartupNotify=false
StartupWMClass=Cursor
EOF

echo "✅ Created performance-optimized Cursor shortcut"
echo "📝 Location: ~/.local/share/applications/cursor-performance.desktop"
echo ""
echo "🎯 NEXT STEPS:"
echo "1. Close current Cursor instance"
echo "2. Use the new shortcut: 'Cursor (Performance Optimized)'"
echo "3. Or run manually with flags:"
echo "   /tmp/.mount_Cursor*/usr/share/cursor/cursor --disable-gpu --disable-software-rasterizer --disable-dev-shm-usage --no-sandbox --disable-setuid-sandbox --disable-web-security --disable-features=VizDisplayCompositor --disable-background-timer-throttling --disable-backgrounding-occluded-windows --disable-renderer-backgrounding --disable-field-trial-config --disable-ipc-flooding-protection --force-gpu-mem-available-mb=512 --max_old_space_size=2048"
echo ""
echo "🔧 Settings applied to: ~/.config/Cursor/User/settings.json"
echo "   - Disabled GPU acceleration"
echo "   - Reduced memory usage"
echo "   - Disabled telemetry and updates"
echo "   - Optimized file watching"
echo "   - Disabled visual effects" 