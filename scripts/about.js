/* ============================================
   ABOUT PAGE - JavaScript
   Particles + Timeline + Counters + Effects
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initParticles();
    initLocomotive();
    initTimeline();
    initCounters();
    initNavHover();
    initGallery();
});

/* ============ CUSTOM CURSOR ============ */
function initCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    const aura = document.getElementById('cursor-aura');
    
    if (!cursor || !follower) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    let auraX = 0, auraY = 0;
    
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
        
        // Aura follows with more delay
        if (aura) {
            auraX += (mouseX - auraX) * 0.05;
            auraY += (mouseY - auraY) * 0.05;
            aura.style.left = auraX - 100 + 'px';
            aura.style.top = auraY - 100 + 'px';
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .timeline-card, .service-card, .orbit-icon');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            follower.classList.remove('hover');
        });
    });
}

/* ============ PARTICLES (Blend of white and colored) ============ */
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 60;
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resize();
    window.addEventListener('resize', resize);
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        const isColored = Math.random() > 0.6;
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            radius: Math.random() * 2 + 1,
            color: isColored 
                ? `rgba(99, 102, 241, ${0.3 + Math.random() * 0.3})`
                : `rgba(255, 255, 255, ${0.2 + Math.random() * 0.3})`,
            isColored: isColored
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((p, i) => {
            // Move particles
            p.x += p.vx;
            p.y += p.vy;
            
            // Wrap around
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            
            // Draw connections
            particles.slice(i + 1).forEach(p2 => {
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 120) {
                    const opacity = (1 - dist / 120) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = p.isColored 
                        ? `rgba(99, 102, 241, ${opacity})`
                        : `rgba(255, 255, 255, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

/* ============ LOCOMOTIVE SCROLL ============ */
function initLocomotive() {
    // Disabled - using native scroll for sticky card stack to work properly
    document.documentElement.style.scrollBehavior = 'smooth';
}

/* ============ TIMELINE - SCROLL STACK (Peel Off) ============ */
function initTimeline() {
    const section = document.querySelector('.timeline-section');
    const stackContainer = document.getElementById('stack-container');
    const cards = document.querySelectorAll('.stack-card');
    const hint = document.querySelector('.stack-hint');
    
    if (!section || !stackContainer || !cards.length) return;
    
    const totalCards = cards.length;
    let currentCard = 0;
    
    // Create progress dots
    const progressContainer = document.createElement('div');
    progressContainer.className = 'stack-progress';
    for (let i = 0; i < totalCards; i++) {
        const dot = document.createElement('div');
        dot.className = 'progress-dot';
        if (i === 0) dot.classList.add('active');
        progressContainer.appendChild(dot);
    }
    stackContainer.appendChild(progressContainer);
    
    const progressDots = progressContainer.querySelectorAll('.progress-dot');
    
    // Set first card as active
    cards[0].classList.add('active');
    
    function updateCards() {
        const sectionRect = section.getBoundingClientRect();
        const sectionTop = sectionRect.top;
        const sectionHeight = section.offsetHeight;
        const windowHeight = window.innerHeight;
        
        // How much of the section has been scrolled through
        // sectionTop starts positive, becomes negative as we scroll past
        const scrolled = -sectionTop; // How far we've scrolled into section
        const scrollableHeight = sectionHeight - windowHeight; // Total scrollable distance
        
        // Only calculate if we're in the section
        if (sectionTop > windowHeight || sectionTop + sectionHeight < 0) {
            return; // Section not in view
        }
        
        // Progress from 0 to 1 as we scroll through the section
        const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));
        
        // Which card should be showing (0 to totalCards-1)
        const cardIndex = Math.min(Math.floor(progress * totalCards), totalCards - 1);
        
        // Hide hint after first scroll
        if (hint && progress > 0.05) {
            hint.style.opacity = '0';
        } else if (hint) {
            hint.style.opacity = '1';
        }
        
        // Only update if card changed
        if (cardIndex !== currentCard) {
            currentCard = cardIndex;
            
            // Update each card
            cards.forEach((card, i) => {
                card.classList.remove('active', 'dismissed');
                
                if (i < currentCard) {
                    card.classList.add('dismissed');
                } else if (i === currentCard) {
                    card.classList.add('active');
                }
            });
            
            // Update progress dots
            progressDots.forEach((dot, i) => {
                dot.classList.remove('active', 'passed');
                if (i < currentCard) {
                    dot.classList.add('passed');
                } else if (i === currentCard) {
                    dot.classList.add('active');
                }
            });
        }
    }
    
    // Listen to scroll
    window.addEventListener('scroll', updateCards, { passive: true });
    
    // Initial check
    updateCards();
}

/* ============ COUNTER ANIMATION ============ */
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
    
    function animateCounter(el) {
        const target = parseInt(el.dataset.count);
        const duration = 2000;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            
            el.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        }
        
        requestAnimationFrame(update);
    }
}

/* ============ NAV HOVER EFFECTS ============ */
function initNavHover() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            navLinks.forEach(l => {
                if (l !== link && !l.classList.contains('active')) {
                    l.style.opacity = '0.4';
                }
            });
        });
        
        link.addEventListener('mouseleave', () => {
            navLinks.forEach(l => {
                l.style.opacity = '';
            });
        });
    });
}

/* ============ MARQUEE SCROLL ============ */
// Enhanced marquee with random glow pulses and cursor proximity

function initMarqueeEffects() {
    const marqueeItems = document.querySelectorAll('.marquee-item');
    const marqueeContainer = document.querySelector('.marquee-container');
    
    if (!marqueeItems.length) return;
    
    // Random pulse effect - randomly pulse items
    function randomPulse() {
        const randomIndex = Math.floor(Math.random() * marqueeItems.length);
        const item = marqueeItems[randomIndex];
        
        if (!item.classList.contains('pulse')) {
            item.classList.add('pulse');
            setTimeout(() => {
                item.classList.remove('pulse');
            }, 2000);
        }
    }
    
    // Start random pulses
    setInterval(randomPulse, 1500);
    
    // Cursor proximity glow effect
    if (marqueeContainer) {
        document.addEventListener('mousemove', (e) => {
            marqueeItems.forEach(item => {
                const rect = item.getBoundingClientRect();
                const itemCenterX = rect.left + rect.width / 2;
                const itemCenterY = rect.top + rect.height / 2;
                
                const distance = Math.sqrt(
                    Math.pow(e.clientX - itemCenterX, 2) + 
                    Math.pow(e.clientY - itemCenterY, 2)
                );
                
                // If within 150px, add glow
                if (distance < 150) {
                    item.classList.add('near');
                } else {
                    item.classList.remove('near');
                }
            });
        });
    }
}

// Initialize marquee effects
document.addEventListener('DOMContentLoaded', () => {
    initMarqueeEffects();
});

/* ===== ADVANCED MARQUEE INNOVATIONS ===== */

// 3D Tilt Effect on mouse position
function init3DTilt() {
    const items = document.querySelectorAll('.marquee-item');
    
    items.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const centerX = rect.width / 2;
            
            if (x < centerX) {
                item.classList.add('tilt-left');
                item.classList.remove('tilt-right');
            } else {
                item.classList.add('tilt-right');
                item.classList.remove('tilt-left');
            }
        });
        
        item.addEventListener('mouseleave', () => {
            item.classList.remove('tilt-left', 'tilt-right');
        });
    });
}

// Color Wave Effect - ripples color through items
function initColorWave() {
    const items = document.querySelectorAll('.marquee-item');
    let waveIndex = 0;
    
    function triggerWave() {
        // Clear previous wave
        items.forEach(item => {
            item.classList.remove('wave-1', 'wave-2', 'wave-3', 'wave-4', 'wave-5');
        });
        
        // Create wave from random starting point
        const startIndex = Math.floor(Math.random() * items.length);
        
        for (let i = 0; i < 5; i++) {
            const idx = (startIndex + i) % items.length;
            setTimeout(() => {
                items[idx].classList.add(`wave-${i + 1}`);
                setTimeout(() => {
                    items[idx].classList.remove(`wave-${i + 1}`);
                }, 500);
            }, i * 80);
        }
    }
    
    // Trigger wave every 4 seconds
    setInterval(triggerWave, 4000);
}

// Ripple Effect on Click
function initRippleEffect() {
    const items = document.querySelectorAll('.marquee-item');
    
    items.forEach(item => {
        item.style.position = 'relative';
        item.style.overflow = 'hidden';
        
        item.addEventListener('click', (e) => {
            const rect = item.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';
            ripple.style.width = ripple.style.height = '10px';
            
            item.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Ghost Trail on Fast Mouse Movement
function initGhostTrail() {
    const items = document.querySelectorAll('.marquee-item');
    
    items.forEach(item => {
        let lastX = 0;
        let velocity = 0;
        
        item.addEventListener('mouseenter', (e) => {
            lastX = e.clientX;
        });
        
        item.addEventListener('mousemove', (e) => {
            velocity = Math.abs(e.clientX - lastX);
            lastX = e.clientX;
            
            if (velocity > 15) {
                item.classList.add('ghost');
            }
        });
        
        item.addEventListener('mouseleave', () => {
            item.classList.remove('ghost');
        });
    });
}

// Initialize all advanced effects
document.addEventListener('DOMContentLoaded', () => {
    init3DTilt();
    initColorWave();
    initRippleEffect();
    initGhostTrail();
});

/* ============ GSAP ANIMATIONS (if loaded) ============ */
if (typeof gsap !== 'undefined') {
    // Animate elements on scroll
    gsap.registerPlugin(ScrollTrigger);
    
    // Service cards stagger
    gsap.from('.service-card', {
        scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
    });
    
    // Marquee entrance animation
    gsap.from('.marquee-row', {
        scrollTrigger: {
            trigger: '.marquee-container',
            start: 'top 85%'
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });
}

/* ============================================
   DOME GALLERY - 3D SPHERICAL GALLERY
   With Intro Screen & Starfield Effects
   ============================================ */

function initGallery() {
    const openGalleryBtn = document.getElementById('openGalleryBtn');
    const closeDomeGalleryBtn = document.getElementById('closeDomeGallery');
    const domeGalleryModal = document.getElementById('domeGalleryModal');
    const galleryIntro = document.getElementById('galleryIntro');
    const sphereRoot = document.getElementById('sphereRoot');
    const sphereMain = document.getElementById('sphereMain');
    const sphere = document.getElementById('sphere');
    const viewer = document.getElementById('viewer');
    const scrim = document.getElementById('scrim');
    const frame = document.getElementById('frame');
    const starsCanvas = document.getElementById('starsCanvas');
    
    // Gallery images - using your images from IMAGES folder
    const galleryImages = [
        { src: 'IMAGES/IMG-20250828-WA0007.jpg', alt: 'Photo 1' },
        { src: 'IMAGES/IMG20251106090239.jpg', alt: 'Photo 2' },
        { src: 'IMAGES/IMG20251106090726 (1).jpg', alt: 'Photo 3' },
        { src: 'IMAGES/WhatsApp Image 2026-01-01 at 15.48.11.jpeg', alt: 'Photo 4' },
        { src: 'IMAGES/WhatsApp Image 2026-01-01 at 15.48.19 (1).jpeg', alt: 'Photo 5' },
        { src: 'IMAGES/WhatsApp Image 2026-01-01 at 15.48.19.jpeg', alt: 'Photo 6' },
        { src: 'IMAGES/WhatsApp Image 2026-01-01 at 15.48.20 (1).jpeg', alt: 'Photo 7' },
        { src: 'IMAGES/WhatsApp Image 2026-01-01 at 15.48.20.jpeg', alt: 'Photo 8' }
    ];
    
    // Dome gallery state
    let rotationX = 0;
    let rotationY = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let velocity = { x: 0, y: 0 };
    let isEnlarging = false;
    let isAutoRotating = true;
    const segments = 35;
    const maxVerticalRotation = 15;
    const dragSensitivity = 0.3;
    
    // ========== INTRO SCREEN ==========
    function showIntroThenGallery() {
        if (!galleryIntro) return;
        
        // Reset intro state
        galleryIntro.classList.remove('fade-out');
        
        // Wait for progress bar to fill (2s animation + 1s delay), then fade out
        setTimeout(() => {
            galleryIntro.classList.add('fade-out');
            
            // Start the gallery after fade
            setTimeout(() => {
                initStarfield();
                if (isAutoRotating) {
                    startAutoRotation();
                }
            }, 1000);
        }, 3200);
    }
    
    // ========== STARFIELD EFFECT ==========
    let stars = [];
    let starsCtx = null;
    
    function initStarfield() {
        if (!starsCanvas) return;
        starsCtx = starsCanvas.getContext('2d');
        resizeStarsCanvas();
        createStars();
        animateStars();
        window.addEventListener('resize', resizeStarsCanvas);
    }
    
    function resizeStarsCanvas() {
        if (!starsCanvas) return;
        starsCanvas.width = window.innerWidth;
        starsCanvas.height = window.innerHeight;
    }
    
    function createStars() {
        stars = [];
        const starCount = 200;
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                radius: Math.random() * 1.5 + 0.5,
                alpha: Math.random() * 0.8 + 0.2,
                speed: Math.random() * 0.5 + 0.1,
                twinkleSpeed: Math.random() * 0.02 + 0.01
            });
        }
    }
    
    function animateStars() {
        if (!starsCtx || !domeGalleryModal?.classList.contains('active')) {
            requestAnimationFrame(animateStars);
            return;
        }
        
        starsCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
        
        stars.forEach(star => {
            // Twinkle effect
            star.alpha += Math.sin(Date.now() * star.twinkleSpeed) * 0.01;
            star.alpha = Math.max(0.1, Math.min(1, star.alpha));
            
            // Draw star with glow
            starsCtx.beginPath();
            starsCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            starsCtx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
            starsCtx.fill();
            
            // Glow effect for some stars
            if (star.radius > 1) {
                starsCtx.beginPath();
                starsCtx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
                const gradient = starsCtx.createRadialGradient(
                    star.x, star.y, 0,
                    star.x, star.y, star.radius * 3
                );
                gradient.addColorStop(0, `rgba(99, 102, 241, ${star.alpha * 0.3})`);
                gradient.addColorStop(1, 'transparent');
                starsCtx.fillStyle = gradient;
                starsCtx.fill();
            }
            
            // Slow drift
            star.y += star.speed * 0.1;
            if (star.y > starsCanvas.height) {
                star.y = 0;
                star.x = Math.random() * starsCanvas.width;
            }
        });
        
        requestAnimationFrame(animateStars);
    }
    
    // Build grid items
    function buildItems() {
        const xCols = [];
        for (let i = 0; i < segments; i++) {
            xCols.push(-37 + i * 2);
        }
        const evenYs = [-4, -2, 0, 2, 4];
        const oddYs = [-3, -1, 1, 3, 5];
        
        const coords = [];
        xCols.forEach((x, c) => {
            const ys = c % 2 === 0 ? evenYs : oddYs;
            ys.forEach(y => {
                coords.push({ x, y, sizeX: 2, sizeY: 2 });
            });
        });
        
        return coords.map((coord, i) => {
            const imgIndex = i % galleryImages.length;
            return {
                ...coord,
                src: galleryImages[imgIndex].src,
                alt: galleryImages[imgIndex].alt
            };
        });
    }
    
    // Create sphere items
    function createSphere() {
        if (!sphere) return;
        sphere.innerHTML = '';
        
        const items = buildItems();
        items.forEach((item, i) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item';
            itemDiv.dataset.src = item.src;
            itemDiv.dataset.offsetX = item.x;
            itemDiv.dataset.offsetY = item.y;
            itemDiv.dataset.sizeX = item.sizeX;
            itemDiv.dataset.sizeY = item.sizeY;
            itemDiv.style.setProperty('--offset-x', item.x);
            itemDiv.style.setProperty('--offset-y', item.y);
            itemDiv.style.setProperty('--item-size-x', item.sizeX);
            itemDiv.style.setProperty('--item-size-y', item.sizeY);
            
            const imageDiv = document.createElement('div');
            imageDiv.className = 'item__image';
            imageDiv.setAttribute('role', 'button');
            imageDiv.setAttribute('tabindex', '0');
            imageDiv.setAttribute('aria-label', item.alt || 'Open image');
            
            const img = document.createElement('img');
            img.src = item.src;
            img.alt = item.alt;
            img.draggable = false;
            
            imageDiv.appendChild(img);
            itemDiv.appendChild(imageDiv);
            sphere.appendChild(itemDiv);
            
            // Click to enlarge
            imageDiv.addEventListener('click', () => {
                if (!isDragging) {
                    enlargeImage(item.src);
                }
            });
        });
    }
    
    // Apply rotation transform
    function applyTransform() {
        if (sphere) {
            sphere.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
        }
    }
    
    // Mouse/touch handlers
    function handleMouseDown(e) {
        isDragging = true;
        startX = e.clientX || e.touches?.[0]?.clientX || 0;
        startY = e.clientY || e.touches?.[0]?.clientY || 0;
        velocity = { x: 0, y: 0 };
    }
    
    function handleMouseMove(e) {
        if (!isDragging || isEnlarging) return;
        
        const x = e.clientX || e.touches?.[0]?.clientX || 0;
        const y = e.clientY || e.touches?.[0]?.clientY || 0;
        
        const deltaX = (x - startX) * dragSensitivity;
        const deltaY = (y - startY) * dragSensitivity;
        
        rotationY += deltaX;
        rotationX = Math.max(-maxVerticalRotation, Math.min(maxVerticalRotation, rotationX - deltaY));
        
        velocity.x = deltaX;
        velocity.y = deltaY;
        
        startX = x;
        startY = y;
        
        applyTransform();
    }
    
    function handleMouseUp() {
        isDragging = false;
        animateMomentum();
    }
    
    function animateMomentum() {
        if (Math.abs(velocity.x) < 0.1 && Math.abs(velocity.y) < 0.1) return;
        
        velocity.x *= 0.95;
        velocity.y *= 0.95;
        
        rotationY += velocity.x;
        rotationX = Math.max(-maxVerticalRotation, Math.min(maxVerticalRotation, rotationX - velocity.y * 0.3));
        
        applyTransform();
        
        if (!isDragging) {
            requestAnimationFrame(animateMomentum);
        }
    }
    
    // Enlarge image
    function enlargeImage(src) {
        if (!frame || !sphereRoot) return;
        isEnlarging = true;
        sphereRoot.setAttribute('data-enlarging', 'true');
        frame.style.backgroundImage = `url(${src})`;
    }
    
    // Close enlarged image
    function closeEnlarged() {
        if (!sphereRoot) return;
        isEnlarging = false;
        sphereRoot.setAttribute('data-enlarging', 'false');
    }
    
    // Open gallery modal
    if (openGalleryBtn && domeGalleryModal) {
        openGalleryBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            domeGalleryModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            createSphere();
            applyTransform();
            
            // Show intro screen first, then reveal gallery
            showIntroThenGallery();
        });
    }
    
    // Close gallery modal
    function closeGallery() {
        if (domeGalleryModal) {
            domeGalleryModal.classList.remove('active');
            document.body.style.overflow = '';
            stopAutoRotation();
            
            // Reset intro for next open
            if (galleryIntro) {
                galleryIntro.classList.remove('fade-out');
            }
        }
    }
    
    if (closeDomeGalleryBtn) {
        closeDomeGalleryBtn.addEventListener('click', closeGallery);
    }
    
    // Close on scrim click
    if (scrim) {
        scrim.addEventListener('click', closeEnlarged);
    }
    
    // Add drag event listeners
    if (sphereMain) {
        sphereMain.addEventListener('mousedown', handleMouseDown);
        sphereMain.addEventListener('touchstart', handleMouseDown, { passive: true });
        
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('touchmove', handleMouseMove, { passive: true });
        
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('touchend', handleMouseUp);
    }
    
    // Auto rotation
    let autoRotationId = null;
    
    function startAutoRotation() {
        function rotate() {
            if (!isDragging && !isEnlarging && isAutoRotating) {
                rotationY += 0.15;
                applyTransform();
            }
            autoRotationId = requestAnimationFrame(rotate);
        }
        rotate();
    }
    
    function stopAutoRotation() {
        if (autoRotationId) {
            cancelAnimationFrame(autoRotationId);
            autoRotationId = null;
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (domeGalleryModal?.classList.contains('active')) {
            if (e.key === 'Escape') {
                if (isEnlarging) {
                    closeEnlarged();
                } else {
                    closeGallery();
                }
            }
            if (e.key === 'ArrowLeft') {
                rotationY -= 15;
                applyTransform();
            }
            if (e.key === 'ArrowRight') {
                rotationY += 15;
                applyTransform();
            }
            if (e.key === ' ') {
                e.preventDefault();
                isAutoRotating = !isAutoRotating;
                if (isAutoRotating) {
                    startAutoRotation();
                    autoRotateBtn?.classList.add('active');
                } else {
                    stopAutoRotation();
                    autoRotateBtn?.classList.remove('active');
                }
            }
        }
    });
}