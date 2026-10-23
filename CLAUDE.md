# CLAUDE.md

Personal portfolio of Zibril Yuan Afrianto ("ea"), a Unity game programmer. Vue 3 static site on Netlify.

**Read before structural changes:** [docs/PRD.md](docs/PRD.md) (what) · [docs/SYSTEM_DESIGN.md](docs/SYSTEM_DESIGN.md) (how) · [docs/PROJECT_RULES.md](docs/PROJECT_RULES.md) (conventions). The docs win over habit. If code and docs disagree, flag it.

> Migration in progress: the repo is still on Vue CLI + Tailwind v3 until PRD Phase 0 lands. Rules below describe the target (Vite + vite-ssg + Tailwind v4).

## Commands
- `npm run dev` · `npm run build` · `npm run preview` · `npm run lint` · `npm test` · `npm run images`

## Non-negotiables
- Content only in `src/content/` and `public/`. No hardcoded text or links in components.
- Pure helpers in `src/lib/` (no Vue/DOM). Reactive logic in `src/composables/use*.js`.
- `<script setup>`, multi-word PascalCase component names, `<style scoped>` only.
- Colors only through semantic token classes (`bg-surface`, `text-text-muted`, `text-primary` …). No hex or `bg-[#…]` in components.
- SSG-safe: browser APIs only in `onMounted`/handlers. Clean up observers and listeners.
- Images: originals in `assets-src/`, then run `npm run images` → WebP in `public/img/`. Always real `alt`, `width`, `height`.
- Slugs and section ids are permanent. Use `null`, never `'null'`. No `v-html`.
- Check light + dark themes and 360 px width.

## Workflow
- Branch `feat|fix|chore|content/<name>` off `development`. `main` is production.
- Conventional Commits (`feat(nav): …`, `content(projects): …`). Commit and push only when ea asks.
- Never invent ea's experience, dates, metrics or project details. Leave `TODO(ea):` placeholders.
- Stay within the requested phase. Report unrelated issues instead of fixing them silently.
