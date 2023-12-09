from server_app.models import Course
from server_app import app

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)