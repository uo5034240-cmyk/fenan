const fs = require('fs')
const path = require('path')

const projectRoot = path.resolve(__dirname, '..')
const src = path.join(projectRoot, 'index.html')
const destDir = path.join(projectRoot, 'dist', 'client')
const dest = path.join(destDir, 'index.html')

if (!fs.existsSync(src)) {
  console.error('source index.html not found at', src)
  process.exit(1)
}

fs.mkdirSync(destDir, { recursive: true })
fs.copyFileSync(src, dest)
console.log('Copied', src, '->', dest)