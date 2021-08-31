class Character extends Circle {
    Weapon = undefined;
    lookAngle = 0;
    dead = false;
    maxHealth = 100;
    health = 100;
    healthBar = {
        pos: [0, 0],
        width: 2 * this.r - 10,
        height: 5
    };
    constructor(pos, r, color, weapon) {
        super(pos, r, color);
        this.Weapon = new Weapon([0, 0], [50, 10], weapon);
    }

    updateAngle() {
        let rv = Vector.sub(Game.Player.pos, this.pos);
        if (rv[1] < 0) this.lookAngle = -Vector.angle(rv, [1.0, 0.0]);
        else this.lookAngle = Vector.angle(rv, [1.0, 0.0]);
    }
    draw(map) {
        this.updateAngle();
        super.draw(map);

        Game.ctx.translate(this.pos[0], this.pos[1]);
        Game.ctx.rotate((Math.PI / 180) * this.lookAngle);
        this.Weapon.draw();
        Game.ctx.rotate((-Math.PI / 180) * this.lookAngle);
        Game.ctx.translate(-this.pos[0], -this.pos[1]);

        this.drawHealthBar();
    }
    move(map) {
        if (this.currentBoundaryCollision[0]) {
            this.pos[0] -= this.velocity[0];
        }
        if (this.currentBoundaryCollision[1]) {
            this.pos[1] -= this.velocity[1];
        }
        super.move(map);
    }
    fire() {
        if (this.dead) return;
        this.Weapon.fire(this.pos, this.lookAngle);
    }
    hit() {
        if (this.dead) return;
        this.health -= 25;
        if (this.health <= 0) this.die();
    }
    die() {
        this.dead = true;
    }
    drawHealthBar() {
        this.healthBar.pos[0] = this.pos[0] - this.r + 5;
        this.healthBar.pos[1] = this.pos[1] + this.r + 25;

        let pos = this.healthBar.pos;
        let width = this.healthBar.width;
        let height = this.healthBar.height;
        Game.ctx.strokeStyle = "#c70039";
        Game.ctx.strokeRect(pos[0], pos[1], width, height);

        width = width / (1 / (this.health / this.maxHealth));
        Game.ctx.fillStyle = "#c70039";
        Game.ctx.fillRect(pos[0] + 1, pos[1] + 1, width - 2, height - 2);
    }
};