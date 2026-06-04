/* =========================
  Hamburger Menu
========================= */
(() => {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (!hamburger || !mobileMenu) return;

  const menuLinks = mobileMenu.querySelectorAll("a");

  const openMenu = () => {
    hamburger.classList.add("is-active");
    mobileMenu.classList.add("is-active");

    hamburger.setAttribute("aria-expanded", "true");
    mobileMenu.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    hamburger.classList.remove("is-active");
    mobileMenu.classList.remove("is-active");

    hamburger.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
  };

  const toggleMenu = () => {
    hamburger.classList.contains("is-active") ? closeMenu() : openMenu();
  };

  hamburger.addEventListener("click", toggleMenu);

  menuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  mobileMenu.addEventListener("click", (e) => {
    if (e.target === mobileMenu) closeMenu();
  });
})();

/* =========================
  Main Visual Slider
========================= */
(() => {
  const slider = document.querySelector(".main-visual__slider");

  if (!slider || typeof Swiper === "undefined") return;

  new Swiper(".main-visual__slider", {
    loop: true,
    effect: "fade",
    speed: 1800,

    autoplay: {
      delay: 5200,
      disableOnInteraction: false,
    },

    fadeEffect: {
      crossFade: true,
    },

    pagination: {
      el: ".main-visual__pagination",
      clickable: true,
    },

    navigation: {
      nextEl: ".main-visual__button--next",
      prevEl: ".main-visual__button--prev",
    },
  });
})();

/* =========================
  GSAP Setup
========================= */
(() => {
  if (typeof gsap === "undefined") return;

  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }
})();

/* =========================
  Text Animation Function
========================= */
function animateTextGroup(sectionSelector, titleSelector, textSelector, options = {}) {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined" || typeof SplitText === "undefined") {
    return;
  }

  const sections = document.querySelectorAll(sectionSelector);
  if (!sections.length) return;

  sections.forEach((section) => {
    const title = section.querySelector(titleSelector);
    const text = section.querySelector(textSelector);

    if (!title && !text) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: options.start || "top 80%",
        once: true,
      },
    });

    if (title) {
      const splitTitle = new SplitText(title, {
        type: "chars",
      });

      tl.from(splitTitle.chars, {
        opacity: 0,
        y: options.titleY || 40,
        rotateX: options.titleRotateX ?? -90,
        stagger: options.titleStagger || 0.025,
        duration: options.titleDuration || 1.2,
        ease: options.ease || "power3.out",
      });
    }

    if (text) {
      const splitText = new SplitText(text, {
        type: "chars",
      });

      tl.from(
        splitText.chars,
        {
          opacity: 0,
          y: options.textY || 30,
          rotateX: options.textRotateX || 0,
          stagger: options.textStagger || 0.015,
          duration: options.textDuration || 1,
          ease: options.ease || "power3.out",
        },
        options.textPosition || "-=0.4",
      );
    }
  });
}

/* =========================
  Concept Text Animation
========================= */
animateTextGroup(".concept", ".js-concept-title", ".js-concept-text", {
  start: "top 80%",
  titleY: 40,
  titleRotateX: -90,
  titleStagger: 0.025,
  titleDuration: 1.2,
  textY: 30,
  textStagger: 0.015,
  textDuration: 1,
  textPosition: 0.5,
});
