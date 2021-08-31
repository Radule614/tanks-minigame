class Bullet extends Circle {
    constructor(pos, r, color) {
        super(pos, r, color);
    }
    move() {
        this.pos[0] += this.velocity[0];
        this.pos[1] += this.velocity[1];
    }
};