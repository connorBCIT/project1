document.addEventListener('DOMContentLoaded', function () {
    // Array of 8 unique images (make sure paths are correct)
    const images = [
        '../images/bird.jpg', '../images/capybara.jpg', '../images/dog.jpg', '../images/cat.jpg', 
        '../images/gazel.jpg', '../images/gpig.jpg', '../images/hamster.jpg', '../images/lizard.jpg'
    ];

    // Duplicate and shuffle images for a matching game
    let shuffledImages = [...images, ...images];
    shuffledImages = shuffledImages.sort(() => 0.5 - Math.random());

    // Get all boxes in the grid and assign images to data attributes
    const gridItems = document.querySelectorAll('#gameGrid .box');

    // Score tracking
    let score = 0;
    const scoreElement = document.getElementById('score'); // Assumes you have a score display element

    gridItems.forEach((item, index) => {
        item.dataset.image = shuffledImages[index];
        item.addEventListener('click', handleImageClick);
    });

    // Track first and second picks
    let firstPick = null;
    let secondPick = null;
    let isProcessing = false;

    function updateScore() {
        score += 1;
        scoreElement.textContent = score; // Update score display

        if (score === 8) {    // check if score == 8       

            setTimeout(function () {
                alert("Congratulations! You've matched all pairs!");
            }, 250);
        }
    }

    function handleImageClick(event) {
        if (isProcessing) return; // Ignore clicks if processing

        const clickedItem = event.currentTarget;

        // Ignore if already flipped
        if (clickedItem.classList.contains('flipped')) return;

        // Show image as background
        clickedItem.style.backgroundImage = `url(${clickedItem.dataset.image})`;
        clickedItem.classList.add('flipped');

        // Track first and second picks
        if (!firstPick) {
            firstPick = clickedItem;
        } else if (!secondPick) {
            secondPick = clickedItem;
            isProcessing = true; // Set flag to true
            disableClicks(); // Disable all clicks

            // Check if images match
            if (firstPick.dataset.image === secondPick.dataset.image) {
                // Match found, keep both flipped and update score
                updateScore();
                isProcessing = false; // Reset flag
                enableClicks(); // Re-enable clicks
                firstPick = null;
                secondPick = null;
            } else {
                // Not a match, hide both after a short delay
                setTimeout(() => {
                    firstPick.style.backgroundImage = "url('../images/tile.png')";
                    secondPick.style.backgroundImage = "url('../images/tile.png')";
                    firstPick.classList.remove('flipped');
                    secondPick.classList.remove('flipped');
                    firstPick = null;
                    secondPick = null;
                    isProcessing = false; // Reset flag
                    enableClicks(); // Re-enable clicks
                }, 1000);
            }
        }
    }

    function disableClicks() {
        gridItems.forEach(function (item) {
            item.style.pointerEvents = 'none';
        });
    }

    function enableClicks() {
        gridItems.forEach(function (item) {
            item.style.pointerEvents = 'auto';
        });
    }
});