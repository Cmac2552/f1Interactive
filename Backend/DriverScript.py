def run():
    import fastf1
    from pymongo import MongoClient
    client = MongoClient('mongodb://localhost:27017/')
    db = client['F1-Interactive']
    collection = db['Drivers']
    fastf1.Cache.enable_cache('./cache')
    years = [2018,2019,2020,2021,2022]
    for year in years:
        season = fastf1.get_event_schedule(year, include_testing=False) 
        Locations = []
        collection = db[str(year)+'Drivers']
        for Location in season.Location:
            Locations.append(Location)
            session = fastf1.get_session(2022,Location, 'Race')
            session.load()
            for driver in fastf1.api.driver_info(session.api_path):
                currDriver = fastf1.api.driver_info(session.api_path)[driver]
                try:
                    document = {
                        'firstName':currDriver['FirstName'],
                        'lastName': currDriver['LastName'],
                        'teamName': currDriver['TeamName'],
                        'teamColor': currDriver['TeamColour'],
                        'driverNumber': currDriver['RacingNumber'],
                        'broadcastName': currDriver['BroadcastName'],
                        'fullName': currDriver['FullName'],
                        'abbreviation': currDriver['Tla'],
                        'headshotURL':  currDriver['HeadshotUrl'],
                        'year':2022
                    }
                    if(collection.count_documents(document)==0):
                        collection.insert_one(document)
                except:
                    document = {
                        'firstName':currDriver['FirstName'],
                        'lastName': currDriver['LastName'],
                        'teamName': currDriver['TeamName'],
                        'teamColor': currDriver['TeamColour'],
                        'driverNumber': currDriver['RacingNumber'],
                        'broadcastName': currDriver['BroadcastName'],
                        'fullName': currDriver['FullName'],
                        'abbreviation': currDriver['Tla'],
                        'year':2022
                    }
                    if(collection.count_documents(document)==0):
                        collection.insert_one(document)
                    continue
                break
        

