/** Prefix a public/ path with Vite's base (`/Pavilion/` on GitHub Pages). */
export function publicAsset(path: string): string {
  const relative = path.replace(/^\//, '')
  return `${import.meta.env.BASE_URL}${relative}`
}
