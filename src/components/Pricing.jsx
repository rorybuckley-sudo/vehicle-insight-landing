import { PRICE_TIERS } from '../data.jsx'
import { IconCheck, IconArrowRight } from './Icons.jsx'
import { Button, Reveal } from './ui.jsx'

export function PricingSection({ onChoose }) {
  return (
    <section className="mt-10 pt-8 pb-2" id="pricing">
      <Reveal className="text-center">
        <div className="mb-2.5 font-display text-[11px] font-black tracking-[0.14em] text-vi-ink3 uppercase">
          Pricing
        </div>
        <h2 className="m-0 font-display text-[clamp(26px,3vw,36px)] leading-[1.08] font-black tracking-[-0.015em] text-balance text-vi-ink">
          See the basics free. <span className="text-vi-red-start">Pay for the full story.</span>
        </h2>
        <p className="mx-auto mt-2.5 mb-0 max-w-[640px] text-base text-pretty text-vi-ink2">
          Every Full check is the same depth — buying a pack just lowers the price per report. Looking at a few cars,
          or likely to run more than one? A pack saves you money.
        </p>
      </Reveal>

      {/* Free first, upgrade after */}
      <Reveal
        delay={80}
        className="mx-auto mt-[26px] mb-1 flex max-w-[820px] items-stretch justify-center gap-3.5 max-[760px]:flex-col max-[760px]:gap-2.5"
      >
        <div className="flex flex-1 items-center gap-3.5 rounded-[14px] border border-vi-border bg-white px-[18px] py-4">
          <span className="shrink-0 rounded-full bg-[rgba(51,184,122,0.14)] px-3 py-[5px] font-display text-[11px] font-black tracking-[0.06em] text-vi-primary-dark uppercase">
            Free
          </span>
          <div className="text-[13.5px] leading-[1.45] text-vi-ink2">
            <b className="font-bold text-vi-ink">Start with a Basic check</b> — make, model, MOT and tax on any reg, no
            card needed.
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center self-center text-zinc-400 max-[760px]:rotate-90" aria-hidden="true">
          <IconArrowRight size={18} stroke={2.4} />
        </span>
        <div className="flex flex-1 items-center gap-3.5 rounded-[14px] border border-vi-border bg-white px-[18px] py-4">
          <span className="shrink-0 rounded-full bg-zinc-100 px-3 py-[5px] font-display text-[11px] font-black tracking-[0.06em] text-vi-ink2 uppercase">
            Upgrade
          </span>
          <div className="text-[13.5px] leading-[1.45] text-vi-ink2">
            <b className="font-bold text-vi-ink">Want the full picture?</b> Unlock a Full check for finance,
            write-offs, reliability and more.
          </div>
        </div>
      </Reveal>

      {/* Tier cards — grid on desktop, swipeable carousel ≤700px */}
      <div className="mt-6 grid grid-cols-3 gap-4 max-[1000px]:grid-cols-1 max-[700px]:-mx-4 max-[700px]:mt-6 max-[700px]:flex max-[700px]:snap-x max-[700px]:snap-mandatory max-[700px]:gap-3.5 max-[700px]:overflow-x-auto max-[700px]:px-4 max-[700px]:pt-4 max-[700px]:pb-2 max-[700px]:no-scrollbar">
        {PRICE_TIERS.map((t, i) => (
          <Reveal
            key={t.id}
            delay={i * 90}
            className="max-[700px]:flex-none max-[700px]:basis-[84%] max-[700px]:snap-center"
          >
            <div
              className={
                'relative flex h-full flex-col gap-2.5 rounded-[14px] bg-white ' +
                'transition-[box-shadow,transform] duration-[160ms] ease-vi hover:-translate-y-0.5 hover:shadow-vi2 ' +
                (t.popular ? 'border-2 border-vi-primary p-[25px] shadow-vi-dark' : 'border border-vi-border p-[26px]')
              }
            >
              {t.popular && (
                <div className="absolute -top-[13px] left-1/2 -translate-x-1/2 rounded-full bg-vi-warning-strong px-3.5 py-1 text-[11px] font-bold whitespace-nowrap text-white">
                  Most Popular
                </div>
              )}
              <div className={'mb-3.5 h-[6px] rounded-full ' + t.band} />
              <div className="text-xs font-bold tracking-[0.12em] text-vi-ink3 uppercase">{t.name}</div>
              <div className="font-display text-[38px] leading-none font-black tracking-[-0.02em] text-vi-ink">
                {t.price}
              </div>
              <div className="text-[13px] text-vi-ink3">
                {t.per}
                {t.save ? ' · ' : ''}
                {t.save && <b className="font-bold text-vi-primary-dark">{t.save}</b>}
              </div>
              <ul className="m-0 mt-2 mb-4 flex flex-1 list-none flex-col gap-1.5 p-0">
                {t.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm leading-[1.4] text-vi-ink2">
                    <IconCheck size={14} stroke={2.6} className="mt-0.5 shrink-0 text-vi-primary" /> {b}
                  </li>
                ))}
              </ul>
              <Button variant={t.popular ? 'primary' : 'dark'} block onClick={() => onChoose?.(t.id)}>
                Get started
              </Button>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="mt-1 hidden items-center justify-center gap-[7px] text-xs font-semibold text-vi-ink3 max-[700px]:flex">
        <IconArrowRight size={14} stroke={2.4} /> Swipe to compare packs
      </div>
    </section>
  )
}
