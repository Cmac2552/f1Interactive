def run():
    import fastf1
    from pymongo import MongoClient
    client = MongoClient('mongodb://localhost:27017/')
    db = client['F1-Interactive']
    fastf1.Cache.enable_cache('./cache')
    years = [2018,2019,2020,2021,2022]
    for year  in years:
        season = fastf1.get_event_schedule(year, include_testing=False)
        Locations = []
        collection = db[str(year)+'Races']
        for Location in season.Location:
            Locations.append(Location)
            session = fastf1.get_session(2022,Location, 'Race')
            session.load()
            document ={
                "location":Location,
                'name':session.event.EventName
            }
            if(collection.count_documents(document)==0):
                collection.insert_one(document)
        