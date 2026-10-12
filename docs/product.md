# GTSC Website Rebuild: Product Doc

## The Problem

The current GTSC website was built from a WYSIWYG template in March 2017.

- It looks dated.
- It has no login, so there is no members-only area.
- It is hard to extend with new features.
- Joining is slow and manual. People email, get a copy-paste reply, send their details, and then the details are forwarded by hand to the induction officer.

## The Goal

A modern, mobile-friendly club website that makes joining quick, gives members their own area, and can be maintained by trusted club members without technical help.

## Who It's For

| User                          | What they need                                                                                        |
| ----------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Visitors**                  | Find club info (hours, fees, disciplines) and apply to join                                           |
| **Range officers & officers** | Log in to the club area, message each other, use the club assistant                                   |
| **Admins**                    | Edit club info from the site, with access set by their committee role (e.g. the treasurer edits fees) |

## Features (in priority order)

1. **Club area login:** range officers and officers sign in to reach the club area. For now, only they get accounts.
2. **AI club assistant:** answers questions using up-to-date club info.
3. **Range officer messaging:** range officers and officers create, read, edit and delete their own messages.
4. **Household membership application:** one form covers a whole household, adults and juniors.

**Applies to every feature:**

- Works well on mobile and desktop.
- Modern look.
- Data protected by security rules.

## Access by Role

Permissions come from a person's committee role, not from the person. When someone changes role, the web admin moves the role and the access follows.

| Role               | Can manage                  |
| ------------------ | --------------------------- |
| **Web admin**      | the Secretary               |
| **Secretary**      | executive committee members |
| **Exec committee** | general committee members   |
| **Treasurer**      | fees                        |

## Out of Scope (for 17 Oct)

- **Stretch goals:** better picture gallery, demo club shop, and if time permits, host the demo on IONOS as a subdomain of gtsc.co.uk.
- **Future:** automatic email to two club addresses when someone applies. Logins for general members, with a sign-up page and an officer approving each account.

## What "Done" Looks Like

- Only fully working features ship.
- Club info is stored in one place, and the site pages and the assistant both read from it.
- An admin can update club info without using the Firebase console.
- The site is live on Firebase Hosting by 3pm, Sat 17 Oct 2026.

## Timeline

| When                | Goal                                                          |
| ------------------- | ------------------------------------------------------------- |
| **Wed 7 Oct**       | Club info service + schedule showing live from Firestore      |
| **Thu 8 – Sat 10**  | Login + members-only club area (guard, logout)                |
| **Sun 11 – Mon 12** | Range officer messaging (full CRUD)                           |
| **Tue 13 – Wed 14** | AI club assistant (Gemini)                                    |
| **Thu 15**          | Household membership form (trimmed) + security rules          |
| **Fri 16**          | Deploy to Firebase Hosting + mobile polish + buffer for fixes |
| **Sat 17**          | Hand in by 3pm                                                |

_Re-planned Sat 10 Oct: login ran a day over, so later features moved along by a day._

Login comes early because messaging needs a user ID. Deploying a day early leaves room for fixes.

## Open Questions

- Should the AI assistant be public or members-only?
