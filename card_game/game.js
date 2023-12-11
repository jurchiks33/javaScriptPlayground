const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const cardImages = {};

//Canvas setup.
ctx.fillStyle = 'green';
ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);

function loadCardImages() {
    const categories = ['1', '2', '3', '4', '5'];

    categories.forEach(category => {
        const image = new Image();
        image.src = 'images/${category}.png';
        cardImages[category] = image;
    });
}

function drawCard(category, x, y) {
    const image = cardImages[category];
    if (image) {
        ctx.drawImage(image, x, y, 100, 150);
    }
}

//Load Images
loadCardImages();

cardImages['1'].onload = () => drawCard('1', 50, 50);