import { useEffect, useRef, useState } from 'react'

export function useReveal<T extends HTMLElement>(startVisible = false) {
  const elementRef = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState(startVisible)

  useEffect(() => {
    if (startVisible) {
      return
    }

    const node = elementRef.current
    if (!node) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.22 },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [startVisible])

  return { elementRef, isVisible }
}
