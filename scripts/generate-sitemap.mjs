// scripts/generate-sitemap.mjs
import fs from 'node:fs'
import path from 'node:path'
import projects from '../src/content/projects.js'

const domain = 'https://ea-portfolio.netlify.app'
const today = new Date().toISOString().split('T')[0]

const routes = [
  { path: '', priority: '1.0', changefreq: 'monthly' },
  ...projects.map((p) => ({
    path: `project/${p.slug}`,
    priority: '0.8',
    changefreq: 'monthly'
  }))
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${domain}/${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

const distPath = path.resolve('dist/sitemap.xml')
const publicPath = path.resolve('public/sitemap.xml')

fs.writeFileSync(publicPath, xml, 'utf-8')
if (fs.existsSync(path.resolve('dist'))) {
  fs.writeFileSync(distPath, xml, 'utf-8')
}

console.log(`🗺️  Generated sitemap with ${routes.length} URLs at sitemap.xml`)
