document.addEventListener('DOMContentLoaded', function() {
    const boxes = document.getElementsByClassName('box');
    for (let box of boxes) {
        box.addEventListener('click', function() {
            console.log("Image path:", 'url(../images/dog.jpg)');
            this.style.backgroundImage = "url('../images/dog.jpg')";
            // this.style.backgroundColor = "#21130d";
        });
    }
});

