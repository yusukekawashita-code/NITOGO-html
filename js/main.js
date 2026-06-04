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
    if (hamburger.classList.contains("is-active")) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  hamburger.addEventListener("click", toggleMenu);

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
    }
  });

  mobileMenu.addEventListener("click", (e) => {
    if (e.target === mobileMenu) {
      closeMenu();
    }
  });
})();
