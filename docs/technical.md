# GTSC Website Rebuild: Technical Doc

How the site is built. For what it does and why, see [product.md](product.md).

## Stack

- **Front end:** Angular 22, Angular Material (Material 3 theme in `src/material-theme.scss`)
- **Back end:** Firebase (Auth, Firestore, Hosting, AI Logic with Gemini `gemini-3.5-flash-lite`)
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
- Guarded pages (`authGuard`): Club Area and RO Chat. Everything else is public, including the AI assistant.

### Club Area tiles

- The Club Area page is a grid of cards, one per back-office page (1 column on phones, 2 from 768px, 3 from 1024px).
- The tiles come from one list, `CLUB_AREA_LINKS` in `src/app/constants/club-area-links.constants.ts` (IIFE + `Object.freeze`, like `APP_ROUTES`).
- **To add a page to the Club Area:** add one entry (`title`, `description`, `icon`, `route` from `APP_ROUTES`). No HTML changes are needed; each tile is drawn by the `ClubAreaCard` component.
- The greeting and the chat author name use the person's `displayName` from `users/{uid}`, falling back to their email if they have no profile.

### Join us (household enquiry)

- One form covers a whole household (adults and juniors). Dates are UK format (`DD/MM/YYYY`) via a custom `UkDateAdapter`.
- Before sending, a pop-up shows the club terms. A second section appears if every applicant is under 18 (parent/guardian rules).
- **Nothing is stored.** The form opens the visitor's own email app with a `mailto:` link, addressed by the disciplines the household ticks (rifles, pistols or both). The pure helper `recipientsFor()` picks the addresses from `clubInfo/contact.joinEmails` and removes duplicates; the `atLeastOneTicked` group validator makes sure at least one box is ticked. The committee has not approved online applications, so this is an enquiry; the real application is still on paper.
- A web page can't tell whether `mailto:` opened anything, so the thank-you card also offers **Open in Gmail**, **Open in Outlook.com** and **Copy details**.

### AI club assistant

- `AiAssistantService` uses Firebase AI Logic (Gemini Developer API). The chat session is built once per visit, so follow-up questions have context.
- Its system instruction holds the answer rules (tone, list formats, what to refuse) plus the club data from Firestore: `schedule`, `disciplines`, `committee`, `contact` and `fees`, sent as JSON.
- **Never an exact location:** firearms are kept on site, so the assistant only says Glenrothes, Fife, and that the Vice-Secretary gives directions once a visit is approved.
- Fees are stored in pence; the assistant is told to show pounds.
- Cost control: the project is on the Blaze plan, with a Firebase spend cap on the Gemini API and a budget alert. Gemini is prepaid through AI Studio, so it stops (with a friendly error) if the credit runs out.

## Folder Structure

```
src/app/
  components/  pieces used inside pages (chat message row/form/edit, join terms pop-up, club area card)
  constants/   shared constants (APP_ROUTES, CLUB_AREA_LINKS)
  guards/      route guards (authGuard)
  layout/      the frame around every page: navigation, hero header
  model/       TypeScript interfaces for Firestore data
  pages/       one folder per routed page
  service/     services (the only place that talks to Firebase)
  shared/      reusable bits (confirm dialog, UK date adapter)
public/images/ images served by the site
docs/          product and technical docs
```

## Data Design (Firestore)

### Current

| Path                   | Holds                                                                                                                                                                                          |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `clubInfo/schedule`    | `sessions[]`: the fixed weekly timetable (`day`, `start`, `end`, `activity`, `whoCanAttend`). No dates.                                                                                        |
| `clubInfo/committee`   | `members[]`: committee members (`firstName`, `lastName`, `position[]`)                                                                                                                         |
| `clubInfo/disciplines` | `disciplines[]`: each discipline the club offers (`name`, `description`), shown on the Disciplines page and given to the AI                                                                    |
| `clubInfo/contact`     | `contacts[]` (`role`, `email`): shown on the Contact page. `joinEmails` map (`rifles[]`, `pistols[]`): where Join us enquiries go for each discipline. **Never** a street address or postcode. |
| `clubInfo/fees`        | Fees in **pence** (`7000` = £70.00): membership, weekly range fees, visitors, range hire, plus `lockers` and `groupVisits` maps                                                                |
| `users/{uid}`          | One per account, ID = Firebase Auth UID: `displayName`, `position[]` (kebab-case, e.g. `range-officer`, `web-admin`)                                                                           |
| `roChat/{id}`          | One per chat message: `text`, `authorUid`, `authorName`, `createdAt` (server time)                                                                                                             |

Club info in Firestore is the single source of truth. Both the pages and the AI assistant read from it. Club data never goes in the code, because the GitHub repo is public.

`users/{uid}` documents are made by hand in the Firebase console for now (no sign-up page yet).

### Planned

- **Roles:** `users/{uid}.position[]` replaced the planned `committee/{id}` restructure (decided 10 Oct). Rules read a person's roles from their own `users` document.
- **Club info:** keep one document per permission area, so each rule can map to one role (for example `treasurer` edits fees) once the admin page is built.

## Authentication

- Firebase Auth with email and password.
- `AuthService` (`src/app/service/auth.service.ts`) exposes the current user as a signal (`userSignal`), plus `login()` and `logout()`.
- `UsersService` reads the signed-in person's own `users/{uid}` document (`profileSignal`).
- Access is role-based. A person's `position[]` decides what they can do.
- Live listeners (chat messages, profile) restart whenever the signed-in user changes (`user$` + `switchMap`). Without that, logging out and in as someone else leaves a listener the rules refused, until the page is refreshed.

## Security Rules

Rules live in `firestore.rules`. Check they compile with `firebase deploy --only firestore:rules --dry-run`, then deploy without `--dry-run`.

| Path          | Read                                                 | Write                                                                                                                                        |
| ------------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `clubInfo/*`  | Anyone                                               | Nobody from the app (console only)                                                                                                           |
| `users/{uid}` | Only that signed-in person                           | Nobody from the app (console only)                                                                                                           |
| `roChat/*`    | Signed in with a `range-officer` or `web-admin` role | Create: own `authorUid`, only the 4 known fields, text 1–500 characters, server time. Update: own message, `text` only. Delete: own message. |

Anything in a publicly readable document can be read by anyone through the Firestore REST API, so never put private data there.

## Hosting

- Firebase Hosting (main). An IONOS subdomain is the preferred submission address if it works.
- The site is a **single-page application**: the browser loads one `index.html`, and Angular's router swaps page components in and out without a full reload.
- **Deploy note:** answer "yes" to _"Configure as a single-page app?"_ during `firebase init hosting`. It adds a rewrite that sends every URL to `index.html`, so refreshing on a page like `/range-times` works instead of returning a 404.
