import fastf1
from pymongo import MongoClient
client = MongoClient('mongodb://localhost:27017/')
db = client['F1-Interactive']
collection = db['Drivers']
fastf1.Cache.enable_cache('./cache')
season = fastf1.get_event_schedule(2022)
Locations = []
for Location in season.Location:
    Locations.append(Location)
    session = fastf1.get_session(2022,Location, 'Race')
    session.load()
    for driver in session.drivers:
        currDriver = session.get_driver(driver)
        document = {
            'firstName':currDriver['FirstName'],
            'lastName': currDriver['LastName'],
            'teamName': currDriver['TeamName'],
            'teamColor': currDriver['TeamColor'],
            'driverNumber': currDriver['DriverNumber'],
            'broadcastName': currDriver['BroadcastName'],
            'fullName': currDriver['FullName'],
            'abbreviation': currDriver['Abbreviation'],
            'year':2022
        }
        if(collection.count_documents(document)==0):
            collection.insert_one(document)
    

