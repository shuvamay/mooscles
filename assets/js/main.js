// Cache DOM elements
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");
const navLink = document.querySelectorAll(".nav__link");
const header = document.getElementById("header");
const scrollUp = document.getElementById("scroll-up");
const sections = document.querySelectorAll("section[id]");
const calculateForm = document.getElementById("calculate-form");
const calculateCm = document.getElementById("calculate-cm");
const calculateKg = document.getElementById("calculate-kg");
const calculateMessage = document.getElementById("calculate-message");
const contactForm = document.getElementById("contact-form");
const contactMessage = document.getElementById("contact-message");
const contactUser = document.getElementById("contact-user");

// Show menu function
const showMenu = () => {
  navMenu.classList.add("show-menu");
};

// Hide menu function
const hideMenu = () => {
  navMenu.classList.remove("show-menu");
};

// Toggle menu event listener
if (navToggle) {
  navToggle.addEventListener("click", showMenu);
}

// Close menu event listener
if (navClose) {
  navClose.addEventListener("click", hideMenu);
}

// Remove menu mobile function
const linkAction = () => {
  hideMenu();
};

// Scroll header function
const scrollHeader = () => {
  const scrollY = window.scrollY;
  scrollY >= 50
    ? header.classList.add("bg-header")
    : header.classList.remove("bg-header");
};

// Scroll active link function
const scrollActive = () => {
  const scrollY = window.scrollY;
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 58;
    const sectionId = current.getAttribute("id");
    const sectionsClass = document.querySelector(
      `.nav__menu a[href*=${sectionId}]`
    );

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      sectionsClass.classList.add("active-link");
    } else {
      sectionsClass.classList.remove("active-link");
    }
  });
};

// Show scroll up function
const showScrollUp = () => {
  this.scrollY >= 350
    ? scrollUp.classList.add("show-scroll")
    : scrollUp.classList.remove("show-scroll");
};

// Scroll reveal animation
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
});

sr.reveal(`.home__data, .footer__content, .footer__group`);
sr.reveal(`.myImg`, { delay: 700, origin: "bottom" });
sr.reveal(`.logos__img, .program__card, .pricing__card`, { interval: 100 });
sr.reveal(`.choose__img, .calculate__content`, { origin: `left` });
sr.reveal(`.choose__content, .calculate__img`, { origin: `right` });

// Scroll event listeners
window.addEventListener("scroll", () => {
  scrollHeader();
  scrollActive();
  showScrollUp();
});

// Calculate BMI function
const calculateBmi = (e) => {
  e.preventDefault();
  if (calculateCm.value === "" || calculateKg.value === "") {
    calculateMessage.classList.remove("color-green");
    calculateMessage.classList.add("color-red");
    calculateMessage.textContent = "Fill in the Height and Weight 👨‍💻";
    setTimeout(() => {
      calculateMessage.textContent = "";
    }, 3000);
  } else {
    const cm = calculateCm.value / 100;
    const kg = calculateKg.value;
    const bmi = Math.round(kg / (cm * cm));
    let message = "";

    if (bmi < 18.5) {
      calculateMessage.classList.add("color-red");
      message = `Your BMI is ${bmi} and you are skinny`;
    } else if (bmi < 25) {
      calculateMessage.classList.add("color-green");
      message = `Your BMI is ${bmi} and you are healthy`;
    } else {
      calculateMessage.classList.add("color-red");
      message = `Your BMI is ${bmi} and you are overweight`;
    }
    calculateMessage.classList.remove("color-red", "color-green");

    calculateMessage.classList.add(bmi < 25 ? "color-green" : "color-red");
    calculateMessage.textContent = message;

    // Clear the input fields
    calculateCm.value = "";
    calculateKg.value = "";

    // Remove message after four seconds
    setTimeout(() => {
      calculateMessage.textContent = "";
    }, 4000);
  }
};

// Calculate BMI event listener
calculateForm.addEventListener("submit", calculateBmi);

// Send email function
const sendEmail = (e) => {
  e.preventDefault();
  if (contactUser.value === "") {
    contactMessage.classList.remove("color-green");
    contactMessage.classList.add("color-red");
    contactMessage.textContent = "You must enter your email.";
    setTimeout(() => {
      contactMessage.textContent = "";
    }, 3000);
  } else {
    emailjs
      .sendForm(
        "service_bjg1wx8",
        "template_die4jii",
        "#contact-form",
        "U3sw6CuHSLpaKa5vb"
      )
      .then(() => {
        // Show success message
        contactMessage.classList.add("color-green");
        contactMessage.textContent = "You registered successfully";
        setTimeout(() => {
          contactMessage.textContent = "";
        }, 3000);
      })
      .catch((error) => {
        // Show error message if mail sending fails
        alert("OOPS! SOMETHING HAS FAILED...", error);
      });

    // Clear the input field
    contactUser.value = "";
  }
};

// Send email event listener
contactForm.addEventListener("submit", sendEmail);
