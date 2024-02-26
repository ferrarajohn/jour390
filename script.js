// Custom smooth scroll function
function smoothScrollTo(element, duration) {
    const targetPosition = element.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
  
    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }
  
    function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }
  
    requestAnimationFrame(animation);
  }
  

// Modify the moveDogOnScroll function to enable scrolling when the dog reaches the end
function moveDogOnScroll() {
    const dog = document.getElementById('runningDog');
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollFraction = window.pageYOffset / maxScroll;
    
    // Increase the multiplier to make the dog move farther
    const maxDogLeft = window.innerWidth * 2; // For example, twice the width of the window
    const dogLeft = scrollFraction * maxDogLeft;
  
    // Keep track of the furthest position the dog has reached
    const furthestPosition = parseFloat(dog.style.left) || 0;
  
    // Update the dog's position only if the new position is greater than the furthest position
    if (dogLeft > furthestPosition) {
      dog.style.left = `${Math.min(dogLeft, maxDogLeft)}px`;
    }
  }

  window.addEventListener('scroll', moveDogOnScroll);


function mapRange(value, a, b, c, d) {
    value = (value - a) / (b - a);
    return c + value * (d - c);
}

// Function to change the color based on the dog's position
function updateBackground() {
    const dog = document.getElementById('runningDog');
    const moonCircle = document.getElementById('moonCircle');
    const nightSkyRectangle = document.getElementById('nightSkyRectangle');
    
    // Get the dog's position relative to the screen width
    const dogX = dog.getBoundingClientRect().left + dog.clientWidth / 2;
    const screenWidth = window.innerWidth;
    const dogPositionRatio = dogX / screenWidth;

    // Map the dog's position to the color range for the moon (goldenrod to moon-like color)
    const moonColor = `hsl(${mapRange(dogPositionRatio, 0, 1, 42, 0)}, 100%, ${mapRange(dogPositionRatio, 0, 1, 50, 100)}%)`; // HSL values for goldenrod to a moon-like color
    moonCircle.style.backgroundColor = moonColor;

    // Map the dog's position to the color range for the sky (skyblue to night-like color)
    const skyColor = `hsl(${mapRange(dogPositionRatio, 0, 1, 197, 240)}, 100%, ${mapRange(dogPositionRatio, 0, 1, 71, 20)}%)`; // HSL values for skyblue to a night-like color
    nightSkyRectangle.style.backgroundColor = skyColor;
}

window.addEventListener('scroll', function() {
    moveDogOnScroll();
    updateBackground();
  });