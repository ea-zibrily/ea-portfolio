// scripts/optimize-images.mjs
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const imgDir = path.resolve('public/img')
const backupDir = path.resolve('assets-src')

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true })
}

const files = fs.readdirSync(imgDir).filter((f) => /\.(png|jpe?g)$/i.test(f))

console.log(`🔍 Found ${files.length} images to optimize...\n`)

let totalOldSize = 0
let totalNewSize = 0

for (const file of files) {
  const inputPath = path.join(imgDir, file)
  const backupPath = path.join(backupDir, file)
  const baseName = path.parse(file).name
  const outputPath = path.join(imgDir, `${baseName}.webp`)

  // Backup original to assets-src if not already there
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(inputPath, backupPath)
  }

  const stat = fs.statSync(inputPath)
  totalOldSize += stat.size

  // Resize and convert to WebP
  let pipeline = sharp(inputPath)

  if (file.startsWith('portfolio-')) {
    // Project cards/covers max width 1200px
    pipeline = pipeline.resize({ width: 1200, withoutEnlargement: true })
  } else if (file.startsWith('certificate-')) {
    // Certificate previews max width 800px
    pipeline = pipeline.resize({ width: 800, withoutEnlargement: true })
  } else if (file.startsWith('profile-')) {
    // Profile avatar max width 500px
    pipeline = pipeline.resize({ width: 500, withoutEnlargement: true })
  }

  await pipeline
    .webp({ quality: 80, effort: 4 })
    .toFile(outputPath)

  const newStat = fs.statSync(outputPath)
  totalNewSize += newStat.size

  const oldKB = (stat.size / 1024).toFixed(1)
  const newKB = (newStat.size / 1024).toFixed(1)
  const savings = Math.round((1 - newStat.size / stat.size) * 100)

  console.log(`  ✓ ${file} (${oldKB} KB) → ${baseName}.webp (${newKB} KB, -${savings}%)`)
}

const oldMB = (totalOldSize / (1024 * 1024)).toFixed(2)
const newMB = (totalNewSize / (1024 * 1024)).toFixed(2)
const totalSavings = Math.round((1 - totalNewSize / totalOldSize) * 100)

console.log(`\n🎉 Image Optimization Complete!`)
console.log(`📦 Original size: ${oldMB} MB`)
console.log(`⚡ Optimized WebP size: ${newMB} MB (-${totalSavings}% reduction)\n`)
