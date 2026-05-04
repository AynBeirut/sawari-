#!/usr/bin/env python3
from psd_tools import PSDImage
import os

psd_path = "design/Index (2).psd"
output_dir = "assets/index-export"

print(f"Opening {psd_path}")
psd = PSDImage.open(psd_path)

print(f"Document size: {psd.width} x {psd.height}")
print(f"Exporting layers to {output_dir}")

os.makedirs(output_dir, exist_ok=True)

layer_count = 0
# First, just list all layer names to find what we need
for i, layer in enumerate(psd.descendants()):
    if layer.kind == 'pixel':
        print(f"  [{i:03d}] {layer.name} (visible: {layer.is_visible()})")

print(f"\nFound {len(list(psd.descendants()))} total layers")
