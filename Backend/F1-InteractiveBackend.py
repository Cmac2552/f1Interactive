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
@app.route("/drivers")
def Drivers():
    drivers = list(driversCollection.find())
    return dumps(drivers)
@app.route("/data")
def data():
    data = fastf1.get_session(2021, 'Spanish Grand Prix', 'Q')
    data.load()
    ham_lap = data.laps.pick_driver('HAM').pick_fastest()
    ham_tel = ham_lap.get_car_data().add_distance()
    mer_color = fastf1.plotting.team_color('MER')
    fig = Figure()
    ax = fig.subplots()
    ax.plot(ham_tel['Distance'], ham_tel['Speed'], color=mer_color, label='HAM')
    ax.set_xlabel('Distance in m')
    ax.set_ylabel('Speed in km/h')
    ax.legend()
    buf = BytesIO()
    fig.savefig(buf, format="png")
    buf.seek(0)
    #may have to convert image to a json
    data = base64.b64encode(buf.getbuffer()).decode("ascii")
    send = {"image": data}
    return send
    # return send_file(buf,  download_name ='logo.png', mimetype='image/png')







    # dfs = ham_lap.to_json(orient = 'columns')
    # return(dfs)
