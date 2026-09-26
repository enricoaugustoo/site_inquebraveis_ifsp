import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))


class Config:
    SQLALCHEMY_DATABASE_URI = f"sqlite:///{os.path.join(BASE_DIR, 'site_equipe.db')}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = "troque-essa-chave-antes-de-publicar"
    ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "troque-esta-senha")
