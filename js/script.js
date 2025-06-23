document.addEventListener('DOMContentLoaded', function () {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav ul');

  mobileMenuBtn.addEventListener('click', function () {
    navMenu.classList.toggle('active');
  });

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll('.nav ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      navMenu.classList.remove('active');
    });
  });

  // Header scroll effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Scroll to top button
  const scrollTopBtn = document.querySelector('.scroll-top');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('active');
    } else {
      scrollTopBtn.classList.remove('active');
    }
  });

  scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Animate skill bars
  const skillBars = document.querySelectorAll('.skill-level');
  function animateSkillBars() {
    skillBars.forEach(bar => {
      const level = bar.getAttribute('data-level');
      bar.style.width = level + '%';
    });
  }

  // Animate stats with K/M formatting (simplified decimals)
  const statNumbers = document.querySelectorAll('.stat-number');
  function animateStats() {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-count'));
      const duration = 2000;
      const step = target / (duration / 16); // 60fps

      let current = 0;
      const increment = () => {
        current += step;
        if (current < target) {
          stat.textContent = formatNumber(Math.floor(current));
          requestAnimationFrame(increment);
        } else {
          stat.textContent = formatNumber(target);
        }
      };

      increment();
    });
  }

  // Helper function to format numbers with clean K/M suffixes
  function formatNumber(num) {
    if (num >= 1000000) {
      const millions = num / 1000000;
      return millions % 1 === 0 ? `${millions}M` : `${millions.toFixed(1)}M`;
    }
    if (num >= 1000) {
      const thousands = num / 1000;
      return thousands % 1 === 0 ? `${thousands}K` : `${thousands.toFixed(1)}K`;
    }
    return num.toString();
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('skills-category')) {
          animateSkillBars();
        } else if (entry.target.classList.contains('about-stats')) {
          animateStats();
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements
  const skillsSection = document.querySelector('.skills-category');
  if (skillsSection) observer.observe(skillsSection);

  const statsSection = document.querySelector('.about-stats');
  if (statsSection) observer.observe(statsSection);

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

  // Current year in footer
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Contact form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;

      // Here you would typically send the form data to a server
      // For this example, we'll just log it and show an alert
      console.log({ name, email, subject, message });

      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
    });
  }

  // Initialize animations when page loads if elements are already visible
  if (isElementInViewport(skillsSection)) {
    animateSkillBars();
  }
  if (isElementInViewport(statsSection)) {
    animateStats();
  }
});

// Helper function to check if element is in viewport
function isElementInViewport(el) {
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

// In your script.js
document.querySelectorAll('a[download]').forEach(link => {
    link.addEventListener('click', function() {
        gtag('event', 'download', {
            'event_category': 'resume',
            'event_label': 'Resume Download'
        });
    });
});

// Add this to your script.js
document.querySelectorAll('a[href$=".pdf"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      forceDownload(this.href, 'Aashir_Haque_Resume.pdf');
    });
});

function forceDownload(url, fileName) {
    fetch(url, {
        mode: 'no-cors'
    })
    .then(response => response.blob())
    .then(blob => {
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(blobUrl);
        document.body.removeChild(a);
    })
    .catch(e => {
        // Fallback to normal link if fetch fails
        window.open(url, '_blank');
    });
}

// Form submission handling
document.querySelector('form[netlify]')?.addEventListener('submit', function(e) {
  const form = this;
  
  // Only prevent default if form is invalid
  if (!form.checkValidity()) {
    e.preventDefault();
    alert('Please fill all required fields!');
    return;
  }
  
  // Show loading state
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.innerHTML = 'Sending...';
});