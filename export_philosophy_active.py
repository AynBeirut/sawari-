#!/usr/bin/env python3
from psd_tools import PSDImage
import os

psd_path = "design/Index (2).psd"
output_dir = "assets/philosophy-active"

print(f"Opening {psd_path}")
psd = PSDImage.open(psd_path)

print(f"Document size: {psd.width} x {psd.height}")
print(f"Exporting active state circles to {output_dir}")

os.makedirs(output_dir, exist_ok=True)

layer_count = 0
# Export all visible pixel layers from philosophy section
for i, layer in enumerate(psd.descendants()):
    if layer.kind == 'pixel' and layer.is_visible():
        safe_name = "".join(c if c.isalnum() or c in (' ', '-') else '-' for c in layer.name)
        safe_name = safe_name.replace(' ', '-').lower()
        filename = f"{i:04d}-{safe_name}.png"
        filepath = os.path.join(output_dir, filename)
        
        try:
            layer_img = layer.composite()
            if layer_img and layer_img.width > 0 and layer_img.height > 0:
                layer_img.save(filepath)
                print(f"  [{i:04d}] {layer.name} -> {filename} ({layer_img.width}x{layer_img.height})")
                layer_count += 1
        except Exception as e:
            print(f"  X [{i:04d}] {layer.name} - Error: {e}")

print(f"\nExported {layer_count} circle/ellipse layers to {output_dir}")
print("Check the exported files to identify which are the active state circles")
