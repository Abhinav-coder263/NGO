// ==================== DARK MODE TOGGLE ====================
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const body = document.body;

// Check for saved theme preference or default to 'light'
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
});

// ==================== HAMBURGER MENU ====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    hamburger.classList.toggle('active');
});

// Close menu when link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.style.display = 'none';
        hamburger.classList.remove('active');
    });
});

// ==================== SET ACTIVE NAV LINK ====================
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

setActiveNavLink();

// ==================== COUNTER ANIMATION ====================
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// Intersection Observer for counter animation
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(number => {
                const target = parseInt(number.getAttribute('data-target'));
                if (target && number.textContent === '0') {
                    animateCounter(number, target);
                }
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    observer.observe(statsSection);
}

// ==================== FAQ ACCORDION ====================
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
}

initializeFAQ();

// ==================== CONTACT FORM SUBMISSION ====================
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                subject: formData.get('subject'),
                message: formData.get('message'),
                subscribe: formData.get('subscribe') ? true : false
            };
            
            // Simulate form submission (in real scenario, send to server)
            console.log('Form submitted:', data);
            
            // Show success message
            if (formMessage) {
                formMessage.textContent = '✓ Thank you! We\'ll get back to you soon.';
                formMessage.classList.add('success');
                formMessage.classList.remove('error');
            }
            
            // Reset form
            contactForm.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                if (formMessage) {
                    formMessage.classList.remove('success');
                }
            }, 5000);
        });
    }
}

initializeContactForm();

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== PAGE LOAD ANIMATIONS ====================
window.addEventListener('load', () => {
    // Fade in main content
    const fadeElements = document.querySelectorAll('[class*="fade"], [class*="slide"]');
    fadeElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
});

// ==================== SCROLL ANIMATIONS ====================
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            scrollObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

// Apply scroll observer to all cards
document.querySelectorAll('.program-card, .story-card, .team-member, .value-card, .volunteer-card, .support-method, .faq-item').forEach(card => {
    scrollObserver.observe(card);
});

// ==================== RESPONSIVE NAVBAR ====================
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        navMenu.style.display = 'flex';
        hamburger.classList.remove('active');
    }
});

// ==================== SCROLL POSITION ====================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ==================== COPY TO CLIPBOARD ====================
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard: ' + text);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// ==================== PRINT PAGE ====================
function printPage() {
    window.print();
}

// ==================== MOBILE MENU GESTURE ====================
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swiped left - close menu
            navMenu.style.display = 'none';
        }
    }
}

// ==================== FORM VALIDATION ====================
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateForm(formData) {
    const errors = [];
    
    if (!formData.name.trim()) {
        errors.push('Name is required');
    }
    
    if (!formData.email.trim()) {
        errors.push('Email is required');
    } else if (!validateEmail(formData.email)) {
        errors.push('Please enter a valid email');
    }
    
    if (!formData.subject.trim()) {
        errors.push('Subject is required');
    }
    
    if (!formData.message.trim()) {
        errors.push('Message is required');
    }
    
    return errors;
}

// ==================== LAZY LOADING IMAGES ====================
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ==================== SCROLL TO TOP BUTTON ====================
const scrollTopButton = document.createElement('button');
scrollTopButton.textContent = '↑';
scrollTopButton.className = 'scroll-to-top';
scrollTopButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
`;

document.body.appendChild(scrollTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopButton.style.opacity = '1';
        scrollTopButton.style.pointerEvents = 'auto';
    } else {
        scrollTopButton.style.opacity = '0';
        scrollTopButton.style.pointerEvents = 'none';
    }
});

scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== TYPING ANIMATION ====================
function typeText(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ==================== INITIALIZE ON DOM READY ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('NayePankh Foundation Website Loaded');
    
    // Any additional initialization can go here
});
