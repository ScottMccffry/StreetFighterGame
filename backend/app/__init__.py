from flask import Flask
from .routes import register_routes

from .database import db
from config import Config


def create_app(config_class=Config):
    app = Flask(__name__, static_url_path='/static', static_folder='../static')
    app.config.from_object(config_class)

    db.init_app(app)
    register_routes(app)

    return app

