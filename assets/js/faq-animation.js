// Intersection Observer để phát hiện khi scroll đến FAQ section
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Chờ DOM load xong
document.addEventListener("DOMContentLoaded", () => {
  const socialBox = document.querySelector(".social-box");
  const contactBox = document.querySelector(".contact-box");

  if (socialBox) observer.observe(socialBox);
  if (contactBox) observer.observe(contactBox);
});
