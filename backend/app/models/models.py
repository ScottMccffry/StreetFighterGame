
#If you want to add a new database you need to do another class such as: 
#class User(db.Model):
#    id = db.Column(db.Integer, primary_key=True)
#    username = db.Column(db.String(255), unique=True, nullable=False)
#    email = db.Column(db.String(255), unique=True, nullable=False)
#    password_hash = db.Column(db.String(255), nullable=False)