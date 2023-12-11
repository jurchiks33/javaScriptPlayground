//game logis is stored in this file.

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