from app.database import db
import json

class Fighter(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    group = db.Column(db.String(255), nullable=False)
    image = db.Column(db.String(255), nullable=False)
    nft_address = db.Column(db.String(255), unique=True, nullable=False)
    game_characteristics_json = db.Column(db.String, nullable=False)

    @property
    def game_characteristics(self):
        return json.loads(self.game_characteristics_json)

    @game_characteristics.setter
    def game_characteristics(self, value):
        self.game_characteristics_json = json.dumps(value)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'group': self.group,
            'image': self.image,
            'nft_address': self.nft_address,
            'game_characteristics': self.game_characteristics
        }