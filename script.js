/******************HEADER******************/
function scrollHeader() {
  const header = document.getElementById("header");
  //when the scroll is greater than 50 viewport
  if (this.scrollY >= 50) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}

window.addEventListener("scroll", scrollHeader);

/******************Active Link*************/
const navlink = document.querySelectorAll(".nav-link");

function activeLink() {
  navlink.forEach((a) => a.classList.remove("active-link"));
  this.classList.add("active-link");
}
navlink.forEach((a) => a.addEventListener("click", activeLink));

/*****************Show Menu***************/
const navMenu = document.getElementById("nav-menu");
navToggle = document.getElementById("nav-toggle");
navClose = document.getElementById("nav-close");

/*******Menu Show*******/
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*******Menu Hide********/
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/**********Menu Hide when we click on menu-link*********/
const navLink = document.querySelectorAll(".nav-link");

function linkAction() {
  navMenu.classList.remove("show-menu");
}

navLink.forEach((link) => link.addEventListener("click", linkAction));

/****************Contact Form**************/
const contactForm = document.getElementById("contact-form");
const contactName = document.getElementById("contact-name");
const contactEmail = document.getElementById("contact-email");
const Message = document.getElementById("message");
const contactMessage = document.getElementById("contact-message");

const sendEmail = (e) => {
  e.preventDefault();

  if (
    contactName.value === "" ||
    contactEmail.value === "" ||
    Message.value === ""
  ) {
    //add and remove color
    contactMessage.classList.remove("color-light");
    contactMessage.classList.add("color-dark");

    //show message
    contactMessage.textContent = "Write all the input fields";
  } else {
    //serviceID - templateID - #form - publickey
    emailjs
      .sendForm(
        "service_9ugpiep",
        "template_5enyanf",
        "#contact-form",
        "UjlFJ8-DNsdYXMP2i"
      )
      .then(
        () => {
          //show message and add color, window + dot to open emoji
          contactMessage.classList.add("color-light");
          contactMessage.textContent = "Message sent ✔";

          //remove message after 5 seconds
          setTimeout(() => {
            contactMessage.textContent = "";
          }, 5000);
        },
        (error) => {
          alert("OOPS! SOMETHING WENT WRONG...", error);
        }
      );
    // clear input fields
    contactName.value = "";
    contactEmail.value = "";
    Message.value = "";
  }
};

contactForm.addEventListener("submit", sendEmail);

// ANIMATIONS
/***************Home**********************/
ScrollReveal().reveal(".home-list dt", { interval: 500, delay: 800 });
ScrollReveal().reveal(".home-list dd", { interval: 500, delay: 800 });
ScrollReveal().reveal(".home-img", {
  distance: "150px",
  origin: "left",
  duration: 2000,
});
ScrollReveal().reveal(".home-infos", {
  distance: "150px",
  origin: "right",
  duration: 2000,
});

/***************Hello**********************/
ScrollReveal().reveal(".section-title", {
  distance: "100px",
  duration: 1500,
  origin: "left",
  viewFactor: 0.8,
});
ScrollReveal().reveal(".hello-details", {
  distance: "100px",
  duration: 1500,
  origin: "right",
  viewFactor: 0.8,
});
ScrollReveal().reveal(".button-flex", {
  distance: "100px",
  duration: 1000,
  origin: "bottom",
});

/******************Counter Animation******************/
const counters = document.querySelectorAll(".counter-number");

const animateCounters = () => {
  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText.replace("+", "");
      const increment = target / 200;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment) + "+";
        setTimeout(updateCount, 80);
      } else {
        counter.innerText = target + "+";
      }
    };
    updateCount();
  });
};

const counterSection = document.getElementById("counter");
const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
      observer.disconnect();
    }
  },
  { threshold: 0.5 }
);

observer.observe(counterSection);

ScrollReveal().reveal(".counter-item:nth-child(1)", {
  distance: "50px",
  origin: "bottom",
  duration: 2000,
  delay: 200, // Delay for the first item
  opacity: 0,
  viewFactor: 0.1,
});

ScrollReveal().reveal(".counter-item:nth-child(2)", {
  distance: "50px",
  origin: "bottom",
  duration: 2000,
  delay: 400, // Delay for the second item
  opacity: 0,
  viewFactor: 0.1,
});

ScrollReveal().reveal(".counter-item:nth-child(3)", {
  distance: "50px",
  origin: "bottom",
  duration: 2000,
  delay: 600, // Delay for the third item
  opacity: 0,
  viewFactor: 0.1,
});
// Advanced liquid mouse effect for home section
const homeSection = document.querySelector(".home");
const liquidBlobs = document.querySelectorAll(".liquid-blob");
const liquidTrails = document.querySelectorAll(".liquid-trail");

let mouseX = 0;
let mouseY = 0;
let isMouseInSection = false;
let trailHistory = [];
const maxTrails = 5;

homeSection.addEventListener("mousemove", (e) => {
  const rect = homeSection.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
  isMouseInSection = true;

  trailHistory.unshift({ x: mouseX, y: mouseY, time: Date.now() });
  if (trailHistory.length > maxTrails) {
    trailHistory.pop();
  }

  updateLiquidEffect();
});

homeSection.addEventListener("mouseleave", () => {
  isMouseInSection = false;
  liquidBlobs.forEach((blob) => (blob.style.opacity = "0"));
  liquidTrails.forEach((trail) => (trail.style.opacity = "0"));
  trailHistory = [];
});

function updateLiquidEffect() {
  if (!isMouseInSection) return;

  liquidBlobs.forEach((blob, index) => {
    const delay = index * 50;
    const offsetX =
      (index - 2) * 40 + Math.sin(Date.now() * 0.002 + index) * 20;
    const offsetY =
      (index - 2) * 30 + Math.cos(Date.now() * 0.003 + index) * 15;

    setTimeout(() => {
      blob.style.opacity = "0.8";
      blob.style.left = mouseX - blob.offsetWidth / 2 + offsetX + "px";
      blob.style.top = mouseY - blob.offsetHeight / 2 + offsetY + "px";

      const speed = getMouseSpeed();
      const morphScale = 1 + speed * 0.001;
      blob.style.transform = `scale(${morphScale}) rotate(${
        Date.now() * 0.1 + index * 45
      }deg)`;
    }, delay);
  });

  liquidTrails.forEach((trail, index) => {
    if (trailHistory[index]) {
      const trailData = trailHistory[index];
      const age = Date.now() - trailData.time;
      const opacity = Math.max(0, 0.5 - age * 0.001);

      trail.style.opacity = opacity;
      trail.style.left = trailData.x - trail.offsetWidth / 2 + "px";
      trail.style.top = trailData.y - trail.offsetHeight / 2 + "px";

      const scale = 1 - age * 0.0005;
      trail.style.transform = `scale(${Math.max(0.1, scale)})`;
    }
  });
}

let lastMousePos = { x: 0, y: 0 };
let mouseSpeed = 0;

function getMouseSpeed() {
  const deltaX = mouseX - lastMousePos.x;
  const deltaY = mouseY - lastMousePos.y;
  mouseSpeed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  lastMousePos = { x: mouseX, y: mouseY };
  return mouseSpeed;
}

let liquidAnimation;
homeSection.addEventListener("mouseenter", () => {
  liquidAnimation = setInterval(() => {
    if (!isMouseInSection) return;

    liquidBlobs.forEach((blob, index) => {
      const time = Date.now() * 0.001;
      const waveX = Math.sin(time + index * 1.5) * 15;
      const waveY = Math.cos(time * 1.2 + index * 2) * 10;

      const currentTransform = blob.style.transform || "";
      if (currentTransform.includes("translate")) {
        blob.style.transform = currentTransform.replace(
          /translate\([^)]+\)/,
          `translate(${waveX}px, ${waveY}px)`
        );
      } else {
        blob.style.transform =
          currentTransform + ` translate(${waveX}px, ${waveY}px)`;
      }

      const morph1 = 30 + Math.sin(time * 2 + index) * 20;
      const morph2 = 40 + Math.cos(time * 1.5 + index) * 25;
      const morph3 = 50 + Math.sin(time * 1.8 + index) * 15;
      const morph4 = 35 + Math.cos(time * 2.2 + index) * 30;

      blob.style.borderRadius = `${morph1}% ${morph2}% ${morph3}% ${morph4}% / ${morph2}% ${morph3}% ${morph1}% ${morph4}%`;
    });
  }, 60);
});

homeSection.addEventListener("mouseleave", () => {
  if (liquidAnimation) clearInterval(liquidAnimation);
});

// Click ripple effect
homeSection.addEventListener("click", (e) => {
  if (!isMouseInSection) return;

  const ripple = document.createElement("div");
  ripple.style.cssText = `
        position: absolute;
        left: ${mouseX - 50}px;
        top: ${mouseY - 50}px;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
        pointer-events: none;
        z-index: 2;
        animation: liquidRipple 1s ease-out forwards;
    `;

  document.querySelector(".liquid-mouse-effect").appendChild(ripple);
  setTimeout(() => ripple.remove(), 1000);
});

// Add ripple animation
const style = document.createElement("style");
style.textContent = `
    @keyframes liquidRipple {
        0% { transform: scale(0); opacity: 0.8; }
        100% { transform: scale(4); opacity: 0; }
    }
`;
document.head.appendChild(style);
/***************Services**********************/
ScrollReveal().reveal(
  ".services-item:nth-child(1), .services-item:nth-child(3)",
  { distance: "100px", viewFactor: 0.35, origin: "left", duration: 2000 }
);
ScrollReveal().reveal(
  ".services-item:nth-child(2), .services-item:nth-child(4)",
  { distance: "100px", viewFactor: 0.35, origin: "right", duration: 2000 }
);

/***************Skills**********************/
ScrollReveal().reveal(".skills-title", {
  distance: "100px",
  origin: "left",
  viewFactor: 1,
});
ScrollReveal().reveal(".skills-data", {
  distance: "200px",
  origin: "left",
  viewFactor: 1,
  interval: 500,
});

/***************Work**********************/
ScrollReveal().reveal(".work-item", { scale: 0.5, viewFactor: 0.5 });

/***************Contact**********************/
ScrollReveal().reveal(".contact-info", {
  distance: "100px",
  origin: "left",
  viewFactor: 0.4,
  duration: 2000,
});
ScrollReveal().reveal(".contact-socials li", { interval: 500, delay: 500 });
ScrollReveal().reveal(".contact-form", {
  distance: "100px",
  origin: "right",
  viewFactor: 0.4,
  duration: 2000,
});
