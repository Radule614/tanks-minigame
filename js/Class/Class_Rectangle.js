class Rectangle {
    pos = [0, 0];
    size = [0, 0];
    color = "#000";
    constructor(pos, size, color) {
        this.pos = pos;
        this.size = size;
        this.color = color;
    }
    draw(texture) {
        if (texture) {
            Game.ctx.drawImage(texture, this.pos[0], this.pos[1], this.size[0], this.size[1]);
        } else {
            Game.ctx.fillStyle = this.color;
            Game.ctx.fillRect(this.pos[0], this.pos[1], this.size[0], this.size[1]);
        }
    }
}