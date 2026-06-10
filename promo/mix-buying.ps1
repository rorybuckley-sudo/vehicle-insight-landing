# Rebuilds promo/out/buying-final.mp4 — the motion-graphics buying ad with
# Kore TTS voiceover, generated music bed, key-tap SFX and animation hits.
# Prereqs: ffmpeg on PATH; VO lines (vo1-4.wav), music8.wav already generated
# (see tts.mjs and veo-prompts/music.json) and promo/out/buying.mp4 recorded.
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

# 1. Synthesised SFX kit
ffmpeg -y -loglevel error -f lavfi -i "aevalsrc=sin(2*PI*72*t)*exp(-14*t)*0.9:d=0.4:s=48000" -af "aformat=channel_layouts=stereo" out\sfx-thud.wav
ffmpeg -y -loglevel error -f lavfi -i "aevalsrc=sin(2*PI*340*t)*exp(-40*t)*0.8:d=0.12:s=48000" -af "aformat=channel_layouts=stereo" out\sfx-pop.wav
ffmpeg -y -loglevel error -f lavfi -i "aevalsrc=sin(2*PI*880*t)*exp(-6*t)*0.35+sin(2*PI*1318*t)*exp(-8*t)*0.22:d=0.9:s=48000" -af "aformat=channel_layouts=stereo" out\sfx-ding.wav
ffmpeg -y -loglevel error -f lavfi -i "anoisesrc=d=0.5:c=pink:a=0.8" -af "lowpass=f=900,afade=t=in:st=0:d=0.15,afade=t=out:st=0.2:d=0.3,aresample=48000,aformat=channel_layouts=stereo" out\sfx-whoosh.wav
ffmpeg -y -loglevel error -f lavfi -i "anoisesrc=d=2.3:c=pink:a=0.5" -af "highpass=f=300,lowpass=f=2600,afade=t=in:st=0:d=2.0,afade=t=out:st=2.0:d=0.3,aresample=48000,aformat=channel_layouts=stereo" out\sfx-riser.wav

# 2. Phone key ticks on the 8 plate characters (typing starts 3.3s, 130ms apart)
ffmpeg -y -loglevel error -f lavfi -i "anoisesrc=d=0.03:c=pink:a=0.8" -af "highpass=f=1400,lowpass=f=7000,afade=t=in:st=0:d=0.002,afade=t=out:st=0.008:d=0.02,aresample=48000,aformat=channel_layouts=stereo" out\tick.wav
ffmpeg -y -loglevel error -i out\tick.wav -i out\tick.wav -i out\tick.wav -i out\tick.wav -i out\tick.wav -i out\tick.wav -i out\tick.wav -i out\tick.wav -filter_complex "[0:a]adelay=3300|3300,volume=0.55[t0];[1:a]adelay=3430|3430,volume=0.45[t1];[2:a]adelay=3560|3560,volume=0.6[t2];[3:a]adelay=3690|3690,volume=0.5[t3];[4:a]adelay=3820|3820,volume=0.55[t4];[5:a]adelay=3950|3950,volume=0.45[t5];[6:a]adelay=4080|4080,volume=0.6[t6];[7:a]adelay=4210|4210,volume=0.5[t7];[t0][t1][t2][t3][t4][t5][t6][t7]amix=inputs=8:normalize=0,apad,atrim=0:15.62[out]" -map "[out]" out\typing.wav

# 3. Music bed — Veo-generated 8s underscore looped to full length
ffmpeg -y -loglevel error -i out\music8.wav -i out\music8.wav -i out\music8.wav -filter_complex "[0:a][1:a]acrossfade=d=1.5[x];[x][2:a]acrossfade=d=1.5[y];[y]atrim=0:16.57,afade=t=in:st=0:d=0.6,afade=t=out:st=14.8:d=1.7[ab]" -map "[ab]" out\music-bed.wav

# 4. Animation hits: hook boom 0.55 · plate pop 3.0 · scan riser 3.8 · scan-done ding 6.25 ·
#    "30s later" whoosh+thud 6.8/6.85 · card slams 7.3/7.9/8.5 · logo whoosh+ding 11.15/11.25 · CTA bounce pop 13.25
ffmpeg -y -loglevel error -i out\sfx-thud.wav -i out\sfx-thud.wav -i out\sfx-thud.wav -i out\sfx-thud.wav -i out\sfx-thud.wav -i out\sfx-pop.wav -i out\sfx-pop.wav -i out\sfx-ding.wav -i out\sfx-ding.wav -i out\sfx-whoosh.wav -i out\sfx-whoosh.wav -i out\sfx-riser.wav -filter_complex "[0:a]adelay=550|550,volume=0.5[s0];[1:a]adelay=6850|6850,volume=0.6[s1];[2:a]adelay=7300|7300,volume=0.5[s2];[3:a]adelay=7900|7900,volume=0.55[s3];[4:a]adelay=8500|8500,volume=0.6[s4];[5:a]adelay=3000|3000,volume=0.5[s5];[6:a]adelay=13250|13250,volume=0.45[s6];[7:a]adelay=6250|6250,volume=0.3[s7];[8:a]adelay=11250|11250,volume=0.5[s8];[9:a]adelay=6800|6800,volume=0.4[s9];[10:a]adelay=11150|11150,volume=0.35[s10];[11:a]adelay=3800|3800,volume=0.3[s11];[s0][s1][s2][s3][s4][s5][s6][s7][s8][s9][s10][s11]amix=inputs=12:normalize=0,apad,atrim=0:16.57[out]" -map "[out]" out\sfx-track.wav

# 5. Master: VO lines timed to scenes (atempo 1.1), music -12dB, ticks, hits, limiter
ffmpeg -y -loglevel error -i out\buying.mp4 -i out\vo1.wav -i out\vo2.wav -i out\vo3.wav -i out\vo4.wav -i out\music-bed.wav -i out\typing.wav -i out\sfx-track.wav -filter_complex "[1:a]atempo=1.1,aresample=48000,aformat=channel_layouts=stereo,adelay=300|300[v1];[2:a]atempo=1.1,aresample=48000,aformat=channel_layouts=stereo,adelay=4100|4100[v2];[3:a]atempo=1.1,aresample=48000,aformat=channel_layouts=stereo,adelay=7300|7300[v3];[4:a]atempo=1.1,aresample=48000,aformat=channel_layouts=stereo,adelay=11750|11750[v4];[5:a]volume=0.25[mus];[6:a]volume=0.9[typ];[7:a]volume=1.0[sfx];[v1][v2][v3][v4][mus][typ][sfx]amix=inputs=7:normalize=0:duration=longest,alimiter=limit=0.95,atrim=0:16.57[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -movflags +faststart out\buying-final.mp4

Write-Host "DONE -> promo/out/buying-final.mp4"
