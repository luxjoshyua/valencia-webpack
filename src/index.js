import style from "./sass/index.scss";
import "bootstrap";
import "./js/parallax";
import "./js/scroll";
// import "./js/slideshow";
// import "./js/stamps";

// can call the const whatever you want
// finds the div with a class of pixels

// find the body
const bodyTag = document.querySelector("body");
const progressTag = document.querySelector("div.progress");
const sections = document.querySelectorAll(".hero-sec");
// using querySelector just selects the one
const clientTag = document.querySelector("div.client");
const pixelsTag = document.querySelector("div.pixels");
// fade in content effect
// FIXME: deleted img and section img from here due to fucking with the lookbook page
const animatedTags = document.querySelectorAll(
  "a.menu-toggle, li a, nav h3, .fade-in-img, h2, h3, h2 a, p, a.button, .social-links-footer a"
);

// MENU TOGGLE

const menuToggle = document.querySelector(".menu-toggle img");
const menu = document.querySelector(".menu");
menuToggle.addEventListener("click", (e) => {
  menu.classList.toggle("open");
});

// PROGRESS BARS
// when we scroll the page, make a progress bar that keeps track of the distance
document.addEventListener("scroll", function () {
  // fine to use pixels again as the constant
  // because it's in the same box
  const pixels = window.pageYOffset;

  // gives you the height of 3200
  const pageHeight = bodyTag.getBoundingClientRect().height;
  // find the total scrollable distance which is
  // page height - window height
  const totalScrollableDistance = pageHeight - window.innerHeight;
  // pixels divided by total scrollable distance/entire thing
  const percentage = pixels / totalScrollableDistance;
  // gives you scrollbars going down the page
  // progressTag.style.width = "5px"
  // progressTag.style.height = `${100 * percentage}%`

  progressTag.style.width = `${100 * percentage}%`;
});

// PARALLAX SHAPES
// when we scroll the page, make things parallax
// we want to move certain tags, based on how far they are from an anchor point
// what is the anchor? the anchor point is the middle of the section
// how far should we parallax? it's a ratio of the distance scrolled to the middle point of the anchor
document.addEventListener("scroll", function () {
  const topViewport = window.pageYOffset;

  const midViewport = topViewport + window.innerHeight / 2;

  sections.forEach((section) => {
    const topSection = section.offsetTop;

    const midSection = topSection + section.offsetHeight / 2;

    // console.log(midSection) check it's working

    const distanceToSection = midViewport - midSection;

    // console.log(distanceToSection)

    // [] finds the attribute

    const parallaxTags = section.querySelectorAll(`[data-parallax]`);

    // loop over each parallaxed tag
    parallaxTags.forEach((tag) => {
      // parseFloat turns it into a decimal number
      const speed = parseFloat(tag.getAttribute("data-parallax"));
      // would log "0.15"
      tag.style.transform = `translate(0, ${distanceToSection * speed}px)`;
    });
    // pick the square
    // const tag = section.querySelector("div.square")
    // use the backtick because it's css
    // $() is the string
  });
});

// PIXELS SCROLLED
// when we scroll the page, update the pixels tag to be how far we've scrolled
document.addEventListener("scroll", function () {
  // console.log("scroll")
  // want to see how far we've scrolled on the y-direction
  const pixels = window.pageYOffset;

  // finds the variable from above
  // console.log(pixels)

  // changes the pixels tag to be the value of the pixels
  pixelsTag.innerHTML = pixels + "pixels scrolled";

  // pixelsTag.innerHTML = `${pixels} pixels scrolled`
});

// FADE IN CONTENT EFFECT

// fade out on load
animatedTags.forEach((tag) => {
  tag.style.opacity = 0;
});

const fadeIn = function () {
  // check the constant is there
  // console.log("fade in")
  // look through all the animated tags and see
  // with the getBoundingClientRect if it's in the window

  // let delay = 0.25
  let delay = 0.05;

  animatedTags.forEach((tag) => {
    // the () runs it
    const tagTop = tag.getBoundingClientRect().top;
    const tagBottom = tag.getBoundingClientRect().bottom;

    // console.log(tagTop, tagBottom)

    if (tagTop < window.innerHeight && tagBottom > 0) {
      // keep the s because we want it to be a second
      tag.style.animation = `fadeIn 1s ${delay}s both`;
      // delay = delay + 0.25
      delay = delay + 0.05;
    } else {
      tag.style.opacity = 0;
      tag.style.animation = "";
    }
  });
};

// on load, run fadeIn
fadeIn();

// on scroll, run fadeIn
document.addEventListener("scroll", function () {
  fadeIn();
});

// on browser resize, run fadeIn
// because it's the browser, use window not document
window.addEventListener("resize", function () {
  fadeIn();
});
