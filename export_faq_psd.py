from pathlib import Path
import json
import re

from psd_tools import PSDImage

ROOT = Path('.')
PSD_PATH = ROOT / 'assets' / 'FAQ.psd'
OUT_DIR = ROOT / 'assets' / 'faq-export'
MANIFEST = OUT_DIR / 'manifest.json'


def slugify(value: str) -> str:
    value = value.strip().lower()
    value = re.sub(r'[^a-z0-9]+', '-', value)
    value = re.sub(r'-+', '-', value).strip('-')
    return value or 'layer'


OUT_DIR.mkdir(parents=True, exist_ok=True)
psd = PSDImage.open(PSD_PATH)

print(f'Opening {PSD_PATH.name}')
print(f'Document size: {psd.width} x {psd.height}')
print(f'Exporting layers to {OUT_DIR}')

# Export full composition
full = psd.composite()
full.save(OUT_DIR / 'full-composite.png', format='PNG')

items = []
name_counts = {}
exported = 0

for idx, layer in enumerate(psd.descendants()):
    if not getattr(layer, 'visible', True):
        continue

    if getattr(layer, 'is_group', lambda: False)():
        continue

    if not getattr(layer, 'has_pixels', lambda: False)():
        continue

    try:
        rendered = layer.composite()
    except ImportError:
        rendered = layer.topil()
    if rendered is None:
        continue

    bbox = getattr(layer, 'bbox', None)
    if isinstance(bbox, tuple):
        x1, y1, x2, y2 = bbox
    elif bbox is not None:
        x1 = getattr(bbox, 'x1', 0)
        y1 = getattr(bbox, 'y1', 0)
        x2 = getattr(bbox, 'x2', 0)
        y2 = getattr(bbox, 'y2', 0)
    else:
        x1 = y1 = x2 = y2 = 0

    width = max(0, x2 - x1)
    height = max(0, y2 - y1)
    if width == 0 or height == 0:
        continue

    base = slugify(str(getattr(layer, 'name', 'layer')))
    count = name_counts.get(base, 0) + 1
    name_counts[base] = count
    file_name = f"{idx:03d}-{base}-{count}.png"
    out_path = OUT_DIR / file_name

    rendered.save(out_path, format='PNG')
    exported += 1
    
    layer_name = str(getattr(layer, 'name', ''))
    print(f'  [{idx:03d}] {layer_name} → {file_name}')

    items.append(
        {
            'file': file_name,
            'name': layer_name,
            'bbox': [x1, y1, x2, y2],
            'size': [width, height],
            'opacity': int(getattr(layer, 'opacity', 255)),
            'blend_mode': str(getattr(layer, 'blend_mode', '')),
        }
    )

with MANIFEST.open('w', encoding='utf-8') as f:
    json.dump(
        {
            'psd': str(PSD_PATH.name),
            'document_size': [psd.width, psd.height],
            'exported_layers': exported,
            'full_composite': 'full-composite.png',
            'items': items,
        },
        f,
        indent=2,
        ensure_ascii=False,
    )

print(f'\nExported {exported} visible pixel layers to {OUT_DIR}')
print(f'Wrote manifest: {MANIFEST}')
