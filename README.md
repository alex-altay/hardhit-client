# Hard Hit Magazine — client

Frontend part of Hard Hit Magazine website: magazine issues, concert photos of metal bands, interviews and design articles.

Built with Nuxt, Nuxt UI and GSAP. All content comes from Strapi 5, which lives in the sibling repository `hardhit-strapi-server`.

## Requirements

- Node.js 22 or newer
- A running Strapi instance and an API token for it

The API token only needs read access: `find` and `findOne` for the content types. Do not give it write permissions.

## Setup and local development

```bash
npm install
cp .env.example .env
```

Fill in `.env` and start the dev server on `http://localhost:3000`:

```bash
npm run dev
```

## Data

The browser and the server never call Strapi directly. All requests go through `server/api/strapi/[...path].ts`: a GET-only proxy that adds the API token. The Strapi module is configured to use it (`strapi.url: '/api/strapi'`).

Pages and components fetch data with `useStrapiData` (`app/composables/useStrapiData.ts`):

- requests time out after 10 seconds
- 404 and connection errors are turned into the error page with a mini game
- `{ optional: true }` is for secondary blocks (YouTube, Instagram, Top 10, Hall of Fame, the hero on `/bands`): if their request fails, the block is hidden and the error is logged on the server, the rest of the page still renders
- data is kept for the whole session, so going back to a page does not refetch it.

## Cache

Nitro saves strapi data in cache via lru-cache driver (cache size and number of cached record set in `nuxt.config.ts`). Cache time (`CACHE_SECONDS`) in `[...path].ts`, the same place where data handler lives

- Pros: Using this strategy we become better time to first byte (TTFB) and reducing a number of requests to Strapi dramatically.

- Cons: The content updates only after cache time (right now 5 minutes)

## a11y

100/100 score from Lighthouse / PageSpeed Insights is not enough for normal accessibility

On top of it, the site has:

- Full keyboard support
- Visible focus ring that adapts to light and dark themes
- Skip link to the main content
- One `h1` per page, no skipped heading levels
- Screen reader announcements for everything readable
- Site respects `prefers-reduced-motion`
- No horizontal scrolling down to 320px width and at 400% zoom
- Sufficient contrast for muted text and form controls
- Accessible search form

Checked all these points with VoiceOver and keyboard manually. Really proud of the result. It's the best accessibility level, that I've ever implemented

## SEO

`NUXT_PUBLIC_SITE_URL` (`https://hardhit.de`) is the main address of the site. Canonical links and Open Graph tags are built from it. Requests to any other host (the Railway domain, localhost) get `X-Robots-Tag: noindex` and a `robots.txt` that disallows everything, so only the main domain is indexed.

## Security headers and compression

Security headers for all routes are set in `routeRules` in `nuxt.config.ts`. Static assets are precompressed at build time (`nitro.compressPublicAssets`), HTML pages are gzipped by `server/plugins/compress-html.ts`.

## Deployment

The site runs on Railway. Set all three environment variables on the service (`NUXT_PUBLIC_STRAPI_ORIGIN`, `NUXT_API_SECRET`, `NUXT_PUBLIC_SITE_URL`), they are needed for the build and at runtime.

When a change touches the Strapi schema (a new field, a renamed component), deploy `hardhit-strapi-server` first and the client after it. Strapi rejects unknown fields in queries (`strictParams`), so a new client in front of an old Strapi gets 400 errors.
