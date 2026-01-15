/**
 * PONGAL FESTIVAL GREETING - JavaScript
 * Animations, interactions, and effects
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    initScrollAnimations();
    initMusicToggle();
    initSmoothScroll();
});

/**
 * Create floating festive particles
 */
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const colors = ['#FFD700', '#FF9933', '#228B22', '#FFC107', '#32CD32'];
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer, colors);
    }
}

function createParticle(container, colors) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 8 + 4;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = Math.random() * 10 + 15;
    
    particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        left: ${left}%;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
        opacity: ${Math.random() * 0.5 + 0.3};
    `;
    
    container.appendChild(particle);
}

/**
 * Initialize scroll-triggered animations
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add stagger effect to children if they have delay classes
                const children = entry.target.querySelectorAll('.slide-up');
                children.forEach(function(child, index) {
                    setTimeout(function() {
                        child.classList.add('visible');
                    }, index * 150);
                });
            }
        });
    }, observerOptions);

    // Observe all elements with slide-up class
    const slideElements = document.querySelectorAll('.slide-up');
    slideElements.forEach(function(el) {
        observer.observe(el);
    });
}

/**
 * Music toggle functionality
 */
function initMusicToggle() {
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const musicIcon = musicToggle.querySelector('.music-icon');
    let isPlaying = false;

    musicToggle.addEventListener('click', function() {
        if (isPlaying) {
            bgMusic.pause();
            musicIcon.textContent = '🔇';
            musicToggle.classList.remove('playing');
        } else {
            bgMusic.play().catch(function(error) {
                console.log('Audio playback failed:', error);
            });
            musicIcon.textContent = '🔊';
            musicToggle.classList.add('playing');
        }
        isPlaying = !isPlaying;
    });

    // Set initial volume
    bgMusic.volume = 0.3;
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Add parallax effect to hero section
 */
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const sunRays = document.querySelector('.sun-rays');
    
    if (hero && scrolled < window.innerHeight) {
        // Parallax for sun rays
        if (sunRays) {
            sunRays.style.transform = `translateX(-50%) translateY(${scrolled * 0.3}px)`;
        }
        
        // Fade hero content on scroll
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
            heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    }
});

/**
 * Add hover effects to wish cards
 */
document.querySelectorAll('.wish-card').forEach(function(card) {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

/**
 * Create ripple effect on click
 */
document.querySelectorAll('.about-card, .wish-card').forEach(function(card) {
    card.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 215, 0, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(function() {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation to stylesheet
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/**
 * Console greeting
 */
console.log('%c🌞 Happy Pongal! 🌞', 'font-size: 24px; color: #FFD700; font-weight: bold;');
console.log('%cMay this harvest festival bring you joy and prosperity!', 'font-size: 14px; color: #FF9933;');
