import type { ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'

export function RevealSection({
  id,
  className,
  startVisible = false,
  children,
}: {
  id?: string
  className: string
  startVisible?: boolean
  children: ReactNode
}) {
  const { elementRef, isVisible } = useReveal<HTMLElement>(startVisible)

  return (
    <section
      id={id}
      ref={elementRef}
      className={`section-shell ${isVisible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </section>
  )
}
