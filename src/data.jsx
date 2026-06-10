import { IconSearch, IconTag, IconKey, IconEye } from './components/Icons.jsx'

/* ── Hero copy (default "any reason" variant from the design) ── */
export const HERO = {
  eyebrow: 'UK Vehicle History',
  title: (
    <>
      Know the full story <span className="text-vi-red-start">behind any vehicle.</span>
    </>
  ),
  lede: (
    <>
      Buying, selling, checking your own, or just curious —{' '}
      <b className="font-bold text-vi-ink">
        enter a vehicle registration and Vehicle Insight reveals the records behind it:
      </b>{' '}
      MOT, mileage, finance, write-offs, previous keepers and more.
    </>
  ),
}

/* ── "Why are you checking?" options (step 2 of the hero form) ── */
export const CHECK_REASONS = [
  { id: 'buying', label: "I'm buying", hint: 'Make sure it’s safe to buy' },
  { id: 'selling', label: "I'm selling", hint: 'Prove it’s clean to buyers' },
  { id: 'owner', label: 'I own it', hint: 'Keep on top of my car' },
  { id: 'curious', label: "I'm curious", hint: 'Just looking it up' },
]

/* ── The four reasons people run a check ─────────────────────── */
export const REASONS = [
  {
    id: 'buying',
    tone: 'green',
    icon: <IconSearch size={20} />,
    title: 'Buying a car',
    copy: 'Spot finance, write-offs and clocked odometers before you pay.',
  },
  {
    id: 'selling',
    tone: 'blue',
    icon: <IconTag size={20} />,
    title: 'Selling a car',
    copy: 'Show buyers a clean, independent report and back up your price.',
  },
  {
    id: 'owner',
    tone: 'orange',
    icon: <IconKey size={20} />,
    title: 'Checking your own',
    copy: 'Stay on top of MOT, tax, recalls and what your car is worth.',
  },
  {
    id: 'curious',
    tone: 'purple',
    icon: <IconEye size={20} />,
    title: 'Just curious',
    copy: 'Spotted an interesting plate? Look it up in seconds.',
  },
]

/* ── Basic / Full comparison rows ────────────────────────────── */
export const CHECK_ROWS = [
  { label: 'Make, model, year & specification', sub: 'Confirm the basics match the advert and the V5C logbook.', basic: true },
  { label: 'MOT status & tax due dates', sub: 'See what’s valid now and when the next renewal is due.', basic: true },
  { label: 'Recorded keepers', sub: 'How many people have owned the vehicle before.', basic: true },
  { label: 'Mileage history graph', sub: 'Every recorded reading plotted over time.', basic: true },
  { label: 'Reliability score', sub: 'A 0–100 rating from history, condition & ownership data.', basic: false },
  { label: 'Outstanding finance check', sub: 'Reveals money still owed — the lender can repossess it.', basic: false },
  { label: 'Write-off & damage history', sub: 'Insurance write-off categories and recorded damage.', basic: false },
  { label: 'Stolen marker check', sub: 'Flags vehicles recorded as stolen and not recovered.', basic: false },
  { label: 'Mileage anomaly detection', sub: 'Highlights readings that drop or don’t add up — possible clocking.', basic: false },
  { label: 'Full MOT history with advisories', sub: 'Every pass, fail and advisory note from each test.', basic: false },
  { label: 'Detailed valuation & market price', sub: 'What it’s worth to buy, sell or part-exchange today.', basic: false },
  { label: 'Faults, recalls & known issues', sub: 'Open safety recalls and common faults for the model.', basic: false },
  { label: 'Running costs & emissions', sub: 'Fuel, tax, insurance group and ULEZ/CAZ status.', basic: false },
]

/* ── Stat strip ──────────────────────────────────────────────── */
export const STATS = [
  {
    prefix: '1 in ',
    n: 3,
    label: 'used cars has a hidden history issue',
    sub: 'finance, write-off, mileage or theft marker on record',
  },
  {
    prefix: '1 in ',
    n: 4,
    label: 'still has outstanding finance owed',
    sub: 'the lender can repossess it — even after you’ve paid the seller',
  },
  {
    prefix: '1 in ',
    n: 12,
    label: 'has been written off at some point',
    sub: 'often repaired and back on the road without disclosure',
  },
]

/* ── Pricing tiers ───────────────────────────────────────────── */
export const PRICE_TIERS = [
  {
    id: 'single',
    name: '1 Report',
    band: 'bg-vi-primary',
    price: '£19.99',
    per: '£19.99 per report',
    popular: false,
    save: null,
    bullets: ['Full check on one vehicle', 'PDF download', 'Plain-English AI summary'],
  },
  {
    id: 'three',
    name: '3 Reports',
    band: 'bg-vi-warning',
    price: '£39.99',
    per: '£13.33 per report',
    popular: true,
    save: 'Save 33% per report',
    bullets: ['Three full checks · any cars', 'Compare cars side-by-side', 'Lowest price for casual buyers'],
  },
  {
    id: 'ten',
    name: '10 Reports',
    band: 'bg-vi-red-end',
    price: '£99.99',
    per: '£10.00 per report',
    popular: false,
    save: 'Save 50% per report',
    bullets: ['Ten full checks · any cars', 'Best price per check', 'Ideal if you check often'],
  },
]

/* ── How it works ────────────────────────────────────────────── */
export const STEPS = [
  {
    n: '1',
    title: 'Enter the reg',
    copy: 'No account, no card. Type the plate and we open the free basic report straight away — make, model, MOT, tax.',
  },
  {
    n: '2',
    title: 'Buy a full check',
    copy: 'One payment unlocks every section on this vehicle. No subscription, no hidden extras — the full report in one go.',
  },
  {
    n: '3',
    title: 'Use it however you need',
    copy: 'Buying? Spot the red flags before you pay. Selling? Share a clean report. Own it? Stay on top of MOT, tax and recalls.',
  },
]
