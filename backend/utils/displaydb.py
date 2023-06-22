import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app import create_app
from app.models import Fighter
from app.database import db
from app.models import Fight

app = create_app()

# Set up an application context
with app.app_context():
    # Fetch all the records from the Fighter table
    fights = Fight.query.all()

# Loop through each record and print it out
for fight in fights:
    print(f"ID: {fight.fighter1_id}, Name: {fight.fighter2_id}, Collection: {fight.odd1}, Image: {fight.image}, Rank: {fight.odd2}, NFT Address: {fight.fighter1}, Game Characteristics: {fight.fighter2}")



    