import fastf1
from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.json_util import dumps
app = Flask(__name__)
CORS(app)
client = MongoClient('mongodb://localhost:27017/')
db = client['F1-Interactive']
driversCollection = db['Drivers']
fastf1.Cache.enable_cache('./cache')
@app.route("/drivers")
def Drivers():
    drivers = list(driversCollection.find())
    return dumps(drivers)

