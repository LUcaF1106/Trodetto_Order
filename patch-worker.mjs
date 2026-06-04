import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const serverDir = './dist/trodetto-order/server';
const files = readdirSync(serverDir).filter(f => f.endsWith('.mjs'));

for (const file of files) {
  const path = join(serverDir, file);
  let content = readFileSync(path, 'utf8');
  const original = content;

  // Rimuove la riga che usa __ngCreateRequire(import.meta.url)
  // e sostituisce globalThis['require'] con una versione sicura
  content = content
    .replace(
      /import \{ createRequire as __ngCreateRequire \} from 'node:module';\s*/g,
      ''
    )
    .replace(
      /globalThis\['require'\] \?\?= __ngCreateRequire\(import\.meta\.url\);\s*/g,
      "globalThis['require'] ??= (m) => { throw new Error('require not supported: ' + m); };\n"
    );

  if (content !== original) {
    writeFileSync(path, content);
    console.log(`Patched: ${file}`);
  }
}
console.log('Patch complete.');
