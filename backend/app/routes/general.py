from flask import Blueprint, jsonify
from app.models import Users, NFTmarketplace, Fight, Fighter, FightRequest, NFTcollections
from flask import request
from app.database import db
import os
import base64
import threading
#import main  # This assumes that there's a main.py file in the same directory



general_routes = Blueprint('general_routes', __name__)

#def run_game():
#   main.main()  # Call the main function of your game
    
@general_routes.route('/api/marketItems', methods=['GET'])
def get_items():
    items = NFTmarketplace.query.all()
    items_list = [item.to_dict() for item in items]
    return jsonify(items_list)

@general_routes.route('/api/fighters', methods=['GET'])
def get_fighters():
    fighters = Fighter.query.all()
    fighters_list = [fighter.to_dict() for fighter in fighters]
    return jsonify(fighters_list)

@general_routes.route('/api/fights', methods=['GET'])
def get_fights():
    fights = Fight.query.all()
    fights_data = []

    for fight in fights:
        fight_data = {
            "id": fight.id,
            "fighter1": {
                "id": fight.fighter1.id,
                "name": fight.fighter1.name,
                "group": fight.fighter1.group,
                "image": fight.fighter1.image,
            },
            "fighter2": {
                "id": fight.fighter2.id,
                "name": fight.fighter2.name,
                "group": fight.fighter2.group,
                "image": fight.fighter2.image,
            },
            "odd1": fight.odd1,
            "odd2": fight.odd2,
            "time_left": fight.time_left,
            "price": fight.price,
        }
        fights_data.append(fight_data)

    return jsonify(fights_data)

@general_routes.route('/api/request_fight', methods=['POST'])
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

@general_routes.route('/api/nft_collections', methods=['GET'])
def get_nftcollections():
    nftcollections = NFTcollections.query.all()
    nftcollection_data = []

    for nftcollection in nftcollections:
        nftcollection_data.append({
            "id": nftcollection.id,
            "address": nftcollection.address,
            "abi": nftcollection.abi,
            "name": nftcollection.name
        })

    return jsonify(nftcollection_data)
  
@general_routes.route('/api/fetch_fighter_characteristics/<dna>', methods=['GET'])
def fetch_fighter_data(dna):
    
    # Get the fighter from the database
    fighter = Fighter.query.filter_by(dna=dna).first()
    
    # If no fighter is found, return a 404 not found status
    if not fighter:
        return jsonify({"message": "Fighter not found"}), 404

    # If the fighter is found, return its game characteristics
    return jsonify({"game_characteristics": fighter.game_characteristics}), 200

# This endpoint uploads the characteristics of a new fighter
@general_routes.route('/api/upload_fighter_characteristics/<dna>', methods=['POST'])
def upload_fighter_data(dna):
    # Get the data from the request
    data = request.get_json()

    # If no data is provided, return a 400 bad request status
    if not data:
        return jsonify({"message": "No input data provided"}), 400

    # Extract the details of the fighter from the data
    name = data.get('name')
    group = data.get('group')
    image = data.get('image')
    nft_address = data.get('nft_address')
    game_characteristics = data.get('game_characteristics')

    # If any required detail is missing, return a 400 bad request status
    if not all([name, group, image, nft_address, game_characteristics]):
        return jsonify({"message": "Missing required fields"}), 400

    # Create the new fighter and add it to the database
    new_fighter = Fighter(
        name=name,
        group=group,
        image=image,
        dna=dna,
        nft_address=nft_address,
        game_characteristics=game_characteristics
    )
    db.session.add(new_fighter)
    db.session.commit()

    # Return a success message and the details of the new fighter
    return jsonify({"message": "Fighter created", "fighter": new_fighter.to_dict()}), 201

@general_routes.route('/api/upload_fighter_image/<dna>', methods=['POST'])
def upload_fighter_image(dna,baseUrl):
    data = request.get_json()

    # Get image data from the JSON payload
    image_data = data.get('imageData')

    # Remove 'data:image/png;base64,' from the start of the string
    image_data = image_data.split(',')[1]

    # Decode the base64 image data
    decoded_image_data = base64.b64decode(image_data)

    # Save the image
    image_path = os.path.join('static', 'sprites',  f'{dna}.png')
    with open(image_path, 'wb') as f:
        f.write(decoded_image_data)
    
        
    # Return a success message and the path of the image
    return jsonify({'status': 'success', 'message': 'Image uploaded successfully', 'imagePath': image_path})

@general_routes.route('/api/delete_fighter_characteristics/<dna>', methods=['POST'])
def del_fighter_data(dna):
    fighter = Fighter.query.filter_by(dna=dna).first()
    
    # If no fighter is found, return a 404 not found status
    if fighter:
        
        # If the fighter is found, delete it from the database
        db.session.delete(fighter)
        db.session.commit()
        # Return a success message
        return jsonify({"message": "Fighter characteristics deleted"}), 200
    else:
        return jsonify({"message": "No fighter found with this NFT address"}), 404

@general_routes.route('/api/delete_fighter_image/<dna>', methods=['POST'])
def del_fighter_image(dna):
    fighter = Fighter.query.filter_by(dna=dna).first()
    if fighter:
        # If the fighter is found, delete its image
        image_path = os.path.join('static', 'sprites',  f'{dna}.png')
        if os.path.isfile(image_path):
            os.remove(image_path)
            return jsonify({'status': 'success', 'message': 'Image deleted successfully'}), 200
        else:
            return jsonify({"message": "No image found for this NFT address"}), 404
    else:
        # If no fighter is found, return a 404 not found status
        return jsonify({"message": "No fighter found with this NFT address"}), 404


@general_routes.route('/api/add_fighters', methods=['POST'])
def add_fighter():
    data = request.get_json()
    new_fighter = Fighter(
        name=data.get('name'),
        collection=data.get('collection'),
        image=data.get('image'),
        rank=data.get('rank'),
        nft_address=data.get('nft_address'),
        game_characteristics_json=data.get('game_characteristics_json'),
        handler=data.get('handler')
    )

    db.session.add(new_fighter)
    db.session.commit()

    return jsonify(new_fighter.to_dict()), 201
#@general_routes.route('/api/start-game', methods=['POST'])
#def start_game():
#    game_thread = threading.Thread(target=run_game)
#    game_thread.start()
#    return jsonify({'status': 'Game started'})

