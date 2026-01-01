/* ============================================
   MAIN JAVASCRIPT - Shared across all pages
   ============================================ */

// Custom Cursor
class LiquidCursor {
    constructor() {
        this.cursor = document.getElementById('cursor');
        if (!this.cursor) return;
        
        this.dot = this.cursor.querySelector('.cursor-dot');
        this.circle = this.cursor.querySelector('.cursor-circle');
        
        // Exit if cursor elements don't exist
        if (!this.dot || !this.circle) return;
        
        this.mouseX = 0;
        this.mouseY = 0;
        this.dotX = 0;
        this.dotY = 0;
        this.circleX = 0;
        this.circleY = 0;
        
        this.init();
    }
    
    init() {
        if (!this.dot || !this.circle) return;
        
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
        
        // Add hover effect for interactive elements
        const hoverElements = document.querySelectorAll('a, button, .hover-target');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (this.dot) this.dot.classList.add('hover');
                if (this.circle) this.circle.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                if (this.dot) this.dot.classList.remove('hover');
                if (this.circle) this.circle.classList.remove('hover');
            });
        });
        
        this.animate();
    }
    
    animate() {
        if (!this.dot || !this.circle) return;
        
        // Smooth follow for dot
        this.dotX += (this.mouseX - this.dotX) * 0.2;
        this.dotY += (this.mouseY - this.dotY) * 0.2;
        
        // Slower follow for circle
        this.circleX += (this.mouseX - this.circleX) * 0.1;
        this.circleY += (this.mouseY - this.circleY) * 0.1;
        
        this.dot.style.left = this.dotX + 'px';
        this.dot.style.top = this.dotY + 'px';
        
        this.circle.style.left = this.circleX + 'px';
        this.circle.style.top = this.circleY + 'px';
        
        requestAnimationFrame(() => this.animate());
    }
}

// Navbar Scroll Effect
class Navbar {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        if (!this.navbar) return;
        
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
    }
}

// Magnetic Button Effect
class MagneticButtons {
    constructor() {
        this.buttons = document.querySelectorAll('.magnetic');
        this.init();
    }
    
    init() {
        this.buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }
}

// Smooth Scroll for anchor links
class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.init();
    }
    
    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Reveal on Scroll
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('[data-reveal]');
        if (!this.elements.length) return;
        
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        this.elements.forEach(el => observer.observe(el));
    }
}

// Text Scramble Effect
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble-char">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Nav Link Hover Effect - dims other links when hovering
function initNavHover() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            navLinks.forEach(l => {
                if (l !== this) {
                    l.style.opacity = '0.3';
                }
            });
        });

        link.addEventListener('mouseleave', function() {
            navLinks.forEach(l => {
                l.style.opacity = '1';
            });
        });
    });
}

// Mobile Menu - Hamburger functionality
function initMobileMenu() {
    // Create mobile menu elements if they don't exist
    const nav = document.querySelector('.nav');
    if (!nav) return;
    
    // Check if menu toggle already exists
    if (document.querySelector('.menu-toggle')) return;
    
    // Create hamburger button
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.setAttribute('aria-label', 'Toggle menu');
    menuToggle.innerHTML = '<span></span><span></span><span></span>';
    
    // Create mobile menu overlay
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    
    // Get current page for active state
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';
    
    mobileMenu.innerHTML = `
        <a href="home.html" class="mobile-nav-link ${currentPage === 'home.html' || currentPage === '' ? 'active' : ''}">Home</a>
        <a href="about.html" class="mobile-nav-link ${currentPage === 'about.html' ? 'active' : ''}">About</a>
        <a href="skills.html" class="mobile-nav-link ${currentPage === 'skills.html' ? 'active' : ''}">Skills</a>
        <a href="projects.html" class="mobile-nav-link ${currentPage === 'projects.html' ? 'active' : ''}">Projects</a>
        <a href="contact.html" class="mobile-nav-link ${currentPage === 'contact.html' ? 'active' : ''}">Contact</a>
        <a href="contact.html" class="mobile-cta">Let's Talk</a>
    `;
    
    // Append to nav and body
    nav.appendChild(menuToggle);
    document.body.appendChild(mobileMenu);
    
    // Toggle menu function
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }
    
    // Event listeners
    menuToggle.addEventListener('click', toggleMenu);
    
    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu();
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    new LiquidCursor();
    new Navbar();
    new MagneticButtons();
    new SmoothScroll();
    new ScrollReveal();
    initNavHover();
    initMobileMenu();
});

// Export for use in other scripts
window.TextScramble = TextScramble;
