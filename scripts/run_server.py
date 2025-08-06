import subprocess
import sys
import os
import time

def check_dependencies():
    """Check if required Python packages are installed"""
    try:
        import flask
        import flask_cors
        print("✓ Required packages found")
        return True
    except ImportError as e:
        print(f"✗ Missing required package: {e}")
        print("Please install with: pip install flask flask-cors")
        return False

def run_flask_server():
    """Run the Flask server for development"""
    if not check_dependencies():
        return
    
    try:
        # Change to the api directory
        api_path = os.path.join(os.getcwd(), 'api')
        
        if not os.path.exists(api_path):
            print(f"✗ API directory not found at: {api_path}")
            return
            
        index_file = os.path.join(api_path, 'index.py')
        if not os.path.exists(index_file):
            print(f"✗ Flask server file not found at: {index_file}")
            return
        
        print("✓ Starting Flask server...")
        print("✓ Server will be available at: http://127.0.0.1:5328")
        print("✓ API endpoints will be available at: http://127.0.0.1:5328/api/")
        print("✓ Press Ctrl+C to stop the server")
        print("-" * 50)
        
        # Run the Flask server
        subprocess.run([sys.executable, 'index.py'], cwd=api_path, check=True)
        
    except KeyboardInterrupt:
        print("\n✓ Server stopped by user")
    except subprocess.CalledProcessError as e:
        print(f"✗ Error running Flask server: {e}")
    except FileNotFoundError:
        print("✗ Python interpreter not found")

if __name__ == "__main__":
    print("YouTube Clone - Flask Backend Server")
    print("=" * 40)
    run_flask_server()
