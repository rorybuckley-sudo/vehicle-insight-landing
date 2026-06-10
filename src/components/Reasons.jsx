import { REASONS } from '../data.jsx'
import { IconArrowRight } from './Icons.jsx'
import { Reveal } from './ui.jsx'

const TONES = {
  green: {
    icon: 'bg-[rgba(51,184,122,0.12)] text-vi-primary-dark',
    go: 'group-hover:bg-[rgba(51,184,122,0.14)] group-hover:text-vi-primary-dark',
  },
  blue: { icon: 'bg-[#eaf1ff] text-[#2563eb]', go: 'group-hover:bg-[#eaf1ff] group-hover:text-[#2563eb]' },
  orange: { icon: 'bg-[#fdeede] text-[#c2410c]', go: 'group-hover:bg-[#fdeede] group-hover:text-[#c2410c]' },
  purple: { icon: 'bg-[#f1e9fb] text-[#7e22ce]', go: 'group-hover:bg-[#f1e9fb] group-hover:text-[#7e22ce]' },
}

export function ReasonsRow({ onPick }) {
  return (
    <section className="mt-10 border-t border-vi-border pt-9">
      <Reveal>
        <div className="mb-3 text-center text-xs font-bold tracking-[0.18em] text-vi-ink3 uppercase">
          Whatever your reason
        </div>
        <h2 className="m-0 mb-[26px] text-center font-display text-[clamp(24px,2.6vw,34px)] leading-[1.1] font-extrabold tracking-[-0.02em] text-vi-ink">
          One check covers <span className="text-vi-red-start">every situation.</span>
        </h2>
      </Reveal>
      <div className="grid grid-cols-4 gap-3.5 max-[1000px]:grid-cols-2">
        {REASONS.map((r, i) => {
          const tone = TONES[r.tone]
          return (
            <Reveal key={r.id} delay={i * 70}>
              <button
                className={
                  'group relative flex h-full w-full cursor-pointer flex-col gap-2.5 rounded-[14px] border border-vi-border bg-white px-5 pt-[22px] pb-11 text-left ' +
                  'transition-[border-color,box-shadow,transform] duration-[160ms] ease-vi hover:-translate-y-[3px] hover:border-zinc-300 hover:shadow-vi2'
                }
                onClick={() => onPick(r.id)}
              >
                <span className={'inline-flex size-11 items-center justify-center rounded-xl ' + tone.icon}>
                  {r.icon}
                </span>
                <span className="mt-1 font-display text-lg font-extrabold tracking-[-0.01em] text-vi-ink">
                  {r.title}
                </span>
                <span className="text-[13.5px] leading-[1.5] text-vi-ink2">{r.copy}</span>
                <span
                  className={
                    'absolute bottom-[18px] left-5 inline-flex size-7 -translate-x-1 items-center justify-center rounded-full bg-zinc-100 text-vi-ink3 opacity-0 ' +
                    'transition-[opacity,transform,background-color,color] duration-[160ms] ease-vi group-hover:translate-x-0 group-hover:opacity-100 ' +
                    tone.go
                  }
                  aria-hidden="true"
                >
                  <IconArrowRight size={16} stroke={2.4} />
                </span>
              </button>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
