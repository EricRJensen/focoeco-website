# FoCo ECo Website

Static website for **FoCo ECo (Fort Collins Environmental Collective)**.

## What is in this repo

- `index.html`: Single-page site content and section structure
- `style.css`: Site styling
- `script.js`: Client-side behavior (navigation/carousel interactions)
- `img/`: Images, logos, favicon, and illustration assets
- `firebase.json`: Firebase Hosting config
- `.firebaserc`: Firebase project/target mapping

## Hosting setup

- Platform: Firebase Hosting
- Firebase target: `website`
- Firebase project alias: `foco-eco`
- Deploy source: repo root (`public: "."`)
- SPA rewrite: all routes rewrite to `index.html`

## Redeploy

From this directory:

```bash
firebase login
firebase deploy --dry-run --project foco-eco --only hosting:website
firebase deploy --project foco-eco --only hosting:website
```

Optional preview channel:

```bash
firebase hosting:channel:deploy preview --project foco-eco --only website
```
