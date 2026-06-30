const fs = require('fs');
const pages = ['skills.html', 'projects.html', 'contact.html', 'about.html'];
const standardNav = `    <!-- NAVIGATION -->
    <nav class="nav">
        <a href="home.html?v=${Date.now()}" class="nav-logo" aria-label="Krish Mishra Portfolio Home">
            <span class="logo-k">KM<span class="logo-dot">.</span></span>
        </a>
        <div class="nav-links">
            <a href="home.html?v=${Date.now()}" class="nav-link">Home</a>
            <a href="about.html?v=${Date.now()}" class="nav-link">About</a>
            <a href="skills.html?v=${Date.now()}" class="nav-link">Skills</a>
            <a href="projects.html?v=${Date.now()}" class="nav-link">Projects</a>
            <a href="contact.html?v=${Date.now()}" class="nav-link">Contact</a>
        </div>
        <a href="contact.html?v=${Date.now()}" class="nav-contact">
            <span>Let's Talk</span>
            <div class="nav-contact-arrow">→</div>
        </a>
        <button class="menu-toggle" aria-label="Toggle Menu">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </nav>
    
    <!-- MOBILE MENU -->
    <div class="mobile-menu">
        <a href="home.html?v=${Date.now()}" class="mobile-nav-link">Home</a>
        <a href="about.html?v=${Date.now()}" class="mobile-nav-link">About</a>
        <a href="skills.html?v=${Date.now()}" class="mobile-nav-link">Skills</a>
        <a href="projects.html?v=${Date.now()}" class="mobile-nav-link">Projects</a>
        <a href="contact.html?v=${Date.now()}" class="mobile-nav-link">Contact</a>
        <a href="contact.html?v=${Date.now()}" class="mobile-cta">Let's Talk</a>
    </div>`;

for (let file of pages) {
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf8');
    
    // Remove existing <nav> block and <div class="mobile-menu"> if any
    content = content.replace(/\s*<!-- NAVIGATION -->[\s\S]*?<nav[\s\S]*?<\/nav>/, '');
    content = content.replace(/\s*<nav[\s\S]*?<\/nav>/, '');
    content = content.replace(/\s*<!-- MOBILE MENU -->[\s\S]*?<div class="mobile-menu"[\s\S]*?<\/div>/, '');
    content = content.replace(/\s*<div class="mobile-menu"[\s\S]*?<\/div>/, '');

    // Now insert the standard nav right before data-scroll-container
    const insertRegex = /(<main[^>]*data-scroll-container|<div[^>]*data-scroll-container)/i;
    
    if (insertRegex.test(content)) {
        content = content.replace(insertRegex, standardNav + '\n\n    $1');
    } else {
        content = content.replace(/<body[^>]*>/i, '$&\n' + standardNav);
    }
    
    let activeLink = '';
    if (file === 'home.html' || file === 'index.html') activeLink = '>Home</a>';
    if (file === 'skills.html') activeLink = '>Skills</a>';
    if (file === 'projects.html') activeLink = '>Projects</a>';
    if (file === 'contact.html') activeLink = '>Contact</a>';
    
    if (activeLink) {
        content = content.replace(
            new RegExp('class="nav-link"(' + activeLink + ')', 'g'),
            'class="nav-link active"$1'
        );
    }

    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated ' + file);
}
