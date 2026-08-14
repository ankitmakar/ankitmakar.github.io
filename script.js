/**
 * Ankit Makar Portfolio - Interactive Logic & UI Micro-interactions
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Dynamic Year in Footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. Mobile Menu Toggle
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener("click", () => {
      mobileBtn.classList.toggle("open");
      mobileMenu.classList.toggle("open");
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileBtn.classList.remove("open");
        mobileMenu.classList.remove("open");
      });
    });
  }

  // 3. Certificate Category Filtering
  const filterTabs = document.querySelectorAll(".filter-tab");
  const certCards = document.querySelectorAll(".cert-card");

  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      filterTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const filterValue = tab.getAttribute("data-filter");

      certCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filterValue === "all" || category === filterValue) {
          card.classList.remove("hide");
        } else {
          card.classList.add("hide");
        }
      });
    });
  });

  // 4. ScrollSpy Navigation Highlighting
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".desktop-nav .nav-link");

  window.addEventListener("scroll", () => {
    let currentSectionId = "";
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  });

  // 5. Contact Form Submission Handling
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector("button[type='submit']");
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending...</span>`;

      setTimeout(() => {
        showToast("Thank you for reaching out! I will get back to you soon.");
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 750);
    });
  }
});

/**
 * Copy Certificate ID / Credential string to clipboard
 * @param {string} text - Certificate ID to copy
 * @param {HTMLElement} btnElement - The button element triggered
 */
function copyCertId(text, btnElement) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Copied "${text}" to clipboard!`);

    // Temporary button icon state update
    if (btnElement) {
      const originalHTML = btnElement.innerHTML;
      btnElement.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
      btnElement.style.transform = "scale(1.15)";
      
      setTimeout(() => {
        btnElement.innerHTML = originalHTML;
        btnElement.style.transform = "scale(1)";
      }, 1800);
    }
  }).catch((err) => {
    console.error("Clipboard copy failed:", err);
    showToast("Failed to copy credential ID");
  });
}

/**
 * Trigger Toast Notification
 * @param {string} message 
 */
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById("toast-notification");
  const toastMsg = document.getElementById("toast-message");

  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}
