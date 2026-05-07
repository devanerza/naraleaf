// Wait for DOM to be fully loaded
// Carousel functionality
function initCarousel() {
    const carousel = document.querySelector('.leaves-carousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.dot');
    const prevBtn = carousel.querySelector('.prev-btn');
    const nextBtn = carousel.querySelector('.next-btn');
    
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 5000; // 5 seconds per slide
    let isPaused = false;

    // Show current slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide and update dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

        function startSlideShow() {
        // Clear any existing interval to prevent multiple intervals running
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        
        // Start the interval
        slideInterval = setInterval(() => {
            if (!isPaused) {
                nextSlide();
            }
        }, slideDuration);
        
        // Auto-start the slideshow
        isPaused = false;
    }

    // Pause on hover
    function pauseSlideShow() {
        isPaused = true;
        clearInterval(slideInterval);
    }

    function resumeSlideShow() {
        if (isPaused) {
            isPaused = false;
            startSlideShow();
        }
    }

    // Event listeners for pausing/resuming
    carousel.addEventListener('mouseenter', pauseSlideShow);
    carousel.addEventListener('mouseleave', resumeSlideShow);
    
    // Pause when window loses focus
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            pauseSlideShow();
        } else {
            resumeSlideShow();
        }
    });
    
    // Touch events for mobile
    carousel.addEventListener('touchstart', pauseSlideShow);
    carousel.addEventListener('touchend', () => {
        // Small delay before resuming to allow for touch interactions
        setTimeout(resumeSlideShow, 3000);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        if (touchEndX < touchStartX) nextSlide();
        if (touchEndX > touchStartX) prevSlide();
    }

    // Initialize
    showSlide(currentSlide);
    startSlideShow();
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the carousel
    initCarousel();
    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navContainer = document.querySelector('nav .container');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navContainer.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });

        // Close menu when clicking on a nav link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });
    }


    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
                
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('nav');
        const scrollThreshold = window.innerWidth <= 768 ? 50 : 170;
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

// Stats Counting Animation
const stats = document.querySelectorAll('.stat-number');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            stats.forEach(stat => {
                const target = parseFloat(stat.getAttribute('data-target'));
                let current = 0;
                const increment = target / 100;
                
                const updateCount = () => {
                    current += increment;
                    if (current < target) {
                        // Use toFixed(0) for whole numbers, toFixed(1) for decimal
                        stat.textContent = (target === 99.9) ? current.toFixed(1) : Math.floor(current);
                        requestAnimationFrame(updateCount);
                    } else {
                        // Final display - use toFixed(0) for whole numbers, toFixed(1) for decimal
                        stat.textContent = (target === 99.9) ? target.toFixed(1) : Math.floor(target);
                        
                        // Add percentage or plus sign based on the target value
                        if (target === 40) {
                            stat.textContent += '+';
                        }
                    }
                };
                
                updateCount();
            });
            
            // Disconnect observer after animation
            observer.disconnect();
        }
    });
}, {
    threshold: 0.5
});

// Observe each stat number
stats.forEach(stat => observer.observe(stat));

// Contact Form Handling
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }

        const phoneNumber = '6285138532793';
        const whatsappMessage = `Hello NaraLeaf,\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`;
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
    });
}

initContactForm();