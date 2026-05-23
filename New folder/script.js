/*
   Gwinnett Fellowship - Interactive Logic (script.js)
   Handles header transitions, mobile navigation drawer, interactive map/locator,
   testimonials slider, scroll-reveal animations, and contact form enhancements.
*/

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. STICKY HEADER & ACTIVE NAVIGATION LINK ---
  const header = document.getElementById('main-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  const handleScroll = () => {
    // Toggle sticky class
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Dynamic active state in navbar based on scroll position
    let currentSectionId = '';
    sections.forEach(sec => {
      const secTop = sec.offsetTop - 120;
      const secHeight = sec.offsetHeight;
      if (window.scrollY >= secTop && window.scrollY < secTop + secHeight) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial invocation on page load


  // --- 2. MOBILE MENU DRAWER TOGGLE & LOCK SCROLL ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenuBar = document.getElementById('nav-menu-bar');

  const toggleMobileMenu = () => {
    mobileMenuBtn.classList.toggle('open');
    navMenuBar.classList.toggle('open');
    // Lock or unlock body scroll for premium UX
    if (navMenuBar.classList.contains('open')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  mobileMenuBtn.addEventListener('click', toggleMobileMenu);

  // Close mobile drawer when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenuBar.classList.contains('open')) {
        toggleMobileMenu();
      }
    });
  });


  // --- 3. INTERACTIVE GATHERINGS LOCATOR ---
  const tabButtons = document.querySelectorAll('.tab-btn');
  const gatheringPanes = document.querySelectorAll('.gathering-pane');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      // Update active button state
      tabButtons.forEach(t => t.classList.remove('active'));
      btn.classList.add('active');

      // Update active pane with a smooth fade in
      gatheringPanes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.getAttribute('id') === `pane-${targetId}`) {
          pane.classList.add('active');
        }
      });
    });
  });


  // --- 4. "CONTACT HOST" SHORTCUT & FORM FIELD AUTO-FILL ---
  const contactHostButtons = document.querySelectorAll('.contact-host-btn');
  const formGatheringSelect = document.getElementById('form-gathering');

  contactHostButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const hostDetail = btn.getAttribute('data-host');
      const targetId = btn.getAttribute('href');

      // Auto-select dropdown in form
      if (hostDetail.toLowerCase().includes('suwanee')) {
        formGatheringSelect.value = 'suwanee';
      } else if (hostDetail.toLowerCase().includes('lawrenceville')) {
        formGatheringSelect.value = 'lawrenceville';
      } else if (hostDetail.toLowerCase().includes('duluth')) {
        formGatheringSelect.value = 'duluth';
      } else if (hostDetail.toLowerCase().includes('buford')) {
        formGatheringSelect.value = 'buford';
      }

      // Smooth scroll to contact form section
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });


  // --- 5. AUTOMATED TESTIMONIALS SLIDER ---
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const carouselDots = document.querySelectorAll('.carousel-dot');
  let currentSlideIndex = 0;
  let testimonialTimer = null;

  const showSlide = (index) => {
    testimonialSlides.forEach((slide, idx) => {
      slide.classList.remove('active');
      carouselDots[idx].classList.remove('active');
    });

    testimonialSlides[index].classList.add('active');
    carouselDots[index].classList.add('active');
    currentSlideIndex = index;
  };

  const nextTestimonial = () => {
    let nextIndex = currentSlideIndex + 1;
    if (nextIndex >= testimonialSlides.length) {
      nextIndex = 0;
    }
    showSlide(nextIndex);
  };

  const startTestimonialTimer = () => {
    testimonialTimer = setInterval(nextTestimonial, 6000); // Shift every 6 seconds
  };

  const stopTestimonialTimer = () => {
    if (testimonialTimer) {
      clearInterval(testimonialTimer);
    }
  };

  // Dots clicking navigation
  carouselDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetIndex = parseInt(dot.getAttribute('data-index'), 10);
      showSlide(targetIndex);
      // Reset timer so it stays on the chosen slide for full duration
      stopTestimonialTimer();
      startTestimonialTimer();
    });
  });

  // Pause carousel on hover
  const carouselContainer = document.getElementById('testimonies-carousel');
  carouselContainer.addEventListener('mouseenter', stopTestimonialTimer);
  carouselContainer.addEventListener('mouseleave', startTestimonialTimer);
  carouselContainer.addEventListener('touchstart', stopTestimonialTimer, { passive: true });
  carouselContainer.addEventListener('touchend', startTestimonialTimer, { passive: true });

  // Initialize
  startTestimonialTimer();


  // --- 6. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER) ---
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Once animated, no need to watch again
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.15, // Trigger when 15% of element is visible
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  } else {
    // Fallback if browser doesn't support IntersectionObserver
    revealElements.forEach(el => el.classList.add('active'));
  }


  // --- 7. VISIT INTEREST FORM SUBMISSION ---
  const visitForm = document.getElementById('visit-interest-form');
  const formSubmitBtn = document.getElementById('form-submit-btn-el');

  visitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Animate button during "sending" state
    const originalText = formSubmitBtn.innerHTML;
    formSubmitBtn.disabled = true;
    formSubmitBtn.innerHTML = 'Connecting...';

    setTimeout(() => {
      // Restore state and show success alert
      formSubmitBtn.disabled = false;
      formSubmitBtn.innerHTML = originalText;

      const userName = document.getElementById('form-name').value;
      const selectElement = document.getElementById('form-gathering');
      const selectedGatheringText = selectElement.options[selectElement.selectedIndex].text;

      // Premium visual notification modal / popup
      const notification = document.createElement('div');
      notification.style.position = 'fixed';
      notification.style.bottom = '24px';
      notification.style.right = '24px';
      notification.style.backgroundColor = 'var(--color-olive)';
      notification.style.color = 'var(--color-white)';
      notification.style.padding = '20px 32px';
      notification.style.borderRadius = 'var(--border-radius-md)';
      notification.style.boxShadow = 'var(--shadow-lg)';
      notification.style.zIndex = '2000';
      notification.style.animation = 'fade-in 0.4s ease forwards';
      notification.style.borderLeft = '6px solid var(--color-gold)';
      notification.style.maxWidth = '400px';

      notification.innerHTML = `
        <h4 style="color: var(--color-white); font-family: var(--font-sans); margin-bottom: 6px; font-weight: 800;">Message Sent!</h4>
        <p style="color: rgba(255,255,255,0.9); font-size: 0.95rem; line-height: 1.4;">
          Thank you, ${userName}! We've received your interest in our <strong>${selectedGatheringText}</strong>. Vince or one of the home hosts will reach out to you shortly.
        </p>
      `;

      document.body.appendChild(notification);
      visitForm.reset();

      // Dismiss notification after 7 seconds
      setTimeout(() => {
        notification.style.animation = 'fade-in 0.4s ease reverse forwards';
        setTimeout(() => {
          notification.remove();
        }, 400);
      }, 7000);

    }, 1500); // 1.5s simulated network request
  });

});
