import os

# Pfad zum img-Ordner anpassen
img_folder = "img"
output_path = "bilder.txt"

# Alle .jpg-Dateien im img-Ordner auflisten
jpg_files = sorted([f for f in os.listdir(img_folder) if f.lower().endswith(".jpg")])

# JS-Array mit Pfaden als String erzeugen
js_array = "const allImages = [\n  " + ", ".join([f"'img/{f}'" for f in jpg_files]) + "\n];\n"

# In Datei schreiben
with open(output_path, "w", encoding="utf-8") as f:
    f.write(js_array)

print(f"{output_path} wurde erstellt mit {len(jpg_files)} Einträgen.")
