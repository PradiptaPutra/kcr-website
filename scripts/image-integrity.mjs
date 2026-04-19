import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DATA_FILE = path.join(ROOT, 'src/data/kcrData.ts');
const IMAGE_DIR = path.join(ROOT, 'public/assets/images/products');

const readRefs = () => {
  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  const matches = [...raw.matchAll(/img:\s*"([^"]+)"/g)];
  return [...new Set(matches.map((m) => m[1]).filter((p) => p.startsWith('/assets/images/products/')))];
};

const baseCandidates = (missingName) => {
  const normalized = missingName.toUpperCase();
  const withoutExt = normalized.replace(/\.[A-Z0-9]+$/, '');
  const noVariant = withoutExt
    .replace(/_[0-9]+PX$/, '')
    .replace(/_[0-9]{2}$/, '')
    .replace(/_[0-9]+$/, '');

  return [
    `${withoutExt}.jpg`,
    `${withoutExt}.png`,
    `${noVariant}.jpg`,
    `${noVariant}.png`,
    `${noVariant}_01.jpg`,
    `${noVariant}_01.png`,
  ];
};

const main = () => {
  if (!fs.existsSync(IMAGE_DIR)) {
    console.error('Image directory not found:', IMAGE_DIR);
    process.exit(1);
  }

  const refs = readRefs();
  const files = fs.readdirSync(IMAGE_DIR);
  const fileSet = new Set(files.map((f) => f.toUpperCase()));

  const missing = refs
    .map((ref) => path.basename(ref))
    .filter((name) => !fileSet.has(name.toUpperCase()));

  let aliasesCreated = 0;

  for (const missingName of missing) {
    const candidates = baseCandidates(missingName);
    const source = candidates.find((name) => fileSet.has(name.toUpperCase()));
    if (!source) continue;

    const sourcePath = path.join(IMAGE_DIR, files.find((f) => f.toUpperCase() === source.toUpperCase()));
    const targetPath = path.join(IMAGE_DIR, missingName);
    fs.copyFileSync(sourcePath, targetPath);
    aliasesCreated += 1;
    fileSet.add(missingName.toUpperCase());
  }

  const finalMissing = refs
    .map((ref) => path.basename(ref))
    .filter((name) => !fileSet.has(name.toUpperCase()));

  console.log(`Checked refs: ${refs.length}`);
  console.log(`Created aliases: ${aliasesCreated}`);
  console.log(`Missing after repair: ${finalMissing.length}`);
  if (finalMissing.length > 0) {
    console.log(finalMissing.join('\n'));
    process.exit(2);
  }
};

main();
