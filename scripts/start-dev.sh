#!/bin/bash

echo "🚀 Starting YouTube Clone Development Environment"
echo "================================================"

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    exit 1
fi

# Install Python dependencies
echo "📦 Installing Python dependencies..."
pip3 install flask flask-cors

# Start Flask server in background
echo "🐍 Starting Flask backend server..."
cd api && python3 index.py &
FLASK_PID=$!

# Wait a moment for Flask to start
sleep 3

# Start Next.js development server
echo "⚛️  Starting Next.js frontend server..."
npm run dev &
NEXTJS_PID=$!

echo "✅ Both servers are starting..."
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend:  http://127.0.0.1:5328"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user interrupt
trap "echo '🛑 Stopping servers...'; kill $FLASK_PID $NEXTJS_PID; exit" INT
wait
