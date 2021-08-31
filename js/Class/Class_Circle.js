class Circle {
    pos = [0, 0];
    velocity = [0, 0];
    r = 30;
    color = "#ff0000";
    currentBoundaryCollision = [false, false];
    constructor(pos, r, color) {
        this.pos = pos;
        if (r) this.r = r;
        if (color) this.color = color;
    }

    draw(map) {
        this.move(map);
        
        Game.ctx.beginPath();
        Game.ctx.fillStyle = this.color;
        Game.ctx.arc(this.pos[0], this.pos[1], this.r, 0, 2 * Math.PI);
        Game.ctx.fill();
    }
    setVelocity(vel) {
        this.velocity = vel;
    }
    move(map) {
        if(map){
            let oldPos = [this.pos[0], this.pos[1]];
        
            this.pos[0] += Math.abs(this.velocity[0]) * Vector.normalize(this.velocity)[0];
            if(map && map.checkCollisions(this)){
                this.pos[0] = oldPos[0];
            }
            this.pos[1] += Math.abs(this.velocity[1]) * Vector.normalize(this.velocity)[1];
            if(map && map.checkCollisions(this)){
                this.pos[1] = oldPos[1];
            }
        }
        else{
            this.pos[0] += Math.abs(this.velocity[0]) * Vector.normalize(this.velocity)[0];
        this.pos[1] += Math.abs(this.velocity[1]) * Vector.normalize(this.velocity)[1];
        }
        
        this.currentBoundaryCollision = this.boundaryCollision();
    }
    boundaryCollision() {
        let ret = [false, false];
        if (this.pos[0] + this.velocity[0] - this.r <= 0 || this.pos[0] + this.velocity[0] + this.r >= Game.CanvasSize.width) {
            ret[0] = true;
        }
        if (this.pos[1] + this.velocity[1] - this.r <= 0 || this.pos[1] + this.velocity[1] + this.r >= Game.CanvasSize.height) {
            ret[1] = true;
        }
        return ret;
    }
};