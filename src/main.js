/* All cost and purchase amounts */
let score = 0;
let minerCost = 20;
let minerPurchased = 0;
let drillCost = 50;
let drillPurchased = 0;
let gemIncCost = 100;
let gemIncPurchased = 0;

/* on click it'll do these functions and update everytime */
function updateButtons() {
    document.getElementById('miner').disabled = true;
    document.getElementById('drill').disabled = true;
    document.getElementById('gemInc').disabled = true;

    if (score >= minerCost) {
        document.getElementById('miner').disabled = false;
    }
    if (score >= drillCost) {
        document.getElementById('drill').disabled = false;
    }
    if (score >= gemIncCost) {
        document.getElementById('gemInc').disabled = false;
    }

    document.getElementById(
        'miner'
    ).innerText = `Buy Miner - Cost: ${minerCost}, Purchased: ${minerPurchased}`;
    document.getElementById(
        'drill'
    ).innerText = `Buy Drilling Crew - Cost: ${drillCost}, Purchased: ${drillPurchased}`;
    document.getElementById(
        'gemInc'
    ).innerText = `Buy Gem Inc - Cost: ${gemIncCost}, Purchased: ${gemIncPurchased}`;
}

const clickSound = new Audio('styles/sound/picaxe.mp3');
const purchaseSound = new Audio('styles/sound/cash.mp3');

const achievementThresholds = {
    100: "Congratulations! You've reached 100 score!",
    500: "Amazing! You've reached 500 score!",
    1000: "Incredible! You've reached 1000 score!",
    1000000: "You've taken over the industry of fishing!",
};

// Set to store achieved milestones
const achievedMilestones = new Set();

// Function to check for achievements
function checkAchievements(score) {
    for (const threshold in achievementThresholds) {
        if (
            score >= parseInt(threshold) &&
            !achievedMilestones.has(threshold)
        ) {
            // Display achievement message
            alert(achievementThresholds[threshold]);
            achievedMilestones.add(threshold); // Add the milestone to the achieved set
            // You can also use a modal or other UI element to display the achievement message
        }
    }
}

/* on click add score as well as update game and button conditions */
document.getElementById('clicker').addEventListener('click', () => {
    clickSound.currentTime = 0;
    clickSound.play();
    score++;
    updateGame();
    updateButtons();
    checkAchievements(score);
});

/* on click buy the next clicker which is the fisherman, also has a price increase */
document.getElementById('miner').addEventListener('click', () => {
    purchaseSound.currentTime = 0;
    purchaseSound.play();
    if (score >= minerCost) {
        score -= minerCost;
        minerPurchased++;
        minerCost = Math.ceil(minerCost * 1.15);
        updateGame();
        updateButtons();
        startminer();
    }
});

/* on click buy fishing net crew which autoclicks even more fish, also has a price increase */
document.getElementById('drill').addEventListener('click', () => {
    purchaseSound.currentTime = 0;
    purchaseSound.play();
    if (score >= drillCost) {
        score -= drillCost;
        drillPurchased++;
        drillCost = Math.ceil(drillCost * 1.15);
        updateGame();
        updateButtons();
        startdrill();
    }
});

/* on click buy fisherman corporation which earns you a lot of fish every so often also increases pricing */
document.getElementById('gemInc').addEventListener('click', () => {
    purchaseSound.currentTime = 0;
    purchaseSound.play();
    if (score >= gemIncCost) {
        score -= gemIncCost;
        gemIncPurchased++;
        gemIncCost = Math.ceil(gemIncCost * 1.15);
        updateGame();
        updateButtons();
        startgemInc();
    }
});

/* all these are time intervals for the auto clickers which change depending on each one */
function startminer() {
    setInterval(() => {
        score += minerPurchased;
        updateGame();
    }, 3000);
}

function startdrill() {
    setInterval(() => {
        score += 20 * drillPurchased;
        updateGame();
    }, 10000);
}

function startgemInc() {
    setInterval(() => {
        score += 50 * gemIncPurchased;
        updateGame();
    }, 15000);
}

/* update the game constantly */
function updateGame() {
    const building = new Building(
        score,
        minerCost,
        minerPurchased,
        drillCost,
        drillPurchased,
        gemIncCost,
        gemIncPurchased
    );
    building.update();
    updateButtons();
}
