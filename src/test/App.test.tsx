import { describe, expect, it, beforeEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'
import { en, zh } from './fixtures'

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

beforeEach(() => {
  window.localStorage.clear()
  // App writes the active locale onto the real jsdom URL via replaceState;
  // reset it so getInitialLocale does not leak between tests.
  window.history.replaceState({}, '', '/')
})

describe('Pavilion app', () => {
  it('renders the home page hero with English copy by default', () => {
    renderAt('/?lang=en')
    expect(
      screen.getByRole('heading', { level: 1, name: en.hero.title }),
    ).toBeInTheDocument()
    // The why-bodhi highlights section is present on the home page.
    expect(screen.getByText(en.highlights.title)).toBeInTheDocument()
  })

  it('toggles all visible copy when the language switch is used', async () => {
    const user = userEvent.setup()
    renderAt('/?lang=en')

    expect(
      screen.getByRole('heading', { level: 1, name: en.hero.title }),
    ).toBeInTheDocument()

    const group = screen.getByRole('group', { name: en.nav.language })
    await user.click(within(group).getByRole('button', { name: '中文' }))

    expect(
      screen.getByRole('heading', { level: 1, name: zh.hero.title }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { level: 1, name: en.hero.title }),
    ).not.toBeInTheDocument()
  })

  it('routes to the download page from its URL', () => {
    renderAt('/download?lang=en')
    expect(
      screen.getByText(en.download.page.latestTitle),
    ).toBeInTheDocument()
    // The download primary CTA copy is unique to the download page i18n.
    expect(
      screen.getByRole('link', { name: en.download.page.primaryCta }),
    ).toBeInTheDocument()
  })

  it('navigates from home to features via a client-side link without a full reload', async () => {
    const user = userEvent.setup()
    renderAt('/?lang=en')

    const nav = screen.getByRole('navigation', { name: 'Primary navigation' })
    await user.click(within(nav).getByRole('link', { name: en.nav.features }))

    // Features page hero heading should now be rendered.
    expect(
      screen.getByRole('heading', { level: 1, name: en.features.title }),
    ).toBeInTheDocument()
  })

  it('renders the docs page from its URL with the stored locale', () => {
    // getInitialLocale resolves the locale from the persisted preference;
    // seed it to Chinese to assert localized docs content renders.
    window.localStorage.setItem('pavilion-locale', 'zh')
    renderAt('/docs')
    expect(
      screen.getByRole('heading', { level: 1, name: zh.docs.title }),
    ).toBeInTheDocument()
  })
})
