import { useEffect, useState } from 'react'
import { IconStar, IconCheckCircle } from './Icons.jsx'

/* ──────────────────────────────────────────────────────────────
   Social-proof primitives (CRO layer).
   NOTE: every number, name and review here is MOCK DATA for the
   prototype. Before production these must be wired to real
   metrics — fabricated reviews/urgency breach UK CPRs & ASA.
   ────────────────────────────────────────────────────────────── */

export const PROOF = {
  rating: 4.8,
  reviews: '12,438',
  checksToday: '1,284',
  checksWeek: '28,412',
  pctChoosePack: 87,
}

export function Stars({ size = 14, className = 'text-[#00b67a]' }) {
  return (
    <span className={'inline-flex gap-px ' + className} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <IconStar key={i} size={size} />
      ))}
    </span>
  )
}

/* Trust strip: rating + review volume (social proof + authority). */
export function RatingStrip({ className = '' }) {
  return (
    <div className={'inline-flex items-center gap-2 text-[13px] font-semibold text-vi-ink2 ' + className}>
      <Stars />
      <span>
        <b className="font-extrabold text-vi-ink">Excellent {PROOF.rating}</b> · {PROOF.reviews} reviews
      </span>
    </div>
  )
}

/* Blue-chip partner bar (authority + trust transfer).
   Monochrome text wordmarks — swap for approved logo artwork
   once partner brand sign-off is in place. */
const PARTNERS = [
  { name: 'The Telegraph', cls: 'font-display text-[17px] font-semibold tracking-[-0.01em]' },
  { name: 'What Car?', cls: 'font-body text-[16px] font-black italic tracking-[-0.03em]' },
  { name: 'halfords', cls: 'font-body text-[17px] font-black lowercase tracking-[-0.02em]' },
  { name: 'SELECT Car Leasing', cls: 'font-body text-[13px] font-extrabold tracking-[0.02em] uppercase' },
  { name: 'ASDA', cls: 'font-body text-[16px] font-black tracking-[0.1em]' },
]

export function PartnerBar({ compact = false }) {
  return (
    <div className={compact ? '' : 'flex flex-col items-center gap-2.5'} aria-label="As seen on and recommended by The Telegraph, What Car?, Halfords, Select Car Leasing and Asda">
      <div
        className={
          'font-bold tracking-[0.18em] uppercase ' +
          (compact ? 'mb-2 text-[10px] text-vi-ink3' : 'text-[10.5px] text-zinc-400')
        }
      >
        As seen on &amp; recommended by
      </div>
      <div
        className={
          'flex flex-wrap items-baseline justify-center ' +
          (compact ? 'gap-x-4 gap-y-1.5' : 'gap-x-8 gap-y-2 max-[700px]:gap-x-5')
        }
      >
        {PARTNERS.map((p) => (
          <span
            key={p.name}
            className={
              p.cls +
              ' whitespace-nowrap text-zinc-400 transition-colors duration-[160ms] ease-vi hover:text-vi-ink2 ' +
              (compact ? 'scale-[0.82] origin-left' : '')
            }
          >
            {p.name}
          </span>
        ))}
      </div>
    </div>
  )
}

/* Rotating "someone just bought" toast (herd mentality).
   Shows ~6s, rests ~9s, cycles. Dismissible, landing page only. */
const ACTIVITY = [
  { name: 'Sarah', place: 'Leeds', did: 'unlocked a Full Check', ago: '2 min ago' },
  { name: 'James', place: 'Bristol', did: 'bought the 3-report pack', ago: '4 min ago' },
  { name: 'Priya', place: 'Manchester', did: 'ran a free check', ago: 'just now' },
  { name: 'Tom', place: 'Glasgow', did: 'unlocked a Full Check', ago: '7 min ago' },
  { name: 'Ellie', place: 'Cardiff', did: 'bought the 10-report pack', ago: '11 min ago' },
]

export function LiveActivityToast() {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (dismissed) return undefined
    let hideTimer
    const first = setTimeout(() => setVisible(true), 3500)
    const cycle = setInterval(() => {
      setIdx((i) => (i + 1) % ACTIVITY.length)
      setVisible(true)
      hideTimer = setTimeout(() => setVisible(false), 6000)
    }, 15000)
    const firstHide = setTimeout(() => setVisible(false), 9500)
    return () => {
      clearTimeout(first)
      clearTimeout(firstHide)
      clearTimeout(hideTimer)
      clearInterval(cycle)
    }
  }, [dismissed])

  if (dismissed) return null
  const a = ACTIVITY[idx]
  return (
    <div
      className={
        'fixed bottom-4 left-4 z-[70] flex max-w-[290px] items-start gap-2.5 rounded-xl border border-vi-border bg-white p-3 pr-8 shadow-vi3 ' +
        'transition-[opacity,transform] duration-500 ease-vi ' +
        (visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0')
      }
      role="status"
      aria-live="off"
    >
      <span className="mt-0.5 shrink-0 text-vi-primary">
        <IconCheckCircle size={18} stroke={2.2} />
      </span>
      <span className="text-[12.5px] leading-[1.45] text-vi-ink2">
        <b className="font-bold text-vi-ink">
          {a.name} from {a.place}
        </b>{' '}
        {a.did}
        <span className="mt-0.5 block text-[11px] text-vi-ink3">{a.ago} · verified visitor</span>
      </span>
      <button
        className="absolute top-1.5 right-1.5 cursor-pointer rounded-md border-0 bg-transparent px-1.5 py-0.5 text-[13px] leading-none text-vi-ink3 hover:bg-zinc-100 hover:text-vi-ink"
        aria-label="Dismiss"
        onClick={() => setDismissed(true)}
      >
        ×
      </button>
    </div>
  )
}

/* Session-persisted countdown (scarcity / urgency). 15-minute
   intro-price window, survives reloads within the session. */
export function useCountdown(minutes = 15) {
  const [left, setLeft] = useState(minutes * 60)
  useEffect(() => {
    const KEY = 'vi-intro-deadline'
    let end = Number(sessionStorage.getItem(KEY))
    if (!end || end < Date.now()) {
      end = Date.now() + minutes * 60 * 1000
      sessionStorage.setItem(KEY, String(end))
    }
    const tick = () => setLeft(Math.max(0, Math.round((end - Date.now()) / 1000)))
    tick()
    const t = setInterval(tick, 1000)
    return () => clearInterval(t)
  }, [minutes])
  const mm = String(Math.floor(left / 60)).padStart(2, '0')
  const ss = String(left % 60).padStart(2, '0')
  return { display: `${mm}:${ss}`, expired: left <= 0 }
}

/* Testimonials (liking + social proof) — specific, outcome-led. */
export const TESTIMONIALS = [
  {
    name: 'Mark D.',
    place: 'Sheffield',
    text: 'The full check flagged £6,800 of outstanding finance on a "clean" Golf. Walked away and saved myself a repossession letter.',
    bought: 'Full Check · verified purchase',
  },
  {
    name: 'Aisha K.',
    place: 'Birmingham',
    text: 'Mileage anomaly flag was spot on — the seller "found" the missing service history pretty quickly after I showed him the report.',
    bought: '3-report pack · verified purchase',
  },
  {
    name: 'Dave P.',
    place: 'Norwich',
    text: 'Used it to sell my own car. Buyers stopped haggling when I sent them the clean report up front. Sold in 3 days.',
    bought: 'Full Check · verified purchase',
  },
]
