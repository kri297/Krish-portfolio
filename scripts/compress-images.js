const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Helper to compress image
async function optimizeImage(inputPath, outJpgPath, outWebpPath, maxWidth, maxHeight, isPng = false) {
  try {
    if (!fs.existsSync(inputPath)) {
      console.log(`Skipping: ${inputPath} (does not exist)`);
      return;
    }
    console.log(`Optimizing ${path.basename(inputPath)}...`);

    // Let's load the image
    let pipeline = sharp(inputPath);
    const metadata = await pipeline.metadata();

    // Resize if dimensions are larger than max
    if (metadata.width > maxWidth || metadata.height > maxHeight) {
      pipeline = pipeline.resize({
        width: maxWidth,
        height: maxHeight,
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    // Save as WebP
    await pipeline
      .clone()
      .webp({ quality: 80 })
      .toFile(outWebpPath);
    console.log(`  -> Created WebP: ${path.basename(outWebpPath)}`);

    // Save as JPEG/PNG (in-place replacement)
    const tempOut = inputPath + '.tmp';
    if (isPng) {
      await pipeline
        .clone()
        .png({ compressionLevel: 8, palette: true })
        .toFile(tempOut);
    } else {
      await pipeline
        .clone()
        .jpeg({ quality: 80, progressive: true })
        .toFile(tempOut);
    }

    // Replace original
    fs.unlinkSync(inputPath);
    fs.renameSync(tempOut, inputPath);
    console.log(`  -> Compressed Original in-place: ${path.basename(inputPath)}`);

  } catch (err) {
    console.error(`Error processing ${inputPath}:`, err);
  }
}

(async () => {
  console.log('--- STARTING IMAGE OPTIMIZATION ---');

  const rootDir = path.join(__dirname, '..');
  const imagesDir = path.join(rootDir, 'IMAGES');

  // Root Images to optimize
  const rootImages = [
    { file: 'IMG20251106090239.jpg', type: 'jpg', max: 1000 },
    { file: 'IMG-20250828-WA0007.jpg', type: 'jpg', max: 1000 },
    { file: 'Screenshot 2025-12-29 131817.png', type: 'png', max: 1200 },
    { file: 'Screenshot 2025-12-29 132300.png', type: 'png', max: 1200 },
    { file: 'Screenshot 2025-12-31 132126.png', type: 'png', max: 1200 },
    { file: 'image.png', type: 'png', max: 1200 },
    { file: 'cinedubs.png', type: 'png', max: 1200 },
    { file: 'algobuddy.png', type: 'png', max: 1200 },
    { file: 'podcast.png', type: 'png', max: 1200 },
    { file: 'cinedubs2.png', type: 'png', max: 1200 },
    { file: 'algobuddy2.png', type: 'png', max: 1200 },
    { file: 'podcast2.png', type: 'png', max: 1200 }
  ];

  for (const item of rootImages) {
    const input = path.join(rootDir, item.file);
    const outWebp = path.join(rootDir, item.file.replace(/\.(png|jpg|jpeg)$/i, '.webp'));
    await optimizeImage(input, input, outWebp, item.max, item.max, item.type === 'png');
  }

  // IMAGES folder to optimize (dome gallery images)
  if (fs.existsSync(imagesDir)) {
    const files = fs.readdirSync(imagesDir);
    for (const file of files) {
      if (/\.(jpg|jpeg|png)$/i.test(file)) {
        const input = path.join(imagesDir, file);
        const outWebp = path.join(imagesDir, file.replace(/\.(png|jpg|jpeg)$/i, '.webp'));
        const isPng = /\.png$/i.test(file);
        await optimizeImage(input, input, outWebp, 1000, 1000, isPng);
      }
    }
  }

  console.log('--- IMAGE OPTIMIZATION COMPLETED ---');
})();
