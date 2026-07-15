# update.py
from scraper import scrape_performances
from geocoder import voeg_coordinaten_toe
from map_generator import genereer_kaart

def main():
    print("Stap 1: Ricciotti website scrapen...")
    optredens = scrape_performances()
    print(f"{len(optredens)} optredens gevonden op de website.")
    
    print("\nStap 2: Adressen omzetten naar coördinaten (geocoding)...")
    optredens_met_coordinaten = voeg_coordinaten_toe(optredens)
    
    print("\nStap 3: Interactieve Folium kaart genereren...")
    genereer_kaart(optredens_met_coordinaten, output_pad="output/tourkaart.html")
    print("\nProces voltooid!")

if __name__ == "__main__":
    main()