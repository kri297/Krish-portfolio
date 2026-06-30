# 💼 Krish Mishra | Professional Portfolio

> **A high-end, premium portfolio website showcasing my journey in Cybersecurity, Software Engineering, and Web Development.** 

[![Live Website](https://img.shields.io/badge/🌐_Live_Site-Visit_Portfolio-blue?style=for-the-badge)](https://portfolioofkrish.vercel.app)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## 🌐 Live Demo
**[portfolioofkrish.vercel.app](https://portfolioofkrish.vercel.app)**

---

## ✨ Features & Architecture

This portfolio has been completely rebuilt to feature a modern, multi-page architecture with state-of-the-art UI trends.

### 🎨 **Modern Design System**
- **Glassmorphism:** Sleek, transparent floating navbars and frosted glass card effects.
- **Bento Box Grids:** Highly engaging, asymmetrical "Bento Box" layouts used on the Skills page.
- **Interactive Dashboards:** Dynamic category switching without page reloads.
- **Neon Glow Effects:** Subtle radial gradients and magnetic hover effects on buttons and cards.
- **Fully Responsive:** Beautifully adapts to all screen sizes (Desktop, Tablet, and Mobile).

### 🚀 **Sections**
| Section | Description | Status |
|---------|-------------|--------|
| **🏠 Home** | Engaging hero section with liquid cursor and scrolling tech marquees. | ✅ Complete |
| **👤 About** | Personal story, professional journey, and timeline. | ✅ Complete |
| **💻 Skills** | Interactive Bento Dashboard featuring Cybersecurity, SWE, and Web Dev. | ✅ Complete |
| **🚀 Projects** | Project showcases with GitHub and Live demo links. | ✅ Complete |
| **📧 Contact** | Working email contact form and social links. | ✅ Complete |

### 💻 **Technical Stack**
- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6+). Zero heavy frameworks, ensuring blazing fast load times.
- **Performance:** Automated Node.js scripts for in-place image optimization (WebP generation).
- **Deployment:** Vercel (CI/CD integration).

---

## 📂 Project Structure

```
Krish-portfolio/
├── 📄 home.html, about.html, skills.html, ... # Page structures
├── 🎨 styles/                                 # Modular CSS stylesheets
│   ├── main-v3.css                            # Global tokens, navbar, animations
│   ├── home.css, skills.css, projects.css...  # Page-specific styles
├── ⚡ scripts/                                # Vanilla JS logic
│   ├── main.js, update-nav.js                 # Global interactions
│   ├── compress-images.js                     # Node.js build tools
├── 🖼️ IMAGES/                                 # Optimized WebP assets
└── 📝 README.md                               # Project documentation
```

---

## 🚀 Getting Started Locally

1. **Clone the repo**
   ```bash
   git clone https://github.com/kri297/Krish-portfolio.git
   ```

2. **Run a local server**
   Because this project uses modular files, you should serve it over HTTP rather than opening the files directly.
   ```bash
   npx serve .
   ```
   Or use the **Live Server** extension in VS Code.

3. **Image Optimization Script (Optional)**
   If you add new images, run the included Node.js script to automatically compress them into `.webp` format for maximum performance:
   ```bash
   npm install
   node scripts/compress-images.js
   ```

---

## 👨‍💻 Author

**Krish Mishra**  
- [LinkedIn](https://www.linkedin.com/in/krish-mishra-45933a306/)
- [GitHub](https://github.com/kri297)
