# CLAUDE.md

Personal portfolio of Zibril Yuan Afrianto ("ea"), a Unity game programmer. Vue 3 + vite-ssg + Tailwind v4 static site on Netlify (`ea-portfolio.netlify.app`). Monochrome light/dark theme.

**Read before structural changes:** [docs/PRD.md](docs/PRD.md) (what, with status) · [docs/SYSTEM_DESIGN.md](docs/SYSTEM_DESIGN.md) (how, as built; §13 = known issues K-01…K-17) · [docs/PROJECT_RULES.md](docs/PROJECT_RULES.md) (conventions). The docs win over habit. If code and docs disagree, flag it and update the docs in the same change.

## Commands
- `npm run dev` · `npm run build` (vite-ssg + sitemap) · `npm run preview` · `npm test` (Vitest) · `npm run images` (sharp → WebP)
- No linter yet (K-08). Use Node 22 (`.nvmrc`).

## Non-negotiables
- Content only in `src/content/` and `public/`. No hardcoded text or links in components.
- Pure helpers in `src/lib/` (no Vue/DOM). Reactive logic in `src/composables/use*.js`. Tests in `tests/*.spec.js`.
- `<script setup>`, multi-word PascalCase component names, `<style scoped>` only.
- Colors only through semantic token classes (`bg-surface`, `text-text-muted`, `text-primary` …). No hex or raw palette classes (`zinc-*`, `red-*`) in new code.
- SSG-safe: browser APIs only in `onMounted`/handlers. Clear every timer, observer and listener on unmount.
- Images: original in `assets-src/` → `npm run images` → `public/img/<type>-<name>.webp`. Real `alt`, `width`, `height`.
- Slugs and ids are permanent. Use `null`, never `'null'`. No `v-html`. No `<a>` inside `<a>`.
- Check light + dark themes and 360 px width.

## Workflow
- Branch `feat|fix|chore|content|docs/<name>` off `development`. Never commit directly to `main`, `development`, `staging` or `production-v*`.
- Conventional Commits (`fix(layout): …`, `content(projects): …`). Commit and push only when ea asks.
- Never invent ea's experience, dates, metrics or project details. Leave `TODO(ea):` placeholders and never render them.
- Stay within the requested scope. Report unrelated issues (or add them to SYSTEM_DESIGN §13) instead of fixing them silently.
