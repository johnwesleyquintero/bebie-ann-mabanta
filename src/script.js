// Navigation scroll behavior
let lastScrollTop = 0;
const nav = document.querySelector('.main-nav');
const scrollThreshold = 100; // Minimum scroll before showing/hiding nav

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class when page is scrolled
    if (currentScroll > 50) {
        nav.classList.add('nav-scrolled');
    } else {
        nav.classList.remove('nav-scrolled');
    }

    // Show/hide navigation based on scroll direction
    if (Math.abs(currentScroll - lastScrollTop) <= scrollThreshold) return;

    if (currentScroll > lastScrollTop && currentScroll > nav.offsetHeight) {
        // Scrolling down & past the nav height
        nav.classList.add('nav-hidden');
    } else {
        // Scrolling up
        nav.classList.remove('nav-hidden');
    }

    lastScrollTop = currentScroll;
});

// Smooth scroll for navigation links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navHeight = nav.offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});