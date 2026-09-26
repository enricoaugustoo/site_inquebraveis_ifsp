import os

from flask import Flask

from database import db
import routes
import admin_routes


def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ["DATABASE_URL"]
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    app.config["SECRET_KEY"] = os.environ.get(
        "SECRET_KEY",
        "chave-local-desenvolvimento"
    )

    app.config["ADMIN_PASSWORD"] = os.environ.get(
        "ADMIN_PASSWORD",
        "troque-esta-senha"
    )

    db.init_app(app)

    routes.register_routes(app)
    admin_routes.register_admin_routes(app)

    with app.app_context():
        db.create_all()

    return app


app = create_app()


if __name__ == "__main__":
    app.run(debug=True)