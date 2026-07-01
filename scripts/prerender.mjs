import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const template = fs.readFileSync(path.join(root, 'dist/index.html'), 'utf-8')

const { render } = await import(pathToFileURL(path.join(root, 'dist/server/entry-server.js')).href)

const appHtml = render()

const html = template.replace('<!--app-html-->', appHtml)

fs.writeFileSync(path.join(root, 'dist/index.html'), html)

console.log('✓ Pre-renderizado: /')
