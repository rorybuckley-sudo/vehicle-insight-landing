// Generate a voiceover WAV via Gemini TTS (same GEMINI_API_KEY as Veo).
// Usage: node promo/tts.mjs "<text>" <outfile.wav> [voiceName]
import fs from 'node:fs'
import { execFileSync } from 'node:child_process'

const [text, outFile, voice = 'Kore'] = process.argv.slice(2)
const KEY = process.env.GEMINI_API_KEY
if (!KEY || !text || !outFile) {
  console.error('usage: GEMINI_API_KEY=… node promo/tts.mjs "<text>" out.wav [voice]')
  process.exit(1)
}

const res = await fetch(
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent',
  {
    method: 'POST',
    headers: { 'x-goog-api-key': KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text }] }],
      generationConfig: {
        responseModalities: ['AUDIO'],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } } },
      },
    }),
  },
)
if (!res.ok) {
  console.error(`TTS: HTTP ${res.status} — ${await res.text()}`)
  process.exit(1)
}
const data = await res.json()
const part = data.candidates?.[0]?.content?.parts?.find((p) => p.inlineData)
if (!part) {
  console.error('no audio in response:', JSON.stringify(data).slice(0, 400))
  process.exit(1)
}
// Gemini TTS returns 24kHz 16-bit mono PCM — wrap it as WAV via ffmpeg.
const raw = outFile + '.pcm'
fs.writeFileSync(raw, Buffer.from(part.inlineData.data, 'base64'))
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 's16le', '-ar', '24000', '-ac', '1', '-i', raw, outFile])
fs.unlinkSync(raw)
console.log(`saved ${outFile}`)
