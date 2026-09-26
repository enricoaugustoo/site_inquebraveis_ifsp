from flask import Flask

from config import Config
from database import db

import routes
import admin_routes


def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    db.init_app(app)

    routes.register_routes(app)
    admin_routes.register_admin_routes(app)

    with app.app_context():
        db.create_all()

    return app


app = create_app()


if __name__ == "__main__":
    app.run(debug=True)