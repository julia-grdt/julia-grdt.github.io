# config.py

URL = "https://ricciotti.nl/tour/ricciotti_per_tutti/"

# Koppeling van dagen aan CSS-kleuren (zoals in jouw originele HTML-legenda)
DAG_KLEUREN = {
    "wo 22 jul.": "#e6194B",
    "do 23 jul.": "#3cb44b",
    "vr 24 jul.": "#4363d8",
    "za 25 jul.": "#f58231",
    "zo 26 jul.": "#911eb4",
    "ma 27 jul.": "#42d4f4",
    "di 28 jul.": "#f032e6",
    "wo 29 jul.": "#bfef45",
    "do 30 jul.": "#fabed4",
    "vr 31 jul.": "#469990",
    "zo 2 aug.": "#9A6324"
}

# Hulp-ID's voor HTML checkboxes (zonder spaties/leestekens)
def geef_dag_id(dag_tekst):
    # vb: "wo 22 jul." -> "wo22jul"
    return dag_tekst.replace(" ", "").replace(".", "")