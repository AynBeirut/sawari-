const PSD = require('psd');
const fs = require('fs');
const path = require('path');

// Icon layer names from the manifest
const iconLayerNames = [
  'weight_9361040',
  'balcony_6100616',
  'cctv_13347367',
  'parking_lot_13320115',
  'pilot_18004123',
  'snowy_17606018',
  'swimming_pool_18304138',
];

async function run() {
  const psd = PSD.fromFile('Index.psd');
  psd.parse();

  const outDir = path.join('assets', 'psd-export', 'icons-white');
  fs.mkdirSync(outDir, { recursive: true });

  const tree = psd.tree();

  function findNode(node, name) {
    if (node.name && node.name.toLowerCase().replace(/[-\s]+/g,'_') === name) return node;
    if (node.children) {
      for (const child of node.children()) {
        const found = findNode(child, name);
        if (found) return found;
      }
    }
    return null;
  }

  for (const layerName of iconLayerNames) {
    const node = findNode(tree, layerName);
    if (!node) {
      console.log('NOT FOUND:', layerName);
      continue;
    }
    const outName = layerName + '.png';
    const outPath = path.join(outDir, outName);
    await node.saveAsPng(outPath);
    console.log('✓ saved', outName);
  }
  console.log('Done.');
}

run().catch(console.error);
