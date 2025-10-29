document.addEventListener("DOMContentLoaded", function () {
    // Custom smooth scrolling implementation
    function smoothScrollTo(target, duration = 1000, offset = 0) {
      const navbar = document.querySelector('.navbar');
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      const targetPosition = target.offsetTop - navbarHeight - offset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      let startTime = null;

      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      }

      function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      }

      requestAnimationFrame(animation);
    }

    // Auto typing text
    var typed = new Typed(".auto-type", {
      strings: [ "DevOps Engineer", "Cloud Engineer", "CI/CD Engineer"],
      typeSpeed: 180,
      backSpeed: 100,
      loop: true
    });
  
    // Sections and nav links for scrolling
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");
  
    // Scroll to top and active link logic
    let calcScrollValue = () => {
      let scrollProgress = document.getElementById("progress");
      if (!scrollProgress) return; // Check if element exists
  
      let pos = document.documentElement.scrollTop;
      let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      let scrollValue = Math.round((pos * 100) / calcHeight);
  
      // Display scroll progress if scrolled more than 100px
      if (pos > 100) {
        scrollProgress.style.display = "grid";
      } else {
        scrollProgress.style.display = "none";
      }
  
      // Scroll to top when progress bar is clicked
      scrollProgress.addEventListener("click", () => {
        document.documentElement.scrollTop = 0;
      });
  
      // Update scroll progress ring
      scrollProgress.style.setProperty('--progress', `${scrollValue}%`);
      const beforeElement = scrollProgress;
      if (beforeElement) {
        beforeElement.style.setProperty('--progress-angle', `${(scrollValue / 100) * 360}deg`);
      }
  
      // Active link based on scroll position
      sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
  
        if (top >= offset && top < offset + height) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            let activeLink = document.querySelector('header nav a[href*=' + id + ']');
            if (activeLink) activeLink.classList.add('active');
          });
        }
      });
    };
  
    // Execute calcScrollValue on scroll and load
    window.onscroll = calcScrollValue;
    window.onload = calcScrollValue;
  
    // Filter Buttons Logic
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workCards = document.querySelectorAll('.work-card');
    if (filterButtons.length > 0) {
      filterButtons.forEach(button => {
        button.addEventListener('click', function () {
          filterButtons.forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');
  
          const filter = this.getAttribute('data-filter');
          workCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
              card.style.display = 'block';
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    }
  
    // Smooth Scroll to About Section
    const aboutLink = document.getElementById('about-link');
    const aboutSection = document.getElementById('about-section');
    if (aboutLink && aboutSection) {
      aboutLink.addEventListener('click', function (event) {
        event.preventDefault();
        aboutSection.scrollIntoView({
          behavior: 'smooth'
        });
      });
    }
  
    // Popup Logic for "Download CV"
    const popup = document.getElementById('popup');
    const showPopupBtn = document.getElementById('showPopupBtn');
    const closeBtn = document.querySelector('.close-btn');
  
    if (popup && showPopupBtn && closeBtn) {
      showPopupBtn.addEventListener('click', function (event) {
        event.preventDefault();
        popup.style.display = 'flex';
      });
  
      closeBtn.addEventListener('click', function () {
        popup.style.display = 'none';
      });
  
      window.addEventListener('click', function (event) {
        if (event.target === popup) {
          popup.style.display = 'none';
        }
      });
    }
  
    // Modal Logic for multiple modals
    const setupModal = (modalId, triggerId, closeId) => {
      const modal = document.getElementById(modalId);
      const openModal = document.getElementById(triggerId);
      const closeModal = document.getElementById(closeId);
  
      if (modal && openModal && closeModal) {
        openModal.addEventListener("click", () => {
          modal.style.display = "flex";
        });
  
        closeModal.addEventListener("click", () => {
          modal.style.display = "none";
        });
  
        window.addEventListener("click", (event) => {
          if (event.target === modal) {
            modal.style.display = "none";
          }
        });
      }
    };
  
    // Setup all modals
    setupModal("popup-modal-1", "trigger-popup-1", "close-modal-1");
    setupModal("popup-modal-2", "trigger-popup-2", "close-modal-2");
    setupModal("popup-modal-3", "trigger-popup-3", "close-modal-3");
    setupModal("popup-modal-4", "trigger-popup-4", "close-modal-4");
    setupModal("popup-modal-5", "trigger-popup-5", "close-modal-5");
    setupModal("popup-modal-6", "trigger-popup-6", "close-modal-6");
  
    // EmailJS form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way
  
        // Send form data using EmailJS
        emailjs.sendForm('service_868xcfc', 'template_c8nxuxd', this)
          .then(function () {
            alert('Your message has been sent successfully!');
          }, function (error) {
            alert('Failed to send the message. Please try again later.');
            console.log('Error:', error);
          });
      });
    }
  
    // Custom smooth scroll for anchor links (including footer links)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const href = this.getAttribute('href');
        const target = document.querySelector(href);
        
        if (target) {
          // Add a small offset for better visibility
          const offset = 20;
          smoothScrollTo(target, 1000, offset);
          
          // Close mobile menu after clicking a link
          const menuToggle = document.getElementById('menu-toggle');
          if (menuToggle && window.innerWidth <= 480) {
            menuToggle.checked = false;
          }
        }
      });
    });

    // Mobile menu toggle functionality
    const menuToggle = document.getElementById('menu-toggle');
    const menuIcon = document.querySelector('.menu-icon');
    const navLinksContainer = document.querySelector('.nav-links');

    if (menuToggle && menuIcon && navLinksContainer) {
      // Close menu when clicking outside
      document.addEventListener('click', function(event) {
        if (window.innerWidth <= 480) {
          const isClickInsideNav = navLinksContainer.contains(event.target);
          const isClickOnIcon = menuIcon.contains(event.target);
          
          if (!isClickInsideNav && !isClickOnIcon && menuToggle.checked) {
            menuToggle.checked = false;
          }
        }
      });

      // Prevent body scroll when menu is open
      menuToggle.addEventListener('change', function() {
        if (this.checked) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      });
    }
  });