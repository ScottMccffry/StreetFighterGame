from flask import request, jsonify, Blueprint
from app.models import NFTcollections
from app import db

collection_routes = Blueprint('collection_routes', __name__)

@collection_routes.route('/collections', methods=['GET'])
def get_collections():
    collections = NFTcollections.query.all()
    return jsonify([collection.to_dict() for collection in collections]), 200

@collection_routes.route('/collection/<id>', methods=['GET'])
def get_collection(id):
    collection = NFTcollections.query.get(id)
    if not collection:
        return {"error": "Collection not found"}, 404
    return jsonify(collection.to_dict()), 200

@collection_routes.route('/create-collection', methods=['POST'])
def create_collection():
    data = request.get_json()
    new_collection = NFTcollections(
        id=data['id'],
        address=data['address'],
        abi=data['abi'],
        name=data['name'], 
        description=data['description'], 
    )
    db.session.add(new_collection)
    db.session.commit()
    return jsonify(new_collection.to_dict()), 201

@collection_routes.route('/update-collection/<id>', methods=['PUT'])
def update_collection(id):
    collection = NFTcollections.query.get(id)
    if not collection:
        return {"error": "Collection not found"}, 404

    data = request.get_json()
    collection.name = data.get('name', collection.name)
    collection.description = data.get('description', collection.description)
    #not updating the ID, abi, or address
    db.session.commit()
    return jsonify(collection.to_dict()), 200

@collection_routes.route('/delete-collection/<id>', methods=['DELETE'])
def delete_collection(id):
    collection = NFTcollections.query.get(id)
    if not collection:
        return {"error": "Collection not found"}, 404

    db.session.delete(collection)
    db.session.commit()
    return {"message": "Collection deleted successfully"}, 200