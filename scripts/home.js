/* ============================================
   KRISH MISHRA - AWARD-WINNING PORTFOLIO
   JavaScript - Smooth & Impressive
   ============================================ */

// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initCursor();
    initCursorTrail();
    initLocomotive();
    initStatsCounter();
    initMagnetic();
    initShowcaseHover();
    initTextReveal();
    initParallaxImages();
    initTypedText();
    initScrollProgress();
    initBackToTop();
    initDynamicGreeting();
    initClickSplash();
    initTiltEffect();
    initNavHover();
});

/* ============ PRELOADER ============ */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const percentEl = document.getElementById('load-percent');
    const letters = document.querySelectorAll('.fill-letter');
    
    // Set data-letter attribute for ::before and ::after content
    letters.forEach(letter => {
        letter.setAttribute('data-letter', letter.textContent);
    });
    
    // Animate percentage counter - 4 seconds to match CSS animation
    const duration = 4000;
    const startTime = performance.now();
    
    function updatePercent(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const eased = 1 - Math.pow(1 - progress, 3);
        const percent = Math.floor(eased * 100);
        
        if (percentEl) {
            percentEl.textContent = percent;
        }
        
        if (progress < 1) {
            requestAnimationFrame(updatePercent);
        } else {
            // Add filled class to trigger shimmer
            letters.forEach(letter => {
                letter.classList.add('filled');
            });
        }
    }
    
    requestAnimationFrame(updatePercent);
    
    // Hide preloader after animation completes with nice exit
    window.addEventListener('load', () => {
        setTimeout(() => {
            // Start exit animation
            preloader.classList.add('exit-start');
            
            // Hide completely after exit animation
            setTimeout(() => {
                preloader.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }, 1000);
        }, 4500);
    });
}

/* ============ CUSTOM CURSOR ============ */
function initCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    
    if (!cursor || !follower) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animate() {
        // Cursor follows immediately
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.left = cursorX - 4 + 'px';
        cursor.style.top = cursorY - 4 + 'px';
        
        // Follower follows with delay
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.left = followerX - 20 + 'px';
        follower.style.top = followerY - 20 + 'px';
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Hover effects
    document.querySelectorAll('a, button, .magnetic, .showcase-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.classList.add('hover');
            cursor.style.transform = 'scale(0)';
        });
        el.addEventListener('mouseleave', () => {
            follower.classList.remove('hover');
            cursor.style.transform = 'scale(1)';
        });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        follower.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        follower.style.opacity = '1';
    });
}

/* ============ LOCOMOTIVE SCROLL ============ */
function initLocomotive() {
    const scrollContainer = document.getElementById('scroll-container');
    if (!scrollContainer) return;
    
    const scroll = new LocomotiveScroll({
        el: scrollContainer,
        smooth: true,
        multiplier: 0.8,
        lerp: 0.05,
        smartphone: { smooth: true },
        tablet: { smooth: true }
    });
    
    // Update on resize
    window.addEventListener('resize', () => scroll.update());
    
    // Refresh after images load
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', () => scroll.update());
    });

    // Store globally for other functions
    window.locomotiveScroll = scroll;
}

/* ============ STATS COUNTER ============ */
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-num');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
    
    function animateCounter(el) {
        const target = parseInt(el.dataset.count);
        const duration = 2500;
        const start = performance.now();
        
        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing
            const eased = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(target * eased);
            
            el.textContent = current.toString().padStart(2, '0');
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target.toString().padStart(2, '0');
            }
        }
        
        requestAnimationFrame(update);
    }
}

/* ============ MAGNETIC EFFECT ============ */
function initMagnetic() {
    document.querySelectorAll('.magnetic').forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });
}

/* ============ SHOWCASE HOVER ============ */
function initShowcaseHover() {
    document.querySelectorAll('.showcase-item').forEach(item => {
        const image = item.querySelector('.item-image img');
        
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            if (image) {
                image.style.transform = `scale(1.1) translate(${x * 20}px, ${y * 20}px)`;
            }
        });
        
        item.addEventListener('mouseleave', () => {
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
}

/* ============ TEXT REVEAL ON SCROLL ============ */
function initTextReveal() {
    const revealElements = document.querySelectorAll('.title-reveal, .about-title, .cta-title span');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.3 });
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });

    // Add revealed styles
    const style = document.createElement('style');
    style.textContent = `.revealed { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(style);
}

/* ============ PARALLAX IMAGES ============ */
function initParallaxImages() {
    document.querySelectorAll('.image-frame img, .item-image img').forEach(img => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    img.style.transition = 'transform 0.1s ease-out';
                }
            });
        });
        observer.observe(img);
    });
}

/* ============ GSAP ANIMATIONS ============ */
window.addEventListener('load', () => {
    if (typeof gsap === 'undefined') return;
    
    // Image reveal
    gsap.from('.hero-image-mask', {
        duration: 1.5,
        clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
        ease: 'power4.out',
        delay: 3
    });
    
    // Parallax on mouse move
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        gsap.to('.hero-image-wrapper', {
            duration: 1,
            x: x,
            y: y,
            ease: 'power2.out'
        });
        
        gsap.to('.hero-gradient', {
            duration: 2,
            x: x * 2,
            y: y * 2,
            ease: 'power2.out'
        });

        // Move floating shapes
        gsap.to('.shape-1', { duration: 3, x: x * 1.5, y: y * 1.5, ease: 'power2.out' });
        gsap.to('.shape-2', { duration: 3, x: -x * 2, y: -y * 2, ease: 'power2.out' });
        gsap.to('.shape-3', { duration: 3, x: x * 0.8, y: -y * 0.8, ease: 'power2.out' });
        gsap.to('.shape-4', { duration: 3, x: -x * 1.2, y: y * 1.2, ease: 'power2.out' });
    });

    // Showcase items animation
    gsap.utils.toArray('.showcase-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
            },
            y: 100,
            opacity: 0,
            duration: 1,
            delay: i * 0.2,
            ease: 'power3.out'
        });
    });
});

/* ============ SCROLL INDICATOR CLICK ============ */
document.querySelector('.hero-scroll')?.addEventListener('click', () => {
    const marquee = document.querySelector('.marquee-section');
    if (marquee && window.locomotiveScroll) {
        window.locomotiveScroll.scrollTo(marquee);
    }
});

/* ============ SKILL BADGE INTERACTION ============ */
document.querySelectorAll('.skill-badge').forEach(badge => {
    badge.addEventListener('mouseenter', () => {
        badge.style.background = 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(236, 72, 153, 0.2))';
    });
    badge.addEventListener('mouseleave', () => {
        badge.style.background = 'rgba(255, 255, 255, 0.05)';
    });
});

/* ============ TYPED TEXT EFFECT ============ */
function initTypedText() {
    const typedElement = document.getElementById('typed-text');
    if (!typedElement) return;

    const words = ['Creative Developer', 'UI/UX Designer', 'Problem Solver', 'Full Stack Dev', 'Tech Enthusiast'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typedElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typedElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before next word
        }

        setTimeout(type, typeSpeed);
    }

    // Start after preloader
    setTimeout(type, 3500);
}

/* ============ SCROLL PROGRESS BAR ============ */
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

/* ============ BACK TO TOP ============ */
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        if (window.locomotiveScroll) {
            window.locomotiveScroll.scrollTo(0);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

/* ============ DYNAMIC GREETING ============ */
function initDynamicGreeting() {
    const greetingEl = document.getElementById('greeting');
    if (!greetingEl) return;

    const hour = new Date().getHours();
    let greeting = 'Hello there';

    if (hour >= 5 && hour < 12) {
        greeting = 'Good Morning';
    } else if (hour >= 12 && hour < 17) {
        greeting = 'Good Afternoon';
    } else if (hour >= 17 && hour < 21) {
        greeting = 'Good Evening';
    } else {
        greeting = 'Hello Night Owl';
    }

    greetingEl.textContent = greeting;
}

/* ============ CURSOR TRAIL ============ */
function initCursorTrail() {
    const canvas = document.getElementById('cursor-trail');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    let mouseX = 0, mouseY = 0;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Add particle on move - White/Silver clean scheme
        const colors = [
            '#ffffff',  // Pure White
            '#e0e0e0',  // Light Silver
            '#c0c0c0',  // Silver
            '#d4d4d4',  // Platinum
            '#f5f5f5'   // Snow White
        ];
        
        particles.push({
            x: mouseX,
            y: mouseY,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 2,
            speedY: (Math.random() - 0.5) * 2,
            life: 1,
            color: colors[Math.floor(Math.random() * colors.length)]
        });

        // Limit particles
        if (particles.length > 50) {
            particles.shift();
        }
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, index) => {
            p.x += p.speedX;
            p.y += p.speedY;
            p.life -= 0.02;
            p.size *= 0.98;

            if (p.life <= 0) {
                particles.splice(index, 1);
                return;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life;
            ctx.fill();
        });

        ctx.globalAlpha = 1;
        requestAnimationFrame(animate);
    }

    animate();
}

/* ============ CLICK SPLASH EFFECT ============ */
function initClickSplash() {
    const container = document.getElementById('splash-container');
    if (!container) return;

    document.addEventListener('click', (e) => {
        const splash = document.createElement('div');
        splash.className = 'splash';
        splash.style.left = e.clientX - 50 + 'px';
        splash.style.top = e.clientY - 50 + 'px';
        splash.style.width = '100px';
        splash.style.height = '100px';
        container.appendChild(splash);

        setTimeout(() => splash.remove(), 600);
    });
}

/* ============ 3D TILT EFFECT ============ */
function initTiltEffect() {
    const cards = document.querySelectorAll('.showcase-item, .hero-image-wrapper');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

/* ============ NAV LINK HOVER EFFECT ============ */
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

/* ============ EASTER EGG - KONAMI CODE ============ */
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s linear';
    
    const message = document.createElement('div');
    message.innerHTML = '🎉 You found the secret! You\'re awesome! 🎉';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #6366f1, #ec4899);
        color: white;
        padding: 2rem 4rem;
        border-radius: 20px;
        font-size: 1.5rem;
        font-weight: 700;
        z-index: 99999;
        animation: bounceIn 0.5s ease;
        box-shadow: 0 20px 60px rgba(99, 102, 241, 0.5);
    `;
    document.body.appendChild(message);

    setTimeout(() => {
        message.style.animation = 'fadeOut 0.5s ease forwards';
        setTimeout(() => message.remove(), 500);
        document.body.style.animation = '';
    }, 3000);
}

// Add easter egg animations
const easterEggStyles = document.createElement('style');
easterEggStyles.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    @keyframes bounceIn {
        0% { transform: translate(-50%, -50%) scale(0); }
        50% { transform: translate(-50%, -50%) scale(1.2); }
        100% { transform: translate(-50%, -50%) scale(1); }
    }
    @keyframes fadeOut {
        to { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
`;
document.head.appendChild(easterEggStyles);

console.log('🔥 Award-Winning Portfolio Loaded!');
console.log('🎮 Hint: Try the Konami code...');
