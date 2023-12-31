//game logic is stored in this file.

const cardStats = {
    '1': {attack: 5, health: 10},
    '2': {attack: 7, health: 8},
    '3': {attack: 6, health: 9},
    '4': {attack: 8, health: 7},
    '5': {attack: 4, health: 11}
};

function attackCard(attackingCard, defendingCard) {
    const attacker = cardStats[attackingCard];
    const defender = cardStats[defendingCard];

    //Attack logis: reduce health by attackers attack.
    defender.health -= attacker.attack;

    //check if defenders health drops to 0 or below and card
    //is removed from the game.
    if (defender.health <= 0) {
        console.log(`Card ${defendingCard} is defeated!`)
    }
}

let selectedCardId = null;

let playerCards = ['1', '2', '3', '4', '5'];
let enemyCards = ['1', '2', '3', '4', '5'];

function selectCard(card) {
    if (playerCards.includes(card)) {
        selectedCardId = card; // This will overwrite any previous selection
        drawAllCards(); // Redraw all cards to reflect the new selection
    }
}

function attackEnemyCard(enemyCard) {
    if (selectedCardId && enemyCards.includes(enemyCard)) {
        attackCard(selectedCardId, enemyCard);
        selectedCardId = null; //reset selected card after attack.
    }
}