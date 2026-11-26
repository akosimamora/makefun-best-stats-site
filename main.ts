// NusaData — the entrypoint for this make.fun entry.
//
// What it does: gather the static site in app/ and the screenshots in
// screenshots/ into the output directory, then write dossier.json with the
// vendored make.fun library (the scorer requires that file to be byte for
// byte what its own copy of the library writes, so vendor/makefun-frontend.ts
// is used untouched).
//
// Run it locally with:
//   MAKEFUN_OUTPUT_DIR=out node main.ts
// In the grader's container MAKEFUN_OUTPUT_DIR is unset and /output is used.
//
// All paths are resolved against this file's own directory, never against the
// process working directory, so the entrypoint works no matter where the
// grader invokes it from. A $MAKEFUN_INPUT_DIR override is honoured when set,
// for graders that stage the repo elsewhere.

import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoRoot = process.env.MAKEFUN_INPUT_DIR
  ? process.env.MAKEFUN_INPUT_DIR
  : dirname(fileURLToPath(import.meta.url));

const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

function copyTree(sourceName) {
  const from = join(repoRoot, sourceName);
  const to = join(targetDir, sourceName);
  if (!existsSync(from)) return;
  rmSync(to, { recursive: true, force: true });
  cpSync(from, to, { recursive: true });
}

mkdirSync(targetDir, { recursive: true });
copyTree('app');
copyTree('screenshots');

// Fail fast if the build produced nothing to score: a missing or empty
// app/ or screenshots/ means the entry is broken, and it is better to error
// here than to hand the grader an empty output.
function requireNonEmptyDir(dirPath, label) {
  if (!existsSync(dirPath) || readdirSync(dirPath).length === 0) {
    throw new Error(`NusaData entry is incomplete: ${label} is missing or empty (${dirPath})`);
  }
}
requireNonEmptyDir(join(targetDir, 'app'), 'app');
requireNonEmptyDir(join(targetDir, 'screenshots'), 'screenshots');

// Caps from the scorer's gate: at most 163840 bytes of dossier text, at most
// 4 screenshots of at most 256 KiB each, at most 993 entries / 16 MiB in app/.
const dossier = buildDossier(targetDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
const dossierPath = join(targetDir, 'dossier.json');
writeFileSync(dossierPath, dossier);
if (statSync(dossierPath).size === 0) {
  throw new Error(`NusaData entry is incomplete: dossier.json is empty (${dossierPath})`);
}
console.log(`NusaData entry written to ${targetDir}`);
