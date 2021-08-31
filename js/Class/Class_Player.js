class Player extends Character {
    constructor(pos, r, color, weapon) {
        super(pos, r, color, weapon);
    }
    updateAngle() {
        let rv = Vector.sub(Game.Mouse.pos, this.pos);
        if (rv[1] < 0) this.lookAngle = -Vector.angle(rv, [1.0, 0.0]);
        else this.lookAngle = Vector.angle(rv, [1.0, 0.0]);
    }
    move(map) {
        super.move(map);
        this.moveCamera();
    }
    die(){
        super.die();
        Game.reset();
    }
    moveCamera() {
        let x = Math.abs(this.velocity[0]) * Vector.normalize(this.velocity)[0];
        let y = Math.abs(this.velocity[1]) * Vector.normalize(this.velocity)[1];
        
        let oldLeft = parseFloat(Game.canvas.style.left);
        let oldTop = parseFloat(Game.canvas.style.top);
        let newLeft = Game.CanvasSize.width/2 - this.pos[0] + this.r;
        let newTop = Game.CanvasSize.height/2 - this.pos[1] + this.r;
        
        let oldMouseX = Game.Mouse.pos[0];
        let oldMouseY = Game.Mouse.pos[1];
        
        if(oldLeft != newLeft){
            Game.canvas.style.left = newLeft;
            Game.Mouse.pos[0] += x;
        }
        if(oldTop != newTop){
            Game.canvas.style.top = newTop;
            Game.Mouse.pos[1] += y;
        }
    }
}