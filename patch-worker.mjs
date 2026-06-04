import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const serverDir = './dist/trodetto-order/server';
const files = readdirSync(serverDir).filter(f => f.endsWith('.mjs'));

for (const file of files) {
  const path = join(serverDir, file);
  let content = readFileSync(path, 'utf8');
  const original = content;

  // Sostituisce QUALSIASI chiamata a createRequire con argomento qualunque
  content = content.replace(/createRequire\([^)]*\)/g, 'createRequire("file:///index.js")');

  if (content !== original) {
    writeFileSync(path, content);
    console.log(`Patched: ${file}`);
  } else if (content.includes('createRequire')) {
    console.log(`NOT PATCHED ${file}`);
  }
}
console.log('Patch complete.');
