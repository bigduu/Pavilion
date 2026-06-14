import { useEffect, useState } from 'react'

function parseValue(value: string) {
  const match = value.match(/^(\d+)(.*)$/s)
  return { target: match ? Number(match[1]) : null, suffix: match ? match[2] : '' }
}

/**
 * Animates a leading integer in `value` from 0 up to its target on mount
 * (e.g. "100%" counts to 100, "5" to 5). Any value without a leading number —
 * or under prefers-reduced-motion — renders as-is. Used for the hero stats,
 * which are always above the fold, so it starts immediately rather than
 * waiting on scroll-into-view.
 */
export function CountUp({ value, durationMs = 1400 }: { value: string; durationMs?: number }) {
  const { target, suffix } = parseValue(value)

  const prefersReduced =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const canAnimate = target !== null && !prefersReduced

  const [display, setDisplay] = useState(() =>
    target === null ? value : canAnimate ? `0${suffix}` : `${target}${suffix}`,
  )

  useEffect(() => {
    if (!canAnimate || target === null) return

    let raf = 0
    let start = 0

    const step = (now: number) => {
      if (!start) start = now
      const progress = Math.min(1, (now - start) / durationMs)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(`${Math.round(eased * target)}${suffix}`)
      if (progress < 1) raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    // Safety net: rAF is throttled in background/headless tabs, so guarantee the
    // final value lands even if the animation frames never advance.
    const fallback = window.setTimeout(() => setDisplay(`${target}${suffix}`), durationMs + 250)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      clearTimeout(fallback)
    }
  }, [canAnimate, target, suffix, durationMs])

  return <span>{display}</span>
}
