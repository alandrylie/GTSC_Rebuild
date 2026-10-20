// Production build with the build date stamped in, so the footer shows which
// build each site (web.app / new.gtsc.co.uk) is running. Run with: npm run build
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';

// UK date and time, e.g. "20 Oct 2026, 14:32"
const buildDate = new Date().toLocaleString('en-GB', {
  timeZone: 'Europe/London',
  dateStyle: 'medium',
  timeStyle: 'short',
});

// Run the Angular CLI directly with Node, so no shell quoting is needed on Windows.
// --define swaps every BUILD_DATE in the code for this string (it must be quoted JSON).
const ngCli = createRequire(import.meta.url).resolve('@angular/cli/bin/ng.js');
const result = spawnSync(
  process.execPath,
  [ngCli, 'build', '--define', `BUILD_DATE=${JSON.stringify(buildDate)}`],
  { stdio: 'inherit' },
);

console.log(`Build date stamped: ${buildDate}`);
process.exit(result.status ?? 1);
