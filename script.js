const mobileScreens = [
  { title: "Mobile - Admin Dashboard", url: "https://raw.githubusercontent.com/lb2027/ppt/refs/heads/main/assets/pmobile/Picture1.jpg" },
  { title: "Mobile - Product Management", url: "https://raw.githubusercontent.com/lb2027/ppt/refs/heads/main/assets/pmobile/Picture16.jpg" },
  { title: "Mobile - Sales History", url: "https://raw.githubusercontent.com/lb2027/ppt/refs/heads/main/assets/pmobile/Picture5.jpg" },
  { title: "Mobile - Staff Management", url: "https://raw.githubusercontent.com/lb2027/ppt/refs/heads/main/assets/pmobile/Picture7.jpg" },
  { title: "Mobile - User Management", url: "https://raw.githubusercontent.com/lb2027/ppt/refs/heads/main/assets/pmobile/Picture9.jpg" },
  { title: "Mobile - Login & Register", url: "https://raw.githubusercontent.com/lb2027/ppt/refs/heads/main/assets/pmobile/Picture11.jpg" },
];

const webScreens = [
  { title: "Web - Admin Dashboard", url: "https://raw.githubusercontent.com/lb2027/ppt/refs/heads/main/assets/pweb/Picture10.png" },
  { title: "Web - Product Management", url: "https://raw.githubusercontent.com/lb2027/ppt/refs/heads/main/assets/pweb/Picture15.png" },
  { title: "Web - Sales History", url: "https://raw.githubusercontent.com/lb2027/ppt/refs/heads/main/assets/pweb/Picture2.png" },
  { title: "Web - Staff Management", url: "https://raw.githubusercontent.com/lb2027/ppt/refs/heads/main/assets/pweb/Picture6.png" },
  { title: "Web - User Management", url: "https://raw.githubusercontent.com/lb2027/ppt/refs/heads/main/assets/pweb/Picture8.png" },
  { title: "Web - Login & Register", url: "https://raw.githubusercontent.com/lb2027/ppt/refs/heads/main/assets/pweb/Picture12.png" },
];

function renderGallery(images, containerId) {
  const container = document.getElementById(containerId);
  images.forEach(({ title, url }) => {
    const card = document.createElement("div");
    card.className = "image-card";

    const img = document.createElement("img");
    img.src = url;
    img.alt = title;

    const caption = document.createElement("div");
    caption.className = "caption";
    caption.textContent = title;

    card.appendChild(img);
    card.appendChild(caption);
    container.appendChild(card);
  });

  const cards = container.querySelectorAll(".image-card");
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.1 }
  );

  cards.forEach(card => observer.observe(card));
}

renderGallery(mobileScreens, "mobile-gallery");
renderGallery(webScreens, "web-gallery");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const lightboxCaption = document.querySelector(".lightbox-caption");
const lightboxClose = document.querySelector(".lightbox .close");

document.addEventListener("click", function (e) {
  if (
    e.target.tagName === "IMG" &&
    e.target.parentElement.classList.contains("image-card")
  ) {
    lightboxImg.src = e.target.src;
    lightboxCaption.textContent = e.target.alt;
    lightbox.classList.add("show");
  }

  if (
    e.target === lightbox ||
    e.target === lightboxClose
  ) {
    lightbox.classList.remove("show");
  }
});


document.addEventListener("click", function (e) {
  const card = e.target.closest(".image-card");

  if (card && !document.querySelector(".popup-image-container")) {
    const imgEl = card.querySelector("img");
    const fullImgSrc = imgEl.src;
    const caption = imgEl.alt;

    const popup = document.createElement("div");
    popup.className = "popup-image-container";

    const rect = card.getBoundingClientRect();
    popup.style.top = `${window.scrollY + rect.top}px`;
    popup.style.left = `${rect.left}px`;
    popup.style.width = `${rect.width}px`;

    popup.innerHTML = `
      <button class="popup-close-btn">&times;</button>
      <img src="${fullImgSrc}" alt="${caption}" />
    `;

    document.body.appendChild(popup);
    popup.querySelector(".popup-close-btn").onclick = () => {
      popup.remove();
    };
  } else if (!card && document.querySelector(".popup-image-container")) {
    document.querySelector(".popup-image-container")?.remove();
  }
});

const fullscreenPopup = document.getElementById("fullscreen-popup");
const popupImg = document.getElementById("popup-img");
const closeBtn = document.querySelector(".close-btn");

document.addEventListener("click", function (e) {
  const img = e.target.closest(".image-card img");

  if (img) {
    popupImg.src = img.src;
    popupImg.alt = img.alt;
    fullscreenPopup.classList.add("show");
  }

  // Close on close button or clicking outside image
  if (
    e.target === fullscreenPopup ||
    e.target === closeBtn
  ) {
    fullscreenPopup.classList.remove("show");
    popupImg.src = "";
  }
});
