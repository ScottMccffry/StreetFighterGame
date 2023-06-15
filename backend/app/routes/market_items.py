from flask import Blueprint, jsonify

marketItems_routes = Blueprint('marketItems_routes', __name__)
fighters = [
       {
    "name": 'Raven Simmons',
    "collection":'SWC',
    "handler": '@raven',
    "image": 'https://assets.codepen.io/3685267/nft-dashboard-pro-1.jpg',
    "rank":1,
  },
  {
    "name": 'Uriah Gardner',
    "collection":'DA',
    "handler": '@uriah',
    "image": 'https://assets.codepen.io/3685267/nft-dashboard-pro-2.jpg',
    "rank":2,
  },
  {
    "name": 'Colin Mitchell',
    "collection":'DA',
    "handler": '@colin',
    "image": 'https://assets.codepen.io/3685267/nft-dashboard-pro-4.jpg',
    "rank":3,
  },
  {
    "name": 'Emely Hall',
    "collection":'SWC',
    "handler": '@emely',
    "image": 'https://assets.codepen.io/3685267/nft-dashboard-pro-3.jpg',
    "rank":4,
  },
  {
    "name": 'Raphael Scott',
    "collection":'SWC',
    "handler": '@Raphael',
    "image": 'https://assets.codepen.io/3685267/nft-dashboard-pro-5.jpg',
    "rank":5,
  },
    ];
items = [
  {
        "key": "1",
        "owner": 4,
        "image": "https://assets.codepen.io/3685267/nft-dashboard-art-0.jpg",
        "title": "Abstract Art Painting",
        "timeLeft": 84670923,
    },
    {
        "key": "2",
        "owner": 0,
        "image": "https://assets.codepen.io/3685267/nft-dashboard-art-1.jpg",
        "price": "2.5",
        "title": "Abstract Art Painting",
        "timeLeft": 12873491,
    },
    {
        "key": "3",
        "owner": 3,
        "image": "https://assets.codepen.io/3685267/nft-dashboard-art-2.jpg",
        "price": "9.0",
        "title": "Purple Liquid Painting",
        "timeLeft": 84720185,
    },
    {
        "key": "4",
        "owner": 1,
        "image": "https://assets.codepen.io/3685267/nft-dashboard-art-3.jpg",
        "price": "16.5",
        "title": "Generative Art",
        "timeLeft": 43826185,
    },
    {
        "key": "5",
        "owner": 2,
        "image": "https://assets.codepen.io/3685267/nft-dashboard-art-4.jpg",
        "price": "4.0",
        "title": "Liquid Base Painting",
        "timeLeft": 134627,
    },
    {
        "key": "6",
        "owner": 3,
        "image": "https://assets.codepen.io/3685267/nft-dashboard-art-5.jpg",
        "price": "1.3",
        "title": "Colorful Wind Painting",
        "timeLeft": 12008745,
    },
    ];


@marketItems_routes.route('/api/marketItems', methods=['GET'])
def get_items():
    return jsonify(items);

@marketItems_routes.route('/api/fighters', methods=['GET'])
def get_fighters():
   return jsonify(fighters)
