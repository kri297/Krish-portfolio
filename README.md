# 💼 Krish Mishra | Portfolio Website

> **Professional portfolio showcasing my web development journey** — Built with vanilla HTML, CSS, and JavaScript.

[![Live Website](https://img.shields.io/badge/🌐_Live_Site-Visit_Portfolio-blue?style=for-the-badge)](https://portfolioofkrish.vercel.app)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## 🌐 Live Demo
**[portfolioofkrish.vercel.app](https://portfolioofkrish.vercel.app)**

---

## ✨ Features

### 🔧 **Current Status**
| Section | Description | Status |
|---------|-------------|--------|
| **👤 About** | Personal story and professional journey | ✅ Complete |
| **💻 Skills** | Technical expertise and technologies | ✅ Complete |
| **🎓 Experience** | Background and certifications | ✅ Complete |
| **📧 Contact** | Working email form | ✅ Complete |
| **📱 Mobile** | Responsive design | 🚧 In Development |

### 🎨 **Design**
- Clean, professional desktop layout
- Interactive hover effects
- Smooth transitions and animations
- Modern typography and color scheme

### 💻 **Technical**
- Vanilla JavaScript - no frameworks
- Semantic HTML5 structure
- Custom CSS3 styling
- Working contact form
- Fast loading performance

---

## 🛠️ Tech Stack

**Frontend:** HTML5, CSS3, JavaScript (Vanilla)  
**Deployment:** Vercel  
**Approach:** Desktop-first, mobile coming soon

---

## 📂 Project Structure

```
portfolio-website/
├── 📄 index.html    # Main HTML structure
├── 🎨 style.css     # Complete stylesheet  
├── ⚡ script.js     # JavaScript functionality
└── 📝 README.md     # Documentation
```

---

## 🚀 Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/kri297/portfolio-website.git
   ```

2. **Open index.html** in your browser or use Live Server

3. **Explore the code** - All functionality in 3 clean files

---

## 🖼️ Optimizing the profile image (quick guide)

To get best performance, generate WebP and a few resized fallbacks for `photo.jpg`. Run these locally (ImageMagick + cwebp examples):

Windows (PowerShell) example using ImageMagick `magick` and `cwebp`:

```powershell
# Create resized JPEGs
magick photo.jpg -resize 400x400 photo-400.jpg
magick photo.jpg -resize 800x800 photo-800.jpg
magick photo.jpg -resize 1200x1200 photo-1200.jpg

# Convert to WebP (requires cwebp)
cwebp -q 80 photo-400.jpg -o photo-400.webp
cwebp -q 80 photo-800.jpg -o photo-800.webp
cwebp -q 80 photo-1200.jpg -o photo-1200.webp
```

After generating these files, the `<picture>` element in `index.html` will serve the best image for each device.

---

### Automatic image generation (Node.js)

If you'd prefer to generate the resized files inside the project, there's a Node.js script that uses `sharp`.

1. Install dependencies:

```powershell
npm install
```

2. Place your high-resolution `photo.jpg` in the project root (replace the existing file).

3. Run the optimizer:

```powershell
npm run optimize-images
```

This produces `photo-400.jpg|webp`, `photo-800.jpg|webp`, and `photo-1200.jpg|webp` in the project root.

---

## 🌟 Why This Portfolio

- **🎯 Handcrafted Code** - Every line written from scratch
- **⚡ No Dependencies** - Pure web technologies only  
- **🖥️ Desktop Optimized** - Professional desktop experience
- **🎨 Clean Architecture** - Simple 3-file structure
- **🚀 Fast Performance** - Lightweight and optimized
- **📈 Learning Showcase** - Demonstrates core web skills

---

## 🔮 Coming Soon

- 📱 Mobile responsive design
- 🎨 Enhanced animations  
- ⚡ Performance improvements
- 🔍 SEO optimizations

---

## 🤝 Let's Connect

**📬 Contact Me:**
- **📧 Email**: [krishmishra121301@gmail.com](mailto:krishmishra121301@gmail.com)
- **💼 LinkedIn**: [linkedin.com/in/krishmishra](https://linkedin.com/in/krishmishra)
- **🌐 Portfolio**: [portfolioofkrish.vercel.app](https://portfolioofkrish.vercel.app)
- **💻 GitHub**: [github.com/kri297](https://github.com/kri297)

**💬 Open to discuss:**
- Web development collaborations
- Frontend opportunities
- Code reviews and feedback
- Mentorship and learning

---

## 📜 License

**© 2024 Krish Mishra**

This is a personal portfolio project. Feel free to:
- ✅ Learn from the code structure
- ✅ Get inspired by the design
- ✅ Reference implementation techniques

Please don't:
- ❌ Copy the design directly
- ❌ Use my personal content
- ❌ Claim the work as your own

**Found it helpful? Give it a ⭐ on GitHub!**

---

> *"Building the web with passion, one project at a time."*
