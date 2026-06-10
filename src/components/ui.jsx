import { useEffect, useRef, useState } from 'react'

/* ── Button ─────────────────────────────────────────────────────
   Variants mirror the source `.btn` system: primary / ghost / dark.
   `group` is always applied so child icons can nudge on hover.   */
const BTN_BASE =
  'group inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border-0 font-body text-sm font-bold ' +
  'transition-[background-color,box-shadow,transform] duration-[160ms] ease-vi ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vi-primary'

const BTN_VARIANTS = {
  primary: 'bg-vi-primary text-white shadow-primary-glow hover:bg-vi-primary-dark active:translate-y-px',
  ghost: 'border border-vi-border bg-white text-vi-ink hover:bg-zinc-50',
  dark: 'bg-vi-dark text-white hover:bg-[#2a2a2b]',
}

export function Button({ variant = 'primary', size, block, className = '', children, ...rest }) {
  const sizeCls = size === 'lg' ? 'px-[22px] py-[13px] text-[15px]' : 'px-5 py-[11px]'
  return (
    <button
      className={`${BTN_BASE} ${BTN_VARIANTS[variant]} ${sizeCls} ${block ? 'w-full' : ''} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

/* Arrow that nudges right when its parent `group` is hovered. */
export function Nudge({ children }) {
  return (
    <span className="inline-flex transition-transform duration-[160ms] ease-vi group-hover:translate-x-0.5">
      {children}
    </span>
  )
}

/* ── Scroll reveal ──────────────────────────────────────────────
   Fades content up the first time it enters the viewport.
   Respects prefers-reduced-motion (renders immediately).        */
export function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setInView(true)
      return undefined
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -36px 0px', ...options },
    )
    io.observe(el)
    return () => io.disconnect()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return [ref, inView]
}

export function Reveal({ as: Tag = 'div', delay = 0, y = 16, className = '', children, ...rest }) {
  const [ref, inView] = useInView()
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : `translateY(${y}px)`,
        transition: `opacity 0.7s var(--ease-vi) ${delay}ms, transform 0.7s var(--ease-vi) ${delay}ms`,
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/* ── Count-up ───────────────────────────────────────────────────
   Animates 0 → target once `start` is true. Ease-out cubic.     */
export function useCountUp(target, start, duration = 1100) {
  const [value, setValue] = useState(start ? target : 0)
  useEffect(() => {
    if (!start) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return undefined
    }
    let raf
    const t0 = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, target, duration])
  return value
}

/* ── UK number-plate entry field ───────────────────────────────
   Blue GB band + yellow-free white plate input, focus ring in
   brand green. `small` is the sticky-bar variant.               */
export function PlateField({ value, onChange, placeholder = 'TYPE CAR REG...', small = false, tabIndex, id }) {
  return (
    <div
      className={
        'grid grid-cols-[auto_1fr] items-stretch overflow-hidden bg-white ' +
        'border border-vi-border transition-[box-shadow,border-color] duration-[160ms] ease-vi ' +
        'focus-within:border-vi-primary focus-within:shadow-[0_0_0_3px_rgba(51,184,122,0.18)] ' +
        (small ? 'h-[42px] w-[168px] rounded-lg max-[700px]:w-[130px]' : 'mb-3 h-14 rounded-[10px]')
      }
    >
      <span
        className={
          'flex flex-col items-center justify-center gap-[3px] bg-[#00309a] font-display font-extrabold tracking-[0.04em] text-white ' +
          (small ? 'w-[30px] text-[10px]' : 'w-[38px] text-sm')
        }
      >
        UK
      </span>
      <input
        className={
          'w-full border-0 bg-transparent font-display font-extrabold text-vi-ink uppercase outline-0 ' +
          'placeholder:font-bold placeholder:text-zinc-400 ' +
          (small
            ? 'px-3 text-lg tracking-[0.1em] placeholder:tracking-[0.1em]'
            : 'px-[18px] text-[22px] tracking-[0.14em] placeholder:tracking-[0.14em]')
        }
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value.toUpperCase())}
        aria-label="Vehicle registration"
        autoComplete="off"
        autoCapitalize="characters"
        spellCheck={false}
        maxLength={9}
        tabIndex={tabIndex}
        id={id}
      />
    </div>
  )
}
