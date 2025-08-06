import logging
import sys
import os
from flask import Flask, jsonify, request
from flask_cors import CORS

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Configure CORS properly
CORS(app, 
     origins=["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:3001"],
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
     allow_headers=["Content-Type", "Accept", "Authorization"],
     supports_credentials=True)

# Mock data for videos
videos_data = [
    {
        "id": "1",
        "title": "Building a Full-Stack App with Next.js and Python",
        "description": "Learn how to create a modern web application using Next.js for the frontend and Python Flask for the backend API. This comprehensive tutorial covers setup, development, and deployment.",
        "thumbnail": "/placeholder.svg?height=180&width=320",
        "duration": "15:42",
        "views": "125K",
        "uploadDate": "2 days ago",
        "channel": {
            "name": "TechTutorials",
            "avatar": "/placeholder.svg?height=40&width=40",
            "subscribers": "250K"
        },
        "videoUrl": "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
    },
    {
        "id": "2", 
        "title": "Python Flask REST API Tutorial",
        "description": "Complete guide to building REST APIs with Python Flask, including authentication, database integration, and best practices for scalable applications.",
        "thumbnail": "/placeholder.svg?height=180&width=320",
        "duration": "22:15",
        "views": "89K",
        "uploadDate": "5 days ago",
        "channel": {
            "name": "CodeMaster",
            "avatar": "/placeholder.svg?height=40&width=40",
            "subscribers": "180K"
        },
        "videoUrl": "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4"
    },
    {
        "id": "3",
        "title": "React Hooks Deep Dive",
        "description": "Understanding React Hooks with practical examples and best practices for modern React development. Covers useState, useEffect, custom hooks and more.",
        "thumbnail": "/placeholder.svg?height=180&width=320",
        "duration": "18:30",
        "views": "67K",
        "uploadDate": "1 week ago",
        "channel": {
            "name": "ReactPro",
            "avatar": "/placeholder.svg?height=40&width=40",
            "subscribers": "95K"
        },
        "videoUrl": "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
    },
    {
        "id": "4",
        "title": "Database Design Fundamentals",
        "description": "Learn the basics of database design, normalization, and best practices for scalable applications. Perfect for beginners and intermediate developers.",
        "thumbnail": "/placeholder.svg?height=180&width=320",
        "duration": "25:18",
        "views": "156K",
        "uploadDate": "3 days ago",
        "channel": {
            "name": "DataScience Hub",
            "avatar": "/placeholder.svg?height=40&width=40",
            "subscribers": "320K"
        },
        "videoUrl": "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4"
    },
    {
        "id": "5",
        "title": "JavaScript ES6+ Features Explained",
        "description": "Modern JavaScript features including arrow functions, destructuring, async/await, and more. Essential for every web developer.",
        "thumbnail": "/placeholder.svg?height=180&width=320",
        "duration": "19:45",
        "views": "203K",
        "uploadDate": "1 day ago",
        "channel": {
            "name": "JS Mastery",
            "avatar": "/placeholder.svg?height=40&width=40",
            "subscribers": "450K"
        },
        "videoUrl": "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
    }
]

comments_data = {
    "1": [
        {
            "id": "c1",
            "author": "DevEnthusiast",
            "avatar": "/placeholder.svg?height=32&width=32",
            "content": "Great tutorial! Really helped me understand the integration between Next.js and Python. The step-by-step approach is perfect.",
            "timestamp": "2 hours ago",
            "likes": 15
        },
        {
            "id": "c2", 
            "author": "CodeNewbie",
            "avatar": "/placeholder.svg?height=32&width=32",
            "content": "Can you make a follow-up video about deployment? I'd love to see how to deploy this to production.",
            "timestamp": "5 hours ago",
            "likes": 8
        },
        {
            "id": "c3",
            "author": "FullStackDev",
            "avatar": "/placeholder.svg?height=32&width=32",
            "content": "This is exactly what I was looking for! The Flask integration is so clean.",
            "timestamp": "1 day ago",
            "likes": 23
        }
    ],
    "2": [
        {
            "id": "c4",
            "author": "PythonLover",
            "avatar": "/placeholder.svg?height=32&width=32",
            "content": "Flask is such a great framework for APIs. Thanks for the detailed explanation!",
            "timestamp": "3 hours ago",
            "likes": 12
        }
    ]
}

# Add request logging
@app.before_request
def log_request():
    logger.info(f"📨 {request.method} {request.path} from {request.remote_addr}")

@app.after_request
def after_request(response):
    logger.info(f"📤 Response: {response.status_code}")
    return response

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy", 
        "message": "Flask server is running",
        "version": "1.0.0",
        "endpoints": [
            "GET /api/health",
            "GET /api/videos",
            "GET /api/videos/<id>",
            "GET /api/videos/<id>/comments",
            "POST /api/videos/<id>/comments",
            "POST /api/upload"
        ]
    })

@app.route('/api/videos', methods=['GET'])
def get_videos():
    """Get all videos or search videos"""
    try:
        search_query = request.args.get('search', '').lower().strip()
        
        if search_query:
            logger.info(f"🔍 Searching for: {search_query}")
            filtered_videos = [
                video for video in videos_data 
                if (search_query in video['title'].lower() or 
                    search_query in video['description'].lower() or
                    search_query in video['channel']['name'].lower())
            ]
            logger.info(f"📊 Found {len(filtered_videos)} videos matching '{search_query}'")
            return jsonify(filtered_videos)
        
        logger.info(f"📊 Returning all {len(videos_data)} videos")
        return jsonify(videos_data)
        
    except Exception as e:
        logger.error(f"❌ Error in get_videos: {str(e)}")
        return jsonify({"error": "Failed to fetch videos", "details": str(e)}), 500

@app.route('/api/videos/<video_id>', methods=['GET'])
def get_video(video_id):
    """Get a specific video by ID"""
    try:
        logger.info(f"🎥 Fetching video with ID: {video_id}")
        video = next((v for v in videos_data if v['id'] == video_id), None)
        
        if video:
            logger.info(f"✅ Found video: {video['title']}")
            return jsonify(video)
        
        logger.warning(f"⚠️  Video not found: {video_id}")
        return jsonify({'error': f'Video with ID {video_id} not found'}), 404
        
    except Exception as e:
        logger.error(f"❌ Error in get_video: {str(e)}")
        return jsonify({"error": "Failed to fetch video", "details": str(e)}), 500

@app.route('/api/videos/<video_id>/comments', methods=['GET'])
def get_comments(video_id):
    """Get comments for a specific video"""
    try:
        logger.info(f"💬 Fetching comments for video: {video_id}")
        comments = comments_data.get(video_id, [])
        logger.info(f"📊 Found {len(comments)} comments")
        return jsonify(comments)
        
    except Exception as e:
        logger.error(f"❌ Error in get_comments: {str(e)}")
        return jsonify({"error": "Failed to fetch comments", "details": str(e)}), 500

@app.route('/api/videos/<video_id>/comments', methods=['POST'])
def add_comment(video_id):
    """Add a new comment to a video"""
    try:
        data = request.get_json()
        logger.info(f"💬 Adding comment to video: {video_id}")
        
        if not data or not data.get('content'):
            return jsonify({"error": "Comment content is required"}), 400
        
        if video_id not in comments_data:
            comments_data[video_id] = []
        
        new_comment = {
            "id": f"c{len(comments_data[video_id]) + 1}",
            "author": data.get('author', 'Anonymous'),
            "avatar": "/placeholder.svg?height=32&width=32",
            "content": data.get('content', ''),
            "timestamp": "just now",
            "likes": 0
        }
        
        comments_data[video_id].append(new_comment)
        logger.info(f"✅ Comment added successfully")
        return jsonify(new_comment), 201
        
    except Exception as e:
        logger.error(f"❌ Error in add_comment: {str(e)}")
        return jsonify({"error": "Failed to add comment", "details": str(e)}), 500

@app.route('/api/upload', methods=['POST'])
def upload_video():
    """Upload a new video"""
    try:
        data = request.get_json()
        logger.info("📤 Processing video upload")
        
        if not data or not data.get('title'):
            return jsonify({"error": "Video title is required"}), 400
        
        new_video = {
            "id": str(len(videos_data) + 1),
            "title": data.get('title', 'Untitled Video'),
            "description": data.get('description', ''),
            "thumbnail": "/placeholder.svg?height=180&width=320",
            "duration": "0:00",
            "views": "0",
            "uploadDate": "just now",
            "channel": {
                "name": data.get('channel', 'Your Channel'),
                "avatar": "/placeholder.svg?height=40&width=40",
                "subscribers": "1K"
            },
            "videoUrl": data.get('videoUrl', '')
        }
        
        videos_data.append(new_video)
        logger.info(f"✅ Video uploaded: {new_video['title']}")
        return jsonify(new_video), 201
        
    except Exception as e:
        logger.error(f"❌ Error in upload_video: {str(e)}")
        return jsonify({"error": "Failed to upload video", "details": str(e)}), 500

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Endpoint not found", "available_endpoints": [
        "GET /api/health",
        "GET /api/videos", 
        "GET /api/videos/<id>",
        "GET /api/videos/<id>/comments",
        "POST /api/videos/<id>/comments",
        "POST /api/upload"
    ]}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500

def check_dependencies():
    """Check if all required dependencies are available"""
    try:
        import flask
        import flask_cors
        return True
    except ImportError as e:
        print(f"❌ Missing dependency: {e}")
        print("📦 Install with: pip install flask flask-cors")
        return False

if __name__ == '__main__':
    print("=" * 60)
    print("🎬 YouTube Clone - Flask Backend Server")
    print("=" * 60)
    
    # Check dependencies
    if not check_dependencies():
        sys.exit(1)
    
    # Server info
    print("✅ All dependencies found")
    print("🚀 Starting Flask server...")
    print("📍 Server URL: http://127.0.0.1:5328")
    print("🔗 API Base: http://127.0.0.1:5328/api/")
    print("🌐 Health Check: http://127.0.0.1:5328/api/health")
    print("📊 CORS enabled for: http://localhost:3000")
    print("=" * 60)
    print("💡 Open http://localhost:3000 in your browser")
    print("⏹️  Press Ctrl+C to stop the server")
    print("=" * 60)
    
    try:
        # Start the server
        app.run(
            debug=True, 
            port=5328, 
            host='127.0.0.1',
            use_reloader=False,  # Disable reloader to prevent double startup
            threaded=True
        )
    except KeyboardInterrupt:
        print("\n✅ Server stopped gracefully")
    except OSError as e:
        if "Address already in use" in str(e):
            print("\n❌ Port 5328 is already in use!")
            print("💡 Either:")
            print("   1. Stop the existing server")
            print("   2. Or change the port in the code")
        else:
            print(f"\n❌ Server error: {e}")
    except Exception as e:
        print(f"\n❌ Unexpected error: {e}")
