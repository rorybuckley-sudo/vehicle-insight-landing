import { useId } from 'react'

// Vehicle Insight lockup — three nested gradient swooshes + serif wordmark.
// `wordmarkColor` lets dark surfaces (footer) keep the wordmark legible —
// the source design shipped it #3d3d3e on a #3d3d3e footer, invisible.
export function LogoVI({ height = 44, wordmarkColor = '#3d3d3e' }) {
  const id = useId().replace(/:/g, '_')
  return (
    <svg viewBox="0 0 540 220" style={{ height, display: 'block', width: 'auto' }} aria-hidden="true">
      <defs>
        <linearGradient id={`r-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9c1d23" />
          <stop offset="100%" stopColor="#c82430" />
        </linearGradient>
        <linearGradient id={`o-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f26522" />
          <stop offset="100%" stopColor="#f7941e" />
        </linearGradient>
        <linearGradient id={`t-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1f7a5e" />
          <stop offset="100%" stopColor="#1fa98c" />
        </linearGradient>
      </defs>
      <g>
        <path
          fill={`url(#r-${id})`}
          d="M170,38h-95a30,30 0 0 0 -30,30v76a30,30 0 0 0 30,30h95l20,32V68a30,30 0 0 0 -30,-30z"
        />
        <path
          fill={`url(#o-${id})`}
          d="M150,18h-95a30,30 0 0 0 -30,30v76a30,30 0 0 0 30,30h95l20,32V48a30,30 0 0 0 -30,-30z"
        />
        <path
          fill={`url(#t-${id})`}
          d="M130,38h-95a30,30 0 0 0 -30,30v76a30,30 0 0 0 30,30h95l20,32V68a30,30 0 0 0 -30,-30z"
        />
        <path fill="#fff" d="M55,80 L80,80 L92,128 L104,80 L129,80 L108,150 L76,150 Z" />
        <rect fill="#fff" x="138" y="80" width="20" height="70" rx="3" />
      </g>
      <text x="210" y="100" fontFamily="Fraunces, Georgia, serif" fontWeight="800" fontSize="48" letterSpacing="-0.5" fill={wordmarkColor}>
        VEHICLE
      </text>
      <text x="210" y="148" fontFamily="Fraunces, Georgia, serif" fontWeight="800" fontSize="48" letterSpacing="-0.5" fill={wordmarkColor}>
        INSIGHT
      </text>
    </svg>
  )
}

// MotorEasy co-brand lockup (header association + trust transfer).
export function MotorEasyMark({ height = 24 }) {
  return (
    <span className="inline-flex items-center gap-2 font-display font-black tracking-[-0.01em]">
      <span
        className="inline-flex items-center justify-center rounded-lg bg-vi-me-teal text-white"
        style={{ width: height + 4, height: height + 4 }}
      >
        <svg
          width={(height + 4) * 0.62}
          height={(height + 4) * 0.62}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2" />
          <circle cx="6.5" cy="16.5" r="2.5" />
          <circle cx="16.5" cy="16.5" r="2.5" />
        </svg>
      </span>
      <span className="text-vi-me-teal" style={{ fontSize: height * 0.62 }}>
        motor<b className="font-black text-vi-dark">easy</b>
      </span>
    </span>
  )
}
