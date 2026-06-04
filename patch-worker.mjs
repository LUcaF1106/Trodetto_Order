import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const serverDir = './dist/trodetto-order/server';
const files = readdirSync(serverDir).filter(f => f.endsWith('.mjs'));

for (const file of files) {
  const path = join(serverDir, file);
  let content = readFileSync(path, 'utf8');
  const original = content;

  content = content.replace(/createRequire\([^)]*\)/g, 'createRequire("file:///index.js")');

  if (content !== original) {
    writeFileSync(path, content);
    console.log(`Patched: ${file}`);
  } else if (content.includes('createRequire')) {
    // Stampa il contenuto completo del file piccolo
    if (content.length < 2000) {
      console.log(`CONTENT OF ${file}:\n${content}`);
    } else {
      const idx = content.indexOf('createRequire');
      console.log(`CONTEXT ${file}: ${content.slice(Math.max(0, idx-30), idx+80)}`);
    }
  }
}
console.log('Patch complete.');
