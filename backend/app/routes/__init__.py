from .marketplace import marketplace_routes
from .general import general_routes
from .fighter import fighter_routes
from .fight import fight_routes

def register_routes(app):
    app.register_blueprint(marketplace_routes)
    app.register_blueprint(general_routes)
    app.register_blueprint(fighter_routes)
    app.register_blueprint(fight_routes)