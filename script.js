/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close")

/*===== MENU SHOW =====*/
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu")
  })
}

/*===== MENU HIDDEN =====*/
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu")
  })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link")

function linkAction() {
  const navMenu = document.getElementById("nav-menu")
  navMenu.classList.remove("show-menu")
}
navLink.forEach((n) => n.addEventListener("click", linkAction))

/*==================== SCROLL HEADER & FLOATING FOOTER ====================*/
let lastScrollTop = 0;

function scrollHeader() {
  const nav = document.getElementById("header")
  const floatingFooter = document.getElementById("floating-footer")
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  // Add scroll header effect
  if (scrollTop >= 80) {
    nav.classList.add("scroll-header")
  } else {
    nav.classList.remove("scroll-header")
  }

  // Handle header hide/show and floating footer based on scroll direction
  if (scrollTop > lastScrollTop && scrollTop > 200) {
    // Scrolling down
    nav.classList.add("hide-header")
    floatingFooter.classList.add("show-floating")
  } else {
    // Scrolling up
    nav.classList.remove("hide-header")
    floatingFooter.classList.remove("show-floating")
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop // For Mobile or negative scrolling
}

window.addEventListener("scroll", scrollHeader)

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up")
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll")
  else scrollUp.classList.remove("show-scroll")
}
window.addEventListener("scroll", scrollUp)

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]")

function scrollActive() {
  const scrollY = window.pageYOffset

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight
    const sectionTop = current.offsetTop - 50
    const sectionId = current.getAttribute("id")

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.add("active-link")
    } else {
      document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.remove("active-link")
    }
  })
}
window.addEventListener("scroll", scrollActive)

/*==================== TESTS FILTER ====================*/
const filterButtons = document.querySelectorAll(".filter__btn")
const testCards = document.querySelectorAll(".test__card")

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"))
    // Add active class to clicked button
    button.classList.add("active")

    const filterValue = button.getAttribute("data-filter")

    testCards.forEach((card) => {
      if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
        card.style.display = "block"
        card.classList.add("fade-in-up")
      } else {
        card.style.display = "none"
        card.classList.remove("fade-in-up")
      }
    })
  })
})

/*==================== CONTACT FORM ====================*/
const contactForm = document.getElementById("contact-form")

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(contactForm)
    const formObject = {}
    formData.forEach((value, key) => {
      formObject[key] = value
    })

    // Simulate form submission
    console.log("Form submitted:", formObject)

    // Show success message
    alert("Thank you for your message! We will contact you soon.")

    // Reset form
    contactForm.reset()
  })
}

/*==================== SMOOTH SCROLLING ====================*/
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

/*==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================*/
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up")
    }
  })
}, observerOptions)

// Observe all sections and cards
document.querySelectorAll(".section, .service__card, .test__card, .feature").forEach((el) => {
  observer.observe(el)
})

/*==================== LOADING ANIMATION ====================*/
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

/*==================== TEST BOOKING ====================*/
const testButtons = document.querySelectorAll(".test__btn")

testButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const testCard = e.target.closest(".test__card")
    const testName = testCard.querySelector(".test__name").textContent
    const testPrice = testCard.querySelector(".test__price").textContent

    // Simulate booking process
    alert(`Booking ${testName} for ${testPrice}. You will be redirected to the booking form.`)

    // Scroll to contact form
    document.getElementById("contact").scrollIntoView({
      behavior: "smooth",
    })
  })
})

/*==================== TYPING EFFECT ====================*/
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Apply typing effect to main title when page loads
window.addEventListener("load", () => {
  const mainTitle = document.querySelector(".home__title")
  if (mainTitle) {
    const originalText = mainTitle.textContent
    typeWriter(mainTitle, originalText, 50)
  }
})

/*==================== COUNTER ANIMATION ====================*/
function animateCounter(element, target, duration = 2000) {
  let start = 0
  const increment = target / (duration / 16)

  function updateCounter() {
    start += increment
    if (start < target) {
      element.textContent = Math.floor(start).toLocaleString()
      requestAnimationFrame(updateCounter)
    } else {
      element.textContent = target.toLocaleString()
    }
  }

  updateCounter()
}

// Animate counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const counter = entry.target
      const target = Number.parseInt(counter.textContent.replace(/[^\d]/g, ""))
      animateCounter(counter, target)
      counterObserver.unobserve(counter)
    }
  })
})

document.querySelectorAll(".stat h3").forEach((counter) => {
  counterObserver.observe(counter)
})

/*==================== PRELOADER ====================*/
window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader")
  if (preloader) {
    preloader.style.opacity = "0"
    setTimeout(() => {
      preloader.style.display = "none"
    }, 500)
  }
})

/*==================== FLOATING FOOTER CLICK HANDLERS ====================*/
document.addEventListener("DOMContentLoaded", () => {
  const floatingFooterItems = document.querySelectorAll(".floating-footer__item")
  
  floatingFooterItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      // Add click animation
      item.style.transform = "scale(0.95)"
      setTimeout(() => {
        item.style.transform = ""
      }, 150)
    })
  })
})