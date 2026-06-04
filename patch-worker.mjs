import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const serverDir = './dist/trodetto-order/server';
const files = readdirSync(serverDir).filter(f => f.endsWith('.mjs'));

for (const file of files) {
  const path = join(serverDir, file);
  let content = readFileSync(path, 'utf8');
  const original = content;

  content = content
    .replace(/createRequire\(__filename\)/g, 'createRequire("file:///index.js")')
    .replace(/createRequire\(void 0\)/g, 'createRequire("file:///index.js")')
    .replace(/createRequire\(undefined\)/g, 'createRequire("file:///index.js")')
    .replace(/createRequire\(import\.meta\.url\)/g, 'createRequire("file:///index.js")')
    .replace(/var (\w+)=createRequire\(([^)]*)\)/g, 'var $1=createRequire("file:///index.js")');

  if (content !== original) {
    writeFileSync(path, content);
    console.log(`Patched: ${file}`);
  } else if (content.includes('createRequire')) {
    const idx = content.indexOf('createRequire');
    console.log(`NOT PATCHED ${file}: ...${content.slice(idx - 10, idx + 60)}...`);
  }
}
console.log('Patch complete.');
