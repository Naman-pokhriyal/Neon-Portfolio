const sections = document.querySelectorAll("section");
const parent = document.querySelector("#container");
const nav = document.querySelector("nav");

parent.addEventListener("scroll", () => {
  const navitems = document.querySelectorAll(".nav-link");

  const scrolled = parent.scrollLeft;
  let current = "";
  sections.forEach((section) => {
    const sectionLeft = section.offsetLeft;
    if (scrolled + 1 >= sectionLeft) {
      current = section.getAttribute("id");
      console.log(current);
    }
    if (section.getAttribute("id") != current) {
      section.style.overflow = "hidden";
    }
  });
  navitems.forEach((item) => {
    item.classList.remove("active");
    if (item.classList.contains(current)) {
      item.classList.add("active");
    }
  });
  if (scrolled > 100) {
    nav.classList.remove("nav");
    nav.classList.add("navUp");
  } else {
    nav.classList.remove("navUp");
    nav.classList.add("nav");
  }
});

let startX;
let scrollLeft;
let scrollTop;
let isDown;

parent.addEventListener("mousedown", (e) => mouseIsDown(e));
parent.addEventListener("mouseup", (e) => mouseUp(e));
parent.addEventListener("mouseleave", (e) => mouseLeave(e));
parent.addEventListener("mousemove", (e) => mouseMove(e));

function mouseIsDown(e) {
  isDown = true;
  startY = e.pageY - parent.offsetTop;
  startX = e.pageX - parent.offsetLeft;
  scrollLeft = parent.scrollLeft;
  scrollTop = parent.scrollTop;

  parent.style.scrollSnapType = "none";
  nav.style.pointerEvents = "none";
}
function mouseUp(e) {
  isDown = false;

  parent.style.scrollSnapType = "both mandatory";
  nav.style.pointerEvents = "auto";
}
function mouseLeave(e) {
  isDown = false;
}
function mouseMove(e) {
  if (isDown) {
    e.preventDefault();
    const y = e.pageY - parent.offsetTop;
    const walkY = (y - startY) * 3;
    parent.scrollTop = scrollTop - walkY;

    const x = e.pageX - parent.offsetLeft;
    const walkX = (x - startX) * 3;
    parent.scrollLeft = scrollLeft - walkX;
  }
}

// Form

var form = document.getElementById("my-form");
var Contact = document.querySelector(".contact-page");
var formClose = document.getElementById("close-contact");

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      status.innerHTML = "Thanks for your submission!";
      status.style.backgroundColor = "#73eb8f";
      form.reset();
    })
    .catch((error) => {
      status.innerHTML = "Oops! There was a problem submitting your form";
      status.style.backgroundColor = "#ff7878";
    });
}
form.addEventListener("submit", handleSubmit);

formClose.addEventListener("click", () => {
  Contact.classList.toggle("show");
  cursor.classList.remove("no");
});

const OpenContact = document.querySelector(".contact");

OpenContact.addEventListener("click", () => {
  Contact.classList.toggle("show");
  cursor.classList.add("no");
});

// Custom Mouse

var cursor = document.querySelector(".cursor");

var editcursor = function editCursor(e) {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
};
window.addEventListener("mousemove", editcursor);
window.addEventListener("mousedown", editcursor);
