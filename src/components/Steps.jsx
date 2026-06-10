import { STEPS } from '../data.jsx'
import { Reveal } from './ui.jsx'

export function StepsSection() {
  return (
    <section className="mt-10 pt-9 pb-2">
      <Reveal className="text-center">
        <div className="mb-2.5 font-display text-[11px] font-black tracking-[0.14em] text-vi-ink3 uppercase">
          How it works
        </div>
        <h2 className="m-0 font-display text-[clamp(26px,3vw,36px)] leading-[1.08] font-black tracking-[-0.015em] text-balance text-vi-ink">
          From reg to report <span className="text-vi-red-start">in three steps.</span>
        </h2>
      </Reveal>
      <div className="mt-6 grid grid-cols-3 gap-4 max-[1000px]:grid-cols-1">
        {STEPS.map((s, i) => (
          <Reveal
            key={s.n}
            delay={i * 90}
            className="relative rounded-xl border border-vi-border bg-white p-6 transition-[border-color,box-shadow] duration-[160ms] ease-vi hover:border-zinc-300 hover:shadow-vi2"
          >
            <div className="mb-3.5 inline-flex size-8 items-center justify-center rounded-full bg-vi-primary font-display text-sm font-black text-white">
              {s.n}
            </div>
            <h3 className="m-0 mb-1.5 font-display text-lg font-black tracking-[-0.005em] text-vi-ink">{s.title}</h3>
            <p className="m-0 text-sm leading-[1.5] text-vi-ink2">{s.copy}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
