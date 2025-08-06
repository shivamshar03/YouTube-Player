#!/usr/bin/env python3

import subprocess
import sys
import os
import time
import requests

def check_dependencies():
    """Check if required Python packages are installed"""
    missing_packages = []
    
    try:
        import flask
        print("✅ Flask - Installed")
    except ImportError:
        missing_packages.append('flask')
        print("❌ Flask - Missing")
    
    try:
        import flask_cors
        print("✅ Flask-CORS - Installed")
    except ImportError:
        missing_packages.append('flask-cors')
        print("❌ Flask-CORS - Missing")
    
    if missing_packages:
        print(f"\n📦 Installing missing packages...")
        try:
            subprocess.check_call([sys.executable, '-m', 'pip', 'install'] + missing_packages)
            print("✅ All packages installed successfully!")
            return True
        except subprocess.CalledProcessError:
            print("❌ Failed to install packages. Please run manually:")
            print(f"pip install {' '.join(missing_packages)}")
            return False
    
    return True

def check_port_available():
    """Check if port 5328 is available"""
    import socket
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    result = sock.connect_ex(('127.0.0.1', 5328))
    sock.close()
    
    if result == 0:
        print("⚠️  Port 5328 is already in use")
        return False
    else:
        print("✅ Port 5328 is available")
        return True

def start_flask_server():
    """Start the Flask server"""
    api_path = os.path.join(os.getcwd(), 'api')
    index_file = os.path.join(api_path, 'index.py')
    
    if not os.path.exists(index_file):
        print(f"❌ Flask server file not found: {index_file}")
        return False
    
    print("🚀 Starting Flask backend server...")
    print("📍 Server URL: http://127.0.0.1:5328")
    print("🔗 API Base: http://127.0.0.1:5328/api/")
    print("⏹️  Press Ctrl+C to stop")
    print("-" * 50)
    
    try:
        # Start the server
        subprocess.run([sys.executable, 'index.py'], cwd=api_path)
    except KeyboardInterrupt:
        print("\n✅ Server stopped by user")
        return True
    except Exception as e:
        print(f"❌ Error starting server: {e}")
        return False

def test_server():
    """Test if the server is responding"""
    try:
        response = requests.get('http://127.0.0.1:5328/api/health', timeout=5)
        if response.status_code == 200:
            data = response.json()
            if data.get('status') == 'healthy':
                print("✅ Server is healthy and responding!")
                return True
    except:
        pass
    
    print("❌ Server is not responding")
    return False

def main():
    print("🎬 YouTube Clone - Backend Server Starter")
    print("=" * 50)
    
    # Check dependencies
    print("🔍 Checking dependencies...")
    if not check_dependencies():
        return False
    
    # Check port
    print("\n🔍 Checking port availability...")
    if not check_port_available():
        print("💡 Try stopping any existing Flask servers or use a different port")
        return False
    
    # Start server
    print("\n🚀 Starting server...")
    return start_flask_server()

if __name__ == "__main__":
    try:
        success = main()
        sys.exit(0 if success else 1)
    except KeyboardInterrupt:
        print("\n👋 Goodbye!")
        sys.exit(0)
