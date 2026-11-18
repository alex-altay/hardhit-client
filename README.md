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

## Performance and other technical details

**GSAP.** Weighs under 50 KB compressed (plugin included). That’s less than any single one of the hundreds of photos on the site. It isn’t part of the main bundle and only loads when it’s actually needed.

**A golden-ratio easing.** A fun detail: wrote an easing function that follows the curves of the golden spiral. The animation speeds up where the curve drops sharply and slows down as it climbs back up, like a ball rolling along a spiral.

**Intro images.** Each photo in the homepage intro is on screen for just 200 ms, so they’re served at 1x density. On desktop, intro frames used to weigh 0.7–1.5 MB. Now they’re 375 KB, with no visible difference. Largest Contentful Paint (LCP) on desktop comes in under 1 second.

**Image processing.** The site uses nuxt/image to generate images at exactly the sizes it needs, and caches them for 30 days so they aren’t re-compressed on every request. For the hero image of the Design section, I went a step further and pre-built it in AVIF and WebP at three sizes. The server no longer re-compresses a huge photo on every request, which used to take 0.6–0.7 s per response. The file size dropped from 350 to 199 KB.

**API caching.** Strapi’s JSON responses are cached in Nitro for 5 minutes. Over 25 page loads, the backend receives 7 requests instead of 50. And if Strapi ever goes down, pages that are already cached keep loading. On top of that, the site only requests the fields it actually renders, and the homepage data shrank from 29.6 to 5 KB.

**Compression.** Railway, was serving JS uncompressed, so on mobile the homepage pulled in 1.06 MB of scripts. I enabled Brotli pre-compression, and that dropped to 323 KB. On slow 4G, first content now appears in 2.5 s instead of 7.4 s. Nuxt was also inlining CSS directly into the HTML by default, which pushed pages up to 480 KB. Moved the styles into separate, cacheable files, and the HTML shrank to 50–210 KB. The server now also gzips it, so the homepage comes in at 18 KB.

**A leaner main bundle.** I moved the markdown parser and GSAP out of the main bundle, cutting the homepage JS from 347 to 259 KB. Issue descriptions used to be stored as markdown. I replaced them with a structured list in Strapi, so the homepage no longer needs a parser at all.

**Hall of Fame.** For the Hall of Fame, I wrote a custom Strapi endpoint. It returns 450+ bands in a single response, with just the name, the link and which content the magazine has on each band. Strapi’s standard API returns at most 100 entries per request.

**Galleries.** The galleries use an old trick: the next photo preloads while you’re looking at the current one. Even in a gallery of 300+ photos, transitions feel seamless. Band cards on the Captured Live page are lazy-loaded. Before, the page downloaded 70 photos right away: 1.3 MB on desktop and 4.1 MB on an iPhone.

**Fixed sneaky trap of @nuxt/image.** Version 2 dropped the xs breakpoint, and all the phone sizes were silently ignored, so phones were getting desktop images. After the fix, the gallery weighs 731 KB on an iPhone instead of 1.9 MB.

**Stability.** One broken block can’t take down the whole site. If YouTube, Instagram or the Top 10 fails to load, only that block disappears, and the rest of the page keeps working.


## SEO

`NUXT_PUBLIC_SITE_URL` (`https://hardhit.de`) is the main address of the site. Canonical links and Open Graph tags are built from it. Requests to any other host (the Railway domain, localhost) get `X-Robots-Tag: noindex` and a `robots.txt` that disallows everything, so only the main domain is indexed.

Old URLs like gallery.html redirect to the new pages with a 301, so no links or search rankings will be lost.


## Security headers and compression

Security headers for all routes are set in `routeRules` in `nuxt.config.ts`. Static assets are precompressed at build time (`nitro.compressPublicAssets`), HTML pages are gzipped by `server/plugins/compress-html.ts`.

## Deployment

The site runs on Railway. Set all three environment variables on the service (`NUXT_PUBLIC_STRAPI_ORIGIN`, `NUXT_API_SECRET`, `NUXT_PUBLIC_SITE_URL`), they are needed for the build and at runtime.

When a change touches the Strapi schema (a new field, a renamed component), deploy `hardhit-strapi-server` first and the client after it. Strapi rejects unknown fields in queries (`strictParams`), so a new client in front of an old Strapi gets 400 errors.
