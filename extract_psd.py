from psd_tools import PSDImage
import json

psd = PSDImage.open('Index.psd')
print(f'SIZE {psd.width} {psd.height}')
print(f'TOP_LAYERS {len(psd)}')

composite = psd.composite()
composite.save('Index-preview.png')

layers = []
for layer in psd.descendants():
    bbox = getattr(layer, 'bbox', None)
    if isinstance(bbox, tuple):
        box = list(bbox)
    elif bbox is None:
        box = None
    else:
        box = [
            getattr(bbox, 'x1', None),
            getattr(bbox, 'y1', None),
            getattr(bbox, 'x2', None),
            getattr(bbox, 'y2', None),
        ]

    layers.append(
        {
            'name': layer.name,
            'visible': bool(getattr(layer, 'visible', True)),
            'kind': str(getattr(layer, 'kind', 'unknown')),
            'bbox': box,
        }
    )

with open('Index-layers.json', 'w', encoding='utf-8') as f:
    json.dump(layers, f, indent=2, ensure_ascii=False)

print(f'DESCENDANT_LAYERS {len(layers)}')
print('WROTE Index-preview.png and Index-layers.json')
