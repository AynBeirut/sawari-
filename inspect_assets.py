import json

with open('assets/psd-export/manifest.json', encoding='utf-8') as f:
    data = json.load(f)

items = data['items']
items.sort(key=lambda x: x['size'][0] * x['size'][1], reverse=True)

for item in items[:120]:
    w, h = item['size']
    print(f"{item['file']} | {w}x{h} | {item['name']}")
