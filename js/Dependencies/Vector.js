let Vector = {
    dot: function(vec1, vec2) {
        let d = vec1[0] * vec2[0] + vec1[1] * vec2[1];
        return d;
    },
    add: function(vec1, vec2) {
        return [vec1[0] + vec2[0], vec1[1] + vec2[1]];
    },
    sub: function(vec1, vec2) {
        return [vec1[0] - vec2[0], vec1[1] - vec2[1]];
    },
    magn: function(vec) {
        return Math.sqrt(Math.pow(vec[0], 2) + Math.pow(vec[1], 2));
    },
    product: function(scalar, vec) {
        return [scalar * vec[0], scalar * vec[1]];
    },
    ratio: function(scalar, vec) {
        return [vec[0] / scalar, vec[1] / scalar];
    },
    normalize: function(vec) {
        if (vec[0] == 0 && vec[1] == 0) return vec;
        return this.ratio(this.magn(vec), vec);
    },
    angle: function(vec1, vec2) {
        return (Math.acos((this.dot(vec1, vec2)) / (this.magn(vec1) * this.magn(vec2)))) * 180 / Math.PI;
    },
    vectorFromAngle: function(angle) {
        return [Math.cos(angle * Math.PI / 180), Math.sin(angle * Math.PI / 180)];
    }
}