from app.database import db

class Fight(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fighter1_id = db.Column(db.Integer, db.ForeignKey('fighter.id'), nullable=False)
    fighter2_id = db.Column(db.Integer, db.ForeignKey('fighter.id'), nullable=False)
    odd1 = db.Column(db.Float, nullable=False)
    odd2 = db.Column(db.Float, nullable=False)
    time_left = db.Column(db.Integer, nullable=False)
    fighter1 = db.relationship('Fighter', foreign_keys=[fighter1_id])
    fighter2 = db.relationship('Fighter', foreign_keys=[fighter2_id])
    