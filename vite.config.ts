/// <reference types="vitest/config" />
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Project site: https://bigduu.github.io/Pavilion/
const pagesBase = '/Pavilion/'

/** GitHub Pages has no SPA rewrite. Deep links need a copy of index.html at 404.html. */
function spa404Fallback(): Plugin {
  return {
    name: 'pavilion-spa-404',
    apply: 'build',
    closeBundle() {
      const dist = resolve('dist')
      copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: pagesBase,
  plugins: [react(), spa404Fallback()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
