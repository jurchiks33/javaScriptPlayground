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
        drawCard(category, 50 + 110 * index, 50, false); // Draw top row cards (enemy)
        drawCard(category, 50 + 110 * index, canvas.height - 200, true); // Draw bottom row cards (player)
    });
}

function drawCard(category, x, y, isPlayerCard) {
    const image = cardImages[category];
    if (image) {
        // Highlight only if it's a selected player card
        if (selectedCardId === category && isPlayerCard) {
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
    const cardYEnemy = 50; // Y-coordinate for enemy cards
    const cardYPlayer = canvas.height - 200; // Y-coordinate for player cards

    categories.forEach((category, index) => {
        const cardX = 50 + 110 * index;

        if (x >= cardX && x <= cardX + 100 && y >= cardYPlayer && y <= cardYPlayer + 150) {
            selectCard(category);
        }

        if (selectedCardId && x >= cardX && x <= cardX + 100 && y >= cardYEnemy && y <= cardYEnemy + 150) {
            attackEnemyCard(category);
        }
    });
});

// Load images
loadCardImages();