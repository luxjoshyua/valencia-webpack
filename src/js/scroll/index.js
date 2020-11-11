// can call the const whatever you want
// finds the div with a class of pixels
const pixelsTag = document.querySelector("div.pixels");
// find the body
const bodyTag = document.querySelector("body.spring");
const progressTag = document.querySelector("div.progress");

const sections = document.querySelectorAll("section.spring-sec");
// using querySelector just selects the one
const clientTag = document.querySelector("div.client");

const pageTag = document.querySelector("div.page");

// for the header to change to white
const headerTag = document.querySelector("header");

// when we scroll the page, update the pixels tag to be how far we've scrolled
document.addEventListener("scroll", function () {
  // console.log("scroll")
  // want to see how far we've scrolled on the y-direction
  const pixels = window.pageYOffset;

  // finds the variable from above
  // console.log(pixels)

  // changes the pixels tag to be the value of the pixels
  if (pixelsTag) {
    pixelsTag.innerHTML = pixels + " pixels scrolled";
  }

  // pixelsTag.innerHTML = `${pixels} pixels scrolled`
});

// when we scroll the page, make a progress bar that keeps track of the distance
document.addEventListener("scroll", function () {
  // fine to use pixels again as the constant
  // because it's in the same box
  const pixels = window.pageYOffset;

  if (bodyTag) {
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
  }
});

// data is dark

document.addEventListener("scroll", function () {
  const pixels = window.pageYOffset;

  // using the arrow is a shortcut function, still does the same thing
  sections.forEach((section) => {
    // offsetTop is equal to or less than pixels
    // - 100 gives it a bit of padding before the text changes because the threshold is 50px less in the viewport
    if (section.offsetTop - 50 <= pixels) {
      // clientTag.innerHTML = "test1234" "test1234" is a string that doesn't update, hence won't work
      clientTag.innerHTML = section.getAttribute("data-client");
      pageTag.innerHTML = section.getAttribute("data-page");

      // target s3 heading
      if (section.hasAttribute("data-is-dark")) {
        // if it is the dark section, we want to add a class of white
        headerTag.classList.add("white");
        progressTag.classList.add("white");
      } else {
        // removes the header white if the data-is-dark="yes" attribute isn't there
        // in the HTML
        headerTag.classList.remove("white");
        progressTag.classList.remove("white");
      }
    }
  });
});

// when we scroll the page, make things parallax
// we want to move certain tags, based on how far they are from an anchor point
// what is the anchor? the anchor point is the middle of the section
// how far should we parallax? it's a ratio of the distance scrolled to the middle point of the anchor
document.addEventListener("scroll", function () {
  const topViewport = window.pageYOffset;

  const midViewport = topViewport + window.innerHeight / 2;

  // console.log(midViewport)

  sections.forEach((section) => {
    console.log("reaching here");
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
  });
});
