const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const cardImages = {};
let imagesLoaded = 0;

// Canvas setup.
ctx.fillStyle = 'green';
ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);

const categories = ['1', '2', '3', '4', '5'];

function loadCardImages() {
    categories.forEach(category => {
        const image = new Image();
        image.src = `card_game/images/${category}.png`;
        image.onload = () => {
            imagesLoaded++;
            if (imagesLoaded === categories.length) {
                drawAllCards();
            }
        };
        cardImages[category] = image;
    });
}

function drawAllCards() {
    categories.forEach((category, index) => {
        drawCard(category, 50 + 110 * index, 50);
    });
}

function drawCard(category, x, y) {
    const image = cardImages[category];
    if (image) {
        ctx.drawImage(image, x, y, 100, 150);
    }
}

// Load Images
loadCardImages();