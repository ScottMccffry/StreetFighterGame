from app.database import db
   
class NFTmarketplace(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    owner = db.Column(db.Integer, nullable=False)
    image = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    auction = db.Column(db.Boolean , nullable=False, default=True)
    timeLeft = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=True)
    
    def to_dict(self):
        return {
            'key': self.id,
            'owner': self.owner,
            'image': self.image,
            'title': self.title,
            'auction': self.auction,
            'timeLeft': self.timeLeft,
            'price': self.price
        }