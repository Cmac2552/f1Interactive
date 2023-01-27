import fastf1
from flask import Flask, jsonify, send_file
from flask_cors import CORS
from pymongo import MongoClient
from bson.json_util import dumps
from matplotlib.figure import Figure
import base64
from io import BytesIO
import fastf1.plotting
import DriverScript
import RaceScript

app = Flask(__name__)
CORS(app)
client = MongoClient('mongodb://localhost:27017/')
db = client['F1-Interactive']
fastf1.Cache.enable_cache('./cache')

if db['2018Races'].count_documents({}) == 0:
    RaceScript.run()
    
if db['2018Drivers'].count_documents({}) == 0:
    DriverScript.run()



@app.route("/drivers/<year>", methods=['GET'])
def Drivers(year):
    drivers = list(db[str(year)+'Drivers'].find())
    return dumps(drivers)

@app.route("/data/<driver1>/<driver2>/<race>/<year>/<session>", methods=['GET'])
def data(driver1, driver2, race,year,session):
    data = fastf1.get_session(int(year), race, session[0])
    data.load()
    try:
        driver1_lap = data.laps.pick_driver(driver1).pick_fastest()
        driver1_tel = driver1_lap.get_car_data().add_distance()
        
    except:
        return{"error":"../assets/no_driver1_data.PNG"}
    try:
        driver2_lap = data.laps.pick_driver(driver2).pick_fastest()
        driver2_tel = driver2_lap.get_car_data().add_distance()
    except:
        return{"error": "../assets/no_driver2_data.PNG"}
    dbDriver1 =db[str(year)+'Drivers'].find_one({"abbreviation":driver1})
    dbDriver2 = db[str(year)+'Drivers'].find_one({"abbreviation":driver2})
    driver1_color = '#'+dbDriver1['teamColor']
    if dbDriver1['teamName'] == dbDriver2['teamName']:
        driver2_color = '#FFFFFF'
    else:
        driver2_color = '#'+dbDriver2['teamColor']
    fig = Figure(facecolor="#000000")
    ax = fig.subplots()
    ax.plot(driver1_tel['Distance'], driver1_tel['Speed'], color=driver1_color, label=driver1)
    ax.plot(driver2_tel['Distance'], driver2_tel['Speed'], color=driver2_color, label=driver2)
    ax.set_xlabel('Distance in m')
    ax.set_ylabel('Speed in km/h')
    ax.legend()
    ax.set_facecolor("#000000")
    ax.spines['bottom'].set_color('white')
    ax.spines['top'].set_color('white') 
    ax.spines['right'].set_color('white')
    ax.spines['left'].set_color('white')
    ax.tick_params(axis='x', colors='white')
    ax.tick_params(axis='y', colors='white')
    ax.yaxis.label.set_color('white')
    ax.xaxis.label.set_color('white')
    ax.title.set_color('white')
    ax.set_title(f"Fastest Lap Comparison \n "
             f"{data.event['EventName']} {data.event.year} {session}",color = "white")
    buf = BytesIO()
    fig.savefig(buf, format="png")
    buf.seek(0)
    data = base64.b64encode(buf.getbuffer()).decode("ascii")
    plot = {"image": data}
    return plot
    
@app.route("/races/<year>", methods=['GET'])
def Races(year):
    racesCollection = db[str(year)+'Races']
    races = list(racesCollection.find())
    return dumps(races)
