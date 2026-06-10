import { useState } from 'react'
import { HERO, CHECK_REASONS } from '../data.jsx'
import { IconArrowRight, IconLock, IconClock, IconShield } from './Icons.jsx'
import { Button, Nudge, PlateField } from './ui.jsx'
import { RatingStrip, PROOF } from './SocialProof.jsx'

/* Entrance stagger: each hero child rises in sequence on load. */
const rise = (delay) => ({ className: 'animate-rise', style: { animationDelay: `${delay}ms` } })

/* Two-step entry, friction removed:
   – Step 2 ("why are you checking?") is optional — the primary button is
     never disabled; picking a reason is one extra tap, not a gate.
   – If a reason was already picked (e.g. from the reasons row below),
     submitting the reg opens the report directly and step 2 is skipped.
   – Reason state lives in App so the reasons row can pre-select it.     */
export function Hero({ plate, setPlate, reason, setReason, onSubmit, onSample }) {
  const [step, setStep] = useState('reg') // 'reg' | 'reason'

  const reasonLabel = CHECK_REASONS.find((r) => r.id === reason)?.label

  const submitReg = (e) => {
    e.preventDefault()
    if (!plate.trim()) return
    if (reason) onSubmit(plate.trim().toUpperCase(), reason)
    else setStep('reason')
  }

  return (
    <section className="relative pt-12 pb-4 text-center">
      <div
        className="pointer-events-none absolute -top-5 left-1/2 z-0 h-[360px] w-[min(1100px,100%)] -translate-x-1/2 bg-[radial-gradient(58%_70%_at_50%_32%,rgba(58,70,73,0.05),transparent_72%)]"
        aria-hidden="true"
      />

      <div
        className="relative z-[1] mb-[22px] inline-flex animate-rise items-center gap-2.5 text-[11px] font-bold tracking-[0.22em] text-vi-ink3 uppercase before:h-px before:w-[22px] before:bg-zinc-300 before:content-[''] after:h-px after:w-[22px] after:bg-zinc-300 after:content-['']"
        style={{ animationDelay: '0ms' }}
      >
        {HERO.eyebrow}
      </div>

      <h1
        {...rise(80)}
        className="relative z-[1] mx-auto max-w-[680px] animate-rise font-display text-[clamp(34px,4.6vw,54px)] leading-[1.08] font-extrabold tracking-[-0.025em] text-balance text-vi-ink"
      >
        {HERO.title}
      </h1>

      <p
        {...rise(160)}
        className="relative z-[1] mx-auto mt-5 mb-3.5 max-w-[700px] animate-rise text-lg leading-[1.55] text-pretty text-vi-ink2"
      >
        {HERO.lede}
      </p>

      <p {...rise(240)} className="relative z-[1] mt-2 mb-7 animate-rise text-sm text-vi-ink3">
        <button
          type="button"
          className="cursor-pointer border-0 bg-transparent p-0 text-sm font-bold text-vi-primary hover:underline"
          onClick={onSample}
        >
          View a sample full check
        </button>{' '}
        — see exactly what's inside.
      </p>

      <div {...rise(320)} className="relative z-[1] animate-rise" aria-live="polite">
        {step === 'reg' ? (
          <form
            key="reg"
            className="mx-auto max-w-[560px] animate-swap rounded-[14px] border border-vi-border bg-white p-[26px] text-left shadow-soft"
            onSubmit={submitReg}
          >
            <div className="mb-1 font-display text-[22px] font-black tracking-[-0.01em] text-vi-ink" id="plate-label">
              Start your free check
            </div>
            <div className="mb-4 text-sm leading-[1.45] text-vi-ink2">
              Enter any UK registration and we'll open the <b className="font-bold text-vi-ink">free basic report</b>{' '}
              straight away — no card needed.
            </div>
            <PlateField value={plate} onChange={setPlate} id="plate-input" />
            {reason && (
              <div className="-mt-1 mb-3 text-xs text-vi-ink3">
                Tailored for <b className="font-bold text-vi-primary-dark">{reasonLabel}</b>
                {' · '}
                <button
                  type="button"
                  className="cursor-pointer border-0 bg-transparent p-0 text-xs font-semibold text-vi-ink3 underline hover:text-vi-ink"
                  onClick={() => setReason(null)}
                >
                  change
                </button>
              </div>
            )}
            <Button type="submit" size="lg" block className="animate-cta-bounce-late">
              Get free basic report
              <Nudge>
                <IconArrowRight size={16} stroke={2.4} />
              </Nudge>
            </Button>
            <p className="m-0 mt-2.5 flex items-center justify-center gap-1.5 text-center text-[12px] text-vi-ink3">
              <span className="relative inline-flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-vi-primary opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-vi-primary" />
              </span>
              {PROOF.checksToday} checks run in the last 24 hours
            </p>
          </form>
        ) : (
          <div
            key="reason"
            className="mx-auto max-w-[560px] animate-swap rounded-[14px] border border-vi-border bg-white p-[26px] text-left shadow-soft"
          >
            {/* Back + reg chip share a flow row — no absolute positioning, no overlap */}
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="inline-flex h-[34px] items-stretch overflow-hidden rounded-md border border-[#e4be00]">
                <span className="inline-flex items-center justify-center bg-[#1d4ed8] px-[7px] font-display text-[10px] font-black tracking-[0.04em] text-white">
                  GB
                </span>
                <span className="inline-flex items-center bg-[#ffd200] px-3.5 font-display text-lg font-black tracking-[0.06em] text-zinc-900 uppercase">
                  {plate.trim().toUpperCase()}
                </span>
              </span>
              <button
                type="button"
                className="cursor-pointer rounded-md border-0 bg-transparent px-1.5 py-1 text-[13px] font-bold text-vi-ink3 transition-colors duration-[160ms] ease-vi hover:bg-zinc-100 hover:text-vi-ink"
                onClick={() => setStep('reg')}
              >
                ← Back
              </button>
            </div>
            <div className="mb-1 font-display text-[22px] font-black tracking-[-0.01em] text-vi-ink">
              Why are you checking this vehicle?
            </div>
            <div className="mb-4 text-sm leading-[1.45] text-vi-ink2">
              Optional — one quick tap tailors the report to what matters most for you.
            </div>
            <div className="mt-1 mb-4 grid grid-cols-2 gap-2.5 max-[700px]:grid-cols-1" role="radiogroup" aria-label="Reason for checking (optional)">
              {CHECK_REASONS.map((r) => {
                const selected = reason === r.id
                return (
                  <button
                    key={r.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    className={
                      'flex cursor-pointer items-center gap-3 rounded-[10px] border-[1.5px] bg-white px-4 py-3.5 text-left ' +
                      'transition-[border-color,background-color,box-shadow] duration-[160ms] ease-vi ' +
                      (selected
                        ? 'border-vi-primary bg-[rgba(51,184,122,0.06)] shadow-[0_0_0_3px_rgba(51,184,122,0.12)]'
                        : 'border-vi-border hover:border-zinc-300 hover:bg-zinc-50')
                    }
                    onClick={() => setReason(selected ? null : r.id)}
                  >
                    <span
                      className={
                        'relative size-5 shrink-0 rounded-full border-2 transition-colors duration-[160ms] ease-vi ' +
                        (selected ? 'border-vi-primary' : 'border-zinc-300')
                      }
                      aria-hidden="true"
                    >
                      {selected && <span className="absolute inset-[3px] rounded-full bg-vi-primary" />}
                    </span>
                    <span className="flex min-w-0 flex-col gap-px">
                      <span className="font-display text-[15px] font-black tracking-[-0.005em] text-vi-ink">
                        {r.label}
                      </span>
                      <span className="text-xs text-vi-ink3">{r.hint}</span>
                    </span>
                  </button>
                )
              })}
            </div>
            <Button size="lg" block onClick={() => onSubmit(plate.trim().toUpperCase() || 'YH17 SRU', reason)}>
              Open my report
              <Nudge>
                <IconArrowRight size={16} stroke={2.4} />
              </Nudge>
            </Button>
          </div>
        )}
      </div>

      <div
        {...rise(420)}
        className="relative z-[1] mx-auto mt-5 flex max-w-[600px] animate-rise flex-wrap justify-center gap-4 text-xs text-vi-ink3"
      >
        <span className="inline-flex items-center gap-1.5">
          <IconLock size={13} stroke={2.4} className="shrink-0 text-vi-primary" /> No card needed
        </span>
        <span className="inline-flex items-center gap-1.5">
          <IconClock size={13} stroke={2.4} className="shrink-0 text-vi-primary" /> Report in 30 seconds
        </span>
        <span className="inline-flex items-center gap-1.5">
          <IconShield size={13} stroke={2.4} className="shrink-0 text-vi-primary" /> Official DVLA + DVSA data
        </span>
      </div>

      <div {...rise(500)} className="relative z-[1] mt-4 flex animate-rise justify-center">
        <RatingStrip />
      </div>
    </section>
  )
}
