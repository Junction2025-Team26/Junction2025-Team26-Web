// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 15, 35, 0.98)';
    } else {
        navbar.style.background = 'rgba(15, 15, 35, 0.95)';
    }
});

// Add hover effects to cards
document.querySelectorAll('.feature-card, .problem-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Button click animations
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.feature-card, .problem-card, .section-header').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn-primary, .btn-secondary {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Image Transition Animation
let currentImageIndex = 0;
let images = ['a', 'b', 'c', 'd'];
const transitionDuration = 2000; // 2 seconds per image

// Check if mobile and adjust images array
function checkMobileAndAdjustImages() {
    if (window.innerWidth <= 768) {
        images = ['a', 'b', 'd']; // Remove 'c' on mobile
    } else {
        images = ['a', 'b', 'c', 'd']; // Include all images on desktop
    }
}

function showImage(imageName) {
    // Remove active class from all images
    document.querySelectorAll('.transition-image').forEach(img => {
        img.classList.remove('active');
    });
    
    // Add active class to target image
    document.querySelector(`[data-image="${imageName}"]`).classList.add('active');
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    showImage(images[currentImageIndex]);
}

function startImageTransition() {
    // Auto-advance images
    setInterval(nextImage, transitionDuration);
}

// Start the image transition when page loads
document.addEventListener('DOMContentLoaded', function() {
    checkMobileAndAdjustImages();
    startImageTransition();
});

// Adjust images on window resize
window.addEventListener('resize', function() {
    checkMobileAndAdjustImages();
});

// Console welcome message
console.log(`
🚀 Welcome to SyncTank!
Drop anything. Get synced.

Made with ❤️ for Junction 2025 Team 26
`);
