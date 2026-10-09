# main.py

import uvicorn


def start():
    print("Starting server...")

    uvicorn.run(
        "presentation.webapitechstore:app",
        host="localhost",
        port=7000,
        reload=True
    )

    print("Server is running.")


if __name__ == "__main__":
    start()