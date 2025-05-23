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
