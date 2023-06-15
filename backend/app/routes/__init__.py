from .market_items import marketItems_routes
from .general import general_routes

def register_routes(app):
    app.register_blueprint(marketItems_routes)
    app.register_blueprint(general_routes)