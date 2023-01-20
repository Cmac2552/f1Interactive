import fastf1
from flask import Flask
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
fastf1.Cache.enable_cache('./cache')
@app.route("/")
def hello_world():
    session = fastf1.get_session(2019, 'Monza', 'Q')
    session.load(telemetry=False, laps=False, weather=False)
    vettel = session.get_driver('VET')
    return {"name":vettel['FirstName']}