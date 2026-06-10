import { LogoVI, MotorEasyMark } from './Logo.jsx'
import { IconChevronDown } from './Icons.jsx'

export function Header({ onNav, route = 'home', signedIn = true }) {
  const link = (active) =>
    'cursor-pointer border-0 bg-transparent py-1.5 text-sm font-semibold transition-colors duration-[160ms] ease-vi hover:text-vi-primary max-[700px]:hidden ' +
    (active ? 'text-vi-primary' : 'text-vi-ink2')
  return (
    <header className="sticky top-0 z-50 border-b border-vi-border bg-white">
      <div className="mx-auto grid max-w-[1160px] grid-cols-[auto_1fr_auto] items-center gap-6 px-6 py-[14px] max-[700px]:grid-cols-[auto_auto] max-[700px]:justify-between max-[700px]:gap-3">
        <button
          className="flex cursor-pointer items-center gap-3 border-0 bg-transparent p-0"
          onClick={() => onNav('home')}
          aria-label="Vehicle Insight home"
        >
          <LogoVI height={44} />
        </button>
        <div className="flex flex-col items-center gap-0.5 justify-self-center max-[1000px]:hidden">
          <span className="text-[10px] text-vi-ink3 italic">in association with</span>
          <MotorEasyMark height={22} />
        </div>
        <div className="flex items-center gap-[22px]">
          <button className={link(route === 'pricing')} onClick={() => onNav('pricing')}>
            Pricing
          </button>
          <button className={link(false)} onClick={() => onNav('contact')}>
            Contact
          </button>
          {signedIn ? (
            <button className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-vi-border bg-white py-1.5 pr-3.5 pl-2.5 text-[13px] font-semibold text-vi-ink transition-colors duration-[160ms] ease-vi hover:bg-zinc-50">
              <span className="inline-flex size-[22px] items-center justify-center rounded-full bg-zinc-200 text-[11px] text-vi-ink2">
                JM
              </span>
              My account
              <IconChevronDown size={14} />
            </button>
          ) : (
            <button
              className="cursor-pointer rounded-lg bg-vi-primary px-5 py-[11px] text-sm font-bold text-white shadow-primary-glow hover:bg-vi-primary-dark"
              onClick={() => onNav('signin')}
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
