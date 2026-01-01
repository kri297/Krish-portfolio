/* ============================================
   PROJECTS PAGE - ULTRA INTERACTIONS
   3D Effects, Parallax, Magnetic, Glitch
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initCardEffects();
    initSphereParallax();
    initMagneticButtons();
    initCursorGlow();
    initTiltEffect();
});

/* ============================================
   SCROLL REVEAL - Staggered Animation
   ============================================ */
function initScrollReveal() {
    const cards = document.querySelectorAll('.project-card');
    
    const observerOptions = {
        root: null,
        rootMargin: '-100px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Stagger children animations
                const pills = entry.target.querySelectorAll('.tech-pill');
                pills.forEach((pill, i) => {
                    pill.style.transitionDelay = `${0.1 + i * 0.05}s`;
                });
            }
        });
    }, observerOptions);
    
    cards.forEach(card => observer.observe(card));
}

/* ============================================
   CARD EFFECTS - Glow Follow & 3D Tilt
   ============================================ */
function initCardEffects() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        const bgGlow = card.querySelector('.bg-glow');
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Update CSS custom properties for glow position
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            
            // Dynamic glow color based on position
            const hue = (x / rect.width) * 60 + 230; // Range from blue to purple
            if (bgGlow) {
                bgGlow.style.background = `
                    radial-gradient(600px circle at ${x}px ${y}px,
                        hsla(${hue}, 80%, 60%, 0.15),
                        transparent 40%
                    )
                `;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (bgGlow) {
                bgGlow.style.background = '';
            }
        });
    });
}

/* ============================================
   3D TILT EFFECT
   ============================================ */
function initTiltEffect() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;
            
            card.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateY(-10px) 
                scale(1.02)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });
}

/* ============================================
   SPHERE PARALLAX - Mouse Move
   ============================================ */
function initSphereParallax() {
    const spheres = document.querySelectorAll('.sphere');
    const orbits = document.querySelectorAll('.orbit');
    
    if (!spheres.length) return;
    
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    
    function animate() {
        // Smooth interpolation
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;
        
        spheres.forEach((sphere, i) => {
            const speed = (i + 1) * 20;
            const x = currentX * speed;
            const y = currentY * speed;
            sphere.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        // Orbit tilt on mouse
        orbits.forEach((orbit, i) => {
            const tiltX = currentY * (5 + i * 2);
            const tiltY = currentX * (5 + i * 2);
            orbit.style.transform = `translate(-50%, -50%) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Scroll parallax for spheres
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        spheres.forEach((sphere, i) => {
            const speed = 0.03 + (i * 0.02);
            const direction = i % 2 === 0 ? 1 : -1;
            sphere.style.transform = `translateY(${scrollY * speed * direction}px)`;
        });
    });
}

/* ============================================
   MAGNETIC BUTTONS
   ============================================ */
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.action-btn, .more-btn, .nav-cta');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const strength = 0.3;
            btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

/* ============================================
   CURSOR GLOW EFFECT
   ============================================ */
function initCursorGlow() {
    const glow = document.createElement('div');
    glow.className = 'page-cursor-glow';
    glow.style.cssText = `
        position: fixed;
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 0;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
        opacity: 0;
    `;
    document.body.appendChild(glow);
    
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
        glow.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
    });
    
    function animateGlow() {
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;
        
        glow.style.left = currentX + 'px';
        glow.style.top = currentY + 'px';
        
        requestAnimationFrame(animateGlow);
    }
    
    animateGlow();
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ============================================
   SCROLL PROGRESS (Optional Enhancement)
   ============================================ */
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #6366f1, #a855f7, #06b6d4);
        z-index: 9999;
        transform-origin: left;
        transform: scaleX(0);
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollTop / docHeight;
        progressBar.style.transform = `scaleX(${progress})`;
    });
}

initScrollProgress();

/* ============================================
   INTERSECTION ANIMATION FOR HERO
   ============================================ */
window.addEventListener('load', () => {
    // Hide scroll indicator on scroll
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }
    
    // Initialize stats counter
    initStatsCounter();
});

/* ============================================
   STATS COUNTER ANIMATION
   ============================================ */
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-num');
    if (!stats.length) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseInt(stat.dataset.count);
                animateCounter(stat, target);
                observer.unobserve(stat);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element, target) {
    let current = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const suffix = target >= 100 ? '+' : '+';
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

/* ============================================
   MORE SECTION CARD EFFECTS
   ============================================ */
const moreCard = document.querySelector('.more-card');
if (moreCard) {
    moreCard.addEventListener('mousemove', (e) => {
        const rect = moreCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // 3D tilt
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 40;
        const rotateY = (centerX - x) / 40;
        
        moreCard.style.transform = `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            translateY(-15px) 
            scale(1.02)
        `;
    });
    
    moreCard.addEventListener('mouseleave', () => {
        moreCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
}

/* ============================================
   GLITCH TEXT EFFECT (Easter Egg on Title Hover)
   ============================================ */
const titleWords = document.querySelectorAll('.word.gradient');
titleWords.forEach(word => {
    word.addEventListener('mouseenter', () => {
        word.classList.add('glitch-active');
        word.style.animation = 'glitchText 0.3s ease';
        
        setTimeout(() => {
            word.style.animation = '';
            word.classList.remove('glitch-active');
        }, 300);
    });
});

// Add glitch keyframes dynamically
const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
    @keyframes glitchText {
        0%, 100% { transform: translate(0); filter: none; }
        20% { transform: translate(-3px, 3px); filter: hue-rotate(90deg); }
        40% { transform: translate(3px, -3px); filter: hue-rotate(180deg); }
        60% { transform: translate(-3px, -3px); filter: hue-rotate(270deg); }
        80% { transform: translate(3px, 3px); filter: hue-rotate(360deg); }
    }
    
    .glitch-active::before,
    .glitch-active::after {
        content: attr(data-text);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    
    .glitch-active::before {
        animation: glitchTop 0.3s ease;
        clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
    }
    
    .glitch-active::after {
        animation: glitchBottom 0.3s ease;
        clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
    }
    
    @keyframes glitchTop {
        0%, 100% { transform: translate(0); }
        20% { transform: translate(5px, 0); }
        40% { transform: translate(-5px, 0); }
        60% { transform: translate(5px, 0); }
        80% { transform: translate(-5px, 0); }
    }
    
    @keyframes glitchBottom {
        0%, 100% { transform: translate(0); }
        20% { transform: translate(-5px, 0); }
        40% { transform: translate(5px, 0); }
        60% { transform: translate(-5px, 0); }
        80% { transform: translate(5px, 0); }
    }
`;
document.head.appendChild(glitchStyle);
