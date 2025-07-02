// ==================== MENU SHOW & HIDDEN ====================
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/*===== MENU SHOW =====*/
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== MENU HIDDEN =====*/
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}

navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== SCROLL HEADER & FLOATING FOOTER ====================*/
let lastScrollTop = 0;

function scrollHeader() {
  const nav = document.getElementById("header");
  const floatingFooter = document.getElementById("floating-footer");
  const backToTop = document.getElementById("back-to-top");
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Add scroll header effect
  if (scrollTop >= 80) {
    nav.classList.add("scroll-header");
  } else {
    nav.classList.remove("scroll-header");
  }

  // Handle header hide/show and floating footer based on scroll direction
  if (scrollTop > lastScrollTop && scrollTop > 200) {
    // Scrolling down
    nav.classList.add("hide-header");
    floatingFooter.classList.add("show-floating");
  } else {
    // Scrolling up
    nav.classList.remove("hide-header");
    floatingFooter.classList.remove("show-floating");
  }

  // Show back to top button when scrolled down
  if (scrollTop > 300) {
    backToTop.classList.add("active");
  } else {
    backToTop.classList.remove("active");
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
}

window.addEventListener("scroll", scrollHeader);

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.add("active-link");
    } else {
      document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.remove("active-link");
    }
  });
}

window.addEventListener("scroll", scrollActive);

/*==================== TESTS FILTER ====================*/
const filterButtons = document.querySelectorAll(".filter__btn");
const testCards = document.querySelectorAll(".test__card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to clicked button
    button.classList.add("active");

    const filterValue = button.getAttribute("data-filter");

    testCards.forEach((card) => {
      if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
        card.style.display = "block";
        card.classList.add("fade-in-up");
      } else {
        card.style.display = "none";
        card.classList.remove("fade-in-up");
      }
    });
  });
});

/*==================== CONTACT FORM ====================*/
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    // Simulate form submission
    console.log("Form submitted:", formObject);

    // Show success message with modern styling
    showNotification("Thank you for your message! We will contact you soon.", "success");

    // Reset form
    contactForm.reset();
  });
}

/*==================== SMOOTH SCROLLING ====================*/
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

/*==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================*/
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up");
    }
  });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll(".section, .service__card, .test__card, .feature, .contact__card").forEach((el) => {
  observer.observe(el);
});

/*==================== PRELOADER ====================*/
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    }, 1500);
  }
});

/*==================== TEST BOOKING ====================*/
const testButtons = document.querySelectorAll(".test__btn");

testButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const testCard = e.target.closest(".test__card");
    const testName = testCard.querySelector(".test__name").textContent;
    const testPrice = testCard.querySelector(".test__price").textContent;

    // Show booking notification
    showNotification(`Booking ${testName} for ${testPrice}. Redirecting to contact form...`, "info");

    // Scroll to contact form after delay
    setTimeout(() => {
      document.getElementById("contact").scrollIntoView({
        behavior: "smooth",
      });
    }, 1500);
  });
});

/*==================== COUNTER ANIMATION ====================*/
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start).toLocaleString();
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target.toLocaleString();
    }
  }

  updateCounter();
}

// Animate counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = Number.parseFloat(counter.getAttribute("data-target"));
      animateCounter(counter, target);
      counterObserver.unobserve(counter);
    }
  });
});

document.querySelectorAll(".counter").forEach((counter) => {
  counterObserver.observe(counter);
});

/*==================== NOTIFICATION SYSTEM ====================*/
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification--${type}`;
  notification.innerHTML = `
    <div class="notification__content">
      <i class="fas ${type === "success" ? "fa-check-circle" : type === "error" ? "fa-exclamation-circle" : "fa-info-circle"}"></i>
      <span>${message}</span>
    </div>
    <button class="notification__close">
      <i class="fas fa-times"></i>
    </button>
  `;

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 2rem;
    right: 2rem;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    padding: 1rem 1.5rem;
    border-radius: 1rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 400px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  `;

  // Add to DOM
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Close functionality
  const closeBtn = notification.querySelector(".notification__close");
  closeBtn.addEventListener("click", () => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  });

  // Auto close after 5 seconds
  setTimeout(() => {
    if (document.body.contains(notification)) {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }
  }, 5000);
}

/*==================== BACK TO TOP ====================*/
const backToTop = document.getElementById("back-to-top");

backToTop.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});