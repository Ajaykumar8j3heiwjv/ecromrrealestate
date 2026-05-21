# TODO

- [x] Understand current black-screen cause and inspect repo files.
- [x] Fix JSX runtime mismatch in `vite.config.js` (set `jsxRuntime: 'automatic'`).
- [x] Add `Cache-Control: no-store` headers in `vercel.json` to prevent stale bundles.
- [x] Fix Netlify build failure by installing `terser` (required because `minify: 'terser'` was configured).
- [ ] Fix Vercel build/deploy warning about missing secret reference `VITE_API_URI` (= `@vite_api_url` not present): update `vercel.json` to not reference a non-existent secret.
- [ ] Commit + redeploy on Vercel.
- [ ] Verify production site no longer throws `A.jsxDEV is not a function`.

