document.addEventListener('DOMContentLoaded', function () {
    // 8 image array, CHECK PATH(s)
    const images = [
        '../images/bird.jpg', '../images/capybara.jpg', '../images/dog.jpg', '../images/cat.jpg', 
        '../images/gazel.jpg', '../images/gpig.jpg', '../images/hamster.jpg', '../images/lizard.jpg'
    ];

    // dupe images and shuffle
    let shuffledImages = [...images, ...images];
    shuffledImages = shuffledImages.sort(() => 0.5 - Math.random());

    // grab all boxes and assign images
    const gridItems = document.querySelectorAll('#gameGrid .box');

    // Score logic
    let score = 0;
    const scoreElement = document.getElementById('score'); 

    gridItems.forEach((item, index) => {
        item.dataset.image = shuffledImages[index];
        item.addEventListener('click', handleImageClick);
    });

    // track pick 1 & 2
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
        if (isProcessing) return; // ignore clicks if processing

        const clickedItem = event.currentTarget;

        // ignore if alr flipped
        if (clickedItem.classList.contains('flipped')) return;

        // show image as background
        clickedItem.style.backgroundImage = `url(${clickedItem.dataset.image})`;
        clickedItem.classList.add('flipped');

        // track picks
        if (!firstPick) {
            firstPick = clickedItem;
        } else if (!secondPick) {
            secondPick = clickedItem;
            isProcessing = true; // ok, stop accepting clicks
            disableClicks(); // stop clicks

            // check if images match
            if (firstPick.dataset.image === secondPick.dataset.image) {
                // match --> keep flipped and update score
                updateScore();
                isProcessing = false; // reset, time to accept clicks
                enableClicks(); // re-enable clicks
                firstPick = null;
                secondPick = null;
            } else {
                // no match --> hide both after a short delay
                setTimeout(() => {
                    firstPick.style.backgroundImage = "url('../images/tile.png')";
                    secondPick.style.backgroundImage = "url('../images/tile.png')";
                    firstPick.classList.remove('flipped');
                    secondPick.classList.remove('flipped');
                    firstPick = null;
                    secondPick = null;
                    isProcessing = false; // reset flag
                    enableClicks(); // re-enable clicks
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