import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app import create_app
from app.models import Fighter
from app.database import db

app = create_app()

# Your fighters data
fighters = [
 #fighter data here 
    ];

with app.app_context():
    for fighter in fighters:
        try:
            # Create a new fighter instance with the data
            new_fighter = Fighter(
                name=fighter["name"],
                collection=fighter["collection"],
                handler=fighter["handler"],
                image=fighter["image"],
                rank=fighter["rank"],
                nft_address=fighter["nft_address"],
                game_characteristics=fighter["game_characteristics"],
            )
            # Add the new fighter to the database session
            db.session.add(new_fighter)
            # Commit the session to save the changes
            db.session.commit()
            print(f"Added fighter: {fighter['name']}")
        except Exception as e:
            print(f"Error adding new fighter: {e}")
            db.session.rollback()
