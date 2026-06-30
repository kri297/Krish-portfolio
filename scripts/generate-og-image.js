const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

(async () => {
  try {
    console.log('--- GENERATING OPEN GRAPH IMAGE ---');

    const rootDir = path.join(__dirname, '..');
    const bgPath = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\dcf2c8be-5e47-421c-a78b-a78db99f8366\\og_bg_base_1782388439501.png';
    const outputPath = path.join(rootDir, 'og-image.png');

    if (!fs.existsSync(bgPath)) {
      console.error(`Background image not found at ${bgPath}.`);
      process.exit(1);
    }

    // SVG Overlay containing the premium typography and layout
    const svgOverlay = Buffer.from(`
      <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
        <!-- Subtle dark blue overlay for text readability -->
        <rect width="1200" height="630" fill="#030712" opacity="0.65" />

        <!-- Abstract Tech Grid Overlay -->
        <g opacity="0.2">
          <line x1="0" y1="80" x2="1200" y2="80" stroke="#38bdf8" stroke-width="1" />
          <line x1="0" y1="550" x2="1200" y2="550" stroke="#38bdf8" stroke-width="1" />
          <line x1="120" y1="0" x2="120" y2="630" stroke="#38bdf8" stroke-width="1" />
          <line x1="1080" y1="0" x2="1080" y2="630" stroke="#38bdf8" stroke-width="1" />
        </g>

        <!-- Large decorative shield logo in background on the right -->
        <g transform="translate(880, 315) scale(3.5)" opacity="0.1">
          <path d="M0,-50 L35,-35 L35,0 C35,20 20,35 0,40 C-20,35 -35,20 -35,0 L-35,-35 Z" fill="none" stroke="#38bdf8" stroke-width="3" />
        </g>

        <!-- Content Group -->
        <g transform="translate(160, 140)">
          <!-- Small tech category tag -->
          <g transform="translate(0, 0)">
            <rect width="210" height="30" rx="15" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" />
            <circle cx="20" cy="15" r="5" fill="#38bdf8" />
            <text x="35" y="20" font-family="'Segoe UI', -apple-system, sans-serif" font-size="13" font-weight="bold" fill="#38bdf8" letter-spacing="1">PORTFOLIO WEBSITE</text>
          </g>

          <!-- Main Title: Name -->
          <text x="0" y="110" font-family="'Segoe UI', -apple-system, sans-serif" font-size="76" font-weight="900" fill="#ffffff" letter-spacing="-1">KRISH MISHRA</text>

          <!-- Divider Line -->
          <line x1="0" y1="150" x2="600" y2="150" stroke="#00b4d8" stroke-width="4" stroke-linecap="round" />

          <!-- Subtitle: Roles -->
          <text x="0" y="210" font-family="'Segoe UI', -apple-system, sans-serif" font-size="28" font-weight="600" fill="#38bdf8" letter-spacing="0.5">Cybersecurity &amp; Software Engineering</text>

          <!-- Details/Bullets -->
          <g transform="translate(0, 270)" font-family="'Segoe UI', -apple-system, sans-serif" font-size="16" fill="#94a3b8" font-weight="500" letter-spacing="0.5">
            <text x="0" y="0">🛡️ Cybersecurity Projects</text>
            <text x="240" y="0">💻 Software Engineering</text>
            <text x="490" y="0">🤖 AI Applications</text>
            <text x="0" y="40">☕ Java &amp; DSA</text>
            <text x="240" y="40">🌐 Full-Stack Web Dev</text>
            <text x="490" y="40">🎓 Technical Leadership</text>
          </g>
        </g>
      </svg>
    `);

    // Composite overlay onto background image and resize
    await sharp(bgPath)
      .resize(1200, 630, { fit: 'cover' })
      .composite([{ input: svgOverlay, top: 0, left: 0 }])
      .png()
      .toFile(outputPath);

    console.log(`Open Graph image created successfully at ${outputPath}`);
  } catch (err) {
    console.error('Error generating Open Graph image:', err);
    process.exit(1);
  }
})();
