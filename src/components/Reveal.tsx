import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Apple-style scroll reveal: children start lowered + faded and float up into
 * place as the element scrolls toward the centre of the viewport. Triggered by
 * IntersectionObserver (works in every browser, incl. Safari). Reveals once.
 * If IntersectionObserver is unavailable, content shows immediately.
 */
export function Reveal({
  children,
  className = '',
  delayMs = 0,
}: {
  children: ReactNode
  className?: string
  delayMs?: number
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [shown, setShown] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true)
            observer.unobserve(entry.target)
          }
        })
      },
      // fire a little before the element reaches centre, so it lands as it arrives
      { rootMargin: '0px 0px -12% 0px', threshold: 0.18 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`apple-reveal ${shown ? 'is-in' : ''} ${className}`.trim()}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  )
}
