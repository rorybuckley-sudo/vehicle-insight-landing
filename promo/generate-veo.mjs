// Generate live-action ad video (people + native voiceover) via Google Veo.
//
// Usage:   node promo/generate-veo.mjs [buying|selling|owner]   (no arg = all three)
// Needs:   GEMINI_API_KEY env var — Google AI Studio key on a billing-enabled
//          project (Veo is paid-tier only). Optional: VEO_MODEL to override.
//          ffmpeg on PATH (already installed) for stitching the two segments.
//
// Veo generates 8-second clips with synchronised speech/SFX, so each 15s
// storyboard is produced as two segments (scenes 1–2, scenes 3–4) and
// concatenated. Output: promo/out/<name>-veo.mp4
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const API = 'https://generativelanguage.googleapis.com/v1beta'
const MODEL = process.env.VEO_MODEL || 'veo-3.1-generate-preview'
const KEY = process.env.GEMINI_API_KEY

if (!KEY) {
  console.error('GEMINI_API_KEY is not set.')
  console.error("Set it once with:  [Environment]::SetEnvironmentVariable('GEMINI_API_KEY','<your key>','User')")
  process.exit(1)
}

const HEADERS = { 'x-goog-api-key': KEY, 'Content-Type': 'application/json' }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// Turn our structured storyboard into two 8s segment prompts that carry the
// shared world (background, characters, style) so the cut stays coherent.
function segmentPrompts(storyboard) {
  const shared = {
    background: storyboard.background,
    characters: storyboard.characters,
    style: storyboard.style,
  }
  const half = Math.ceil(storyboard.scenes.length / 2)
  return [storyboard.scenes.slice(0, half), storyboard.scenes.slice(half)].map((scenes, i) => ({
    ...shared,
    note:
      i === 0
        ? 'This is part 1 of 2 of one continuous advert. End on a natural cut point.'
        : 'This is part 2 of 2 of the same advert — same world, characters, grade and tone as part 1. It ends the advert.',
    scenes,
  }))
}

async function generateClip(promptObj, outFile) {
  const res = await fetch(`${API}/models/${MODEL}:predictLongRunning`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      instances: [{ prompt: JSON.stringify(promptObj) }],
      parameters: {
        aspectRatio: '9:16',
        resolution: '1080p',
        // Required to include people. May be regionally restricted —
        // if the API rejects it, retry with 'allow_adult' removed.
        personGeneration: 'allow_adult',
      },
    }),
  })
  if (!res.ok) throw new Error(`generate: HTTP ${res.status} — ${await res.text()}`)
  let op = await res.json()

  // Poll the long-running operation (typically 1–4 minutes per clip).
  while (!op.done) {
    await sleep(12000)
    const poll = await fetch(`${API}/${op.name}`, { headers: HEADERS })
    if (!poll.ok) throw new Error(`poll: HTTP ${poll.status} — ${await poll.text()}`)
    op = await poll.json()
    process.stdout.write('.')
  }
  console.log()
  if (op.error) throw new Error(`operation failed: ${JSON.stringify(op.error)}`)

  const video = op.response?.generateVideoResponse?.generatedSamples?.[0]?.video
    ?? op.response?.generatedVideos?.[0]?.video
  if (!video?.uri) throw new Error(`no video in response: ${JSON.stringify(op.response).slice(0, 500)}`)

  const dl = await fetch(video.uri, { headers: { 'x-goog-api-key': KEY } })
  if (!dl.ok) throw new Error(`download: HTTP ${dl.status}`)
  fs.writeFileSync(outFile, Buffer.from(await dl.arrayBuffer()))
  console.log(`  saved ${outFile} (${(fs.statSync(outFile).size / 1024 / 1024).toFixed(1)} MB)`)
}

async function run(name) {
  const promptFile = path.join(__dirname, 'veo-prompts', `${name}.json`)
  const storyboard = JSON.parse(fs.readFileSync(promptFile, 'utf8'))
  const outDir = path.join(__dirname, 'out')
  fs.mkdirSync(outDir, { recursive: true })

  console.log(`\n=== ${name} — model ${MODEL} ===`)
  const segs = segmentPrompts(storyboard)
  const parts = []
  for (let i = 0; i < segs.length; i++) {
    const part = path.join(outDir, `${name}-veo-part${i + 1}.mp4`)
    console.log(`segment ${i + 1}/${segs.length} (${segs[i].scenes.map((s) => s.time).join(', ')})`)
    await generateClip(segs[i], part)
    parts.push(part)
  }

  // Stitch with re-encode so audio stays in sync across the cut.
  const final = path.join(outDir, `${name}-veo.mp4`)
  execFileSync('ffmpeg', [
    '-y', '-loglevel', 'error',
    ...parts.flatMap((p) => ['-i', p]),
    '-filter_complex', `${parts.map((_, i) => `[${i}:v][${i}:a]`).join('')}concat=n=${parts.length}:v=1:a=1[v][a]`,
    '-map', '[v]', '-map', '[a]',
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '20', '-movflags', '+faststart',
    final,
  ])
  console.log(`DONE → ${final}`)
}

const targets = process.argv[2] ? [process.argv[2]] : ['buying', 'selling', 'owner']
for (const t of targets) await run(t)
