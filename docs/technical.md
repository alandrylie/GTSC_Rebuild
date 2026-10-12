# GTSC Website Rebuild: Technical Doc

How the site is built. For what it does and why, see [product.md](product.md).

## Stack

- **Front end:** Angular 22, Angular Material (Material 3 theme in `src/material-theme.scss`)
- **Back end:** Firebase (Auth, Firestore, Hosting), with AI Logic and Gemini planned
- **Tooling:** Vitest (jsdom), angular-eslint, Prettier

## Design Decisions

### Mobile first

Every page and component is styled for phones first. Larger screens are added on top with `min-width` media queries, never the other way round.

| Breakpoint | Screen               | Used for                                       |
| ---------- | -------------------- | ---------------------------------------------- |
| Default    | Phones               | Base styles                                    |
| **600px**  | Tablets              | Hero size                                      |
| **768px**  | Portrait iPad and up | Navigation switches from hamburger to full bar |
| **1024px** | Laptops              | Hero size                                      |

Ultra-wide screens get the laptop layout. No extra breakpoint is planned, but wide elements are capped so they don't stretch:

- **Hero:** max width **1600px**, centred (wider than that and the pistol starts to crop), with the dark slate toolbar colour filling either side.
- **Page content:** planned to sit in a centred column of about 1200–1440px.

### Navigation

- The nav sits at the **top of every page** (in `app.html`), so the menu is always in the same place.
- **768px and up:** a full bar with the links and a Members Login button on the right.
- **Below 768px:** a hamburger button opens a side drawer (`mat-sidenav`) with the same links.
- Toolbar colour: dark slate `#263238`.

### Hero header

- Shown on the **Home page only**, below the nav. On every page it would push content down on phones.
- Club badge in the top-left corner, club name centred.
- The photo crops to fit each screen with `object-fit: cover`. `object-position` keeps the pistol in view.

### Theme

- Light and dark mode follow the device setting. A toggle button is planned for later.
- The colour palette stays as it is. Any colour change needs committee approval.

### Images

- Served from `public/images/`.
- Photos are WebP at two widths, **800px** (phones) and **1920px** (tablets and laptops). The browser picks one with `srcset`.
- Full-size masters are kept **outside the repo** (`../gtscAssets/`), so they are never deployed or stored in git history.
- Stock photos come from Unsplash under the free Unsplash License. The source URL of each one is recorded alongside its master.
- `logo.svg` was traced from the club's original badge in Inkscape. A white backing circle fills the white areas so the badge shows correctly on dark backgrounds.

### Routing

- All URL paths live in one constants file, `src/app/constants/app-routes.constants.ts` (`APP_ROUTES`). No route strings are typed anywhere else.
- `APP_ROUTES` is built inside an IIFE and returned with `Object.freeze`, so it is read-only at runtime and in TypeScript.
- Paths are lowercase with hyphens (for example `range-times`).
- The wildcard route (`**`) redirects unknown URLs to Home. It must always be the **last** route.

## Folder Structure

```
src/app/
  components/  pieces used inside pages (chat message row, chat message form)
  constants/   shared constants (APP_ROUTES)
  guards/      route guards (authGuard)
  layout/      the frame around every page: navigation, hero header
  model/       TypeScript interfaces for Firestore data
  pages/       one folder per routed page
  service/     services (the only place that talks to Firebase)
  shared/      reusable bits (confirm dialog)
public/images/ images served by the site
docs/          product and technical docs
```

## Data Design (Firestore)

### Current

| Path                 | Holds                                                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------------------- |
| `clubInfo/schedule`  | `sessions[]`: the fixed weekly timetable (`day`, `start`, `end`, `activity`, `whoCanAttend`). No dates. |
| `clubInfo/committee` | `members[]`: committee members (`firstName`, `lastName`, `position[]`)                                  |

Club info in Firestore is the single source of truth. Both the pages and the AI assistant read from it.

### Planned

- **Committee:** restructure to `committee/{id}`, one document per person (`firstName`, `lastName`, `position[]`, `uid`). Security rules work per document, so this lets access follow a person's role.
- **Club info:** split into `clubInfo/schedule`, `clubInfo/fees` and `clubInfo/disciplines`, one document per permission area, so each rule maps to one role (for example `treasurer` edits fees).

## Authentication

- Firebase Auth with email and password.
- `AuthService` (`src/app/service/auth.service.ts`) exposes the current user as a signal (`userSignal`), plus `login()` and `logout()`.
- Access is role-based. A person's committee `position[]` decides what they can edit.

## Hosting

- Firebase Hosting (main). An IONOS subdomain is the preferred submission address if it works.
- The site is a **single-page application**: the browser loads one `index.html`, and Angular's router swaps page components in and out without a full reload.
- **Deploy note:** answer "yes" to _"Configure as a single-page app?"_ during `firebase init hosting`. It adds a rewrite that sends every URL to `index.html`, so refreshing on a page like `/range-times` works instead of returning a 404.
