document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initFaq();
  initTestimonials();
  initAuditForm();
  initMetricCompares();
});

/* --- Navbar Logic --- */
function initNavbar() {
  const header = document.querySelector('header');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Sticky scroll effects
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Trigger sticky immediately on load if already scrolled
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  }

  // Mobile Drawer Toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('mobile-open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('mobile-open') && !navLinks.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.classList.remove('open');
        navLinks.classList.remove('mobile-open');
      }
    });

    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('mobile-open');
      });
    });
  }
}

/* --- FAQ Accordion --- */
function initFaq() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const currentItem = question.closest('.faq-item');
      const isActive = currentItem.classList.contains('active');

      // Close all FAQ items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });

      // Toggle active on clicked item
      if (!isActive) {
        currentItem.classList.add('active');
      }
    });
  });
}

/* --- Testimonial Slider --- */
function initTestimonials() {
  const container = document.querySelector('.testimonial-container');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');

  if (!container || slides.length === 0) return;

  let currentIndex = 0;
  const slideCount = slides.length;

  function updateSlider() {
    container.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slideCount;
      updateSlider();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slideCount) % slideCount;
      updateSlider();
    });
  }

  // Auto-play every 6 seconds
  let autoPlay = setInterval(() => {
    currentIndex = (currentIndex + 1) % slideCount;
    updateSlider();
  }, 6000);

  // Pause autoplay on interaction
  [prevBtn, nextBtn].forEach(btn => {
    if (btn) {
      btn.addEventListener('mouseenter', () => clearInterval(autoPlay));
      btn.addEventListener('mouseleave', () => {
        autoPlay = setInterval(() => {
          currentIndex = (currentIndex + 1) % slideCount;
          updateSlider();
        }, 6000);
      });
    }
  });
}

/* --- Interactive Metric Before/After Toggles --- */
function initMetricCompares() {
  const toggles = document.querySelectorAll('.compare-toggle');

  toggles.forEach(toggle => {
    toggle.addEventListener('change', (e) => {
      const widget = toggle.closest('.compare-widget');
      if (!widget) return;

      const beforeBox = widget.querySelector('.before-box');
      const afterBox = widget.querySelector('.after-box');

      if (e.target.checked) {
        // Show after
        beforeBox.style.display = 'none';
        afterBox.style.display = 'block';
      } else {
        // Show before
        beforeBox.style.display = 'block';
        afterBox.style.display = 'none';
      }
    });
  });
}

/* --- Audit Lead Form Handler --- */
const WEB3FORMS_ACCESS_KEY = "b29df8fa-cd03-4ca5-a0f2-79d8318c3555"; // paste your free Web3Forms key here (from web3forms.com) to receive email alerts

function initAuditForm() {
  const auditForm = document.getElementById('auditForm');
  const formCard = document.querySelector('.form-card');

  if (!auditForm || !formCard) return;

  auditForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Capture values
    const businessName = document.getElementById('businessName').value.trim();
    const mapsLink = document.getElementById('mapsLink').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const categorySelect = document.getElementById('category');
    const category = categorySelect ? categorySelect.options[categorySelect.selectedIndex].text : '';

    // Basic validations
    if (!businessName || !mapsLink || !email) {
      alert('Please fill out all required fields.');
      return;
    }

    // Select problems checked
    const selectedProblems = [];
    document.querySelectorAll('input[name="problems"]:checked').forEach(cb => {
      selectedProblems.push(cb.parentNode.textContent.trim());
    });

    // Visual processing state
    const submitBtn = auditForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin" style="width:20px; height:20px; margin-right:8px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke="rgba(0,0,0,0.1)"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-linecap="round"></path>
      </svg>
      Analyzing Map Profile...
    `;

    // Add dynamic inline SVG styling style if spin element is created
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      .animate-spin {
        animation: spin 1s linear infinite;
        display: inline-block;
        vertical-align: middle;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(styleSheet);

    // Prepare Web3Forms payload
    const formData = {
      subject: `New Google Maps Audit Request: ${businessName}`,
      from_name: "MapGrowth Audit Bot",
      business_name: businessName,
      google_maps_link: mapsLink,
      business_category: category,
      problems: selectedProblems.join(', '),
      contact_name: document.getElementById('contactName').value.trim() || 'Not provided',
      email: email,
      phone: phone || 'Not provided'
    };

    // Format WhatsApp direct text link
    const waPhone = "15550192834"; // Replace with your actual WhatsApp phone number (no spaces or '+' e.g. 15550192834)
    const waText = `Hi! I just requested a free Maps audit for my business:
- Business: ${businessName}
- Maps Link: ${mapsLink}
- Category: ${category}
- Email: ${email}
- Phone: ${phone || 'Not provided'}
- Main Problems: ${selectedProblems.length > 0 ? selectedProblems.join(', ') : 'None selected'}`;
    const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}`;

    // Helper to render final success card
    const renderSuccessCard = () => {
      formCard.innerHTML = `
        <div class="form-success-card">
          <div class="success-icon-wrapper">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h3>Audit Request Received!</h3>
          <p>We are analyzing <strong>${businessName}</strong>. Our local SEO specialists will compile your report within the next 24 hours.</p>
          
          <div style="background: var(--bg-light); padding: 1.25rem; border-radius: 0.75rem; border: 1px solid var(--border-color); text-align: left; margin-bottom: 2rem; color: var(--text-body);">
            <h4 style="color: var(--text-dark); font-size: 0.9rem; margin-bottom: 0.5rem; font-weight:700;">What happens next?</h4>
            <ul style="list-style: none; padding: 0; font-size: 0.85rem; display: flex; flex-direction: column; gap: 0.5rem;">
              <li style="display: flex; gap: 0.5rem;">
                <span style="color: var(--accent-green);">✓</span> Verification: We audit your local rankings.
              </li>
              <li style="display: flex; gap: 0.5rem;">
                <span style="color: var(--accent-green);">✓</span> Review Protection: We check for violation risks.
              </li>
              <li style="display: flex; gap: 0.5rem;">
                <span style="color: var(--accent-green);">✓</span> Report Delivery: Audit sent to <strong>${email}</strong>.
              </li>
            </ul>
          </div>
          
          <div style="margin-bottom: 2rem;">
            <p style="font-size: 0.85rem; margin-bottom: 1rem; color: var(--text-muted);">Want it faster? Send your details directly to our WhatsApp:</p>
            <a href="${waUrl}" target="_blank" class="btn btn-primary" style="width:100%; display:inline-flex; background-color: #25D366; border-color: #25D366; color: white;">
              💬 Speed Up Audit via WhatsApp
            </a>
          </div>
          
          <button class="btn btn-secondary" id="resetAuditForm" style="width:100%;">Request Another Audit</button>
        </div>
      `;

      document.getElementById('resetAuditForm').addEventListener('click', () => {
        location.reload();
      });
    };

    // If access key is set, submit to Web3Forms API
    if (WEB3FORMS_ACCESS_KEY) {
      formData.access_key = WEB3FORMS_ACCESS_KEY;

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      })
        .then(async (response) => {
          if (response.ok) {
            renderSuccessCard();
          } else {
            const json = await response.json();
            console.error(json);
            alert('Submission error: ' + (json.message || response.statusText));
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
          }
        })
        .catch(error => {
          console.error(error);
          alert('Network error. Please try sending via WhatsApp instead.');
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        });
    } else {
      // Offline/Mock simulation if no API key is specified
      setTimeout(() => {
        renderSuccessCard();
      }, 2000);
    }
  });
}
