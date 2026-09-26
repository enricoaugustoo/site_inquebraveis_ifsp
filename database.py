# database.py
import os
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

DATABASE_URL = os.getenv("DATABASE_URL")

def init_db(app):
    app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(app)