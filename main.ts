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

import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
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

// Caps from the scorer's gate: at most 163840 bytes of dossier text, at most
// 4 screenshots of at most 256 KiB each, at most 993 entries / 16 MiB in app/.
const dossier = buildDossier(targetDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
writeFileSync(join(targetDir, 'dossier.json'), dossier);
console.log(`NusaData entry written to ${targetDir}`);
