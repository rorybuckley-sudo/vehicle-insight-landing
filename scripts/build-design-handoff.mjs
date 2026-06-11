// Bundles the site + buying journey into ONE self-contained HTML file in the
// Claude-design prototype format: readable JSX in a <script type="text/babel">
// block, compiled Tailwind CSS inline, React/Babel from CDN. Upload the output
// to a Claude design project and it is directly editable there.
//
// Usage: npm run build && node scripts/build-design-handoff.mjs
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

// Dependency order — each file only uses things defined above it.
const FILES = [
  'src/components/Icons.jsx',
  'src/components/Logo.jsx',
  'src/components/ui.jsx',
  'src/components/SocialProof.jsx',
  'src/data.jsx',
  'src/components/Header.jsx',
  'src/components/StickyCTA.jsx',
  'src/components/Hero.jsx',
  'src/components/SampleSection.jsx',
  'src/components/Steps.jsx',
  'src/components/Checks.jsx',
  'src/components/StatStrip.jsx',
  'src/components/Reasons.jsx',
  'src/components/Pricing.jsx',
  'src/components/FinalCTA.jsx',
  'src/components/Footer.jsx',
  'src/components/Journey.jsx',
  'src/App.jsx',
]

const stripModules = (code) =>
  code
    .replace(/import\s[\s\S]*?from\s+['"][^'"]+['"]\s*\n/g, '') // single & multi-line imports
    .replace(/export default function/g, 'function')
    .replace(/export function/g, 'function')
    .replace(/export const/g, 'const')

const js = FILES.map((f) => {
  const code = stripModules(fs.readFileSync(path.join(root, f), 'utf8'))
  return `// ─── ${f} ${'─'.repeat(Math.max(4, 70 - f.length))}\n${code}`
}).join('\n\n')

// Compiled Tailwind CSS from the latest production build.
const assetsDir = path.join(root, 'dist', 'assets')
const cssFile = fs.readdirSync(assetsDir).find((f) => f.endsWith('.css'))
if (!cssFile) throw new Error('No built CSS found — run `npm run build` first.')
const css = fs.readFileSync(path.join(assetsDir, cssFile), 'utf8')

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Vehicle Insight — Know the full story behind any vehicle</title>
<!--
  Vehicle Insight landing page + buying journey — single-file design handoff.
  Built from https://github.com/rorybuckley-sudo/vehicle-insight-landing
  Styling is compiled Tailwind CSS; edit the JSX below (Tailwind utility class
  names in className work against the compiled stylesheet — most utilities and
  arbitrary values used anywhere in the project are available).
-->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500..900&family=Inter+Tight:wght@400..800&display=swap" rel="stylesheet">
<style>
${css}
</style>
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
<div id="root"></div>
<script type="text/babel" data-presets="react">
const { useState, useEffect, useRef, useId } = React;

${js}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
</script>
</body>
</html>
`

const out = path.join(root, 'design-handoff', 'VehicleInsight-Site-and-Journey.html')
fs.mkdirSync(path.dirname(out), { recursive: true })
fs.writeFileSync(out, html)
console.log(`${out} — ${(fs.statSync(out).size / 1024).toFixed(0)} KB`)
