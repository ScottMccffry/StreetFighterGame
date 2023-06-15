from app.models import Fighter
from app.database import db

# Fetch all the records from the Fighter table
fighters = Fighter.query.all()

# Loop through each record and print it out
for fighter in fighters:
    print(f"ID: {fighter.id}, Name: {fighter.name}, Group: {fighter.group}, Image: {fighter.image}, NFT Address: {fighter.nft_address}, Game Char. Link: {fighter.game_characteristics_link}")
