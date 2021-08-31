class GameMap {
    walls = [];
    constructor(walls) {
        this.walls = walls;
    }
    drawMap() {
        if (this.walls) {
            this.walls.forEach(wall => {
                wall.draw(Game.Images.brick);
            });
        }
    }
    checkCollisions (cir){
        let ret = false;
        this.walls.forEach(wall => {
            if(ret) return;
            if(Utility.checkCircleRectCollision(cir, wall)){
                ret = true;
            }
        });
        return ret;
    }
}