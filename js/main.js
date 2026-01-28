// =============================================
// MOBILE MENU
// =============================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) hamburger.classList.remove('active');
        if (navLinks) navLinks.classList.remove('active');
    });
});

// =============================================
// HEADER SCROLL EFFECT
// =============================================
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (header) {
        if (window.pageYOffset > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
            header.style.padding = '12px 0';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            header.style.padding = '16px 0';
        }
    }
});

// =============================================
// SMOOTH SCROLL
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target && header) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// =============================================
// TESTIMONIAL SLIDER
// =============================================
const testimonials = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.slider-dot');
let currentSlide = 0;

function showSlide(index) {
    testimonials.forEach((t, i) => {
        t.classList.remove('active');
        if (dots[i]) dots[i].classList.remove('active');
    });
    
    if (testimonials[index]) {
        testimonials[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonials.length;
    showSlide(currentSlide);
}

if (testimonials.length > 0) {
    showSlide(0);
    setInterval(nextSlide, 5000);
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// =============================================
// GALLERY LIGHTBOX
// =============================================
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (!img) return;
        
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <img src="${img.src}" alt="">
            <span class="lightbox-close">&times;</span>
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
                document.body.removeChild(lightbox);
                document.body.style.overflow = '';
            }
        });
        
        // ESC key to close
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                if (document.body.contains(lightbox)) {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = '';
                }
                document.removeEventListener('keydown', escHandler);
            }
        });
    });
});

// =============================================
// CONTACT FORM - VIBER REDIRECT
// =============================================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('#name').value;
        const phone = this.querySelector('#phone').value;
        const email = this.querySelector('#email')?.value || '';
        const message = this.querySelector('#message').value;
        
        // Get Viber number from float button
        const viberFloat = document.querySelector('.viber-float');
        let viberNumber = '%2B381632378822';
        if (viberFloat) {
            const match = viberFloat.href.match(/number=(.+)/);
            if (match) viberNumber = match[1];
        }
        
        // Create message
        const viberMessage = encodeURIComponent(
            `Poruka sa sajta Univerzal:\n\nIme: ${name}\nTelefon: ${phone}${email ? '\nEmail: ' + email : ''}\n\nPoruka:\n${message}`
        );
        
        // Open Viber
        window.open(`viber://chat?number=${viberNumber}&text=${viberMessage}`, '_blank');
        
        // Reset form
        this.reset();
        
        // Show success
        alert('Hvala na poruci! Otvara se Viber za slanje.');
    });
}

// =============================================
// SCROLL ANIMATIONS
// =============================================
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => fadeObserver.observe(el));

// =============================================
// CURRENT YEAR IN FOOTER
// =============================================
const yearSpan = document.querySelector('.current-year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// =============================================
// ACTIVE NAV LINK
// =============================================
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// =============================================
// LAZY LOAD IMAGES
// =============================================
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));
