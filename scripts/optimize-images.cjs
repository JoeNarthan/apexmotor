// front/scripts/optimize-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'src', 'assets', 'original'); // place originals here
const OUT_DIR = path.join(__dirname, '..', 'public', 'optimized'); // Vite serves /public

// sizes (width) and suffix names
const SIZES = [
  { name: '600', width: 600 },
  { name: '1200', width: 1200 },
];

// formats to generate (webp + jpeg fallback)
const FORMATS = [
  { ext: 'webp', options: { quality: 75 } },
  { ext: 'jpeg', options: { quality: 80 } },
];

const ALLOWED_EXT = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tiff'];

async function run() {
  try {
    if (!fs.existsSync(SRC_DIR)) {
      console.error(`❌ Source directory not found:\n  ${SRC_DIR}\nCreate that folder and put your original images there.`);
      process.exit(1);
    }

    fs.mkdirSync(OUT_DIR, { recursive: true });

    const allFiles = fs.readdirSync(SRC_DIR);
    const images = allFiles.filter(f => ALLOWED_EXT.includes(path.extname(f).toLowerCase()));

    if (images.length === 0) {
      console.log('ℹ️ No images found in source directory. Add files to:', SRC_DIR);
      process.exit(0);
    }

    console.log(`Found ${images.length} image(s). Output -> ${OUT_DIR}\n`);

    for (const file of images) {
      const inputPath = path.join(SRC_DIR, file);
      const safeBase = path.parse(file).name.replace(/\s+/g, '-').toLowerCase();

      for (const size of SIZES) {
        for (const fmt of FORMATS) {
          const outName = `${safeBase}-${size.name}.${fmt.ext}`;
          const outPath = path.join(OUT_DIR, outName);

          console.log(`Processing: ${file} → ${outName} (${size.width}px, ${fmt.ext})`);

          // pipeline: rotate (auto), resize (no upscaling), format, write
          await sharp(inputPath)
            .rotate()
            .resize({ width: size.width, withoutEnlargement: true })
            .toFormat(fmt.ext, fmt.options)
            .toFile(outPath);
        }
      }
    }

    console.log('\n✅ Done. Optimized images written to:', OUT_DIR);
    console.log('Tip: Use <img src="/optimized/<name>-600.webp" srcSet="..." loading="lazy" /> in your app.');
  } catch (err) {
    console.error('❌ Error during image processing:', err);
    process.exit(1);
  }
}

run();
