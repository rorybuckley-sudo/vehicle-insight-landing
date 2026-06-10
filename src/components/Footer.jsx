import { LogoVI } from './Logo.jsx'

const linkCls =
  'block cursor-pointer border-0 bg-transparent p-0 py-[5px] text-left text-sm text-white/[0.72] no-underline transition-colors duration-[160ms] ease-vi hover:text-white'

const headCls = 'mb-3.5 font-display text-[11px] font-black tracking-[0.18em] text-white/55 uppercase'

export function Footer({ onNav }) {
  return (
    <footer className="mt-8 bg-vi-dark text-white">
      <div className="mx-auto grid max-w-[1160px] grid-cols-[1.6fr_1fr_1fr_1fr] gap-9 px-6 pt-12 pb-9 max-[1000px]:grid-cols-2 max-[700px]:gap-7">
        <div>
          <LogoVI height={40} wordmarkColor="#ffffff" />
          <p className="mt-[18px] mb-0 max-w-[300px] text-sm leading-[1.55] text-white/60">
            Comprehensive vehicle history and data checks, empowering smarter buying decisions.
          </p>
        </div>
        <div>
          <div className={headCls}>Reports</div>
          <button className={linkCls} onClick={() => onNav?.('pricing')}>
            Pricing
          </button>
        </div>
        <div>
          <div className={headCls}>Company</div>
          <button className={linkCls} onClick={() => onNav?.('contact')}>
            Contact
          </button>
        </div>
        <div>
          <div className={headCls}>Legal</div>
          <button className={linkCls}>Privacy Policy</button>
          <button className={linkCls}>Terms &amp; Conditions</button>
          <button className={linkCls}>Refund Policy</button>
          <button className={linkCls}>Cookie Policy</button>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1160px] items-end justify-between gap-6 border-t border-white/10 px-6 pt-[22px] pb-8 max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-3.5">
        <div className="flex flex-col gap-[7px] text-xs leading-[1.4] text-white/45">
          <div>© 2026 Vehicle Insight Limited. All rights reserved.</div>
          <div>
            Vehicle Insight Limited is a private limited company registered in England and Wales (Company Number:
            17007356).
          </div>
          <div>Registered office: Staverton Court, Staverton, Cheltenham, Gloucester, England, GL51 0UX.</div>
          <div>Company status: Active.</div>
        </div>
        <div className="text-xs font-semibold whitespace-nowrap text-white/35">Powered by MotorEasy</div>
      </div>
    </footer>
  )
}
