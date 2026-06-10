import { useEffect, useState } from 'react'
import { LogoVI } from './Logo.jsx'
import { IconArrowRight } from './Icons.jsx'
import { Button, Nudge, PlateField } from './ui.jsx'

/* Slides down from the top once the visitor scrolls past the hero. */
export function StickyCTA({ plate, setPlate, onSubmit, onHome }) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 620)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={
        'fixed inset-x-0 top-0 z-[60] border-b border-vi-border bg-white/95 ' +
        'shadow-[0_4px_20px_rgba(0,0,0,0.06)] backdrop-blur-[10px] backdrop-saturate-[1.4] ' +
        'transition-transform duration-[280ms] ease-vi ' +
        (show ? 'translate-y-0' : '-translate-y-full')
      }
      aria-hidden={!show}
    >
      <div className="mx-auto flex max-w-[1160px] items-center gap-5 px-6 py-2.5">
        <button
          className="shrink-0 cursor-pointer border-0 bg-transparent p-0 max-[700px]:hidden"
          onClick={onHome}
          aria-label="Vehicle Insight home"
          tabIndex={show ? 0 : -1}
        >
          <LogoVI height={30} />
        </button>
        <div className="flex-auto overflow-hidden font-display text-base font-extrabold tracking-[-0.01em] text-ellipsis whitespace-nowrap text-vi-ink max-[1000px]:hidden">
          Know the full story behind any vehicle
        </div>
        <form
          className="flex shrink-0 items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit(plate.trim().toUpperCase() || 'YH17 SRU')
          }}
        >
          <PlateField value={plate} onChange={setPlate} placeholder="TYPE REG..." small tabIndex={show ? 0 : -1} />
          <Button type="submit" tabIndex={show ? 0 : -1}>
            Get report
            <Nudge>
              <IconArrowRight size={15} stroke={2.4} />
            </Nudge>
          </Button>
        </form>
      </div>
    </div>
  )
}
