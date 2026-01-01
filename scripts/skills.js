/* ============================================
   SKILLS PAGE JAVASCRIPT
   3D Orbit + Glowing Cards Effects
   ============================================ */

// Skill Bar Animation
class SkillBarAnimation {
    constructor() {
        this.bars = document.querySelectorAll('.skill-bar-fill');
        if (!this.bars.length) return;
        
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.dataset.width;
                    bar.style.setProperty('--target-width', width + '%');
                    bar.classList.add('animated');
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });
        
        this.bars.forEach(bar => observer.observe(bar));
    }
}

// Glowing Card Effect
class GlowingCards {
    constructor() {
        this.cards = document.querySelectorAll('.glow-card');
        this.init();
    }
    
    init() {
        this.cards.forEach(card => {
            const glowColor = card.dataset.glowColor || '99, 102, 241';
            card.style.setProperty('--glow-color', glowColor);
            
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Create glow following mouse
                const glow = card.querySelector('.card-glow');
                if (glow) {
                    glow.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(${glowColor}, 0.15), transparent 40%)`;
                }
                
                // 3D tilt effect
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 30;
                const rotateY = (centerX - x) / 30;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
                const glow = card.querySelector('.card-glow');
                if (glow) {
                    glow.style.background = '';
                }
            });
        });
    }
}

// Sphere Parallax on Mouse Move
class SphereParallax {
    constructor() {
        this.spheres = document.querySelectorAll('.sphere');
        if (!this.spheres.length) return;
        
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            
            this.spheres.forEach((sphere, i) => {
                const speed = (i + 1) * 15;
                const offsetX = x * speed;
                const offsetY = y * speed;
                
                sphere.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            });
        });
    }
}

// Orbit Interaction
class OrbitInteraction {
    constructor() {
        this.orbitItems = document.querySelectorAll('.orbit-item');
        this.init();
    }
    
    init() {
        this.orbitItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                // Pause orbit rotation
                const orbit = item.closest('.orbit');
                if (orbit) {
                    orbit.style.animationPlayState = 'paused';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                // Resume orbit rotation
                const orbit = item.closest('.orbit');
                if (orbit) {
                    orbit.style.animationPlayState = 'running';
                }
            });
        });
    }
}

// Skill Tag Hover Effect
class SkillTagEffect {
    constructor() {
        this.tags = document.querySelectorAll('.skill-tag');
        this.init();
    }
    
    init() {
        this.tags.forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                // Create ripple effect
                const ripple = document.createElement('span');
                ripple.className = 'tag-ripple';
                tag.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }
}

// Grid Background Interaction
class GridInteraction {
    constructor() {
        this.gridGlow = document.querySelector('.grid-glow');
        if (!this.gridGlow) return;
        
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            
            this.gridGlow.style.left = x + 'px';
            this.gridGlow.style.top = y + 'px';
            this.gridGlow.style.transform = 'translate(-50%, -50%)';
        });
    }
}

// Counter Animation for Stats
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('[data-count]');
        if (!this.counters.length) return;
        
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        this.counters.forEach(counter => observer.observe(counter));
    }
    
    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const startTime = performance.now();
        
        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * target);
            
            element.textContent = current + '%';
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };
        
        requestAnimationFrame(update);
    }
}

// Stagger Reveal for Cards
class StaggerReveal {
    constructor() {
        this.cards = document.querySelectorAll('.skill-card');
        if (!this.cards.length) return;
        
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const cardIndex = Array.from(this.cards).indexOf(entry.target);
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, cardIndex * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        this.cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            observer.observe(card);
        });
    }
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    new SkillBarAnimation();
    new GlowingCards();
    new SphereParallax();
    new OrbitInteraction();
    new SkillTagEffect();
    new GridInteraction();
    new CounterAnimation();
    new StaggerReveal();
});
