# GTSC Website Rebuild

A modern, mobile-first website for Glenrothes Target Shooting Club (GTSC), built as a bootcamp final project. It replaces the club's 2017 template site.

**Features**

- **AI club assistant (public):** answers questions about range times, fees, the committee and how to join, using Gemini through Firebase AI Logic and live club data from Firestore.
- **Club Area login:** range officers and officers sign in with email and password.
- **Range officer chat:** full create, read, edit and delete of your own messages, protected by Firestore security rules.
- **Household joining enquiry:** one form for a whole household (adults and juniors) that opens the visitor's email app with the enquiry filled in, addressed to the rifle and/or pistol section they tick.
- **Club info pages:** Range Times, Disciplines and Contact, all read live from Firestore.

For what the site does and why, see [docs/product.md](docs/product.md). For how it's built (data design, security rules, folder structure), see [docs/technical.md](docs/technical.md).

## Tech Stack

| Part       | Version / choice                                                   |
| ---------- | ------------------------------------------------------------------ |
| Angular    | 22 (standalone components, signals)                                |
| UI         | Angular Material 22 (Material 3 theme)                             |
| Firebase   | `firebase` 12.19+ with **`@angular/fire` 21.0.0-rc.2** (see below) |
| AI         | Firebase AI Logic, Gemini Developer API, `gemini-3.5-flash-lite`   |
| Tests      | Vitest (jsdom) through the Angular unit-test builder               |
| Code style | angular-eslint, Prettier                                           |

## Prerequisites

- **Node.js 24** or newer (built with 24.18)
- **npm** (comes with Node)
- **Firebase CLI:** `npm install -g firebase-tools` (built with 15.29)
- A **Firebase project** of your own (the steps are below)

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/alandrylie/GTSC_Rebuild.git
cd GTSC_Rebuild
npm install --legacy-peer-deps
```

#### Why `--legacy-peer-deps` and AngularFire `21.0.0-rc.2`

At the time of building, there was no stable AngularFire release for Angular 22, so the project uses the release candidate **`@angular/fire@21.0.0-rc.2`**:

- **rc.0 does not work** with `firebase` 12.19+. It imports `getImagenModel`, which Firebase removed, so the build fails.
- rc.2 lists Angular 21 as its peer dependency, so npm refuses to install it next to Angular 22 unless you pass `--legacy-peer-deps`. It works fine with Angular 22 in practice.

If you add or update packages later, keep using `--legacy-peer-deps`. Once a stable AngularFire release supports Angular 22, upgrade to it and drop the flag.

### 2. Set up Firebase

In the [Firebase console](https://console.firebase.google.com/), create a project, then:

1. **Add a web app** and copy its config object.
2. **Authentication:** enable the **Email/Password** sign-in method and add a test user.
3. **Firestore:** create a database.
4. **AI Logic:** enable it with the **Gemini Developer API**. The free tier works for trying it out but can be slow; the live site uses the paid tier with a spend cap.

Put your web app config in `src/environments/environment.ts` and `src/environments/environment.development.ts`:

```ts
export const environment = {
  firebase: {
    apiKey: '...',
    authDomain: '...',
    projectId: '...',
    storageBucket: '...',
    messagingSenderId: '...',
    appId: '...',
  },
};
```

Then point the Firebase CLI at your project:

```bash
firebase login
firebase use --add
```

### 3. Add the starting data

The site reads club data from Firestore, so create these documents in the console. The field names must match exactly. [docs/technical.md](docs/technical.md) lists every field.

| Document               | Needed for                                                                                                                              |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `clubInfo/schedule`    | Range times and the AI assistant (`sessions` array; day 1 = Monday)                                                                     |
| `clubInfo/committee`   | The AI assistant (`members` array)                                                                                                      |
| `clubInfo/disciplines` | Disciplines page and the AI assistant (`disciplines` array of `name`, `description`)                                                    |
| `clubInfo/contact`     | Contact page (`contacts` array of `role`, `email`), Join us form (`joinEmails` map: `rifles` and `pistols` arrays) and the AI assistant |
| `clubInfo/fees`        | The AI assistant (amounts in **pence**, e.g. `7000` = £70.00)                                                                           |
| `users/{uid}`          | Logging in to the chat. The document ID is the user's Auth UID; give it `displayName` and `position` (array, e.g. `["range-officer"]`)  |

**Never put the club's street address in Firestore.** `clubInfo` is publicly readable, and the location is kept private on purpose.

### 4. Deploy the security rules

```bash
firebase deploy --only firestore:rules
```

Without them, Firestore either blocks everything or (in test mode) allows everyone.

## Everyday Commands

| Task                | Command                                            |
| ------------------- | -------------------------------------------------- |
| Run locally         | `ng serve`, then open `http://localhost:4200/`     |
| Unit tests          | `ng test` (add `--watch=false` for a single run)   |
| Lint                | `ng lint`                                          |
| Format              | `npx prettier --write src`                         |
| Production build    | `ng build` (output in `dist/gtscRebuild/browser`)  |
| Check rules compile | `firebase deploy --only firestore:rules --dry-run` |
| Deploy the site     | `ng build` then `firebase deploy --only hosting`   |

New Angular files are always made with the CLI, for example `ng generate component pages/range-times` or `ng generate service service/fees --type=service`.

### A note on the tests

Tests run with `"isolate": true` in `angular.json`. Several specs replace Firebase modules with fakes (`vi.mock`), and without isolation all spec files share one module cache, so a fake could clash with the real class another spec loaded first. That caused random "No provider found for `Auth`" failures. Isolation costs about 1.5 seconds per run.

## How I Used AI

I built this project with **Claude Code** (Anthropic's AI coding assistant) set up as a senior developer and mentor, not as an autopilot. Before any code was written, I gave it ground rules: written project and Angular rules files, and a coding split for who does what.

### How we worked

- **I built the features; Claude coached.** For most work, Claude gave me the goal and a hint, I wrote the code, and Claude checked it. For an API I had never used before, it gave me the full pattern once with a one-line "why", and I typed it in myself.
- **Debugging was mine.** When something broke, Claude didn't hand me the fix. It asked what I saw compared with what I expected, and pointed me at the error message, so I found the bug myself.
- **Checks every step.** Claude ran the unit tests, lint and Prettier after each change, and I only committed complete, working features.
- **Hard rules it had to follow.** For example, it must never publish the club's exact location anywhere (firearms are kept on site), and it was not allowed to touch the Firebase environment files.

### Who did what

| Area                                                        | Who                                                                  |
| ----------------------------------------------------------- | -------------------------------------------------------------------- |
| Firebase setup, Firestore data design, security rules       | Me (Claude coached on rules, a new topic for me)                     |
| Login and the Club Area                                     | Me                                                                   |
| Range officer chat (full CRUD)                              | Me                                                                   |
| AI assistant service and Gemini prompt rules                | Me, with Claude helping on wording                                   |
| Household joining form (Reactive Forms) and section routing | Me                                                                   |
| Range Times, Disciplines and Contact pages                  | Me                                                                   |
| Unit tests                                                  | Spec setup and fakes by Claude; behaviour tests by me                |
| CSS                                                         | Claude, written to my design brief (my decision on 9 Oct, for speed) |
| Docs (README, product and technical docs)                   | Claude, written up from my decisions                                 |
| Git, deploys, Firebase CLI                                  | Me                                                                   |

**By lines of code** (rough count of non-blank lines in `src/`, 16 Oct):

- **Whole project: about 45% me, 55% Claude.**
- **Leaving out the CSS: about 64% me, 36% Claude.**

The gap is the CSS: about 1,060 lines, all written by Claude. I chose to hand styling to the AI so my own time went on the application logic: services, auth, CRUD, the AI assistant, forms and page logic. I still set the look and feel (mobile-first, slate toolbar, card style, nav layout); Claude turned my brief into CSS in seconds. The same goes for the docs. The decisions in them (role-based access, a public AI assistant, no stored applications, no published address) are mine, and the AI wrote them up.

### My Thoughts on Using AI

This is the first time I have used Claude to build alongside me. I found it really difficult at first, especially getting the rules right so it would coach and mentor me. I wanted it to let me make mistakes rather than hand me code or say "look here, you made an error."

For the first few days I did all the work myself, as I struggled with letting go of control. I then allowed B.R.U.C.E. (Build & Responsive User-Interface Claude Engineer), my AI persona, to handle the CSS under my guidance. I decided how it looked, and I had it make the tweaks until I got what I wanted.

As I grew more comfortable, I let it build more. I made sure it used the proper `ng` commands, just as I would.

Once I had let the AI build a few more things, I settled into it. I could understand the code and challenge anything I was unsure about. I was surprised by the percentages, but I am pleased with what I achieved.

On reflection, I can see how this could make me quicker and help level up my skills, as long as it is used responsibly. I need to understand the code well enough to come back weeks or months later and, after a few minutes of reading, know what it is doing. I have more plans for this rebuild and hope to have it fully completed and deployed live for the club soon.

## Licence and Credits

- Built by Alan Drylie for Glenrothes Target Shooting Club.
- Stock photos from [Unsplash](https://unsplash.com/) under the Unsplash License.
