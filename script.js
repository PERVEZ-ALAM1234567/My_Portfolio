// Typing Animation
const typed = new Typed(".typing", {
  strings: [
    "Frontend Developer",
    "AI Enthusiast",
    "Web Designer",
    "Problem Solver",
  ],
  typeSpeed: 100,
  backSpeed: 60,
  loop: true,
});

// Theme Toggle
const themeToggle = document.querySelector(".theme-toggle");
const body = document.body;

// Local storage se theme check karo
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  body.setAttribute("data-theme", "dark");
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

// Theme toggle event listener
themeToggle.addEventListener("click", () => {
  if (body.getAttribute("data-theme") === "dark") {
    body.removeAttribute("data-theme");
    localStorage.setItem("theme", "light"); // Light mode save
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  } else {
    body.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark"); // Dark mode save
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
});

// Scroll Progress
const scrollProgress = document.querySelector(".scroll-progress");
window.addEventListener("scroll", () => {
  const totalScroll =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (window.scrollY / totalScroll) * 100;
  scrollProgress.style.width = `${scrolled}%`;
});

// Back to Top Button
const backToTop = document.querySelector(".back-to-top");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Reveal Elements on Scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

document
  .querySelectorAll(".skill-card, .project-card, .contact-card")
  .forEach((el) => {
    observer.observe(el);
  });

// Smooth Scrolling for Navigation Links
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    targetSection.scrollIntoView({ behavior: "smooth" });
  });
});

// Mouse Trail Effect
function createTrail() {
  const trail = document.createElement("div");
  trail.className = "trail";
  document.body.appendChild(trail);

  setTimeout(() => {
    trail.remove();
  }, 500);

  return trail;
}

document.addEventListener("mousemove", (e) => {
  const trail = createTrail();
  trail.style.left = e.pageX + "px";
  trail.style.top = e.pageY + "px";
});

// Achievement Counter Animation
const counters = document.querySelectorAll(".counter");
const speed = 200;

function animateCounter(counter) {
  const target = +counter.getAttribute("data-target");
  let count = 0;

  const updateCount = () => {
    const increment = target / speed;

    if (count < target) {
      count += increment;
      counter.innerText = Math.ceil(count);
      setTimeout(updateCount, 1);
    } else {
      counter.innerText = target;
    }
  };

  updateCount();
}

// Trigger counter animation when in view
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        animateCounter(counter);
        counterObserver.unobserve(counter);
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => {
  counterObserver.observe(counter);
});

// Timeline Animation
const timelineItems = document.querySelectorAll(".timeline-item");

const timelineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        timelineObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

timelineItems.forEach((item) => {
  timelineObserver.observe(item);
});

// Tech Stack Interaction
const techItems = document.querySelectorAll(".tech-item");

techItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    item.style.transform = "translateY(-10px) rotate(360deg)";
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform = "translateY(0) rotate(0)";
  });
});

// Form Submission
const contactForm = document.querySelector(".contact-form");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Add your form submission logic here
  alert("Message sent successfully!");
  contactForm.reset();
});

// Hamburger Toggle Menu
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav ul");

  menuToggle.addEventListener("click", function () {
    nav.classList.toggle("show"); // Toggle class to show/hide menu
  });
});

// Project Section
const projectTrack = document.querySelector(".project-track");
const projectPrevButton = document.querySelector(".project-prev-btn");
const projectNextButton = document.querySelector(".project-next-btn");

let projectCurrentIndex = 0;

// Navigation Functions
function updateProjectCarousel() {
  const slideWidth = document.querySelector(".project-card").offsetWidth + 32; // Including gap
  projectTrack.style.transform = `translateX(-${projectCurrentIndex * slideWidth}px)`;
}

// Previous Button Click
projectPrevButton.addEventListener("click", () => {
  const cards = document.querySelectorAll(".project-card");
  if (projectCurrentIndex > 0) {
    projectCurrentIndex--;
    updateProjectCarousel();
  }
});

// Next Button Click
projectNextButton.addEventListener("click", () => {
  const cards = document.querySelectorAll(".project-card");
  if (projectCurrentIndex < cards.length - 1) {
    projectCurrentIndex++;
    updateProjectCarousel();
  }
});

// Touch Swipe Support
let projectTouchStartX = 0;
let projectTouchEndX = 0;

projectTrack.addEventListener("touchstart", (e) => {
  projectTouchStartX = e.changedTouches[0].screenX;
});

projectTrack.addEventListener("touchend", (e) => {
  projectTouchEndX = e.changedTouches[0].screenX;
  handleProjectSwipe();
});

function handleProjectSwipe() {
  const swipeThreshold = 50;
  const diff = projectTouchStartX - projectTouchEndX;
  const cards = document.querySelectorAll(".project-card");

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0 && projectCurrentIndex > 0) {
      // Swipe Right
      projectCurrentIndex--;
      updateProjectCarousel();
    } else if (diff < 0 && projectCurrentIndex < cards.length - 1) {
      // Swipe Left
      projectCurrentIndex++;
      updateProjectCarousel();
    }
  }
}

// Initialize and handle window resize
window.addEventListener("load", updateProjectCarousel);
window.addEventListener("resize", updateProjectCarousel);

// Certificate Section
const certificatePrevButton = document.querySelector(".certificate-prev-btn");
const certificateNextButton = document.querySelector(".certificate-next-btn");
const certificateTrack = document.querySelector(".carousel-track");
const modal = document.querySelector(".modal");
const modalImage = document.querySelector(".modal-image");
const modalTitle = document.querySelector(".modal-content .certificate-title");
const modalIssuer = document.querySelector(".modal-content .certificate-issuer");
const modalDate = document.querySelector(".modal-content .certificate-date");
const modalDescription = document.querySelector(".modal-content .certificate-description");
const closeButton = document.querySelector(".close-btn");
const shareButton = document.querySelector(".certificate-share-btn");
const sharePopup = document.querySelector(".share-popup");
const downloadButton = document.querySelector(".certificate-download-btn");

let certificateCurrentIndex = 0;
let currentCertificate = null;

// Navigation Functions
function updateCertificateCarousel() {
  const slideWidth = document.querySelector(".certificate-card").offsetWidth + 32; // Including gap
  certificateTrack.style.transform = `translateX(-${certificateCurrentIndex * slideWidth}px)`;
}

// Previous Button Click
certificatePrevButton.addEventListener("click", () => {
  const cards = document.querySelectorAll(".certificate-card");
  if (certificateCurrentIndex > 0) {
    certificateCurrentIndex--;
    updateCertificateCarousel();
  }
});

// Next Button Click
certificateNextButton.addEventListener("click", () => {
  const cards = document.querySelectorAll(".certificate-card");
  if (certificateCurrentIndex < cards.length - 1) {
    certificateCurrentIndex++;
    updateCertificateCarousel();
  }
});

// Modal Functions
function openModal(card) {
  const img = card.querySelector(".certificate-image");
  const title = card.querySelector(".certificate-title");
  const issuer = card.querySelector(".certificate-issuer");
  const date = card.querySelector(".certificate-date");
  const description = card.querySelector(".certificate-description");

  modalImage.src = img.src;
  modalImage.alt = img.alt;
  modalTitle.textContent = title.textContent;
  modalIssuer.textContent = issuer.textContent;
  modalDate.textContent = date.textContent;
  modalDescription.textContent = description.textContent;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("active");
  sharePopup.classList.remove("active");
  document.body.style.overflow = "";
}

// Event Listeners
document.querySelectorAll(".certificate-card").forEach((card) => {
  card.addEventListener("click", () => openModal(card));
});

closeButton.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// Share Functionality
shareButton.addEventListener("click", (e) => {
  e.stopPropagation();
  sharePopup.classList.toggle("active");
});

document.querySelector(".facebook").addEventListener("click", () => {
  const text = `Check out my ${modalTitle.textContent} certificate from ${modalIssuer.textContent}!`;
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://example.com")}&quote=${encodeURIComponent(text)}`, "_blank");
});

document.querySelector(".whatsapp").addEventListener("click", () => {
  const text = `Check out my ${modalTitle.textContent} certificate from ${modalIssuer.textContent}!`;

  // Pehle WhatsApp Desktop kholne ki koshish karega
  let whatsappURL = `whatsapp://send?text=${encodeURIComponent(text)}`;
  window.open(whatsappURL, "_blank");

  // 2 second ke andar agar WhatsApp Desktop nahi khula, to Web pe redirect karega
  setTimeout(() => {
    window.open(`https://web.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  }, 2000);
});

document.querySelector(".instagram").addEventListener("click", () => {
  const text = `Check out my ${modalTitle.textContent} certificate from ${modalIssuer.textContent}!`;
  window.open(`https://www.instagram.com/?url=${encodeURIComponent("https://example.com")}`, "_blank");
});

// Download Functionality
const certificatedownloadBtn = document.querySelector(".certificate-download-btn");

// certificatedownloadBtn.addEventListener("click", () => {
//   const link = document.createElement("a");
//   link.href = modalImage.src;
//   link.download = `${modalTitle.textContent}.png`;
//   link.click();
//   link.remove();
// });
// certificatedownloadBtn.addEventListener("click", (e) => {
//   e.preventDefault(); // Default behavior ko rokta hai (image ko naye tab me open hone se bachata hai)

//   const link = document.createElement("a");
//   link.href = fullscreenImage.src;
//   link.setAttribute("download", `about-image-${currentIndex + 1}.png`);
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// });
certificatedownloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');  // Create a link element
  link.href = modalImage.src;  // Set image source
  link.download = 'certificate.png';  // Set default filename
  document.body.appendChild(link);  // Append link to body
  link.click();  // Trigger the download
  document.body.removeChild(link);  // Remove link after download
});

// ESC Key to Close Modal
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeModal();
  }
});

// Touch Swipe Support
let touchStartX = 0;
let touchEndX = 0;

certificateTrack.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

certificateTrack.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleCertificateSwipe();
});

function handleCertificateSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  const cards = document.querySelectorAll(".certificate-card");

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0 && certificateCurrentIndex > 0) {
      // Swipe Right
      certificateCurrentIndex--;
      updateCertificateCarousel();
    } else if (diff < 0 && certificateCurrentIndex < cards.length - 1) {
      // Swipe Left
      certificateCurrentIndex++;
      updateCertificateCarousel();
    }
  }
}

// Initialize
window.addEventListener("load", updateCertificateCarousel);
window.addEventListener("resize", updateCertificateCarousel);

// About Section Image Carousel
const imageTrack = document.querySelector(".image-track");
const images = document.querySelectorAll(".about-image");
const aboutModal = document.querySelector(".fullscreen-modal");
const fullscreenImage = document.querySelector(".fullscreen-image");
const closeBtn = document.querySelector(".close-modal");
const prevBtn = document.querySelector(".about-prev-btn");
const nextBtn = document.querySelector(".about-next-btn");
const downloadBtn = document.querySelector(".download-btn");

let currentIndex = 0;
let autoScrollInterval;
let isAutoScrolling = true;

// Auto Scroll Function
function startAutoScroll() {
  if (!isAutoScrolling) return;

  autoScrollInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
  }, 1000); // Change image every 1 seconds
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

function updateCarousel() {
  const offset = -currentIndex * 100;
  imageTrack.style.transform = `translateX(${offset}%)`;
}

// Initialize Auto Scroll
startAutoScroll();

// Click to Stop/Start Auto Scroll
imageTrack.addEventListener("click", (e) => {
  if (e.target.classList.contains("about-image")) {
    openFullscreen(e.target);
  }
});

// Fullscreen Functions
function openFullscreen(clickedImage) {
  stopAutoScroll();
  isAutoScrolling = false;

  currentIndex = Array.from(images).indexOf(clickedImage);
  fullscreenImage.src = clickedImage.src;
  fullscreenImage.alt = clickedImage.alt;
  aboutModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeFullscreen() {
  aboutModal.classList.remove("active");
  document.body.style.overflow = "";
  isAutoScrolling = true;
  startAutoScroll();
}

// Navigation Functions
function showPreviousImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  fullscreenImage.src = images[currentIndex].src;
  fullscreenImage.alt = images[currentIndex].alt;
}

function showNextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  fullscreenImage.src = images[currentIndex].src;
  fullscreenImage.alt = images[currentIndex].alt;
}

// Event Listeners
closeBtn.addEventListener("click", closeFullscreen);
prevBtn.addEventListener("click", showPreviousImage);
nextBtn.addEventListener("click", showNextImage);

// ESC key to close fullscreen
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && aboutModal.classList.contains("active")) {
    closeFullscreen();
  }
});

downloadBtn.addEventListener("click", (e) => {
  e.preventDefault(); // Default behavior ko rokta hai (image ko naye tab me open hone se bachata hai)

  const link = document.createElement("a");
  link.href = fullscreenImage.src;
  link.setAttribute("download", `about-image-${currentIndex + 1}.png`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});



// Stop auto-scroll when hovering over the carousel
imageTrack.addEventListener("mouseenter", stopAutoScroll);
imageTrack.addEventListener("mouseleave", () => {
  if (isAutoScrolling) {
    startAutoScroll();
  }
});

// Initialize on page load
window.addEventListener("load", updateCarousel);