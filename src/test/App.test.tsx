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

  it('renders the current WebSocket-first architecture and supporting modules in English features', () => {
    renderAt('/features?lang=en')

    expect(screen.getAllByText(/\/v2\/stream/).length).toBeGreaterThan(0)
    for (const responsibility of [
      'Jiandu: independent filesystem-backed shared memory library and stdio MCP server',
      'Nova: native computer-use capabilities exposed through MCP',
      'Lotus Next: responsive next-generation frontend track developed alongside Lotus',
      'Magpie: Telegram and Feishu/Lark connector shipped as a Bamboo service plugin',
    ]) {
      expect(screen.getByText(responsibility)).toBeInTheDocument()
    }
    expect(screen.queryByText(/Built on SSE/)).not.toBeInTheDocument()
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

  it('renders the current WebSocket-first architecture and supporting modules in Chinese docs', () => {
    window.localStorage.setItem('pavilion-locale', 'zh')
    renderAt('/docs')

    expect(screen.getAllByText(/\/v2\/stream/).length).toBeGreaterThan(0)
    for (const responsibility of [
      'Jiandu：独立的共享记忆 Rust 库与 stdio MCP server',
      'Nova：原生 computer-use MCP server',
      'Lotus Next：与 Lotus 并行的响应式前端路线',
      'Magpie：IM 连接器与 Bamboo service plugin',
    ]) {
      expect(screen.getByText(responsibility)).toBeInTheDocument()
    }
    expect(screen.queryByText(/基于 SSE/)).not.toBeInTheDocument()
  })
})
