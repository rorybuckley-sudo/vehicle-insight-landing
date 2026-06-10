import { CHECK_ROWS } from '../data.jsx'
import { IconCheck } from './Icons.jsx'
import { Reveal } from './ui.jsx'

/* Data-source credibility line (reused on the pricing page). */
export function SourcesLine() {
  return (
    <Reveal className="mx-auto mt-[22px] flex max-w-[720px] flex-col items-center gap-2">
      <span className="font-display text-[clamp(22px,2.4vw,30px)] leading-[1.1] font-extrabold tracking-[-0.015em] text-vi-ink">
        Records cross-checked from
      </span>
      <span className="text-center text-[15px] font-bold text-balance text-vi-ink2">
        DVLA · DVSA · UK finance &amp; insurance registers
      </span>
    </Reveal>
  )
}

/* Basic / Full check comparison table. */
export function ChecksCards() {
  const tick = (full) => (
    <span
      className={
        'inline-flex size-[22px] items-center justify-center rounded-full ' +
        (full ? 'bg-vi-primary text-white' : 'bg-[rgba(51,184,122,0.14)] text-vi-primary-dark')
      }
      aria-label="Included"
    >
      <IconCheck size={14} stroke={3} />
    </span>
  )
  const dash = <span className="h-0.5 w-3.5 rounded-[2px] bg-zinc-300" aria-label="Not included" />

  const colBase =
    'flex flex-col items-center justify-center gap-[3px] self-stretch border-l border-vi-border px-3 py-[15px] text-center max-[560px]:px-1 max-[560px]:py-[13px]'
  const fullCol = ' border-l-[1.5px] border-r-[1.5px] border-l-[rgba(51,184,122,0.35)] border-r-[rgba(51,184,122,0.35)] bg-[rgba(51,184,122,0.07)]'

  return (
    <Reveal delay={60} className="relative mt-9 rounded-2xl border border-vi-border bg-white text-left shadow-soft">
      {/* Recommended flag over the Full column */}
      <div className="pointer-events-none absolute -top-[11px] right-0 flex w-[168px] justify-center max-[560px]:w-[92px]">
        <span className="rounded-full bg-vi-warning-strong px-3 py-1 font-display text-[9.5px] font-black tracking-[0.08em] text-white uppercase shadow-vi2">
          Recommended
        </span>
      </div>

      {/* Head row */}
      <div className="grid grid-cols-[1fr_120px_168px] items-stretch rounded-t-2xl bg-vi-ink max-[560px]:grid-cols-[1fr_58px_92px]">
        <div className="flex flex-col justify-center rounded-tl-2xl px-[22px] py-3.5 font-display text-xs font-black tracking-[0.1em] text-white uppercase max-[560px]:px-3.5">
          What's included
        </div>
        <div className="flex flex-col items-center justify-center gap-[5px] self-stretch border-l border-white/[0.14] px-3 py-[18px] text-center max-[560px]:px-1">
          <span className="font-display text-base leading-none font-black whitespace-nowrap text-white max-[560px]:text-[13px]">
            Basic
          </span>
          <span className="text-[11px] font-bold whitespace-nowrap text-white opacity-80">Free</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-[5px] self-stretch rounded-tr-[14px] border-x-[1.5px] border-vi-primary bg-vi-primary px-3 py-[18px] text-center max-[560px]:px-1">
          <span className="font-display text-base leading-none font-black whitespace-nowrap text-white max-[560px]:text-[13px]">
            Full check
          </span>
          <span className="text-[11px] font-bold whitespace-nowrap text-white">from £19.99</span>
        </div>
      </div>

      {/* Feature rows */}
      {CHECK_ROWS.map((r, i) => {
        const last = i === CHECK_ROWS.length - 1
        return (
          <div
            key={r.label}
            className={
              'grid grid-cols-[1fr_120px_168px] items-stretch border-t border-vi-border max-[560px]:grid-cols-[1fr_58px_92px] ' +
              (i % 2 === 1 ? 'bg-zinc-50' : '')
            }
          >
            <div className="flex flex-col justify-center gap-[3px] px-[22px] py-3.5 max-[560px]:px-3.5 max-[560px]:py-[13px]">
              <span className="text-[14.5px] leading-[1.3] font-bold text-vi-ink max-[560px]:text-[13px]">
                {r.label}
              </span>
              <span className="text-[12.5px] leading-[1.4] font-normal text-vi-ink3">{r.sub}</span>
            </div>
            <div className={colBase}>{r.basic ? tick(false) : dash}</div>
            <div
              className={
                colBase +
                fullCol +
                (last ? ' rounded-b-[14px] border-b-[1.5px] border-b-[rgba(51,184,122,0.35)]' : '')
              }
            >
              {tick(true)}
            </div>
          </div>
        )
      })}
    </Reveal>
  )
}
