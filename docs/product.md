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

| User         | What they need                                                                                              |
| ------------ | ----------------------------------------------------------------------------------------------------------- |
| **Visitors** | Find club info (hours, fees, disciplines) and apply to join                                                 |
| **Members**  | Log in, message other members, use the club assistant                                                       |
| **Admins**   | Edit club info from the site, each with access only to what they look after (e.g. the treasurer edits fees) |

## Features (in priority order)

1. **Members login area:** members sign in to reach members-only pages.
2. **AI club assistant:** answers questions using up-to-date club info.
3. **Member messaging:** members create, read, edit and delete their own messages.
4. **Household membership application:** one form covers a whole household, adults and juniors.

**Applies to every feature:**

- Works well on mobile and desktop.
- Modern look.
- Data protected by security rules.

## Out of Scope (for 17 Oct)

- **Stretch goals:** better picture gallery, demo club shop, and if time permits, host the demo on IONOS as a subdomain of gtsc.co.uk.
- **Future:** automatic email to two club addresses when someone applies.

## What "Done" Looks Like

- Only fully working features ship.
- Club info is stored in one place, and the site pages and the assistant both read from it.
- An admin can update club info without using the Firebase console.
- The site is live on Firebase Hosting by 3pm, Sat 17 Oct 2026.

## Timeline

| When                | Goal                                                     |
| ------------------- | -------------------------------------------------------- |
| **Wed 7 Oct**       | Club info service + schedule showing live from Firestore |
| **Thu 8 – Fri 9**   | Login + members-only area                                |
| **Sat 10 – Sun 11** | Member messaging (full CRUD)                             |
| **Mon 12 – Tue 13** | AI club assistant (Gemini)                               |
| **Wed 14**          | Household membership form                                |
| **Thu 15**          | Security rules + mobile polish                           |
| **Fri 16**          | Deploy to Firebase Hosting + buffer for fixes            |
| **Sat 17**          | Hand in by 3pm                                           |

Login comes early because messaging needs a user ID. Deploying a day early leaves room for fixes.

## Open Questions

- Should the AI assistant be public or members-only?
