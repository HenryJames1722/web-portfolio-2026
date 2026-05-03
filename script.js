const resume = document.getElementById("resume");
const openBtn = document.getElementById("openResume");
const closeBtn = document.getElementById("closeResume");
const backdrop = document.getElementById("resumeBackdrop");

const miniBrand = document.getElementById("miniBrand");
const heroItems = document.querySelectorAll(
  ".hero-image, .bottom-text, .top-text, .socials, .resume-toggle, .btn",
);

/* =========================
   HERO SCROLL EFFECT
========================= */
window.addEventListener("scroll", function () {
  let scrollTop = window.scrollY;
  let progress = Math.min(scrollTop / 400, 1);

  heroItems.forEach((el, index) => {
    let speed = 0.2 + index * 0.1; // different speeds

    el.style.opacity = 1 - progress;
    el.style.transform = `
      translateY(${scrollTop * speed}px)
      scale(${1 - progress * 0.2})
    `;
  });

  if (progress > 0.7) {
    miniBrand.classList.add("show");
  } else {
    miniBrand.classList.remove("show");
  }
});

const buttons = document.querySelectorAll(".btn, .resume-toggle");

buttons.forEach((btn) => {
  btn.addEventListener("mouseenter", () => btn.classList.add("hovered"));
  btn.addEventListener("mouseleave", () => btn.classList.remove("hovered"));
});

/* =========================
   OPEN PANEL
========================= */
function openResume() {
  // RESET SCROLL TO TOP
  resume.scrollTop = 0;

  // OPEN PANEL
  resume.classList.add("show");
  backdrop.classList.add("show");
  document.body.classList.add("no-scroll");

  openBtn.classList.add("hide-btn");
}

/* =========================
   CLOSE PANEL
========================= */
function closeResume() {
  resume.classList.remove("show");
  backdrop.classList.remove("show");
  document.body.classList.remove("no-scroll");

  openBtn.classList.remove("hide-btn");
}

/* BUTTON EVENTS */
openBtn.addEventListener("click", openResume);
closeBtn.addEventListener("click", closeResume);

/* CLICK OUTSIDE TO CLOSE */
backdrop.addEventListener("click", closeResume);

/* =========================
   SHOW/HIDE BUTTON ON SCROLL
========================= */
function toggleResumeButton() {
  const rect = resume.getBoundingClientRect();

  // if panel is open → always hide button
  if (resume.classList.contains("show")) {
    openBtn.classList.add("hide-btn");
    return;
  }

  // normal scroll behavior
  if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= 200) {
    openBtn.classList.add("hide-btn");
  } else {
    openBtn.classList.remove("hide-btn");
  }
}

const printBtn = document.getElementById("printResume");

printBtn.addEventListener("click", () => {
  // replace with your actual PDF file path
  const pdfURL = "resume.pdf";

  const win = window.open(pdfURL, "_blank");

  // wait for PDF to load before printing
  win.onload = () => {
    win.focus();
    win.print();
  };
});

// CHAT TOGGLE
document.addEventListener("DOMContentLoaded", function () {
  const chatbotToggle = document.getElementById("chatbotToggle");
  const chatWindow = document.getElementById("chatWindow");
  const closeChat = document.getElementById("closeChat");

  closeChat.onclick = () => {
    chatWindow.style.display = "none";
  };

  let isOpen = false;

  // TOGGLE CHAT
  chatbotToggle.addEventListener("click", () => {
    isOpen = !isOpen;

    if (isOpen) {
      chatWindow.style.display = "flex";
      chatbotToggle.innerHTML = "💬"; // change to close icon
    } else {
      chatWindow.style.display = "none";
      chatbotToggle.innerHTML = "💬"; // back to chat icon
    }
  });
});

// SIMPLE AI LOGIC (RULE-BASED)
const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatBody = document.getElementById("chatBody");

sendBtn.onclick = sendMessage;

function sendMessage() {
  const msg = userInput.value.trim();
  if (!msg) return;

  // user message
  chatBody.innerHTML += `<div class="user-msg">${msg}</div>`;

  // simple AI replies (you can upgrade later)
  let reply = getReply(msg.toLowerCase());

  setTimeout(() => {
    chatBody.innerHTML += `<div class="bot-msg">${reply}</div>`;
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 400);

  userInput.value = "";
}

function getReply(msg) {
  if (msg.includes("skills")) {
    return "Henry is skilled in HTML, CSS, JavaScript, WordPress, PHP, and UI/UX design.";
  }

  if (msg.includes("projects")) {
    return "He built catering websites, healthcare systems, and a Java AI-based game project.";
  }

  if (msg.includes("experience")) {
    return "He has experience in internships, admin work, WordPress development, and web design.";
  }

  if (msg.includes("contact")) {
    return "You can contact Henry via email or LinkedIn in the footer section.";
  }

  if (msg.includes("education")) {
    return "He graduated from Cavite State University, where he gained valuable experience and developed his skills in both academic and practical settings.";
  }

  return "Choose a quick option or ask me about skills, projects, experience, or contact.";
}

function quickSend(text) {
  const chatBody = document.getElementById("chatBody");
  const userInput = document.getElementById("userInput");

  // show user message
  chatBody.innerHTML += `<div class="user-msg">${text}</div>`;

  let reply = getReply(text.toLowerCase());

  setTimeout(() => {
    chatBody.innerHTML += `<div class="bot-msg">${reply}</div>`;
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 400);

  userInput.value = "";
}

const slider = document.querySelector(".quick-replies-scroll");

let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  slider.classList.add("active");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener("mouseleave", () => {
  isDown = false;
});

slider.addEventListener("mouseup", () => {
  isDown = false;
});

slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();

  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1.5; // scroll speed

  slider.scrollLeft = scrollLeft - walk;
});

slider.addEventListener("touchstart", (e) => {
  startX = e.touches[0].pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener("touchmove", (e) => {
  const x = e.touches[0].pageX - slider.offsetLeft;
  const walk = (x - startX) * 1.5;
  slider.scrollLeft = scrollLeft - walk;
});

const burger = document.getElementById("burger");
const navLinks = document.querySelector(".nav-links");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

const navItems = document.querySelectorAll(".nav-links a");

// close menu when a link is clicked
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// about section JS code
const aboutBoxes = document.querySelectorAll(".about-box");
const aboutImage = document.querySelector(".about-image");
const aboutTitle = document.querySelector(".about h2");

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;
  const scrollingDown = currentScrollY > lastScrollY;

  // ===== TITLE FADE =====
  const titleRect = aboutTitle.getBoundingClientRect();
  const titleInView =
    titleRect.top < window.innerHeight - 100 && titleRect.bottom > 100;

  if (titleInView) {
    aboutTitle.classList.add("show");
  } else {
    aboutTitle.classList.remove("show");
  }

  // ===== IMAGE FADE =====
  const imageRect = aboutImage.getBoundingClientRect();
  const imageInView =
    imageRect.top < window.innerHeight - 100 && imageRect.bottom > 100;

  if (imageInView) {
    aboutImage.classList.add("show");
  } else {
    aboutImage.classList.remove("show");
  }

  // ===== BOXES (DIAGONAL) =====
  aboutBoxes.forEach((box) => {
    const rect = box.getBoundingClientRect();

    const isInView = rect.top < window.innerHeight - 100 && rect.bottom > 100;

    if (scrollingDown && isInView) {
      box.classList.add("show");
    }

    if (!scrollingDown && rect.top > window.innerHeight * 0.7) {
      box.classList.remove("show");
    }
  });

  lastScrollY = currentScrollY;
});
/* =========================
   TECH ICON COMET / ROCKET SCROLL
========================= */

const techCards = document.querySelectorAll(".tech-card");
let lastTechScrollY = window.scrollY;
let techAnimating = false;

window.addEventListener("scroll", () => {
  if (techAnimating) return;

  const currentY = window.scrollY;
  const scrollingDown = currentY > lastTechScrollY;

  techAnimating = true;

  // RIGHT → LEFT order
  const cards = [...techCards].reverse();

  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.remove("comet", "rocket", "tech-reset");

      if (scrollingDown) {
        card.classList.add("comet"); // diagonal down
      } else {
        card.classList.add("rocket"); // straight up
      }

      // return to normal
      setTimeout(() => {
        card.classList.remove("comet", "rocket");
        card.classList.add("tech-reset");
      }, 500);
    }, index * 90); // one-by-one delay
  });

  setTimeout(
    () => {
      techAnimating = false;
    },
    cards.length * 90 + 600,
  );

  lastTechScrollY = currentY;
});

const tooltip = document.getElementById("globalTooltip");

techCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    tooltip.textContent = card.getAttribute("data-exp");
    tooltip.style.opacity = "1";
  });

  card.addEventListener("mousemove", (e) => {
    tooltip.style.left = e.clientX + 20 + "px";
    tooltip.style.top = e.clientY + "px";
  });

  card.addEventListener("mouseleave", () => {
    tooltip.style.opacity = "0";
  });
});
const cards = document.querySelectorAll(".project-card, .design-card");

let lastY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentY = window.scrollY;
  const scrollingDown = currentY > lastY;

  cards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();

    const inView =
      rect.top < window.innerHeight * 0.85 &&
      rect.bottom > window.innerHeight * 0.1;

    // ENTER
    if (scrollingDown && inView) {
      setTimeout(() => {
        card.classList.add("show");
        card.classList.remove("exit");
      }, index * 100);
    }

    // EXIT (scroll up)
    // EXIT (scroll up — trigger while still visible)
    if (!scrollingDown && rect.top > window.innerHeight * 0.6) {
      setTimeout(() => {
        card.classList.remove("show");
        card.classList.add("exit");
      }, index * 80);
    }
  });

  lastY = currentY;
});
