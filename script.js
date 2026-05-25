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
document.addEventListener('DOMContentLoaded', function () {
    // Initialize the carousel
    initCarousel();
    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navContainer = document.querySelector('nav .container');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function (e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
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
        anchor.addEventListener('click', function (e) {
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
    window.addEventListener('scroll', function () {
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
    const formTitle = document.getElementById('contactFormTitle');
    const successCard = document.getElementById('successCard');
    const submittedName = document.getElementById('submittedName');
    const btnSendAnother = document.getElementById('btnSendAnother');

    if (!form) return;

    const submitBtn = form.querySelector('.btn-submit');
    const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const message = messageInput ? messageInput.value.trim() : '';

        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }

        // Set Loading State
        if (submitBtn) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
        }
        if (btnText) {
            btnText.textContent = "Sending...";
        }

        const formData = new FormData(form);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (response.ok || data.success) {
                // Set submitted name in success message
                if (submittedName) {
                    submittedName.textContent = name;
                }

                // Smoothly fade/collapse form and title
                if (formTitle) {
                    formTitle.classList.remove('fade-in');
                    formTitle.classList.add('hide');
                }
                form.classList.remove('fade-in');
                form.classList.add('hide');

                setTimeout(() => {
                    form.style.display = 'none';
                    if (formTitle) formTitle.style.display = 'none';

                    // Show success card
                    if (successCard) {
                        successCard.style.display = 'flex';
                        successCard.classList.add('show');
                        
                        // Scroll to the contact section so success card is fully visible
                        const contactSection = document.getElementById('contact-form');
                        if (contactSection) {
                            window.scrollTo({
                                top: contactSection.offsetTop - 80,
                                behavior: 'smooth'
                            });
                        }
                    }
                }, 450);

                form.reset();
            } else {
                alert("Error: " + (data.message || "Failed to submit. Please try again."));
                resetLoadingState();
            }

        } catch (error) {
            alert("Something went wrong. Please check your network connection and try again.");
            resetLoadingState();
        }
    });

    function resetLoadingState() {
        if (submitBtn) {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
        if (btnText) {
            btnText.textContent = "Send Message";
        }
    }

    if (btnSendAnother) {
        btnSendAnother.addEventListener('click', () => {
            if (successCard) {
                successCard.classList.remove('show');
                successCard.style.display = 'none';
            }

            // Bring back the form and form title with fade-in animation
            if (formTitle) {
                formTitle.style.display = 'block';
                formTitle.classList.remove('hide');
                formTitle.classList.add('fade-in');
            }
            if (form) {
                form.style.display = 'flex';
                form.classList.remove('hide');
                form.classList.add('fade-in');
            }
            
            // Focus on name input
            const nameInput = document.getElementById('name');
            if (nameInput) {
                nameInput.focus();
            }

            resetLoadingState();
        });
    }
}

initContactForm();