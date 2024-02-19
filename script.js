window.onload = function() {
    var headerContent = document.querySelector('.header-content');
    var headerContentRect = headerContent.getBoundingClientRect();
  
    var dogImages = document.querySelectorAll('.dog-image');
    var index = 0;
    var lastRandomTop = -Infinity; // Initialize with a very low number
    var minVerticalDistance = 50; // Minimum vertical distance between images in pixels

    setTimeout(function() {
        var intervalId = setInterval(function() {
            if (index >= dogImages.length) {
                clearInterval(intervalId); // Stop the interval when all images have been shown
                return;
            }

            var img = dogImages[index];
            var randomTop;
            do {
                randomTop = headerContentRect.top + Math.random() * (headerContentRect.height - img.offsetHeight);
            } while (Math.abs(randomTop - lastRandomTop) < minVerticalDistance); // Ensure minimum distance between images

            lastRandomTop = randomTop; // Update the lastRandomTop for the next iteration

            var randomLeft;
            if (Math.random() > 0.5) {
                // Appear on the left side, but further from the center
                randomLeft = Math.random() * (headerContentRect.left - img.offsetWidth);
            } else {
                // Appear on the right side, but further from the center
                randomLeft = headerContentRect.right + Math.random() * (window.innerWidth - headerContentRect.right - img.offsetWidth);
            }
            img.style.top = randomTop + 'px';
            img.style.left = randomLeft + 'px';
            img.style.visibility = 'visible'; // Make the image visible

            index++;
        }, 1000); // Show a new image every second
    }, 1250); // Start showing images 3 seconds after the page loads
};

