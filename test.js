const fs = require('fs');
const data = JSON.parse(fs.readFileSync('Index-layers.json'));
function findType(arr, count=0) {
  if (count > 5) return;
  for(let l of arr) {
    if(l.name && typeof l.name === 'string' && l.kind === 'type') {
      console.dir(l, {depth: null});
      count++;
    }
    if(l.children) count = findType(l.children, count) || count;
    if (count > 5) return count;
  }
  return count;
}
findType(data.layers || data);
