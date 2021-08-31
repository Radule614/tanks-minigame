let Utility = {
    randomDoubleFromRange: function(a, b) {
        return Math.random() * (b - a) + a;
    },
    checkCircleCollision: function(c1, c2) {
        d = Vector.magn(Vector.sub(c1.pos, c2.pos));
        if (d <= (c1.r + c2.r)) {
            return true;
        }
        return false;
    },
    checkCircleRectCollision: function(Cir, Rec){
        let cx = Cir.pos[0];
        let cy = Cir.pos[1];
        let rx = Rec.pos[0];
        let ry = Rec.pos[1];
        let rw = Rec.size[0];
        let rh = Rec.size[1];

        let testX = cx;
        let testY = cy;

        if (cx < rx)         testX = rx;
        else if (cx > rx+rw) testX = rx+rw;

        if (cy < ry)         testY = ry;
        else if (cy > ry+rh) testY = ry+rh;

        let distX = cx - testX;
        let distY = cy - testY;
        let distance = Math.sqrt((distX * distX) + (distY * distY));

        if(distance <= Cir.r){
            return true;
        }
        return false;
    }
}