class Enemy extends Character {
    constructor(pos, r, color, weapon) {
        super(pos, r, color, weapon);
        if (weapon) {
            this.maxHealth = 150;
            this.health = 150;
        }
    }
}