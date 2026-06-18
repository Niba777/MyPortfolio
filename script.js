/**
 * Nibakaran Veeramuththu — Portfolio
 * script.js
 *
 * Modules:
 *  1. Copyright year
 *  2. Sticky header shadow
 *  3. Mobile navigation
 *  4. Active nav link (IntersectionObserver)
 *  5. Scroll reveal (IntersectionObserver)
 *  6. Back-to-top button
 *  7. Contact form (Web3Forms)
 *  8. Smooth scroll for anchor links
 */

'use strict';

/* ── Utility: query helpers ─────────────────────────────── */
const qs  = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ══════════════════════════════════════════════════════════
   1. COPYRIGHT YEAR
══════════════════════════════════════════════════════════ */
const yearEl = qs('#copyright-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ══════════════════════════════════════════════════════════
   2. STICKY HEADER SHADOW ON SCROLL
══════════════════════════════════════════════════════════ */
const header = qs('#site-header');

function updateHeaderShadow() {
  if (!header) return;
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', updateHeaderShadow, { passive: true });
updateHeaderShadow(); // run on load

/* ══════════════════════════════════════════════════════════
   3. MOBILE NAVIGATION
══════════════════════════════════════════════════════════ */
const hamburger  = qs('#hamburger');
const mobileMenu = qs('#mobile-menu');
const mobileLinks = qsa('.mobile-link');

function openMenu() {
  if (!hamburger || !mobileMenu) return;
  hamburger.setAttribute('aria-expanded', 'true');
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden'; // prevent background scroll
  // Move focus to first link
  const firstLink = qs('.mobile-link', mobileMenu);
  if (firstLink) firstLink.focus();
}

function closeMenu() {
  if (!hamburger || !mobileMenu) return;
  hamburger.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger?.addEventListener('click', () => {
  const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
  isOpen ? closeMenu() : openMenu();
});

// Close on mobile link click
mobileLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu?.classList.contains('open')) {
    closeMenu();
    hamburger?.focus();
  }
});

// Close when clicking outside the menu
document.addEventListener('click', (e) => {
  if (
    mobileMenu?.classList.contains('open') &&
    !mobileMenu.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    closeMenu();
  }
});

/* ══════════════════════════════════════════════════════════
   4. ACTIVE NAV LINK (IntersectionObserver)
══════════════════════════════════════════════════════════ */
const navLinks = qsa('.nav-link');
const sections = qsa('section[id]');

const navObserverOptions = {
  root: null,
  rootMargin: '-50% 0px -50% 0px', // activate when section is in middle of viewport
  threshold: 0,
};

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === id);
      });
    }
  });
}, navObserverOptions);

sections.forEach(section => navObserver.observe(section));

/* ══════════════════════════════════════════════════════════
   5. SCROLL REVEAL
══════════════════════════════════════════════════════════ */
// Skip for reduced-motion users — CSS handles this gracefully,
// but we still need to make elements visible.
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const revealElements = qsa('.reveal');

if (prefersReducedMotion) {
  // Immediately show all elements
  revealElements.forEach(el => el.classList.add('visible'));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target); // fire once
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(el => revealObserver.observe(el));
}

/* ══════════════════════════════════════════════════════════
   6. BACK TO TOP
══════════════════════════════════════════════════════════ */
const backToTopBtn = qs('#back-to-top');

function toggleBackToTop() {
  if (!backToTopBtn) return;
  if (window.scrollY > 500) {
    backToTopBtn.hidden = false;
  } else {
    backToTopBtn.hidden = true;
  }
}

window.addEventListener('scroll', toggleBackToTop, { passive: true });
toggleBackToTop();

backToTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
});

/* ══════════════════════════════════════════════════════════
   7. CONTACT FORM (Web3Forms)
   ──────────────────────────────────────────────────────────
   Setup:
   1. Go to https://web3forms.com
   2. Enter your email and get a free Access Key
   3. Replace [YOUR-WEB3FORMS-ACCESS-KEY] in index.html
      with your actual key (inside the hidden input)
══════════════════════════════════════════════════════════ */
const contactForm   = qs('#contact-form');
const submitBtn     = qs('#submit-btn');
const formSuccess   = qs('#form-success');
const formErrorMsg  = qs('#form-error-msg');

// Field references for inline validation
const fieldMap = {
  name:         { input: qs('#contact-name'),    error: qs('#name-error')    },
  email:        { input: qs('#contact-email'),   error: qs('#email-error')   },
  subject_line: { input: qs('#contact-subject'), error: qs('#subject-error') },
  message:      { input: qs('#contact-message'), error: qs('#message-error') },
};

function setFieldError(key, msg) {
  const { input, error } = fieldMap[key];
  if (!input || !error) return;
  error.textContent = msg;
  input.classList.toggle('invalid', !!msg);
  input.setAttribute('aria-describedby', msg ? `${input.id}-error-desc` : '');
}

function clearErrors() {
  Object.keys(fieldMap).forEach(key => setFieldError(key, ''));
}

function validateForm(data) {
  let valid = true;

  if (!data.get('name')?.trim()) {
    setFieldError('name', 'Please enter your name.');
    valid = false;
  }

  const email = data.get('email')?.trim();
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    setFieldError('email', 'Please enter your email address.');
    valid = false;
  } else if (!emailRe.test(email)) {
    setFieldError('email', 'Please enter a valid email address.');
    valid = false;
  }

  if (!data.get('subject_line')?.trim()) {
    setFieldError('subject_line', 'Please enter a subject.');
    valid = false;
  }

  if (!data.get('message')?.trim()) {
    setFieldError('message', 'Please enter a message.');
    valid = false;
  }

  return valid;
}

function setSubmitState(state) {
  if (!submitBtn) return;
  if (state === 'loading') {
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-busy', 'true');
  } else {
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
    submitBtn.removeAttribute('aria-busy');
  }
}

contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearErrors();

  // Hide previous status messages
  if (formSuccess)  formSuccess.hidden  = true;
  if (formErrorMsg) formErrorMsg.hidden = true;

  const data = new FormData(contactForm);

  if (!validateForm(data)) return; // stop if invalid

  // Check if access key has been replaced
  const accessKey = data.get('access_key');
  if (!accessKey || accessKey === '[YOUR-WEB3FORMS-ACCESS-KEY]') {
    if (formErrorMsg) {
      formErrorMsg.textContent = 'Contact form not yet configured. Please email me directly at nibakaran1125@gmail.com';
      formErrorMsg.hidden = false;
    }
    return;
  }

  setSubmitState('loading');

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: data,
    });

    const result = await response.json();

    if (response.ok && result.success) {
      contactForm.reset();
      if (formSuccess) {
        formSuccess.hidden = false;
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    } else {
      throw new Error(result.message || 'Submission failed');
    }
  } catch (err) {
    console.error('Form submission error:', err);
    if (formErrorMsg) {
      formErrorMsg.hidden = false;
      formErrorMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  } finally {
    setSubmitState('idle');
  }
});

// Clear field errors on user input
Object.entries(fieldMap).forEach(([key, { input }]) => {
  input?.addEventListener('input', () => setFieldError(key, ''));
});

/* ══════════════════════════════════════════════════════════
   8. SMOOTH SCROLL FOR ANCHOR LINKS
   (Native CSS scroll-behavior handles most cases, but this
   also offsets for the sticky header height.)
══════════════════════════════════════════════════════════ */
const HEADER_OFFSET = 80; // px — adjust if header height changes

document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;

  const targetId = link.getAttribute('href').slice(1);
  if (!targetId) return;

  const target = document.getElementById(targetId);
  if (!target) return;

  e.preventDefault();

  const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({
    top,
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
  });

  // Update URL without triggering scroll
  history.pushState(null, '', `#${targetId}`);

  // Move focus to target for accessibility
  target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
});
