class Weapon {
    pos = [0, 0];
    size = [0, 0];
    bulletSpeed = 20;
    twoBarrel = false;
    fireRate = 3;
    lastFireTime = undefined;
    constructor(pos, size, type) {
        this.size = size;
        this.pos = [pos[0], pos[1] - size[1] / 2];
        if (type) {
            switch (type) {
                case "twoBarrel":
                    this.twoBarrel = true;
                    break;
            }
        }
    }
    draw() {
        if (this.twoBarrel) {
            Game.ctx.fillStyle = "#000";
            Game.ctx.fillRect(this.pos[0], this.pos[1] - this.size[1] * 0.7, this.size[0], this.size[1]);

            Game.ctx.fillStyle = "#000";
            Game.ctx.fillRect(this.pos[0], this.pos[1] + this.size[1] * 0.7, this.size[0], this.size[1]);
        } else {
            Game.ctx.fillStyle = "#000";
            Game.ctx.fillRect(this.pos[0], this.pos[1], this.size[0], this.size[1]);
        }
    }
    createBullet(pos, direction, size, color) {
        let bullet = new Bullet(pos, size, color);
        bullet.setVelocity([this.bulletSpeed * direction[0], this.bulletSpeed * direction[1]]);
        Game.Bullets.push(bullet);
    }
    fire(weaponWorldPos, angle) {
        let delta = (new Date()).getTime() / 1000 - this.lastFireTime;

        if (delta < (1 / this.fireRate)) return;
        let direction = Vector.vectorFromAngle(angle);
        if (this.twoBarrel) {
            let spawns = [Vector.vectorFromAngle(angle + this.size[1]), Vector.vectorFromAngle(angle - this.size[1])]
            if (!spawns) return false;
            spawns.forEach(spawn => {
                let pos = [weaponWorldPos[0] + spawn[0] * this.size[0], weaponWorldPos[1] + spawn[1] * this.size[0]];
                this.createBullet(pos, direction, 4, "#f00");
            });
        } else {
            let pos = [weaponWorldPos[0] + direction[0] * this.size[0], weaponWorldPos[1] + direction[1] * this.size[0]];
            this.createBullet(pos, direction, 4, "#f00");
        }
        this.lastFireTime = (new Date()).getTime() / 1000;
    }
};