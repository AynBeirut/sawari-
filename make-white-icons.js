const PSD = require('psd');
const { Jimp } = require('jimp');
const path = require('path');
const fs = require('fs');

const layerNames = [
  'weight_9361040',
  'balcony_6100616',
  'cctv_13347367',
  'parking_lot_13320115',
  'pilot_18004123',
  'snowy_17606018',
  'swimming_pool_18304138',
];

const outDir = path.join(__dirname, 'assets', 'psd-export', 'icons-white');
fs.mkdirSync(outDir, { recursive: true });

function findNode(node, name) {
  const normalized = n => n.toLowerCase().replace(/[-\s]+/g, '_');
  if (node.name && normalized(node.name) === name) return node;
  if (node.children) {
    for (const child of node.children()) {
      const found = findNode(child, name);
      if (found) return found;
    }
  }
  return null;
}

async function run() {
  const psd = PSD.fromFile(path.join(__dirname, 'Index.psd'));
  psd.parse();

  for (const name of layerNames) {
    const node = findNode(psd.tree(), name);
    if (!node) {
      console.error('NOT FOUND:', name);
      continue;
    }

    const tmp = path.join(outDir, name + '_tmp.png');
    await node.saveAsPng(tmp);

    const img = await Jimp.read(tmp);
    img.scan(0, 0, img.bitmap.width, img.bitmap.height, function (x, y, idx) {
      const a = this.bitmap.data[idx + 3];

      if (a < 30) {
        // Transparent → stay transparent
        this.bitmap.data[idx + 3] = 0;
      } else {
        // Any visible pixel (colored icon art) → opaque white
        this.bitmap.data[idx + 0] = 255;
        this.bitmap.data[idx + 1] = 255;
        this.bitmap.data[idx + 2] = 255;
        this.bitmap.data[idx + 3] = 255;
      }
    });

    await img.write(path.join(outDir, name + '.png'));
    fs.unlinkSync(tmp);
    console.log('done:', name + '.png');
  }

  console.log('All done.');
}

run().catch(console.error);
