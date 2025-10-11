// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeComponents();
});

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeComponents();
});

// Initialize all components
function initializeComponents() {
    setupNavigation();
    setupSmoothScrolling();
    setupScrollEffects();
    setupTypingAnimation();
    setupSkillBars();
    setupCursor();
    setupParallax();
    setupFormHandling();
    setupAnimations();
    setupProjectsCarousel();
    setupTechStackScroll();
}

// Navigation functionality
function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const navbar = document.querySelector('.navbar');

    // Hamburger menu toggle
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', toggleMobileMenu);

        // Close menu when clicking on links
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    // Navbar scroll effect
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Active nav link highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (!hamburger || !mobileMenu) return;

    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');

    // Prevent body scroll when menu is open
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (!hamburger || !mobileMenu) return;

    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    closeMobileMenu();
                }
            }
        });
    });

    // Wire buttons with data-scroll attribute (hero buttons)
    document.querySelectorAll('[data-scroll]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const targetId = this.getAttribute('data-scroll');
            if (!targetId) return;
            const target = document.getElementById(targetId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                if (window.innerWidth <= 768) closeMobileMenu();
                // If scrolling to contact, focus the form's first input after the scroll
                if (targetId === 'contact') {
                    setTimeout(() => {
                        const formFirst = document.querySelector('#contact-form input, #contact-form textarea');
                        if (formFirst) formFirst.focus({ preventScroll: true });
                    }, 700);
                }
            }
        });

        // keyboard accessibility (Enter/Space)
        btn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Scroll effects and animations
function setupScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Trigger skill bar animations when skills section is visible
                if (entry.target.closest('.skills')) {
                    animateSkillBars();
                }

                // Trigger counters when stats container is visible
                if (entry.target.closest('.stats-grid') || entry.target.classList.contains('stat-item')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.animate-on-scroll, .skill-category, .timeline-item, .stat-item, .stats-grid').forEach(element => {
        observer.observe(element);
    });
}

// Animate numeric counters in About section
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count') || '0', 10);
        if (!target) return;
        if (counter.dataset.animated) return; // already animated
        counter.dataset.animated = 'true';

        const duration = 1200;
        let start = 0;
        const stepTime = Math.max(Math.floor(duration / target), 20);

        const interval = setInterval(() => {
            start += 1;
            counter.textContent = start;
            if (start >= target) clearInterval(interval);
        }, stepTime);
    });
}

// Typing animation
function setupTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const texts = [
        'PR and Sponsorship Head, ACM-W',
        'Problem Solver',
        'Tech Enthusiast',
        'Creative Thinker'
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeWriter() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, Math.max(0, charIndex - 1));
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex >= currentText.length) {
            setTimeout(() => {
                isDeleting = true;
            }, 1600);
        } else if (isDeleting && charIndex <= 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }

        setTimeout(typeWriter, typingSpeed);
    }

    // Start typing animation after a delay
    setTimeout(typeWriter, 800);
}

// Skill bars animation
function setupSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const percentage = bar.getAttribute('data-width') || '90';
        // normalize to include % if the attribute is numeric
        const normalized = percentage.toString().endsWith('%') ? percentage : percentage + '%';
        bar.style.width = '0%';
        bar.setAttribute('data-width', normalized);
    });
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const targetWidth = bar.getAttribute('data-width') || '80%';
            bar.style.width = targetWidth;
        }, index * 200);
    });
}

// Custom cursor
function setupCursor() {
    // Respect users who prefer reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    if (window.innerWidth > 768) {
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');

        if (cursor && cursorFollower) {
            let mouseX = 0;
            let mouseY = 0;
            let followerX = 0;
            let followerY = 0;

            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;

                cursor.style.left = mouseX + 'px';
                cursor.style.top = mouseY + 'px';
                cursor.classList.add('visible');
                cursorFollower.classList.add('visible');
            });

            // Smooth follower animation
            function animateFollower() {
                followerX += (mouseX - followerX) * 0.12;
                followerY += (mouseY - followerY) * 0.12;

                cursorFollower.style.left = followerX + 'px';
                cursorFollower.style.top = followerY + 'px';

                requestAnimationFrame(animateFollower);
            }
            animateFollower();

            // Cursor hover effects
            const hoverElements = document.querySelectorAll('a, button, .btn-primary, .btn-secondary');
            hoverElements.forEach(element => {
                element.addEventListener('mouseenter', () => {
                    cursor.style.transform = 'scale(1.5)';
                    cursorFollower.style.transform = 'scale(0.8)';
                });

                element.addEventListener('mouseleave', () => {
                    cursor.style.transform = 'scale(1)';
                    cursorFollower.style.transform = 'scale(1)';
                });
            });

            document.addEventListener('mouseleave', () => {
                cursor.classList.remove('visible');
                cursorFollower.classList.remove('visible');
            });
        }
    }
}

// Parallax effects
function setupParallax() {
    // Do minimal parallax and respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        // Floating shapes parallax
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.05;
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });

        // Hero parallax
        const hero = document.querySelector('.hero');
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * -0.15}px)`;
        }
    });
}

// Form handling
function setupFormHandling() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Honeypot anti-spam: if filled, silently ignore
        const honeypot = form.querySelector('[name="website"]');
        if (honeypot && honeypot.value) {
            // pretend success to bots
            const status = document.getElementById('form-status');
            if (status) status.textContent = 'Message sent successfully.';
            form.reset();
            return;
        }

        const submitBtn = form.querySelector('.btn-primary');
        const originalText = submitBtn.querySelector('.btn-text') ? submitBtn.querySelector('.btn-text').textContent : submitBtn.textContent;

        // Show loading state
        if (submitBtn.querySelector('.btn-text')) submitBtn.querySelector('.btn-text').textContent = 'Sending...';
        submitBtn.disabled = true;

        // Attempt to send via EmailJS if available
        try {
            if (window.emailjs) {
                await emailjs.sendForm('service_0m899ue', 'template_wq15yq9', form);
            } else {
                // Fallback simulation
                await new Promise(resolve => setTimeout(resolve, 900));
            }

            // Success feedback
            if (submitBtn.querySelector('.btn-text')) submitBtn.querySelector('.btn-text').textContent = 'Message Sent!';
            submitBtn.style.background = '#28a745';

            // Announce to screen readers
            const status = document.getElementById('form-status');
            if (status) status.textContent = 'Message sent successfully.';

            // Reset form
            form.reset();

            setTimeout(() => {
                if (submitBtn.querySelector('.btn-text')) submitBtn.querySelector('.btn-text').textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                if (status) status.textContent = '';
            }, 3000);

        } catch (error) {
            // Error feedback
            if (submitBtn.querySelector('.btn-text')) submitBtn.querySelector('.btn-text').textContent = 'Error - Try Again';
            submitBtn.style.background = '#dc3545';
            const status = document.getElementById('form-status');
            if (status) status.textContent = 'There was an error sending the message.';

            setTimeout(() => {
                if (submitBtn.querySelector('.btn-text')) submitBtn.querySelector('.btn-text').textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                if (status) status.textContent = '';
            }, 3000);
        }
    });

    // Form validation and styling
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}

// Additional animations
function setupAnimations() {
    // Social link click animation
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', function(e) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Button ripple effect
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Scroll progress indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    scrollProgress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--gradient);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(scrollProgress);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
const debouncedResize = debounce(() => {
    // Recalculate layouts on resize
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
}, 250);

window.addEventListener('resize', debouncedResize);

// Add ripple effect styles
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
}

@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;
document.head.appendChild(rippleStyles);

// Initialize EmailJS if available (public key placeholder)
(function () {
  if (window.emailjs) {
    try {
      emailjs.init('Ab5GprGyGoeN6uTxO'); // Replace with your public key
    } catch (e) {
      // ignore
    }
  }
})();

// Attach a minimal EmailJS handler if the library exists
const contactForm = document.getElementById('contact-form');
if (contactForm && window.emailjs) {
  contactForm.addEventListener('submit', function (e) {
    // EmailJS handling is already covered inside setupFormHandling with sendForm
  });
}

// Projects Carousel Navigation
function setupProjectsCarousel() {
  const prevBtn = document.querySelector('.carousel-btn-prev');
  const nextBtn = document.querySelector('.carousel-btn-next');
  const projectsGrid = document.querySelector('.projects-grid');

  if (!prevBtn || !nextBtn || !projectsGrid) return;

  const scrollAmount = 400; // card width + gap (380 + 20)

  prevBtn.addEventListener('click', () => {
    projectsGrid.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  });

  nextBtn.addEventListener('click', () => {
    projectsGrid.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });

  // Update button states based on scroll position
  function updateButtonStates() {
    const scrollLeft = projectsGrid.scrollLeft;
    const maxScroll = projectsGrid.scrollWidth - projectsGrid.clientWidth;

    prevBtn.disabled = scrollLeft <= 0;
    nextBtn.disabled = scrollLeft >= maxScroll - 1;
  }

  projectsGrid.addEventListener('scroll', updateButtonStates);
  updateButtonStates(); // Initial state
}

// Tech Stack Horizontal Scroll
function setupTechStackScroll() {
  const techCategories = document.querySelector('.tech-categories');
  const leftBtn = document.querySelector('.tech-scroll-left');
  const rightBtn = document.querySelector('.tech-scroll-right');

  if (!techCategories || !leftBtn || !rightBtn) return;

  const scrollAmount = 280; // Scroll by one card width approximately

  leftBtn.addEventListener('click', () => {
    techCategories.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  });

  rightBtn.addEventListener('click', () => {
    techCategories.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });

  // Update button states based on scroll position
  function updateButtonStates() {
    const scrollLeft = techCategories.scrollLeft;
    const maxScroll = techCategories.scrollWidth - techCategories.clientWidth;

    leftBtn.disabled = scrollLeft <= 0;
    rightBtn.disabled = scrollLeft >= maxScroll - 1;
  }

  techCategories.addEventListener('scroll', updateButtonStates);
  window.addEventListener('resize', updateButtonStates);
  updateButtonStates(); // Initial state

  // Optional: Auto-hide buttons if all cards fit on screen
  const checkOverflow = () => {
    const hasOverflow = techCategories.scrollWidth > techCategories.clientWidth;
    leftBtn.style.display = hasOverflow ? 'flex' : 'none';
    rightBtn.style.display = hasOverflow ? 'flex' : 'none';
  };

  window.addEventListener('resize', checkOverflow);
  checkOverflow();
}


