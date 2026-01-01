/* ============================================
   CONTACT PAGE - ULTRA INTERACTIONS
   3D Effects, Parallax, Form Magic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initSphereParallax();
    initFormEffects();
    initCardEffects();
    initSocialTooltips();
    initScrollReveal();
    initStatsCounter();
});

/* ============================================
   SPHERE PARALLAX - Mouse & Scroll Movement
   ============================================ */
function initSphereParallax() {
    const spheres = document.querySelectorAll('.sphere');
    const orbits = document.querySelectorAll('.orbit');
    
    if (!spheres.length) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    
    function animateSpheres() {
        // Smooth interpolation
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;
        
        spheres.forEach((sphere, i) => {
            const depth = (i + 1) * 15;
            const x = currentX * depth;
            const y = currentY * depth;
            
            sphere.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        requestAnimationFrame(animateSpheres);
    }
    
    animateSpheres();
    
    // Scroll parallax
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        spheres.forEach((sphere, i) => {
            const speed = (i + 1) * 0.1;
            sphere.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

/* ============================================
   FORM EFFECTS - Focus States & Submit
   ============================================ */
function initFormEffects() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (!form) return;
    
    // Input focus effects
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        const wrapper = input.parentElement;
        
        input.addEventListener('focus', () => {
            wrapper.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                wrapper.classList.remove('focused');
            }
        });
        
        // Typing effect - add glow
        input.addEventListener('input', () => {
            if (input.value.length > 0) {
                wrapper.classList.add('has-value');
            } else {
                wrapper.classList.remove('has-value');
            }
        });
    });
    
    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('.submit-btn');
        const btnText = btn.querySelector('.btn-text');
        const originalText = btnText.textContent;
        
        // Loading state
        btn.disabled = true;
        btnText.textContent = 'Sending...';
        btn.style.transform = 'scale(0.98)';
        
        // Simulate sending
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success
        successMessage.classList.add('show');
        
        // Reset form
        form.reset();
        inputs.forEach(input => {
            input.parentElement.classList.remove('focused', 'has-value');
        });
        
        btn.disabled = false;
        btnText.textContent = originalText;
        btn.style.transform = '';
        
        // Auto hide success after delay
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
    });
}

/* ============================================
   CARD EFFECTS - Glow Follow & 3D Tilt
   ============================================ */
function initCardEffects() {
    const cards = document.querySelectorAll('.contact-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Update glow position
            const cardBg = card.querySelector('.card-bg');
            if (cardBg) {
                cardBg.style.background = `
                    radial-gradient(
                        300px circle at ${x}px ${y}px,
                        rgba(99, 102, 241, 0.15),
                        rgba(99, 102, 241, 0.05) 40%,
                        transparent 60%
                    )
                `;
            }
            
            // 3D tilt effect
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateX(10px)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            const cardBg = card.querySelector('.card-bg');
            if (cardBg) {
                cardBg.style.background = 'rgba(99, 102, 241, 0.05)';
            }
        });
    });
}

/* ============================================
   SOCIAL TOOLTIPS - Dynamic Creation
   ============================================ */
function initSocialTooltips() {
    const links = document.querySelectorAll('.social-link');
    
    links.forEach(link => {
        const tooltip = link.dataset.tooltip;
        if (!tooltip) return;
        
        const tooltipEl = document.createElement('span');
        tooltipEl.className = 'tooltip';
        tooltipEl.textContent = tooltip;
        tooltipEl.style.cssText = `
            position: absolute;
            bottom: calc(100% + 10px);
            left: 50%;
            transform: translateX(-50%) translateY(5px);
            padding: 8px 14px;
            background: rgba(15, 15, 25, 0.95);
            border: 1px solid rgba(99, 102, 241, 0.3);
            border-radius: 8px;
            font-size: 0.8rem;
            font-weight: 500;
            color: #fff;
            white-space: nowrap;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            pointer-events: none;
            z-index: 100;
        `;
        
        link.style.position = 'relative';
        link.appendChild(tooltipEl);
        
        link.addEventListener('mouseenter', () => {
            tooltipEl.style.opacity = '1';
            tooltipEl.style.visibility = 'visible';
            tooltipEl.style.transform = 'translateX(-50%) translateY(0)';
        });
        
        link.addEventListener('mouseleave', () => {
            tooltipEl.style.opacity = '0';
            tooltipEl.style.visibility = 'hidden';
            tooltipEl.style.transform = 'translateX(-50%) translateY(5px)';
        });
    });
}

/* ============================================
   SCROLL REVEAL - Staggered Animations
   ============================================ */
function initScrollReveal() {
    const elements = document.querySelectorAll('.contact-card, .social-link, .form-group, .quick-stats, .cta-section');
    
    const observerOptions = {
        root: null,
        rootMargin: '-50px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    elements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.05}s`;
        observer.observe(el);
    });
}

/* ============================================
   STATS COUNTER - Animated Numbers
   ============================================ */
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        root: null,
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.dataset.count);
                animateCounter(target, 0, countTo, 1500);
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * easeOut);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

/* ============================================
   MAGNETIC BUTTON EFFECT
   ============================================ */
const submitBtn = document.querySelector('.submit-btn');
if (submitBtn) {
    submitBtn.addEventListener('mousemove', (e) => {
        const rect = submitBtn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        submitBtn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    
    submitBtn.addEventListener('mouseleave', () => {
        submitBtn.style.transform = '';
    });
}

/* ============================================
   TYPING EFFECT FOR SUBTITLE
   ============================================ */
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    typingText.style.opacity = '1';
    
    let i = 0;
    const typeSpeed = 30;
    
    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, typeSpeed);
        }
    }
    
    // Start typing after hero animation
    setTimeout(typeWriter, 1000);
}

/* ============================================
   FORM INPUT RIPPLE EFFECT
   ============================================ */
const formInputs = document.querySelectorAll('.input-wrapper input, .input-wrapper textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        const wrapper = this.parentElement;
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: input-ripple 0.6s ease-out forwards;
            pointer-events: none;
            z-index: 0;
        `;
        
        // Add keyframes if not exists
        if (!document.querySelector('#input-ripple-style')) {
            const style = document.createElement('style');
            style.id = 'input-ripple-style';
            style.textContent = `
                @keyframes input-ripple {
                    to {
                        width: 400%;
                        height: 400%;
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        wrapper.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});
