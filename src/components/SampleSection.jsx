import { useEffect, useState } from 'react'
import { IconCheck, IconCheckCircle, IconAlert, IconArrowRight } from './Icons.jsx'
import { Button, Nudge, Reveal } from './ui.jsx'

const TILES = [
  { eb: 'MOT status', v: 'Valid', color: '#16a34a', sub: 'Expires 10 Jul 2026' },
  { eb: 'Finance', v: '£4,200 owed', color: '#b45309', sub: 'HP · Black Horse' },
  { eb: 'Mileage', v: 'Anomaly', color: '#b45309', sub: 'Flag in 2023' },
  { eb: 'Valuation', v: '£11,555', color: undefined, sub: 'Private sale est.' },
]

export function SampleSection({ onCheck }) {
  // "View a sample full check" links here now (it used to dump visitors at
  // pricing). When followed, the report card pulses once to orient the eye.
  const [pulse, setPulse] = useState(0)
  useEffect(() => {
    const onHighlight = () => setPulse((p) => p + 1)
    window.addEventListener('vi:highlight-sample', onHighlight)
    return () => window.removeEventListener('vi:highlight-sample', onHighlight)
  }, [])

  return (
    <section className="mt-10 scroll-mt-20 pt-9 pb-2" id="sample-report">
      <Reveal className="mb-[22px] text-center font-display text-[13px] font-extrabold tracking-[0.18em] text-vi-ink3 uppercase">
        ↓&nbsp;&nbsp;Sample report&nbsp;&nbsp;↓
      </Reveal>
      <Reveal
        delay={90}
        className="mt-10 grid grid-cols-[1fr_1.25fr] items-center gap-9 rounded-2xl border border-vi-border bg-white p-8 max-[1000px]:grid-cols-1 max-[1000px]:p-6"
      >
        <div>
          <div className="mb-2.5 font-display text-[11px] font-black tracking-[0.14em] text-vi-ink3 uppercase">
            The report
          </div>
          <h2 className="m-0 font-display text-[clamp(26px,3vw,36px)] leading-[1.08] font-black tracking-[-0.015em] text-balance text-vi-ink">
            A report that actually <span className="text-vi-red-start">makes sense.</span>
          </h2>
          <ul className="m-0 mt-5 flex list-none flex-col gap-2.5 p-0">
            <li className="flex items-start gap-2.5 text-sm leading-[1.5] text-vi-ink2">
              <IconCheck size={14} stroke={3} className="mt-0.5 shrink-0 text-vi-primary" />
              <span>
                <b className="font-bold text-vi-ink">Plain-English summaries</b> on every flag — no DVSA codes, no
                jargon.
              </span>
            </li>
            <li className="flex items-start gap-2.5 text-sm leading-[1.5] text-vi-ink2">
              <IconCheck size={14} stroke={3} className="mt-0.5 shrink-0 text-vi-primary" />
              <span>
                <b className="font-bold text-vi-ink">Interactive timeline</b> of every event — keepers, MOTs, mileage,
                plate changes.
              </span>
            </li>
          </ul>
          <Button variant="dark" className="mt-[22px]" onClick={onCheck}>
            Check your car now
            <Nudge>
              <IconArrowRight size={14} stroke={2.4} />
            </Nudge>
          </Button>
        </div>

        {/* Mini report card */}
        <div>
          <div
            key={pulse}
            className={
              'relative overflow-hidden rounded-2xl border border-vi-border bg-white px-[22px] pt-[22px] pb-0 shadow-vi2' +
              (pulse > 0 ? ' animate-sample-pulse' : '')
            }
          >
            <div className="absolute top-[18px] right-[18px] inline-flex items-stretch overflow-hidden rounded-full text-[11px] font-bold shadow-vi2 max-[700px]:hidden">
              <span className="inline-flex items-center gap-1 bg-vi-warning px-[9px] py-[5px] text-white">
                <IconAlert size={12} stroke={2.6} /> ALERT
              </span>
              <span className="inline-flex items-center bg-vi-dark px-2.5 py-[5px] text-white">Attention required</span>
            </div>
            <div className="inline-flex items-center gap-[7px] font-display text-[11px] font-extrabold tracking-[0.08em] text-[#2563eb] uppercase">
              <IconCheckCircle size={16} stroke={2.2} /> Complete Vehicle Report
            </div>
            <h3 className="mt-2.5 mb-3.5 font-display text-[21px] leading-[1.1] font-extrabold tracking-[-0.015em] text-vi-ink">
              BMW X3 xDrive 30d M Sport Auto
            </h3>
            <div className="mb-[18px] flex flex-wrap items-center gap-[9px]">
              <span className="inline-flex h-[38px] items-stretch overflow-hidden rounded-md border border-[#d9b400]">
                <span className="inline-flex items-center justify-center bg-[#00309a] px-2 font-display text-xs font-extrabold tracking-[0.04em] text-white">
                  UK
                </span>
                <span className="inline-flex items-center bg-[#f8d307] px-3.5 font-display text-xl font-extrabold tracking-[0.08em] text-[#1a1a1a]">
                  30 EX
                </span>
              </span>
              <span className="rounded-full border border-vi-border bg-white px-[13px] py-[7px] text-[13px] font-semibold text-vi-ink">
                Year: <b className="font-extrabold">2017</b>
              </span>
              <span className="rounded-full border border-vi-border bg-white px-[13px] py-[7px] text-[13px] font-semibold text-vi-ink">
                Fuel: <b className="font-extrabold">Diesel</b>
              </span>
            </div>
            <div className="-mx-[22px] grid grid-cols-2 border-t border-vi-border">
              {TILES.map((t, i) => (
                <div
                  key={t.eb}
                  className={
                    'bg-white px-[18px] py-3.5 border-vi-border ' +
                    (i % 2 === 0 ? 'border-r ' : '') +
                    (i < TILES.length - 2 ? 'border-b' : '')
                  }
                >
                  <div className="mb-1 font-display text-[9px] font-black tracking-[0.14em] text-vi-ink3 uppercase">
                    {t.eb}
                  </div>
                  <div
                    className="font-display text-lg leading-[1.1] font-black tracking-[-0.005em] text-vi-ink"
                    style={t.color ? { color: t.color } : undefined}
                  >
                    {t.v}
                  </div>
                  <div className="mt-0.5 text-[11px] text-vi-ink3">{t.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
