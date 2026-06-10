// Records each promo HTML timeline to .webm via headless Edge screencast.
// Usage: node promo/record.js
const path = require('path');
const fs = require('fs');
const puppeteer = require(path.join(__dirname, '..', 'node_modules', 'puppeteer-core'));

const exe = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
].find((p) => fs.existsSync(p));

const ADS = ['buying', 'selling', 'owner'];
const outDir = path.join(__dirname, 'out');
fs.mkdirSync(outDir, { recursive: true });

(async () => {
  const browser = await puppeteer.launch({
    executablePath: exe,
    headless: 'new',
    args: ['--window-size=1080,1920', '--hide-scrollbars'],
  });
  for (const ad of ADS) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 1920 });
    const file = 'file:///' + path.join(__dirname, `${ad}.html`).replace(/\\/g, '/');
    await page.goto(file, { waitUntil: 'networkidle0', timeout: 60000 });
    await page.evaluate(async () => {
      await document.fonts.ready;
      // Restart all animations from zero so the recording starts at t=0
      document.getAnimations().forEach((a) => {
        a.cancel();
        a.play();
      });
      window.__restartTyping?.();
    });
    const recorder = await page.screencast({ path: path.join(outDir, `${ad}.webm`) });
    await new Promise((r) => setTimeout(r, 15600));
    await recorder.stop();
    const size = fs.statSync(path.join(outDir, `${ad}.webm`)).size;
    console.log(`${ad}.webm — ${(size / 1024 / 1024).toFixed(1)} MB`);
    await page.close();
  }
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
