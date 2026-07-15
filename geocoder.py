# geocoder.py
import json
import os
import time
import requests

CACHE_FILE = "geocode_cache.json"

def laad_cache():
    if os.path.exists(CACHE_FILE):
        with open(CACHE_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {}

def sla_cache_op(cache):
    with open(CACHE_FILE, 'w', encoding='utf-8') as f:
        json.dump(cache, f, indent=4, ensure_ascii=False)

def geocode_adres(zoekterm):
    cache = laad_cache()
    if zoekterm in cache:
        return cache[zoekterm]["lat"], cache[zoekterm]["lon"]
    
    # Niet in cache? Zoeken via OpenStreetMap
    print(f"Geocoding via OSM: {zoekterm}")
    url = "https://nominatim.openstreetmap.org/search"
    headers = {"User-Agent": "RicciottiTourMapAutomationScript"}
    params = {"q": zoekterm, "format": "json", "limit": 1}
    
    try:
        response = requests.get(url, params=params, headers=headers)
        data = response.json()
        if data:
            lat = float(data[0]["lat"])
            lon = float(data[0]["lon"])
            
            # Opslaan in cache
            cache[zoekterm] = {"lat": lat, "lon": lon}
            sla_cache_op(cache)
            
            # Respecteer de OSM terms of service (max 1 request per seconde)
            time.sleep(2)
            return lat, lon
    except Exception as e:
        print(f"Fout bij geocoding van {zoekterm}: {e}")
        
    return None, None

def voeg_coordinaten_toe(performances):
    for p in performances:
        lat, lon = None, None
        
        # STAP 1: Probeer de meest specifieke combinatie (Titel + Adres)
        if p["titel"] and p["adres"]:
            if p["titel"] in p["adres"] or p["adres"] in p["titel"]:
                zoekterm = p["adres"]
            else:
                zoekterm = f"{p['titel']}, {p['adres']}"
            lat, lon = geocode_adres(zoekterm)
            
        # STAP 2: Fallback naar alleen het adres (als Stap 1 faalt)
        if not lat and p["adres"]:
            print(f"-> Niet gevonden. Fallback naar alleen adres...")
            lat, lon = geocode_adres(p["adres"])
            
        # STAP 3: Fallback naar Locatienaam + Stad (als het adres ook niet werkt of er niet is)
        if not lat and p["titel"] and p["stad"]:
            print(f"-> Nog niet gevonden. Fallback naar Locatienaam + Stad...")
            zoekterm_locatie = f"{p['titel']}, {p['stad']}"
            lat, lon = geocode_adres(zoekterm_locatie)
            
        # Ultieme redding: als echt niets werkt, zet hem dan gewoon in het centrum van de stad
        if not lat and p["stad"]:
            print(f"-> Ultieme fallback: Alleen op stadsnaam zoeken...")
            lat, lon = geocode_adres(p["stad"])
            
        p["lat"] = lat
        p["lon"] = lon
        
    return performances