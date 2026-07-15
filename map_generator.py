# map_generator.py
import folium
from folium.plugins import AntPath
from config import DAG_KLEUREN, geef_dag_id
import os

def genereer_kaart(performances, output_pad="tourkaart.html"):
    # Filter optredens met geldige coordinaten
    geldige_optredens = [p for p in performances if p["lat"] is not None and p["lon"] is not None]
    
    if not geldige_optredens:
        print("Geen geldige coördinaten gevonden om een kaart te maken.")
        return
        
    # Startpositie bepalen (gemiddelde van alle locaties)
    start_lat = sum(p["lat"] for p in geldige_optredens) / len(geldige_optredens)
    start_lon = sum(p["lon"] for p in geldige_optredens) / len(geldige_optredens)
    
    m = folium.Map(location=[start_lat, start_lon], zoom_start=8, control_scale=True)
    
    # Verzamel alle unieke dagen uit de gescrapete data die in onze config staan
    unieke_dagen = list(dict.fromkeys([p["dag"] for p in geldige_optredens if p["dag"] in DAG_KLEUREN]))
    
    # CSS & HTML injectie voor de custom titel en filters linksonderin
    titel_html = '''
    <div id="page-title" style="
        position: absolute; top: 10px; left: 50%; transform: translateX(-50%); z-index: 9999;
        background: rgba(255, 255, 255, 0.9); padding: 6px 16px; border-radius: 6px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3); font-family: sans-serif; font-weight: bold; text-align: center; font-size: 1.1rem;">
        RICCIOTTI PER TUTTI <br> AUTOMATISCHE TOURKAART
    </div>
    '''
    
    # Bouw het filtermenu dynamisch op
    filter_html = f'''
    <div id="day-filter" style="
        position: fixed; bottom: 20px; left: 20px; z-index: 9999;
        background: white; padding: 10px 14px; border-radius: 8px;
        box-shadow: 0 0 6px rgba(0,0,0,0.3); font-family: sans-serif; font-size: 12px;
        max-height: 400px; overflow-y: auto; width: 180px;">
        <b>Type optreden</b>
        <label style="display:flex;align-items:center;margin:2px 0;cursor:pointer;"><input type="checkbox" class="type-checkbox" data-type="openbaar" checked style="margin-right:6px;">Openbaar</label>
        <label style="display:flex;align-items:center;margin:2px 0;cursor:pointer;"><input type="checkbox" class="type-checkbox" data-type="besloten" checked style="margin-right:6px;">Besloten</label>
        <hr style="margin:6px 0; border:none; border-top:1px solid #ddd;">
        <b>Tourdagen</b>
        <label style="display:flex;align-items:center;margin:6px 0;cursor:pointer;">
            <input type="checkbox" id="day-toggle-all" checked style="margin-right:6px;"><b>Alles selecteren</b>
        </label>
    '''
    
    for dag in unieke_dagen:
        dag_id = geef_dag_id(dag)
        kleur = DAG_KLEUREN[dag]
        filter_html += f'''
        <label style="display:flex;align-items:center;margin:2px 0;cursor:pointer;">
            <input type="checkbox" class="day-checkbox" data-day="{dag_id}" checked style="margin-right:6px;">
            <span style="display:inline-block;width:12px;height:12px;background:{kleur};margin-right:6px;border-radius:50%;"></span>
            {dag}
        </label>
        '''
    filter_html += '</div>'
    
    m.get_root().html.add_child(folium.Element(titel_html))
    m.get_root().html.add_child(folium.Element(filter_html))
    
    # Voeg de markers toe en bewaar JavaScript-referenties om ze later te kunnen filteren
    js_marker_arrays = []
    coordinates_route = []
    
    for idx, p in enumerate(geldige_optredens, 1):
        dag_id = geef_dag_id(p["dag"])
        kleur = DAG_KLEUREN.get(p["dag"], "#333333")
        
        popup_text = f"""
        <b>{idx}. {p['titel']}</b><br>
        <i>{p['dag']} · {p['tijd']}</i><br>
        Status: {p['type_info']}<br>
        {p['adres']}
        """
        
        # Aangepast DivIcon met het volgnummer
        icon_html = f"""
        <div style="background-color:{kleur}; color:white; border-radius:50%; width:26px; height:26px;
                    display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:bold;
                    border:2px solid white; box-shadow:0 0 3px rgba(0,0,0,0.5);">
            {idx}
        </div>
        """
        
        marker = folium.Marker(
            location=[p["lat"], p["lon"]],
            popup=folium.Popup(popup_text, max_width=300),
            tooltip=f"{idx}. {p['dag']} {p['tijd']} – {p['titel']}",
            icon=folium.DivIcon(html=icon_html, class_name="empty")
        )
        marker.add_to(m)
        
        # Sla data op voor onze custom JS-filter
        js_marker_arrays.append({
            "id": marker.get_name(),
            "day": dag_id,
            "type": p["status"]
        })
        coordinates_route.append([p["lat"], p["lon"]])
        
    # Voeg de routelijn (AntPath) toe
    route_line = AntPath(
        locations=coordinates_route,
        color="#333333",
        pulse_color="#FFFFFF",
        weight=3,
        opacity=0.7,
        delay=800
    )
    route_line.add_to(m)
    
    # Custom JavaScript injectie om het filterpaneel te laten werken met de Leaflet markers
    custom_js = f"""
    <script>
    document.addEventListener("DOMContentLoaded", function() {{
        var markerData = {js_marker_arrays};
        var routeMapElement = {m.get_name()};
        var antPathLine = {route_line.get_name()};
        
        function updateFilters() {{
            var actieveDagen = Array.from(document.querySelectorAll('.day-checkbox:checked')).map(cb => cb.getAttribute('data-day'));
            var actieveTypes = Array.from(document.querySelectorAll('.type-checkbox:checked')).map(cb => cb.getAttribute('data-type'));
            
            var nieuweRoutePunten = [];
            
            markerData.forEach(function(mInfo) {{
                // Zoek het Leaflet object op via het interne ID window[mInfo.id] of direct via folium variabelen
                var leafletMarker = window[mInfo.id];
                if (leafletMarker) {{
                    if (actieveDagen.includes(mInfo.day) && actieveTypes.includes(mInfo.type)) {{
                        leafletMarker.addTo(routeMapElement);
                        nieuweRoutePunten.push(leafletMarker.getLatLng());
                    }} else {{
                        routeMapElement.removeLayer(leafletMarker);
                    }}
                }}
            }});
            
            // Update de lopende routelijn op basis van actieve markers
            if (antPathLine) {{
                antPathLine.setLatLngs(nieuweRoutePunten);
            }}
        }}
        
        // Event listeners voor checkboxes
        document.querySelectorAll('.day-checkbox, .type-checkbox').forEach(function(cb) {{
            cb.addEventListener('change', updateFilters);
        }});
        
        // Alles selecteren toggle
        var toggleAll = document.getElementById('day-toggle-all');
        if(toggleAll) {{
            toggleAll.addEventListener('change', function(e) {{
                document.querySelectorAll('.day-checkbox').forEach(function(cb) {{
                    cb.checked = e.target.checked;
                }});
                updateFilters();
            }});
        }}
    }});
    </script>
    """
    m.get_root().html.add_child(folium.Element(custom_js))
    
    # Zorg dat de output map bestaat en sla op
    os.makedirs(os.path.dirname(output_pad), exist_ok=True)
    m.save(output_pad)
    print(f"Succes! Kaart gegenereerd en opgeslagen in: {output_pad}")