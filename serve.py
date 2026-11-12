import http.server
import socketserver
import os
import sys
import webbrowser
from pathlib import Path

DEFAULT_PORT = 5173
DIRECTORY = Path(__file__).parent / "dist"

class SPARequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)

    def do_GET(self):
        # Resolve target path within dist directory
        clean_path = self.path.split("?")[0].split("#")[0].lstrip("/")
        target_path = DIRECTORY / clean_path
        # If the requested path is not a real file and does not have a dot-extension, serve index.html (SPA routing)
        if not target_path.is_file() and "." not in Path(clean_path).name:
            self.path = "/index.html"
        return super().do_GET()

    def log_message(self, format, *args):
        # Silence verbose asset request logs for clean console
        pass

def find_available_port(start_port=5173):
    import socket
    for port in range(start_port, start_port + 20):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            if s.connect_ex(("127.0.0.1", port)) != 0:
                return port
    return start_port

def main():
    if not DIRECTORY.exists():
        print(f"[ERROR] Build folder '{DIRECTORY}' not found.", flush=True)
        print("Please run 'npm run build' first.", flush=True)
        sys.exit(1)

    port = find_available_port(DEFAULT_PORT)
    url = f"http://localhost:{port}"

    print(f"\n=======================================================", flush=True)
    print(f"  Md. Al Emran - Portfolio & Academic Repository", flush=True)
    print(f"  Local Web Server is LIVE!", flush=True)
    print(f"  URL: {url}", flush=True)
    print(f"  Admin Panel: {url}/#admin", flush=True)
    print(f"  Press Ctrl+C to stop the server.", flush=True)
    print(f"=======================================================\n", flush=True)

    socketserver.TCPServer.allow_reuse_address = True
    
    with socketserver.TCPServer(("127.0.0.1", port), SPARequestHandler) as httpd:
        try:
            webbrowser.open(url)
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server cleanly. Goodbye!", flush=True)

if __name__ == "__main__":
    main()
