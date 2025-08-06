#!/usr/bin/env python3

import subprocess
import sys
import os
import time
import threading
import webbrowser
from pathlib import Path

def install_dependencies():
    """Install required Python packages"""
    print("📦 Installing Python dependencies...")
    try:
        subprocess.check_call([
            sys.executable, '-m', 'pip', 'install', 
            'flask', 'flask-cors'
        ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        print("✅ Python dependencies installed")
        return True
    except subprocess.CalledProcessError:
        print("❌ Failed to install Python dependencies")
        print("💡 Try running manually: pip install flask flask-cors")
        return False

def check_node_dependencies():
    """Check if Node.js dependencies are installed"""
    if os.path.exists('node_modules'):
        print("✅ Node.js dependencies found")
        return True
    else:
        print("📦 Installing Node.js dependencies...")
        try:
            subprocess.check_call(['npm', 'install'], stdout=subprocess.DEVNULL)
            print("✅ Node.js dependencies installed")
            return True
        except (subprocess.CalledProcessError, FileNotFoundError):
            print("❌ Failed to install Node.js dependencies")
            print("💡 Make sure Node.js is installed and run: npm install")
            return False

def start_flask_server():
    """Start the Flask server in a separate thread"""
    def run_flask():
        try:
            api_path = Path('api')
            if not api_path.exists():
                print("❌ API directory not found")
                return
            
            subprocess.run([
                sys.executable, 'index.py'
            ], cwd=api_path, check=True)
        except subprocess.CalledProcessError as e:
            print(f"❌ Flask server error: {e}")
        except KeyboardInterrupt:
            pass
    
    flask_thread = threading.Thread(target=run_flask, daemon=True)
    flask_thread.start()
    return flask_thread

def wait_for_server(url, timeout=30):
    """Wait for server to be ready"""
    import urllib.request
    import urllib.error
    
    for i in range(timeout):
        try:
            urllib.request.urlopen(url, timeout=1)
            return True
        except (urllib.error.URLError, OSError):
            time.sleep(1)
            if i % 5 == 0:
                print(f"⏳ Waiting for server... ({i}s)")
    return False

def main():
    print("🚀 YouTube Clone - Quick Start")
    print("=" * 40)
    
    # Check current directory
    if not os.path.exists('api/index.py'):
        print("❌ Please run this script from the project root directory")
        print("💡 Make sure you can see the 'api' folder")
        return False
    
    # Install dependencies
    if not install_dependencies():
        return False
    
    if not check_node_dependencies():
        return False
    
    print("\n🎬 Starting YouTube Clone...")
    print("=" * 40)
    
    # Start Flask server
    print("🐍 Starting Flask backend...")
    flask_thread = start_flask_server()
    
    # Wait for Flask to start
    print("⏳ Waiting for Flask server to start...")
    if wait_for_server('http://127.0.0.1:5328/api/health', timeout=15):
        print("✅ Flask server is running!")
    else:
        print("⚠️  Flask server might be starting slowly...")
    
    # Start Next.js
    print("⚛️  Starting Next.js frontend...")
    try:
        # Open browser after a delay
        def open_browser():
            time.sleep(3)
            print("🌐 Opening browser...")
            webbrowser.open('http://localhost:3000')
        
        browser_thread = threading.Thread(target=open_browser, daemon=True)
        browser_thread.start()
        
        # Start Next.js (this will block)
        subprocess.run(['npm', 'run', 'dev'], check=True)
        
    except KeyboardInterrupt:
        print("\n🛑 Shutting down...")
    except subprocess.CalledProcessError:
        print("❌ Failed to start Next.js")
        print("💡 Try running manually: npm run dev")
    except FileNotFoundError:
        print("❌ npm not found. Please install Node.js")
    
    print("👋 Goodbye!")
    return True

if __name__ == "__main__":
    try:
        success = main()
        sys.exit(0 if success else 1)
    except KeyboardInterrupt:
        print("\n👋 Goodbye!")
        sys.exit(0)
