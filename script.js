document.addEventListener('DOMContentLoaded', () => {

  /* ============ MOBILE NAV TOGGLE ============ */
  const hamburger = document.getElementById('hamburger');
  const navbar = document.getElementById('navbar');
  hamburger.addEventListener('click', () => {
    navbar.classList.toggle('mobile-open');
  });

  /* ============ LOGIN / SIGNUP DEMO ALERTS ============ */
  document.getElementById('loginBtn').addEventListener('click', () => {
    alert('This is a demo clone — login flow is not implemented.');
  });
  document.getElementById('signupBtn').addEventListener('click', () => {
    alert('This is a demo clone — sign up flow is not implemented.');
  });
  document.getElementById('heroSignup').addEventListener('click', () => {
    alert('Thanks for your interest! This demo does not create real accounts.');
  });

  /* ============ HERO DOTS AUTO ROTATE ============ */
  const heroDots = document.querySelectorAll('.hero-dots .dot');
  let heroIndex = 0;
  setInterval(() => {
    heroDots[heroIndex].classList.remove('active');
    heroIndex = (heroIndex + 1) % heroDots.length;
    heroDots[heroIndex].classList.add('active');
  }, 3000);

  /* ============ PRODUCT TABS ============ */
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.tab-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.tab).classList.add('active');
    });
  });

  /* ============ ANIMATED STAT COUNTERS (on scroll into view) ============ */
  const statNums = document.querySelectorAll('.stat-num');
  const animateCount = (el) => {
    const target = parseInt(el.dataset.target, 10);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const tick = () => {
      current += step;
      if (current >= target) {
        el.textContent = target;
      } else {
        el.textContent = current;
        requestAnimationFrame(tick);
      }
    };
    tick();
  };

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(num => statObserver.observe(num));

  /* ============ TESTIMONIAL CAROUSEL ============ */
  const track = document.getElementById('testimonialTrack');
  const cards = document.querySelectorAll('.testimonial-card');
  const dotsWrap = document.getElementById('carouselDots');
  let current = 0;

  cards.forEach((_, i) => {
    const d = document.createElement('span');
    d.classList.add('dot');
    if (i === 0) d.classList.add('active');
    d.addEventListener('click', () => goToSlide(i));
    dotsWrap.appendChild(d);
  });
  const carouselDots = dotsWrap.querySelectorAll('.dot');

  function goToSlide(index) {
    current = (index + cards.length) % cards.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    carouselDots.forEach(d => d.classList.remove('active'));
    carouselDots[current].classList.add('active');
  }

  document.getElementById('prevTestimonial').addEventListener('click', () => goToSlide(current - 1));
  document.getElementById('nextTestimonial').addEventListener('click', () => goToSlide(current + 1));

  let autoSlide = setInterval(() => goToSlide(current + 1), 5000);
  document.querySelector('.testimonial-carousel').addEventListener('mouseenter', () => clearInterval(autoSlide));
  document.querySelector('.testimonial-carousel').addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => goToSlide(current + 1), 5000);
  });

  /* ============ CTA FORM VALIDATION ============ */
  document.getElementById('ctaSubmit').addEventListener('click', () => {
    const phoneInput = document.getElementById('ctaPhone');
    const phone = phoneInput.value.trim();
    const phoneRegex = /^[6-9]\d{9}$/;

    if (phone === '') {
      alert('Please enter your mobile number.');
      phoneInput.focus();
      return;
    }
    if (!phoneRegex.test(phone)) {
      alert('Please enter a valid 10-digit Indian mobile number.');
      phoneInput.focus();
      return;
    }
    alert('Thanks! Our team will reach out to ' + phone + ' shortly. (Demo only — no data is stored.)');
    phoneInput.value = '';
  });

  /* ============ BACK TO TOP BUTTON ============ */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ============ CLOSE MOBILE MENU WHEN LINK CLICKED ============ */
  document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => navbar.classList.remove('mobile-open'));
  });

});
