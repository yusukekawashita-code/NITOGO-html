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

  hamburger.addEventListener("click", () => {
    hamburger.classList.contains("is-active") ? closeMenu() : openMenu();
  });

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
  if (!document.querySelector(".main-visual__slider") || typeof Swiper === "undefined") return;

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
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
})();

/* =========================
  Text Animation Function
========================= */
function animateTextChars(target, options = {}) {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined" || typeof SplitText === "undefined") return;

  const elements = typeof target === "string" ? document.querySelectorAll(target) : [target];

  if (!elements.length) return;

  elements.forEach((element) => {
    const split = new SplitText(element, {
      type: "chars",
    });

    gsap.from(split.chars, {
      scrollTrigger: {
        trigger: element,
        start: options.start || "top 80%",
        once: true,
      },
      opacity: 0,
      y: options.y || 30,
      rotateX: options.rotateX || 0,
      stagger: options.stagger || 0.03,
      duration: options.duration || 1,
      ease: options.ease || "power3.out",
    });
  });
}

function animateTextGroup(sectionSelector, titleSelector, textSelector, options = {}) {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined" || typeof SplitText === "undefined") return;

  const sections = document.querySelectorAll(sectionSelector);
  if (!sections.length) return;

  sections.forEach((section) => {
    const title = section.querySelector(titleSelector);
    const text = section.querySelector(textSelector);

    if (!title && !text) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: options.start || "top 70%",
        once: true,
      },
    });

    if (title) {
      const splitTitle = new SplitText(title, {
        type: "chars",
      });

      tl.from(splitTitle.chars, {
        opacity: 0,
        y: options.titleY || 60,
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
          y: options.textY || 60,
          rotateX: options.textRotateX || 0,
          stagger: options.textStagger || 0.015,
          duration: options.textDuration || 1,
          ease: options.ease || "power3.out",
        },
        options.textPosition ?? "-=0.4",
      );
    }
  });
}

function animateSectionTitle() {
  const titles = document.querySelectorAll(".js-section-title");

  if (!titles.length) return;

  titles.forEach((title) => {
    animateTextChars(title, {
      start: "top 70%",
      y: 60,
      rotateX: -90,
      stagger: 0.05,
      duration: 1,
    });

    const line = title.querySelector(".section-title__line");

    if (!line) return;

    gsap.to(line, {
      scrollTrigger: {
        trigger: title,
        start: "top 70%",
        once: true,
      },
      scaleX: 1,
      duration: 0.8,
      delay: 0.4,
      ease: "power3.out",
    });
  });
}
/* =========================
  Concept Animation
========================= */
animateTextGroup(".concept", ".js-concept-title", ".js-concept-text", {
  start: "top 70%",
  titleY: 60,
  titleRotateX: -90,
  titleStagger: 0.025,
  titleDuration: 1.2,
  textY: 40,
  textStagger: 0.02,
  textDuration: 1.2,
  textPosition: 1.4,
});

/* =========================
  Common Section Title Animation
========================= */
animateSectionTitle();

/* =========================
  Pick Up Animation
========================= */
(() => {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

  gsap.from(".pickup__item", {
    scrollTrigger: {
      trigger: ".pickup",
      start: "top 55%",
      once: true,
    },
    opacity: 0,
    y: 80,
    scale: 0.92,
    filter: "blur(24px)",
    stagger: 0.3,
    duration: 1.8,
    ease: "expo.out",
  });
})();
/* =========================
  News Animation
========================= */
(() => {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

  const newsItems = document.querySelectorAll(".news__item");

  if (!newsItems.length) return;

  gsap.from(newsItems, {
    scrollTrigger: {
      trigger: ".news",
      start: "top 85%",
      once: true,
    },

    opacity: 0,
    y: 50,
    filter: "blur(20px)",

    duration: 2.5,
    stagger: 0.5,

    ease: "expo.out",
  });

  gsap.from(".news__button", {
    scrollTrigger: {
      trigger: ".news__button",
      start: "top 90%",
      once: true,
    },

    opacity: 0,
    y: 30,

    duration: 1.4,
    delay: 0.4,

    ease: "power3.out",
  });
})();
