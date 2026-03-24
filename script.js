const scrollButton = document.querySelector("[data-scroll]");
const rotatingWord = document.querySelector("[data-rotate]");
const yearTarget = document.querySelector("#current-year");
const revealItems = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

if (scrollButton) {
  scrollButton.addEventListener("click", () => {
    const targetSelector = scrollButton.getAttribute("data-scroll");
    const target = targetSelector
      ? document.querySelector(targetSelector)
      : null;

    target?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  });
}

if (rotatingWord && !reduceMotion) {
  const words = ["software", "interfaces", "ideas", "prototipos"];
  let index = 0;

  window.setInterval(() => {
    rotatingWord.classList.add("is-switching");

    window.setTimeout(() => {
      index = (index + 1) % words.length;
      rotatingWord.textContent = words[index];
      rotatingWord.classList.remove("is-switching");
    }, 180);
  }, 2400);
}

if (!reduceMotion && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
