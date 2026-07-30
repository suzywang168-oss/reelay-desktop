# Reelay Workspace Web

This directory contains the public Reelay workspace deployed at:

https://reelay-workspace.suzywang168.chatgpt.site

The web app uses a Cloudflare D1 binding named `DB` to persist the current
project, canvases, nodes, edges, and active canvas. The API endpoint is
`/api/workspace`.

## Restore the large HTML source

GitHub synchronization stores the large prototype HTML in line-safe parts.
Run:

```bash
bash scripts/assemble-reelay.sh
```

Then install and build:

```bash
npm install
npm run build
```

The production deployment is managed by OpenAI Sites. The GitHub copy is kept
on a dedicated branch so it does not overwrite the existing desktop app.
