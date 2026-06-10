import { STATS } from '../data.jsx'
import { useCountUp, useInView } from './ui.jsx'

function StatCell({ stat, started, first }) {
  const n = useCountUp(stat.n, started)
  return (
    <div
      className={
        'border-l border-white/[0.12] px-7 text-center max-[1000px]:border-l-0 max-[1000px]:px-0 ' +
        (first ? 'border-l-0' : '')
      }
    >
      <div className="mb-3 font-display text-[clamp(40px,5vw,56px)] leading-none font-black tracking-[-0.02em] text-white">
        {stat.prefix}
        {n}
      </div>
      <div className="mb-1.5 text-[15px] leading-[1.35] font-bold text-white">{stat.label}</div>
      <div className="text-[13px] leading-[1.45] text-white/60">{stat.sub}</div>
    </div>
  )
}

export function StatStrip() {
  const [ref, inView] = useInView()
  return (
    <section
      ref={ref}
      className="relative mt-10 overflow-hidden rounded-2xl bg-vi-dark px-9 pt-10 pb-7 text-white"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(16px)',
        transition: 'opacity 0.7s var(--ease-vi), transform 0.7s var(--ease-vi)',
      }}
    >
      {/* Brand gradient hairline across the top */}
      <div
        className="absolute inset-x-0 top-0 h-[5px] bg-[linear-gradient(90deg,#9c1d23_0%,#c82430_22%,#f26522_42%,#f7941e_60%,#1f7a5e_80%,#1fa98c_100%)]"
        aria-hidden="true"
      />
      <div className="mb-3.5 text-center text-xs font-bold tracking-[0.18em] text-white/45 uppercase">
        Why it pays to check first
      </div>
      <div className="mb-7 text-center font-display text-[clamp(22px,2.4vw,30px)] font-extrabold tracking-[-0.015em] text-white">
        The numbers most sellers won't tell you.
      </div>
      <div className="grid grid-cols-3 max-[1000px]:grid-cols-1 max-[1000px]:gap-7">
        {STATS.map((s, i) => (
          <StatCell key={s.label} stat={s} started={inView} first={i === 0} />
        ))}
      </div>
      <div className="mt-[26px] border-t border-white/10 pt-4 text-center text-[11px] text-white/40 italic">
        Sources: DVLA, DVSA and UK insurance &amp; finance industry records, 2025.
      </div>
    </section>
  )
}
