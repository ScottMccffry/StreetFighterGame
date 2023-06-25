from werkzeug.security import generate_password_hash, check_password_hash
from flask import request, session, jsonify
from app import app, db
from app.models import User

user_routes = Blueprint('user_routes', __name__)


#User Registration
@user_routes.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='sha256')
    new_user = User(username=data['username'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return {"message": "User registered successfully"}, 201

#User Logout
@user_routes.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return {"message": "Logout successful"}

#User profile information fetch

@user_routes.route('/profile/<wallet_address>', methods=['GET'])
def get_user(wallet_address):
    user = User.query.filter_by(walletAdress=wallet_address).first()
    if user is None:
        return jsonify({'error': 'User not found'}), 404
    else:
        return jsonify(user.to_dict())


#Update User Profile:
@user_routes.route('/profile', methods=['PUT'])
def update_profile():
    data = request.get_json()
    user_id = session.get('user_id')

    if not user_id:
        return {"message": "Not logged in"}, 401

    user = User.query.get(user_id)

    if 'username' in data:
        user.username = data['username']
    if 'password' in data:
        user.password = generate_password_hash(data['password'], method='sha256')

    db.session.commit()
    return {"message": "Profile updated"}

#Fetch All Transactions for a User:
@user_routes.route('/transactions', methods=['GET'])
def get_transactions():
    user_id = session.get('user_id')

    if not user_id:
        return {"message": "Not logged in"}, 401

    transactions = Transaction.query.filter_by(user_id=user_id).all()
    transactions_list = [{"id": tx.id, "amount": tx.amount} for tx in transactions]
    return {"transactions": transactions_list}

#Password reset
# This is a simple password reset. A more secure way would be to generate a password reset token and send it to the user's email.
@user_routes.route('/users/password_reset', methods=['POST'])
def password_reset():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user:
        user.password = generate_password_hash(data['password'], method='sha256')
        db.session.commit()
        return {"message": "Password reset successful"}, 200
    else:
        return {"message": "User not found"}, 404

#Update Email
@user_routes.route('/users/update_email', methods=['PUT'])
def update_email():
    data = request.get_json()
    user_id = session.get('user_id')

    if not user_id:
        return {"message": "Not logged in"}, 401

    user = User.query.get(user_id)
    if user:
        user.email = data['email']
        db.session.commit()
        return {"message": "Email updated successfully"}, 200
    else:
        return {"message": "User not found"}, 404
    
# This could be implemented in the login function like this
@user_routes.route('/users/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    
    if user and check_password_hash(user.password, data['password']):
        session['user_id'] = user.id
        user.last_login = datetime.utcnow()
        db.session.commit()
        return {"message": "Login successful"}, 200
    else:
        return {"message": "Invalid username or password"}, 401

#Record a user transaction
@user_routes.route('/users/transactions', methods=['POST'])
def create_transaction():
    data = request.get_json()
    user_id = session.get('user_id')

    if not user_id:
        return {"message": "Not logged in"}, 401

    transaction = Transaction(user_id=user_id, amount=data['amount'])
    db.session.add(transaction)
    db.session.commit()
    return {"message": "Transaction recorded"}, 201

@user_routes.route('/delete-account', methods=['DELETE'])
@login_required
def delete_account():
    db.session.delete(current_user)
    db.session.commit()
    return {"message": "Account deleted successfully"}, 200