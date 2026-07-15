# scraper.py
import requests
from bs4 import BeautifulSoup
import json
from config import URL

def scrape_performances():
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    response = requests.get(URL, headers=headers)
    if response.status_code != 200:
        print(f"Fout bij ophalen website: {response.status_code}")
        return []

    soup = BeautifulSoup(response.text, "html.parser")
    performances = []
    
    # We zoeken nu heel gericht naar de dag-blokken onder '.dates-upcoming'
    day_blocks = soup.select(".dates-upcoming > li")
    
    for block in day_blocks:
        # Pak de datumkop (bijv. "wo 22 jul.")
        day_element = block.find("h3")
        if not day_element:
            continue
        huidige_dag = day_element.get_text(strip=True)
        
        # Loop door alle optredens van deze specifieke dag
        performance_elements = block.select(".performance")
        for element in performance_elements:
            time_div = element.find('div', class_='time')
            loc_div = element.find('div', class_='location')
            type_div = element.find('div', class_='type-of-date')
            extra_div = element.find('div', class_='extra-info')
            
            # Schoon de tijd op (vervang eventuele punten door dubbele punten)
            tijd_tekst = time_div.get_text(strip=True).replace(".", ":") if time_div else ""
            
            # Locatie en Stad bepalen uit de titel
            venue_city = loc_div.get_text(strip=True) if loc_div else ""
            if "," in venue_city:
                name, city = venue_city.rsplit(",", 1)
                name, city = name.strip(), city.strip()
            else:
                name, city = venue_city.strip(), ""
            
            # Bepaal of het openbaar of besloten is
            type_tekst = type_div.get_text(strip=True) if type_div else ""
            status = "besloten" if "besloten" in type_tekst.lower() else "openbaar"
            
            # Adres en Link bepalen
            adres = ""
            if status == "openbaar" and extra_div:
                p_tag = extra_div.find("p")
                if p_tag:
                    adres = p_tag.get_text(" ", strip=True)
                    # Haal de tekst van de link eventueel weg uit het adres
                    adres = adres.replace("Reserveer via deze link.", "").strip()

            # PRIVACY & FALLBACK REGELS:
            if status == "besloten":
                # Voor besloten optredens: anonimiseren en de geolocator naar de stad sturen
                titel = "Besloten optreden"
                stad = city if city else "Nederland"
                adres = stad  # Zorgt dat de geolocator in jouw tour_map.py op de stad zoekt
            else:
                # Voor openbare optredens
                titel = venue_city  # Behoud de originele titel (Locatie, Stad)
                stad = city if city else "Nederland"
                if not adres:
                    adres = venue_city  # Fallback als er geen <div class="extra-info"> is

            perf_data = {
                "dag": huidige_dag,
                "tijd": tijd_tekst,
                "titel": titel,
                "type_info": type_tekst,
                "status": status,
                "adres": adres,
                "stad": stad
            }
            performances.append(perf_data)
            
    bestandsnaam = "optredens.json"
    with open(bestandsnaam, "w", encoding="utf-8") as f:
        # indent=4 zorgt ervoor dat het bestand mooi leesbaar onder elkaar staat
        # ensure_ascii=False zorgt dat letters met accenten (zoals ë of á) netjes worden opgeslagen
        json.dump(performances, f, indent=4, ensure_ascii=False)
    
    print(f"Succes! Alle {len(performances)} optredens zijn opgeslagen in {bestandsnaam}")
    # ---------------------------------------------------------------

    return performances

if __name__ == "__main__":
    # Test het script direct los
    resultaat = scrape_performances()
    print(f"Succesvol {len(resultaat)} optredens gevonden!")