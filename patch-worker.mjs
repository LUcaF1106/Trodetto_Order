import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const serverDir = './dist/trodetto-order/server';
const files = readdirSync(serverDir).filter(f => f.endsWith('.mjs'));

for (const file of files) {
  const path = join(serverDir, file);
  let content = readFileSync(path, 'utf8');

  // Sostituisce createRequire(__filename) con una versione sicura
  if (content.includes('createRequire(__filename)') || content.includes('createRequire(void 0)')) {
    content = content
      .replace(/createRequire\(__filename\)/g, 'createRequire("file:///index.js")')
      .replace(/createRequire\(void 0\)/g, 'createRequire("file:///index.js")');
    writeFileSync(path, content);
    console.log(`Patched: ${file}`);
  }
}
console.log('Patch complete.');
