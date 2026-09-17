---
name: deploy
description: Deploy pipeline for this expense-tracker project — runs the unit test suite and lint, builds the production bundle, then stages it in a local ./staging folder. Trigger for "deploy", "deploy this", "ship it", "push to staging", "cut a staging build", "prepare a release build", or similar phrasing, even if the user doesn't say the word "skill".
---

# Deploy

This project has no real hosting target yet — "staging" means a local `./staging`
folder at the repo root that mirrors exactly what the latest production build would
ship. Run the three steps below in order, and stop immediately if a step fails —
never let a broken or stale bundle reach `./staging`.

Before running each numbered step, tell the user which command you're about to run
and ask them to confirm before executing it (e.g. with AskUserQuestion, or by asking
in chat and waiting for a reply) — don't chain straight through all three
automatically. If the user declines a step, stop the deploy there without running
the remaining steps.

## 1. Quality gate: tests and lint

```
npm test
npm run lint
```

If either reports errors, stop here and surface them — don't proceed to build/stage.
Lint warnings alone don't have to block the deploy; use judgment. A failing test
always blocks it.

## 2. Production build

```
npm run build
```

This regenerates `dist/`. If the build fails, stop — don't stage a stale or partial
`dist/`.

## 3. Stage the build

Copy the fresh `dist/` output into `./staging`, replacing whatever was there before —
staging should always reflect exactly the most recent successful build, never a mix
of old and new files. Use the bundled script rather than hand-rolling `rm -rf` /
`Remove-Item` for this: it behaves the same under PowerShell or Bash, which matters
here since this project is worked on from both.

```
node .claude/skills/deploy/scripts/stage.mjs
```

Report what it prints (item count and destination path) back to the user as
confirmation that the deploy is staged.
