import { useEffect, useState } from 'react'
import {
  IconCheck,
  IconCheckCircle,
  IconAlert,
  IconArrowRight,
  IconLock,
  IconShield,
  IconClock,
  IconCard,
  IconUsers,
} from './Icons.jsx'
import { Button, Nudge } from './ui.jsx'
import { Stars, RatingStrip, PartnerBar, useCountdown, TESTIMONIALS, PROOF } from './SocialProof.jsx'

/* ──────────────────────────────────────────────────────────────
   Mock buying journey (CRO prototype).
   Steps: scan → report (free, gated) → checkout → success.
   All vehicle data, prices and proof numbers are MOCK.
   ────────────────────────────────────────────────────────────── */

const PACKS = [
  { id: 'single', name: '1 Full Check', price: 19.99, was: 29.99, per: '£19.99 / report', note: null },
  { id: 'three', name: '3 Full Checks', price: 39.99, was: 59.97, per: '£13.33 / report', note: `Most popular — ${PROOF.pctChoosePack}% choose this` },
  { id: 'ten', name: '10 Full Checks', price: 99.99, was: 199.9, per: '£10.00 / report', note: 'Best value' },
]

const REASON_HOOKS = {
  buying: 'Since you’re buying, the finance and mileage records below are the ones that protect your money.',
  selling: 'Since you’re selling, a clean full report is your strongest negotiating tool with buyers.',
  owner: 'As the owner, the recall and valuation records below are the ones to watch.',
  curious: 'Here’s what the official records hold on this vehicle.',
}

function PlateChip({ reg }) {
  return (
    <span className="inline-flex h-[34px] items-stretch overflow-hidden rounded-md border border-[#d9b400]">
      <span className="inline-flex items-center justify-center bg-[#00309a] px-2 font-display text-[11px] font-extrabold tracking-[0.04em] text-white">
        UK
      </span>
      <span className="inline-flex items-center bg-[#f8d307] px-3 font-display text-base font-black tracking-[0.07em] text-[#1a1a1a] uppercase">
        {reg}
      </span>
    </span>
  )
}

function StepDots({ step }) {
  const steps = ['Search', 'Free report', 'Unlock', 'Done']
  const idx = { scan: 0, report: 1, checkout: 2, success: 3 }[step]
  return (
    <div className="mx-auto mb-7 flex max-w-[420px] items-center justify-center gap-2" aria-label={`Step ${idx + 1} of 4`}>
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <span
            className={
              'flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold tracking-[0.04em] uppercase ' +
              (i < idx
                ? 'bg-[rgba(51,184,122,0.14)] text-vi-primary-dark'
                : i === idx
                  ? 'bg-vi-ink text-white'
                  : 'bg-zinc-100 text-vi-ink3')
            }
          >
            {i < idx && <IconCheck size={10} stroke={3.5} />}
            {s}
          </span>
          {i < steps.length - 1 && <span className="h-px w-3 bg-zinc-300" aria-hidden="true" />}
        </div>
      ))}
    </div>
  )
}

/* ── Step 1: scanning (labor illusion — show the work) ───────── */
const SCAN_STAGES = [
  'Contacting DVLA vehicle records…',
  'Pulling DVSA MOT & mileage history…',
  'Checking UK finance & lending registers…',
  'Scanning insurance write-off categories…',
  'Cross-referencing police stolen markers…',
  'Compiling your report…',
]

function ScanStep({ reg, onDone }) {
  const [stage, setStage] = useState(0)
  useEffect(() => {
    if (stage >= SCAN_STAGES.length) {
      const t = setTimeout(onDone, 350)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setStage((s) => s + 1), 520)
    return () => clearTimeout(t)
  }, [stage, onDone])

  return (
    <div className="mx-auto max-w-[520px] animate-swap rounded-2xl border border-vi-border bg-white p-8 text-center shadow-soft">
      <div className="mb-4 flex justify-center">
        <PlateChip reg={reg} />
      </div>
      <h2 className="m-0 mb-1 font-display text-[24px] font-black tracking-[-0.01em] text-vi-ink">
        Searching 27 official sources
      </h2>
      <p className="m-0 mb-6 text-sm text-vi-ink2">This usually takes under 30 seconds.</p>
      <div className="mx-auto mb-5 h-1.5 max-w-[360px] overflow-hidden rounded-full bg-zinc-100">
        <div
          className="h-full rounded-full bg-vi-primary transition-[width] duration-500 ease-vi"
          style={{ width: `${Math.min(100, (stage / SCAN_STAGES.length) * 100)}%` }}
        />
      </div>
      <ul className="m-0 flex list-none flex-col gap-2 p-0 text-left">
        {SCAN_STAGES.map((s, i) => (
          <li
            key={s}
            className={
              'flex items-center gap-2.5 text-[13.5px] transition-opacity duration-300 ' +
              (i < stage ? 'text-vi-ink2' : i === stage ? 'font-semibold text-vi-ink' : 'text-zinc-300')
            }
          >
            {i < stage ? (
              <span className="text-vi-primary">
                <IconCheck size={14} stroke={3} />
              </span>
            ) : (
              <span
                className={
                  'inline-block size-3.5 rounded-full border-2 ' +
                  (i === stage ? 'animate-pulse border-vi-primary' : 'border-zinc-200')
                }
              />
            )}
            {s}
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ── Step 2: free report with gated findings (loss aversion) ── */
const FREE_ROWS = [
  { label: 'Make & model', value: 'BMW X3 xDrive 30d M Sport Auto' },
  { label: 'Year · Fuel', value: '2017 · Diesel' },
  { label: 'MOT status', value: 'Valid — expires 10 Jul 2026', good: true },
  { label: 'Tax status', value: 'Taxed — due 1 Sep 2026', good: true },
  { label: 'Recorded keepers', value: '4 previous keepers' },
]

const LOCKED_ROWS = [
  { label: 'Outstanding finance', tease: '1 agreement found', alert: true },
  { label: 'Mileage check', tease: 'Anomaly detected in 2023', alert: true },
  { label: 'Write-off & damage history', tease: 'Record available', alert: false },
  { label: 'Stolen marker check', tease: 'Record available', alert: false },
  { label: 'Market valuation', tease: '3 prices calculated', alert: false },
  { label: 'Recalls & known faults', tease: '2 entries found', alert: false },
]

function ReportStep({ reg, reason, onUnlock }) {
  const { display, expired } = useCountdown(15)
  const alerts = LOCKED_ROWS.filter((r) => r.alert).length
  return (
    <div className="mx-auto grid max-w-[980px] animate-swap grid-cols-[1.3fr_1fr] items-start gap-5 max-[1000px]:grid-cols-1">
      {/* Report card */}
      <div className="overflow-hidden rounded-2xl border border-vi-border bg-white shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-vi-border bg-zinc-50 px-5 py-4">
          <div className="flex items-center gap-3">
            <PlateChip reg={reg} />
            <div>
              <div className="font-display text-[15px] font-black text-vi-ink">Free basic report</div>
              <div className="text-[11.5px] text-vi-ink3">Generated just now · data from DVLA + DVSA</div>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fdeede] px-3 py-1.5 text-[11.5px] font-bold text-[#c2410c]">
            <IconAlert size={13} stroke={2.6} /> {alerts} items need your attention
          </span>
        </div>

        <div className="px-5 pt-3 pb-1">
          {reason && <p className="m-0 mb-2 mt-1 text-[13px] font-semibold text-vi-ink2">{REASON_HOOKS[reason]}</p>}
          {FREE_ROWS.map((r) => (
            <div key={r.label} className="flex items-center justify-between gap-3 border-b border-zinc-100 py-2.5">
              <span className="text-[13px] font-semibold text-vi-ink3">{r.label}</span>
              <span className={'text-right text-[13.5px] font-bold ' + (r.good ? 'text-vi-primary-dark' : 'text-vi-ink')}>
                {r.good && <IconCheck size={12} stroke={3} className="mr-1 inline" />}
                {r.value}
              </span>
            </div>
          ))}
        </div>

        {/* Locked section — visible teasers, blurred values */}
        <div className="relative px-5 pt-1 pb-5">
          {LOCKED_ROWS.map((r) => (
            <div key={r.label} className="flex items-center justify-between gap-3 border-b border-zinc-100 py-2.5">
              <span className="flex items-center gap-2 text-[13px] font-semibold text-vi-ink">
                <span className="text-vi-ink3">
                  <IconLock size={13} stroke={2.4} />
                </span>
                {r.label}
                {r.alert && (
                  <span className="rounded-full bg-[#fef2f2] px-2 py-0.5 text-[10px] font-black tracking-[0.06em] text-vi-danger uppercase">
                    Alert
                  </span>
                )}
              </span>
              <span className="text-right text-[13.5px] font-bold text-vi-ink select-none" style={{ filter: 'blur(5px)' }} aria-hidden="true">
                {r.tease}
              </span>
            </div>
          ))}
          <p className="m-0 pt-3 text-center text-[12px] text-vi-ink3">
            <IconLock size={11} stroke={2.4} className="mr-1 inline" />
            {LOCKED_ROWS.length} sections are in the Full Check — including the {alerts} flagged above.
          </p>
        </div>
      </div>

      {/* Upgrade panel (AIDA: desire → action) */}
      <div className="rounded-2xl border-2 border-vi-primary bg-white p-5 shadow-vi-dark">
        {!expired && (
          <div className="mb-3 flex items-center justify-between rounded-lg bg-[#fff7ed] px-3 py-2 text-[12.5px] font-bold text-[#c2410c]">
            <span className="inline-flex items-center gap-1.5">
              <IconClock size={13} stroke={2.6} /> Intro price reserved for you
            </span>
            <span className="font-display text-[15px] font-black tabular-nums">{display}</span>
          </div>
        )}
        <h3 className="m-0 mb-1 font-display text-[20px] font-black tracking-[-0.01em] text-vi-ink">
          See what’s behind the {alerts} alerts
        </h3>
        <p className="m-0 mb-3 text-[13px] leading-[1.5] text-vi-ink2">
          One payment unlocks <b className="font-bold text-vi-ink">every section on this vehicle</b> — no subscription.
        </p>
        <div className="mb-1 flex items-baseline gap-2">
          <span className="text-[15px] font-bold text-vi-ink3 line-through">£29.99</span>
          <span className="font-display text-[34px] leading-none font-black tracking-[-0.02em] text-vi-ink">£19.99</span>
          <span className="rounded-full bg-[rgba(51,184,122,0.14)] px-2 py-0.5 text-[11px] font-black text-vi-primary-dark">
            Save 33%
          </span>
        </div>
        <p className="m-0 mb-3 text-[11.5px] text-vi-ink3">…or from £10.00/report with a pack (next step).</p>
        <Button size="lg" block onClick={onUnlock}>
          Unlock my full report
          <Nudge>
            <IconArrowRight size={16} stroke={2.4} />
          </Nudge>
        </Button>
        <div className="mt-2.5 flex items-center justify-center gap-3 text-[11px] text-vi-ink3">
          <span className="inline-flex items-center gap-1">
            <IconShield size={11} stroke={2.4} className="text-vi-primary" /> 30-day money-back
          </span>
          <span className="inline-flex items-center gap-1">
            <IconClock size={11} stroke={2.4} className="text-vi-primary" /> Instant access
          </span>
        </div>
        <div className="mt-4 border-t border-zinc-100 pt-3">
          <RatingStrip />
          <blockquote className="m-0 mt-2.5 border-l-2 border-vi-primary pl-3 text-[12.5px] leading-[1.5] text-vi-ink2 italic">
            “{TESTIMONIALS[0].text}”
            <footer className="mt-1 text-[11px] font-semibold text-vi-ink3 not-italic">
              {TESTIMONIALS[0].name}, {TESTIMONIALS[0].place} · {TESTIMONIALS[0].bought}
            </footer>
          </blockquote>
          <p className="m-0 mt-3 inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-vi-ink3">
            <IconUsers size={13} stroke={2.2} className="text-vi-primary" /> {PROOF.checksToday} checks run in the last
            24 hours
          </p>
        </div>
      </div>
    </div>
  )
}

/* ── Step 3: checkout (decoy pricing, trust stack, low friction) ── */
function CheckoutStep({ reg, onPay, onBack }) {
  const [pack, setPack] = useState('three')
  const [paying, setPaying] = useState(false)
  const { display, expired } = useCountdown(15)
  const sel = PACKS.find((p) => p.id === pack)

  const pay = (e) => {
    e.preventDefault()
    setPaying(true)
    setTimeout(() => onPay(pack), 1600)
  }

  return (
    <div className="mx-auto grid max-w-[980px] animate-swap grid-cols-[1.25fr_1fr] items-start gap-5 max-[1000px]:grid-cols-1">
      <form className="rounded-2xl border border-vi-border bg-white p-6 shadow-soft" onSubmit={pay}>
        <button
          type="button"
          onClick={onBack}
          className="mb-3 cursor-pointer rounded-md border-0 bg-transparent p-0 text-[13px] font-bold text-vi-ink3 hover:text-vi-ink"
        >
          ← Back to report
        </button>
        <h3 className="m-0 mb-1 font-display text-[22px] font-black tracking-[-0.01em] text-vi-ink">Choose your pack</h3>
        <p className="m-0 mb-4 text-[13px] text-vi-ink2">
          Every Full Check is the same depth — packs just lower the price per report.
        </p>

        <div className="mb-5 flex flex-col gap-2.5" role="radiogroup" aria-label="Report pack">
          {PACKS.map((p) => {
            const on = pack === p.id
            return (
              <button
                type="button"
                key={p.id}
                role="radio"
                aria-checked={on}
                onClick={() => setPack(p.id)}
                className={
                  'relative flex cursor-pointer items-center justify-between gap-3 rounded-xl border-[1.5px] bg-white px-4 py-3 text-left transition-[border-color,box-shadow] duration-[160ms] ease-vi ' +
                  (on
                    ? 'border-vi-primary shadow-[0_0_0_3px_rgba(51,184,122,0.12)]'
                    : 'border-vi-border hover:border-zinc-300')
                }
              >
                <span className="flex items-center gap-3">
                  <span
                    className={'relative size-5 shrink-0 rounded-full border-2 ' + (on ? 'border-vi-primary' : 'border-zinc-300')}
                    aria-hidden="true"
                  >
                    {on && <span className="absolute inset-[3px] rounded-full bg-vi-primary" />}
                  </span>
                  <span>
                    <span className="block font-display text-[15px] font-black text-vi-ink">{p.name}</span>
                    <span className="block text-[11.5px] text-vi-ink3">{p.per}</span>
                  </span>
                </span>
                <span className="text-right">
                  <span className="block text-[11px] text-vi-ink3 line-through">£{p.was.toFixed(2)}</span>
                  <span className="block font-display text-[18px] font-black text-vi-ink">£{p.price.toFixed(2)}</span>
                </span>
                {p.note && (
                  <span className="absolute -top-2.5 left-10 rounded-full bg-vi-warning-strong px-2.5 py-0.5 text-[10px] font-bold whitespace-nowrap text-white">
                    {p.note}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        <div className="mb-4 grid grid-cols-2 gap-2.5 max-[560px]:grid-cols-1">
          <input
            className="rounded-lg border border-vi-border px-3.5 py-3 text-sm outline-none focus:border-vi-primary focus:shadow-[0_0_0_3px_rgba(51,184,122,0.18)]"
            placeholder="Email for your report"
            aria-label="Email"
            type="email"
            required
          />
          <input
            className="rounded-lg border border-vi-border px-3.5 py-3 text-sm outline-none focus:border-vi-primary focus:shadow-[0_0_0_3px_rgba(51,184,122,0.18)]"
            placeholder="Card number (mock — don’t type a real one)"
            aria-label="Card number"
            inputMode="numeric"
            required
          />
        </div>

        <Button size="lg" block type="submit" disabled={paying}>
          {paying ? (
            'Processing securely…'
          ) : (
            <>
              <IconCard size={16} stroke={2.2} /> Pay £{sel.price.toFixed(2)} & unlock {reg}
            </>
          )}
        </Button>
        <p className="m-0 mt-2.5 text-center text-[11.5px] text-vi-ink3">
          <IconLock size={11} stroke={2.4} className="mr-1 inline" />
          256-bit SSL · Visa · Mastercard · Amex · Apple Pay · Google Pay
        </p>
        {!expired && (
          <p className="m-0 mt-1.5 text-center text-[11.5px] font-bold text-[#c2410c]">
            Intro pricing held for {display}
          </p>
        )}
      </form>

      {/* Trust sidebar */}
      <div className="flex flex-col gap-4">
        <div className="rounded-2xl border border-vi-border bg-white p-5 shadow-soft">
          <h4 className="m-0 mb-2.5 font-display text-[15px] font-black text-vi-ink">Why drivers trust us</h4>
          <ul className="m-0 flex list-none flex-col gap-2 p-0 text-[13px] text-vi-ink2">
            <li className="flex items-start gap-2">
              <IconCheck size={13} stroke={3} className="mt-0.5 shrink-0 text-vi-primary" /> Official DVLA, DVSA,
              finance & insurance data
            </li>
            <li className="flex items-start gap-2">
              <IconCheck size={13} stroke={3} className="mt-0.5 shrink-0 text-vi-primary" /> 30-day money-back
              guarantee — no questions
            </li>
            <li className="flex items-start gap-2">
              <IconCheck size={13} stroke={3} className="mt-0.5 shrink-0 text-vi-primary" /> One-off payment. Never a
              subscription.
            </li>
            <li className="flex items-start gap-2">
              <IconCheck size={13} stroke={3} className="mt-0.5 shrink-0 text-vi-primary" /> Backed by MotorEasy —
              trusted by 1m+ UK drivers
            </li>
          </ul>
          <div className="mt-3 border-t border-zinc-100 pt-3">
            <RatingStrip />
          </div>
          <div className="mt-3 border-t border-zinc-100 pt-3">
            <PartnerBar compact />
          </div>
        </div>
        {TESTIMONIALS.slice(1).map((t) => (
          <div key={t.name} className="rounded-2xl border border-vi-border bg-white p-4 shadow-soft">
            <Stars size={12} />
            <p className="m-0 mt-1.5 text-[12.5px] leading-[1.5] text-vi-ink2">“{t.text}”</p>
            <p className="m-0 mt-1.5 text-[11px] font-semibold text-vi-ink3">
              {t.name}, {t.place} · {t.bought}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Step 4: success (reduce regret, cross-sell, referral) ───── */
function SuccessStep({ reg, pack, onHome }) {
  const sel = PACKS.find((p) => p.id === pack)
  const remaining = { single: 0, three: 2, ten: 9 }[pack]
  return (
    <div className="mx-auto max-w-[560px] animate-swap rounded-2xl border border-vi-border bg-white p-8 text-center shadow-soft">
      <span className="mb-3 inline-flex size-14 items-center justify-center rounded-full bg-[rgba(51,184,122,0.14)] text-vi-primary">
        <IconCheckCircle size={30} stroke={2} />
      </span>
      <h2 className="m-0 mb-1 font-display text-[26px] font-black tracking-[-0.015em] text-vi-ink">
        Your full report is ready
      </h2>
      <p className="m-0 mb-4 text-sm text-vi-ink2">
        Order <b className="font-bold text-vi-ink">#VI-48217</b> · {sel.name} · emailed to you as a PDF too.
      </p>
      <div className="mb-4 flex justify-center">
        <PlateChip reg={reg} />
      </div>
      <Button size="lg" block onClick={() => alert('Mock journey ends here — this would open the full report.')}>
        Open the full report
        <Nudge>
          <IconArrowRight size={16} stroke={2.4} />
        </Nudge>
      </Button>
      {remaining > 0 && (
        <p className="m-0 mt-3 text-[13px] font-semibold text-vi-primary-dark">
          {remaining} Full Checks left in your pack — they never expire.
        </p>
      )}
      <div className="mt-5 rounded-xl bg-zinc-50 p-4 text-left">
        <h4 className="m-0 mb-1 font-display text-[14px] font-black text-vi-ink">Buying this car?</h4>
        <p className="m-0 text-[12.5px] leading-[1.5] text-vi-ink2">
          MotorEasy customers get an exclusive <b className="font-bold text-vi-ink">20% off a GapInsure warranty</b> on
          any car they check. We’ve added the code to your email.
        </p>
      </div>
      <button
        onClick={onHome}
        className="mt-4 cursor-pointer border-0 bg-transparent text-[13px] font-bold text-vi-ink3 underline hover:text-vi-ink"
      >
        Back to home
      </button>
    </div>
  )
}

/* ── Orchestrator ────────────────────────────────────────────── */
export function Journey({ reg, reason, onHome }) {
  const [step, setStep] = useState('scan')
  const [pack, setPack] = useState('three')

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [step])

  return (
    <div className="mx-auto my-6 max-w-[1160px] rounded-2xl bg-vi-content px-8 pt-9 pb-12 max-[700px]:m-3 max-[700px]:px-4 max-[700px]:pt-6 max-[700px]:pb-8">
      <StepDots step={step} />
      {step === 'scan' && <ScanStep reg={reg} onDone={() => setStep('report')} />}
      {step === 'report' && <ReportStep reg={reg} reason={reason} onUnlock={() => setStep('checkout')} />}
      {step === 'checkout' && (
        <CheckoutStep
          reg={reg}
          onBack={() => setStep('report')}
          onPay={(p) => {
            setPack(p)
            setStep('success')
          }}
        />
      )}
      {step === 'success' && <SuccessStep reg={reg} pack={pack} onHome={onHome} />}
      <p className="m-0 mt-8 text-center text-[11px] text-vi-ink3 italic">
        Prototype — all vehicle data, reviews, counters and prices on this journey are mock content.
      </p>
    </div>
  )
}
