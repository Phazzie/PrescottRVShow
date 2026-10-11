# RV Personals

A one-page site for the Prescott Valley RV Show (October 8 to 18, 2026). Every RV on the lot gets a lonely-hearts ad. Visitors text the ad's box number, and get sent in to ask for our guy by name.

No build step. It's plain HTML, CSS and JavaScript, so it deploys anywhere as static files.

## Where to change things

| To change | Edit |
|---|---|
| His name, the text number, show address and hours | `config.js` |
| The personals, missed connections, Wanted ad, questionnaire | `personals.js` |
| Look and feel | `styles.css` |
| The no-JavaScript fallback number | `index.html`, inside `<noscript>` |

## Before it goes live

- [ ] Put his real first name in `config.js`.
- [ ] Get a Google Voice number with a 928 area code and put it in `config.js` (both formats) and the `<noscript>` line.
- [ ] Match every personal in `personals.js` to a real unit on his lot. Each one has `unit` and `verify` notes saying what to check. Don't add lengths, sleeping counts, weights or prices until they're confirmed.
- [ ] If there's no Class A at Prescott, rewrite or cut Box 5, and change `match()` so the questionnaire doesn't send people to it.
- [ ] Manager OK: using the show's name in text, and texts or "found you in the personals" walk-ins counting as his.
- [ ] After deploying, change `og:image` in `index.html` to the full URL (for example `https://yourdomain.com/og.png`). Facebook needs the full address to show the preview image.

## Deploy on Vercel

Import this repo at vercel.com/new. Leave the framework as "Other" with no build command. Every push to `main` redeploys.
