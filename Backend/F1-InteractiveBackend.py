import fastf1
from flask import Flask, jsonify, send_file
from flask_cors import CORS
from pymongo import MongoClient
from bson.json_util import dumps
from matplotlib.figure import Figure
import base64
from io import BytesIO
import fastf1.plotting

app = Flask(__name__)
CORS(app)
client = MongoClient('mongodb://localhost:27017/')
db = client['F1-Interactive']
driversCollection = db['Drivers']
fastf1.Cache.enable_cache('./cache')
@app.route("/drivers", methods=['GET'])
def Drivers():
    drivers = list(driversCollection.find())
    return dumps(drivers)
@app.route("/data/<driver1>/<driver2>", methods=['GET'])
def data(driver1, driver2):
    data = fastf1.get_session(2021, 'Spanish Grand Prix', 'Q')
    data.load()
    driver1_lap = data.laps.pick_driver(driver1).pick_fastest()
    driver2_lap = data.laps.pick_driver(driver2).pick_fastest()
    driver1_tel = driver1_lap.get_car_data().add_distance()
    driver2_tel = driver2_lap.get_car_data().add_distance()
    mer_color = fastf1.plotting.team_color('MER')
    rbr_color = fastf1.plotting.team_color('RBR')
    fig = Figure()
    ax = fig.subplots()
    ax.plot(driver1_tel['Distance'], driver1_tel['Speed'], color=mer_color, label=driver1)
    ax.plot(driver2_tel['Distance'], driver2_tel['Speed'], color=rbr_color, label=driver2)
    ax.set_xlabel('Distance in m')
    ax.set_ylabel('Speed in km/h')
    ax.legend()
    buf = BytesIO()
    fig.savefig(buf, format="png")
    buf.seek(0)
    data = base64.b64encode(buf.getbuffer()).decode("ascii")
    plot = {"image": data}
    return plot
    
