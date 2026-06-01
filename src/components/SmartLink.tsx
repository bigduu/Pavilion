import type { AnchorHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'

type SmartLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
}

/**
 * Renders an internal route (e.g. `/download?lang=zh#first-run`) as a
 * client-side react-router <Link> so navigation avoids a full page reload,
 * while leaving same-page hash anchors and external links as plain <a>
 * elements — preserving the original URL scheme exactly.
 */
export function SmartLink({ href, children, ...rest }: SmartLinkProps) {
  const isInternalRoute = href.startsWith('/')

  if (isInternalRoute) {
    return (
      <Link to={href} {...rest}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href} {...rest}>
      {children}
    </a>
  )
}
