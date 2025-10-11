const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

(async () => {
  try {
    const input = path.join(__dirname, '..', 'photo.jpg');
    if (!fs.existsSync(input)) {
      console.error('Input file photo.jpg not found in project root.');
      process.exit(1);
    }

    const sizes = [400, 800, 1200];
    for (const size of sizes) {
      const outJpg = path.join(__dirname, '..', `photo-${size}.jpg`);
      const outWebp = path.join(__dirname, '..', `photo-${size}.webp`);

      console.log(`Generating ${path.basename(outJpg)} and ${path.basename(outWebp)}...`);

      await sharp(input)
        .resize(size, size, { fit: 'cover' })
        .jpeg({ quality: 82 })
        .toFile(outJpg);

      await sharp(input)
        .resize(size, size, { fit: 'cover' })
        .webp({ quality: 78 })
        .toFile(outWebp);
    }

    console.log('All images generated successfully.');
  } catch (err) {
    console.error('Error generating images:', err);
    process.exit(1);
  }
})();
