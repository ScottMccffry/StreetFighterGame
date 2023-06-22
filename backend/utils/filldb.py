import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app import create_app
from app.models import Fighter
from app.models import NFTmarketplace
from app.database import db

app = create_app()

with app.app_context():
    try:
        # Create a new fighter instance with the data
        new_fighter = NFTmarketplace(
           
            owner= 0,
            image= "https://assets.codepen.io/3685267/nft-dashboard-art-0.jpg",
            title= "Abstract Art Painting",
            auction= True,
            timeLeft=84670923,
            price= 1
        )
        # Add the new fighter to the database session
        db.session.add(new_fighter)
        # Commit the session to save the changes
        db.session.commit()
    except Exception as e:
        print(f"Error adding new fighter: {e}")
        db.session.rollback()
