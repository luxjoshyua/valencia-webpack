// pick all of the images and layer them based on the z-index

// const slideArea = document.querySelector(".slides");

const slidesCont = document.querySelector(".slides-container");

console.log(slidesCont);
// const images = slideArea.querySelectorAll("img");

// we want to keep track of two things
let currentSlide = 0;
// z = z-index, can call it whatever we want
// match it to our css, which is z-index: 1;
let z = 1;

// when I click the slide area, change the slide based on z-index
slideArea.addEventListener("click", function () {
  currentSlide = currentSlide + 1;

  if (currentSlide > images.length - 1) {
    currentSlide = 0;
  }

  z = z + 1;

  // remove the animation from the style for EVERY IMAGE
  // 1.pick the images
  // 2.do it for each individual one
  // now have access to each individual image one by one
  images.forEach((image) => {
    // removes the animation
    image.style.animation = "";
  });

  // pick the right image
  // use [] because it's a list
  images[currentSlide].style.zIndex = z;
  images[currentSlide].style.animation = "fade 0.5s";
});

// when I put my mouse over the slide area, put all of the images in a random place
slideArea.addEventListener("mouseover", function () {
  images.forEach((image) => {
    // snap to grid
    const x = 25 * Math.floor(Math.random() * 5) - 50;
    const y = 25 * Math.floor(Math.random() * 5) - 50;

    // // add the - 50 so it's between -50 and +50 on each axis
    // const x = 100 * Math.random() - 50

    // const y = 100 * Math.random() - 50

    image.style.transform = `translate(${x}px, ${y}px)`;
  });
});

// when I move my mouse away, put the images back
slideArea.addEventListener("mouseout", function () {
  images.forEach((image) => {
    // "" empty string
    image.style.transform = "";
  });
});
