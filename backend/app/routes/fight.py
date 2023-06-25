from flask import Blueprint, jsonify
from app.models import Users, NFTmarketplace, Fight, Fighter, FightRequest, NFTcollections
from flask import request
from app.database import db
import os
import base64
import threading

fight_routes = Blueprint('fight_routes', __name__)

@fight_routes.route('/api/createFights', methods=['POST'])
def create_fight():
    data = request.get_json()
    new_fight = Fight(
        fighter1_id = data.get('fighter1_id'),
        fighter2_id = data.get('fighter2_id'),
        odd1 = data.get('odd1'),
        odd2 = data.get('odd2'),
        time_left = data.get('time_left'),
    )
    db.session.add(new_fight)
    db.session.commit()
    return jsonify({"message": "Fight data created successfully", "fight": new_fight.id}), 201

@fight_routes.route('/api/fights', methods=['GET'])
def get_fights():
    fights = Fight.query.all()
    fights_data = []

    for fight in fights:
        fight_data = {
            "id": fight.id,
            "fighter1": fight.fighter1.to_dict(),  # Use the to_dict() method to include all necessary fighter data
            "fighter2": fight.fighter2.to_dict(),  # Same here
            "odd1": fight.odd1,
            "odd2": fight.odd2,
            "time_left": fight.time_left,
        }
        fights_data.append(fight_data)
    
    if fights_data:   # Here we check if fights_data is not empty
        return jsonify(fights_data), 200  # Return fights_data, not fights
    else:
        return jsonify({"message": "No fights found"}), 404

@fight_routes.route('/api/request_fight', methods=['POST'])
def request_fight():
    data = request.json
    player_id = data['player_id']
    fighter_id = data['fighter_id']

    # Create a new fight request
    new_request = FightRequest(player_id=player_id, fighter_id=fighter_id)
    db.session.add(new_request)
    db.session.commit()

    # Check if there's an existing fight request that can be matched
    opponent_request = FightRequest.query.filter(FightRequest.id != new_request.id).first()

    if opponent_request:
        # Create a new fight with the matched players and fighters
        new_fight = Fight(fighter1_id=new_request.fighter_id, fighter2_id=opponent_request.fighter_id, odd1=1.0, odd2=1.0, time_left=0, price=0)
        db.session.add(new_fight)

        # Remove the matched fight requests
        db.session.delete(new_request)
        db.session.delete(opponent_request)

        db.session.commit()

        return jsonify({"message": "Fight created", "fight_id": new_fight.id})

    return jsonify({"message": "Fight request created", "request_id": new_request.id})

@fight_routes.route('/fight/<id>', methods=['GET'])
def get_fight(id):
    fight = Fight.query.get(id)
    if not fight:
        return {"error": "Fight not found"}, 404
    return jsonify(fight.to_dict()), 200

@fight_routes.route('/update-fight/<id>', methods=['PUT'])
def update_fight(id):
    fight = Fight.query.get(id)
    if not fight:
        return {"error": "Fight not found"}, 404

    data = request.get_json()
    fight.fighter1_id = data.get('fighter1_id', fight.fighter1_id)
    fight.fighter2_id = data.get('fighter2_id', fight.fighter2_id)
    fight.odd1 = data.get('odd1', fight.odd1)
    fight.odd2 = data.get('odd2', fight.odd2)
    fight.time_left = data.get('time_left', fight.time_left)

    db.session.commit()
    return jsonify(fight.to_dict()), 200

@fight_routes.route('/delete-fight/<id>', methods=['DELETE'])
def delete_fight(id):
    fight = Fight.query.get(id)
    if not fight:
        return {"error": "Fight not found"}, 404

    db.session.delete(fight)
    db.session.commit()
    return {"message": "Fight deleted successfully"}, 200
