#!/usr/bin/env python3

import sys
import subprocess
import os
from pathlib import Path

def check_python_version():
    """Check if Python version is adequate"""
    version = sys.version_info
    if version.major >= 3 and version.minor >= 7:
        print(f"✅ Python {version.major}.{version.minor}.{version.micro} - OK")
        return True
    else:
        print(f"❌ Python {version.major}.{version.minor}.{version.micro} - Need Python 3.7+")
        return False

def check_dependencies():
    """Check if required packages are installed"""
    required_packages = ['flask', 'flask_cors']
    missing_packages = []
    
    for package in required_packages:
        try:
            __import__(package)
            print(f"✅ {package} - Installed")
        except ImportError:
            print(f"❌ {package} - Missing")
            missing_packages.append(package)
    
    if missing_packages:
        print(f"\n📦 Install missing packages with:")
        print(f"pip install {' '.join(missing_packages)}")
        return False
    
    return True

def check_file_structure():
    """Check if required files exist"""
    required_files = [
        'api/index.py',
        'components/video-grid.tsx',
        'components/header.tsx',
        'app/page.tsx',
        'next.config.js'
    ]
    
    all_exist = True
    for file_path in required_files:
        if os.path.exists(file_path):
            print(f"✅ {file_path} - Found")
        else:
            print(f"❌ {file_path} - Missing")
            all_exist = False
    
    return all_exist

def check_ports():
    """Check if required ports are available"""
    import socket
    
    ports_to_check = [3000, 5328]
    available_ports = []
    
    for port in ports_to_check:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        result = sock.connect_ex(('127.0.0.1', port))
        sock.close()
        
        if result != 0:
            print(f"✅ Port {port} - Available")
            available_ports.append(port)
        else:
            print(f"⚠️  Port {port} - In use")
    
    return len(available_ports) == len(ports_to_check)

def main():
    print("🔍 YouTube Clone - Setup Checker")
    print("=" * 40)
    
    checks = [
        ("Python Version", check_python_version),
        ("Python Dependencies", check_dependencies),
        ("File Structure", check_file_structure),
        ("Port Availability", check_ports)
    ]
    
    all_passed = True
    
    for check_name, check_func in checks:
        print(f"\n🔍 Checking {check_name}...")
        if not check_func():
            all_passed = False
    
    print("\n" + "=" * 40)
    if all_passed:
        print("🎉 All checks passed! You're ready to run the application.")
        print("\n🚀 To start the application:")
        print("1. Run: python api/index.py")
        print("2. In another terminal: npm run dev")
        print("3. Open: http://localhost:3000")
    else:
        print("❌ Some checks failed. Please fix the issues above.")
    
    return all_passed

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
