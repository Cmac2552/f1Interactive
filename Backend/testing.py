import fastf1
from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
app = Flask(__name__)
CORS(app)
client = MongoClient('mongodb://localhost:27017/')
db = client['mydatabase']
collection = db['mycollection']
fastf1.Cache.enable_cache('./cache')
@app.route("/")
def hello_world():
    session = fastf1.get_session(2019, 'Monza', 'Q')
    session.load(telemetry=False, laps=False, weather=False)
    vettel = session.get_driver('VET')
    document = {'name': vettel['FirstName']}
    collection.insert_one(document)
    return {"name":vettel['FirstName']}
