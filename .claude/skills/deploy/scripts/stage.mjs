#!/usr/bin/env node
import { existsSync, rmSync, mkdirSync, cpSync, readdirSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const distDir = path.join(root, 'dist')
const stagingDir = path.join(root, 'staging')

if (!existsSync(distDir)) {
  console.error('No dist/ folder found — run `npm run build` before staging.')
  process.exit(1)
}

rmSync(stagingDir, { recursive: true, force: true })
mkdirSync(stagingDir, { recursive: true })
cpSync(distDir, stagingDir, { recursive: true })

const items = readdirSync(stagingDir)
console.log(`Staged ${items.length} item(s) from dist/ into ${stagingDir}:`)
for (const item of items) console.log(`  - ${item}`)
