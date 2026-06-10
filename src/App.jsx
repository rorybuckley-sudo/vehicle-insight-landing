import { useState } from 'react'
import { Header } from './components/Header.jsx'
import { StickyCTA } from './components/StickyCTA.jsx'
import { Hero } from './components/Hero.jsx'
import { SampleSection } from './components/SampleSection.jsx'
import { StepsSection } from './components/Steps.jsx'
import { SourcesLine, ChecksCards } from './components/Checks.jsx'
import { StatStrip } from './components/StatStrip.jsx'
import { ReasonsRow } from './components/Reasons.jsx'
import { PricingSection } from './components/Pricing.jsx'
import { FinalCTA } from './components/FinalCTA.jsx'
import { Footer } from './components/Footer.jsx'
import { Journey } from './components/Journey.jsx'
import { LiveActivityToast } from './components/SocialProof.jsx'

const CONTENT_SHELL =
  'mx-auto my-6 max-w-[1160px] rounded-2xl bg-vi-content px-8 pt-9 pb-12 max-[700px]:m-3 max-[700px]:px-4 max-[700px]:pt-6 max-[700px]:pb-8'

export default function App() {
  const [plate, setPlate] = useState('')
  const [reason, setReason] = useState(null)
  const [route, setRoute] = useState('home')

  const nav = (r) => {
    setRoute(r)
    window.scrollTo({ top: 0 })
  }

  const [journeyReg, setJourneyReg] = useState('')

  /* Entering a reg starts the mock buying journey:
     scan → free report → checkout → success. */
  const onSubmit = (reg, why) => {
    setJourneyReg(reg || 'YH17 SRU')
    if (why) setReason(why)
    setRoute('journey')
    window.scrollTo({ top: 0 })
  }

  /* "View a sample full check" goes to the actual sample report
     (it used to land on pricing) and pulses the card to orient the eye. */
  const onSample = () => {
    if (route !== 'home') nav('home')
    requestAnimationFrame(() => {
      const el = document.getElementById('sample-report')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        window.dispatchEvent(new Event('vi:highlight-sample'))
      }
    })
  }

  /* Scroll back to the plate field and focus it, ready to type. */
  const focusCheck = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => document.getElementById('plate-input')?.focus({ preventScroll: true }), 600)
  }

  /* Reason cards pre-select the reason, then hand off to the check —
     submitting the reg then skips the "why?" step entirely. */
  const pickReason = (id) => {
    setReason(id)
    focusCheck()
  }

  return (
    <div className="min-h-screen bg-vi-page">
      <Header onNav={nav} route={route} />
      {route !== 'journey' && (
        <StickyCTA plate={plate} setPlate={setPlate} onSubmit={onSubmit} onHome={() => nav('home')} />
      )}
      {route === 'home' && <LiveActivityToast />}

      {route === 'journey' ? (
        <Journey reg={journeyReg} reason={reason} onHome={() => nav('home')} />
      ) : route === 'pricing' ? (
        <div className={CONTENT_SHELL}>
          <PricingSection onChoose={() => {}} />
          <section className="mt-10 pt-9 pb-2">
            <div className="text-center">
              <div className="mb-2.5 font-display text-[11px] font-black tracking-[0.14em] text-vi-ink3 uppercase">
                What's included
              </div>
              <h2 className="m-0 font-display text-[clamp(26px,3vw,36px)] leading-[1.08] font-black tracking-[-0.015em] text-balance text-vi-ink">
                Basic and Full <span className="text-vi-red-start">checks compared.</span>
              </h2>
              <p className="mx-auto mt-2.5 mb-0 max-w-[640px] text-base text-pretty text-vi-ink2">
                Start free with the basics, then unlock the full picture whenever you're ready.
              </p>
            </div>
            <SourcesLine />
            <ChecksCards />
          </section>
          <FinalCTA plate={plate} setPlate={setPlate} onSubmit={onSubmit} />
        </div>
      ) : (
        <div className={CONTENT_SHELL}>
          <Hero
            plate={plate}
            setPlate={setPlate}
            reason={reason}
            setReason={setReason}
            onSubmit={onSubmit}
            onSample={onSample}
          />
          <SampleSection onCheck={focusCheck} />
          <StepsSection />
          <section className="mt-10 pt-9 pb-2">
            <SourcesLine />
            <ChecksCards />
          </section>
          <StatStrip />
          <ReasonsRow onPick={pickReason} />
          <PricingSection onChoose={() => {}} />
          <FinalCTA plate={plate} setPlate={setPlate} onSubmit={onSubmit} />
        </div>
      )}

      <Footer onNav={nav} />
    </div>
  )
}
