from app.models import Fighter
from app.database import db

try:
    # Create a new fighter instance with the data
    new_fighter = Fighter(
        name="Fighter Name",
        group="Fighter Group",
        image="Fighter Image URL",
        nft_address="NFT Address",
        game_characteristics="Game Characteristics JSON"
    )
    # Add the new fighter to the database session
    db.session.add(new_fighter)
    # Commit the session to save the changes
    db.session.commit()
except Exception as e:
    print(f"Error adding new fighter: {e}")
    db.session.rollback()
