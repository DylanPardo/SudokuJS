// Set the number of stars and their maximum size
const numStars = 1000;
const maxStarSize = 3;

// Create an array to store the star positions
let stars = [];

// The setup() function is called once when the sketch is started
function setup() {
  // Create the canvas
  createCanvas(windowWidth, windowHeight);

  // Populate the array with star positions
  for (let i = 0; i < numStars; i++) {
    stars[i] = {
      x: random(windowWidth),
      y: random(windowHeight),
      size: random(maxStarSize),
    };
  }
  
  
  let canvas = document.getElementById("defaultCanvas0");
  document.body.style.margin = "0";
  canvas.style.zIndex = "0";
  canvas.style.margin = "0";
  canvas.style.display = "block";
  canvas.style.position = "absolute";
  canvas.style.highlightThickness = "0";
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// The draw() function is called repeatedly by p5.js
function draw() {
  // Set the background color to black
  background(0);

  // Loop through the stars array and draw each star
  for (let i = 0; i < numStars; i++) {
    let star = stars[i];

    // Set the fill color to white
    fill(255);

    // Draw the star at its position, with its size
    ellipse(star.x, star.y, star.size);

    // Update the star's position, making it appear to move
    star.x -= star.size / 2;
    star.y -= star.size / 15;
    star.size = 1.001 * star.size

    // If the star has moved off the left edge of the canvas,
    // move it to the right edge
    if (star.x < 0) {
      star.x = width;
      star.size = random(maxStarSize);
    }
    if (star.y < 0) {
      star.y = width;
      star.size = random(maxStarSize);
    }
  }
}




