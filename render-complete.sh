#!/bin/bash

set -e

echo "🎬 Starting Raúl Butaci UTMB Video Render"
echo "=========================================="

# Start dev server in background
echo "1️⃣  Starting dev server..."
npm start > /tmp/vite-server.log 2>&1 &
SERVER_PID=$!

# Wait for server to be ready
echo "   Waiting for server to be ready..."
for i in {1..60}; do
  if curl -s http://localhost:5173 > /dev/null 2>&1; then
    echo "   ✓ Server ready"
    break
  fi
  sleep 1
  if [ $i -eq 60 ]; then
    echo "   ❌ Server failed to start"
    kill $SERVER_PID 2>/dev/null || true
    exit 1
  fi
done

# Wait a bit more for full startup
sleep 2

# Render video
echo "2️⃣  Rendering video..."
node render.mjs

RENDER_STATUS=$?

# Cleanup
echo "3️⃣  Cleaning up..."
kill $SERVER_PID 2>/dev/null || true

if [ $RENDER_STATUS -eq 0 ]; then
  echo ""
  echo "✅ VIDEO RENDER COMPLETE!"
  echo "=========================================="
  if [ -f raul-butaci-utmb-2026.mp4 ]; then
    ls -lh raul-butaci-utmb-2026.mp4
  fi
else
  echo "❌ Render failed"
  exit 1
fi
