/* ============================================
   SKILLS PAGE JAVASCRIPT
   Bento Dashboard + Glowing Cards
   ============================================ */

// Glowing Card Effect (Used for Certifications)
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

// Interactive Bento Dashboard
class BentoDashboard {
    constructor() {
        this.buttons = document.querySelectorAll('.cat-btn');
        this.grids = document.querySelectorAll('.bento-grid');
        this.init();
    }

    init() {
        if (!this.buttons.length || !this.grids.length) return;

        this.buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                this.buttons.forEach(b => b.classList.remove('active'));
                this.grids.forEach(g => g.classList.remove('active'));

                // Add active class to clicked button
                btn.classList.add('active');

                // Show corresponding grid
                const targetId = btn.getAttribute('data-target');
                const targetGrid = document.getElementById(targetId);
                if (targetGrid) {
                    targetGrid.classList.add('active');
                }
            });
        });
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    new GlowingCards();
    new BentoDashboard();
});
