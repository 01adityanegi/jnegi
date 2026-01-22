// menu toggle
const menuBtn = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

if (menuBtn && nav) {
  menuBtn.setAttribute('aria-expanded', 'false');

  const icon = menuBtn.querySelector('i');

  menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');

    //  Icon
    if (!expanded) {
      icon.classList.remove('fa-bars-staggered');
      icon.classList.add('fa-xmark');
    } else {
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars-staggered');
    }
  });

  // Close menu 
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.focus();
      // Reset Icon
      if (icon) {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars-staggered');
      }
    }
  });

  // Close menu when a link is clicked
  const navLinks = nav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      // Reset Icon
      if (icon) {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars-staggered');
      }
    });
  });
}

// Service Filter Functionality
const searchInput = document.getElementById('serviceSearch');
if (searchInput) {
  searchInput.addEventListener('input', function (e) {
    const filter = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.service-card');

    cards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      const desc = card.querySelector('p').textContent.toLowerCase();

      // Also match parent category if needed, but per card is better
      if (title.includes(filter) || desc.includes(filter)) {
        card.style.display = 'block';
        // Ensure parent grid doesn't collapse weirdly if all hidden, but CSS grid handles it.
        // Optional: Hide category title if all cards in it are hidden.
      } else {
        card.style.display = 'none';
      }
    });


    // Hide empty categories (use computed style to detect visibility)
    const categories = document.querySelectorAll('.service-category');
    categories.forEach(cat => {
      const cardsInCat = cat.querySelectorAll('.service-card');
      const anyVisible = Array.from(cardsInCat).some(c => window.getComputedStyle(c).display !== 'none');
      cat.style.display = anyVisible ? 'block' : 'none';
    });
  });
}

// Gallery Lightbox Functionality
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const galleryItems = document.querySelectorAll('.gallery-item');

  // Open Lightbox
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.gallery-title').textContent;
      const desc = item.querySelector('.gallery-desc').textContent;

      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.innerHTML = `<h3>${title}</h3><p>${desc}</p>`;

      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // Disable scroll
    });
  });

  // Close Lightbox Function
  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Enable scroll
    setTimeout(() => {
      lightboxImg.src = ''; // Clear source to stop video/large img load if needed
    }, 300);
  };

  // Close Event Listeners
  closeBtn.addEventListener('click', closeLightbox);

  // Close on click outside image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}
// Page Loader
// Page Loader logic optimized for perceived speed
const hideLoader = () => {
  const loader = document.getElementById('loader');
  if (loader && !loader.classList.contains('hidden')) {
    loader.classList.add('hidden');
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }
};

// Hide when HTML is parsed (fastest)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', hideLoader);
} else {
  hideLoader();
}

// Fallback: ensure it hides even if DOMContentLoaded missed or something hangs
window.addEventListener('load', hideLoader);
setTimeout(hideLoader, 2000); // Absolute max wait 2s


// REMOVED: Context-menu and keyboard blocking code
// These are security anti-patterns that:
// 1. Don't prevent determined users from inspecting code
// 2. Break accessibility and debugging for legitimate users  
// 3. Harm user experience and trust
// Users have the right to inspect web pages they visit.

// =========================================
// Modern Features: Dark Mode, Back to Top, Typing
// =========================================

document.addEventListener('DOMContentLoaded', () => {

  // 1. Inject Floating Controls (Dark Mode Toggle & Back to Top)
  const controlsContainer = document.createElement('div');
  controlsContainer.className = 'floating-controls';
  controlsContainer.innerHTML = `
    <button id="darkModeToggle" class="control-btn" aria-label="Toggle Dark Mode">
      <i class="fas fa-moon"></i>
    </button>
    <button id="backToTop" class="control-btn" aria-label="Back to Top">
      <i class="fas fa-arrow-up"></i>
    </button>
  `;
  document.body.appendChild(controlsContainer);

  // 2. Dark Mode Logic
  const toggleBtn = document.getElementById('darkModeToggle');
  const icon = toggleBtn.querySelector('i');

  // Check Local Storage
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');

    // Update Icon
    if (isDark) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
      localStorage.setItem('theme', 'dark');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
      localStorage.setItem('theme', 'light');
    }
  });

  // 3. Back To Top Logic
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // 4. Typing Animation (Hero Section)
  // Target the specific text in index.html, handled defensively
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle && window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    // We want to append a typing effect to "JNegi"
    // Let's modify the HTML slightly to accommodate the cursor if it's the index page
    // Current HTML: <h1>Hello, I am JNegi (Jitender Singh Negi).</h1>
    // We will change it dynamically to: Hello, I am <span class="typing-text"></span><span class="typing-cursor"></span>

    const originalText = "Jiteandra Singh Negi";
    const phrases = ["Jiteandra Singh Negi", "JNegi",];

    // Create wrapper if not exists (simple check)
    if (!heroTitle.querySelector('.typing-cursor')) {
      // Only run this complex logic if we are on the right page and haven't initialized
      // Actually, a simpler way without destroying current SEO text is to just Append the dynamic part
      // But user wanted "modern look", so let's make the name dynamic.

      // Let's keep "Hello, I am " static, and type the rest.
      heroTitle.innerHTML = ` I am <span class="txt-rotate" data-period="2000" data-rotate='[ "Jiteandra Singh Negi"]'></span><span class="typing-cursor"></span>`;

      // TxtRotate Class
      class TxtRotate {
        constructor(el, toRotate, period) {
          this.toRotate = toRotate;
          this.el = el;
          this.loopNum = 0;
          this.period = parseInt(period, 10) || 2000;
          this.txt = '';
          this.tick();
          this.isDeleting = false;
        }
        tick() {
          var i = this.loopNum % this.toRotate.length;
          var fullTxt = this.toRotate[i];

          if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
          } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
          }

          this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

          var that = this;
          var delta = 300 - Math.random() * 100;

          if (this.isDeleting) { delta /= 2; }

          if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
          } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
          }

          setTimeout(function () {
            that.tick();
          }, delta);
        }
      }

      var elements = document.getElementsByClassName('txt-rotate');
      for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
      }
    }
  }

  // 5. Add "Glass" class to existing cards for better styling if they don't have it
  const cards = document.querySelectorAll('.info-card, .service-card, .value-card');
  cards.forEach(card => card.classList.add('glass-card'));

  // 6. Add Float Animation to Hero Image
  const heroImg = document.querySelector('.hero-image img');
  if (heroImg) {
    heroImg.classList.add('float-anim');
  }

  // 7. Number Counter Animation
  const counters = document.querySelectorAll('.counter');
  const speed = 200; // The lower the slower

  const animateCounters = () => {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText.replace(/\D/g, ''); // Get numeric value
        const suffix = counter.getAttribute('data-suffix') || '';

        // Lower inc to slow and higher to slow
        const inc = target / speed;

        if (count < target) {
          // Add inc to count and output in counter
          counter.innerText = Math.ceil(count + inc) + suffix;
          // Call function every ms
          setTimeout(updateCount, 20);
        } else {
          counter.innerText = target + suffix;
        }
      };
      updateCount();
    });
  };

  // Trigger animation on scroll using Intersection Observer
  let counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.disconnect(); // Run once
      }
    });
  }, { threshold: 0.5 }); // 50% visible

  if (counters.length > 0) {
    counterObserver.observe(counters[0]);
  }

});
