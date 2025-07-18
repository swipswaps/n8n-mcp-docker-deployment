#!/bin/bash

echo "🔍 Swap Space Analysis and Setup Guide"
echo "======================================"

# Check current memory usage
echo "📊 Current Memory Status:"
echo "Total RAM: $(awk '/MemTotal/ {print $2/1024/1024 " GB"}' /proc/meminfo)"
echo "Available RAM: $(awk '/MemAvailable/ {print $2/1024/1024 " GB"}' /proc/meminfo)"
echo "Current Swap: $(awk '/SwapTotal/ {print $2/1024/1024 " GB"}' /proc/meminfo)"

echo ""
echo "🎯 Swap Recommendations:"
echo "1. If Available RAM < 1GB: Add 2-4GB swap"
echo "2. If Swap usage > 80%: Add 2-4GB swap"
echo "3. For heavy development: Add 4GB swap"

echo ""
echo "📝 To add 4GB swap file:"
echo "sudo fallocate -l 4G /swapfile"
echo "sudo chmod 600 /swapfile"
echo "sudo mkswap /swapfile"
echo "sudo swapon /swapfile"
echo ""
echo "📝 To make permanent (add to /etc/fstab):"
echo "echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab"

echo ""
echo "⚠️  WARNING: Only add swap if you're experiencing:"
echo "- Out of memory errors"
echo "- System freezing during heavy usage"
echo "- Less than 1GB available RAM when running Cursor" 