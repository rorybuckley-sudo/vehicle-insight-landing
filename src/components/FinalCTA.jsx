import { IconArrowRight } from './Icons.jsx'
import { Button, Nudge, Reveal } from './ui.jsx'

export function FinalCTA({ plate, setPlate, onSubmit }) {
  return (
    <Reveal
      as="section"
      className="mt-10 rounded-2xl border border-vi-border bg-white px-8 py-10 text-center"
    >
      <h2 className="m-0 mx-auto max-w-[720px] font-display text-[clamp(26px,3.2vw,40px)] leading-[1.08] font-black tracking-[-0.015em] text-balance text-vi-ink">
        One reg. <span className="text-vi-red-start">The whole story.</span>
      </h2>
      <p className="mx-auto mt-3.5 mb-6 max-w-[560px] text-base text-vi-ink2">
        30 seconds. Start with a free basic report — no card needed.
      </p>
      <form
        className="mx-auto grid max-w-[480px] grid-cols-[1fr_auto] gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit(plate.trim().toUpperCase() || 'YH17 SRU')
        }}
      >
        <input
          value={plate}
          onChange={(e) => setPlate(e.target.value.toUpperCase())}
          placeholder="AB12 CDE"
          aria-label="Vehicle registration"
          maxLength={9}
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          className="rounded-lg border border-vi-border px-4 py-3 text-sm font-bold tracking-[0.04em] uppercase outline-none transition-[border-color,box-shadow] duration-[160ms] ease-vi placeholder:text-zinc-400 focus:border-vi-primary focus:shadow-[0_0_0_3px_rgba(51,184,122,0.18)]"
        />
        <Button type="submit" size="lg">
          Run check
          <Nudge>
            <IconArrowRight size={14} stroke={2.4} />
          </Nudge>
        </Button>
      </form>
      <p className="mt-3.5 mb-0 text-xs text-vi-ink3">No card needed for the free basic report.</p>
    </Reveal>
  )
}
