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
        image.src = `/card_game/images/${category}.png`;
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
    // Clear the entire canvas first
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);

    // Reset the canvas background
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);

    // Redraw all the cards
    categories.forEach((category, index) => {
        drawCard(category, 50 + 110 * index, 50); // Draw top row cards
        drawCard(category, 50 + 110 * index, canvas.height - 200); // Draw bottom row cards
    });
}

function drawCard(category, x, y) {
    const image = cardImages[category];
    if (image) {
        // Highlight only if it's a player card and selected
        if (selectedCardId === category && playerCards.includes(category)) {
            ctx.fillStyle = 'yellow';
            ctx.fillRect(x - 5, y - 5, 110, 160); // Rectangle for highlight
        }

        ctx.drawImage(image, x, y, 100, 150);

        ctx.fillStyle = 'green'; // Background color
        ctx.fillRect(x, y + 150, 100, 30);

        // Draw attack and health stats
        ctx.fillStyle = 'white'; // Text color
        ctx.font = '16px Arial'; // Font and size
        ctx.fillText(`Atk: ${cardStats[category].attack}`,
                             x, y + 170);
        ctx.fillText(`HP: ${cardStats[category].health}`, 
                            x + 55, y + 170);
    }
}

canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    categories.forEach((category, index) => {
        const cardX = 50 + 110 * index;
        const cardYPlayer = canvas.height - 200; // Y-coordinate of player cards

        if (x >= cardX && x <= cardX + 100 && y >= cardYPlayer && y <= cardYPlayer + 150) {
            selectCard(category); // Select the new card
        }

    });
});

// Load Images
loadCardImages();