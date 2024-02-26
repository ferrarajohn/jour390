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
  
  // Event listeners and the movement logic remain the same
  document.addEventListener('keydown', function(event) {
    if (event.repeat) { return; } // Prevent multiple keydown events
    if (event.code === 'ArrowRight') {
        // Start moving the dog when the right arrow key is held down
        movement = setInterval(function() {
            const dog = document.getElementById('runningDog');
            let currentLeft = parseInt(dog.style.left, 10) || 0;
            dog.style.left = (currentLeft + 15) + 'px'; // Increase the pixels moved to 10

            // Check if the dog has reached the end of the screen
            if (window.innerWidth - dog.offsetWidth <= currentLeft) {
                clearInterval(movement); // Stop the dog's movement
                // Use the custom smoothScrollTo function to scroll to the .container class element
                const container = document.querySelector('.container');
                smoothScrollTo(container, 2000); // Scroll over 2000 milliseconds (2 seconds)
            }
        }, 50); // Adjust the interval time as needed for smoother animation
    }
});

document.addEventListener('keyup', function(event) {
    if (event.code === 'ArrowRight') {
        // Stop the dog's movement when the right arrow key is released
        clearInterval(movement);
    }
});
