/* class containing our score and cost */
class Building {
    constructor(
        score,
        minerCost,
        minerPurchased,
        drillCost,
        drillPurchased,
        gemIncCost,
        gemIncPurchased
    ) {
        this.score = score;
        this.minerCost = minerCost;
        this.minerPurchased = minerPurchased;
        this.drillCost = drillCost;
        this.drillPurchased = drillPurchased;
        this.gemIncCost = gemIncCost;
        this.gemIncPurchased = gemIncPurchased;
    }

    /* Update the button to disable on price amount required as well as keep track of score*/
    update() {
        document.getElementById('score').textContent = ` ${this.score}`;

        if (this.score >= this.minerCost) {
            document.getElementById('miner').disabled = false;
        } else {
            document.getElementById('miner').disabled = true;
        }

        if (this.score >= this.drillCost) {
            document.getElementById('drill').disabled = false;
        } else {
            document.getElementById('drill').disabled = true;
        }

        if (this.score >= this.gemIncCost) {
            document.getElementById('gemInc').disabled = false;
        } else {
            document.getElementById('gemInc').disabled = true;
        }
    }
}
