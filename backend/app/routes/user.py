from werkzeug.security import generate_password_hash, check_password_hash
from flask import request, session
from app import app, db
from app.models import User



#User Registration
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='sha256')
    new_user = User(username=data['username'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return {"message": "User registered successfully"}, 201

#User Login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()

    if not user or not check_password_hash(user.password, data['password']):
        return {"message": "Login failed"}, 401

    session['user_id'] = user.id
    return {"message": "Login successful"}

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return {"message": "Logout successful"}

@app.route('/profile', methods=['GET'])
def profile():
    user_id = session.get('user_id')

    if not user_id:
        return {"message": "Not logged in"}, 401

    user = User.query.get(user_id)

    return {"username": user.username}