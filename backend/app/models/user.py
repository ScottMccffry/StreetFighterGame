from app.database import db

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), nullable=False)
    walletAdress = db.Column(db.String(255), nullable=False)
    image = db.Column(db.String(255), nullable=False)
# Ici il y a un pb car ce n'est pas les memes elements
    def to_dict(self):
        return {
            'name': self.name,
            'walletAdress': self.collection,
            'handler': self.handler,
            'image': self.image
        }