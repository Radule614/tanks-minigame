let Game = {
    canvas: undefined,
    ctx: undefined,
    CanvasSize: {
        width: 0,
        height: 0
    },
    Mouse: {
        pos: [0, 0]
    },
    Player: undefined,
    keysPressed: [],
    Bullets: [],
    Enemies: [],
    Map: undefined,
    Images: {},
    init: function() {
        this.loadImages();

        this.canvas = document.getElementById("canvas");
        if (!this.canvas || !this.canvas.getContext) return;
        this.ctx = this.canvas.getContext("2d");

        //window.addEventListener("resize", this.setCanvasSize);
        canvas.addEventListener("mousemove", this.mouseEvent);
        window.addEventListener("keydown", this.keyDownEvent);
        window.addEventListener("keyup", this.keyUpEvent);
        canvas.addEventListener("mousedown", this.fireEvent);

        this.setCanvasSize();
        this.createMap();
        //this.reset();

        let fps = 144;
        let date = new Date();
        let lastFrameTime = date.getTime() / 1000;
        let delta;
        gameLoop = () => {
            date = new Date();
            delta = date.getTime() / 1000 - lastFrameTime;
            if (delta > (1 / fps)) {
                this.drawScreen();
                lastFrameTime = date.getTime() / 1000;
            }
            window.requestAnimationFrame(gameLoop);
        }
        gameLoop();
    },
    reset: function(){
        this.clearScreen();
        this.clearBullets();

        this.Enemies = [];

        this.createPlayer();
        this.createEnemies();
    },
    setCanvasSize: function() {
        let width = 1000;
        let height = 800;
        Game.canvas.setAttribute("width", width);
        Game.canvas.setAttribute("height", height);
        Game.CanvasSize.width = width;
        Game.CanvasSize.height = height;
    },
    clearScreen: function() {
        this.ctx.fillStyle = "#cee6b4";
        this.ctx.fillRect(0, 0, Game.CanvasSize.width, Game.CanvasSize.height);
    },
    drawScreen: function() {
        if(this.Enemies.length == 0) this.reset();
        this.clearScreen();
        this.clearBullets();
        
        this.checkBulletCollisions();
        if (this.Bullets) {
            this.Bullets.forEach(blt => {
                blt.draw();
            });
        }
        this.Map.drawMap();

        this.drawEnemies();
        if (!this.Player.dead) {
            this.Player.draw(this.Map);
        }
    },
    mouseEvent: function(e) {
        Game.Mouse.pos = [e.layerX, e.layerY];
        Game.Player.updateAngle();
    },
    createPlayer: function() {
        const gameWindow = document.getElementById("game");
        this.Player = new Player([gameWindow.offsetWidth / 2, gameWindow.offsetHeight / 2], 35, "#6a492b", "twoBarrel");
        Main.updateHealth(this.Player.health);
    },
    keyDownEvent: function(e) {
        if (e.key == "w" && !Game.keysPressed.includes("w")) {
            Game.Player.velocity[1] = -5;
            Game.keysPressed.push("w");
        }
        if (e.key == "s" && !Game.keysPressed.includes("s")) {
            Game.Player.velocity[1] = 5;
            Game.keysPressed.push("s");
        }
        if (e.key == "a" && !Game.keysPressed.includes("a")) {
            Game.Player.velocity[0] = -5;
            Game.keysPressed.push("a");
        }
        if (e.key == "d" && !Game.keysPressed.includes("d")) {
            Game.Player.velocity[0] = 5;
            Game.keysPressed.push("d");
        }
    },
    keyUpEvent: function(e) {
        if (e.key == "w" && !Game.keysPressed.includes("s")) {
            Game.Player.velocity[1] = 0;
        }
        if (e.key == "s" && !Game.keysPressed.includes("w")) {
            Game.Player.velocity[1] = 0;
        }
        if (e.key == "d" && !Game.keysPressed.includes("a")) {
            Game.Player.velocity[0] = 0;
        }
        if (e.key == "a" && !Game.keysPressed.includes("d")) {
            Game.Player.velocity[0] = 0;
        }
        if (Game.keysPressed.includes(e.key)) {
            Game.keysPressed.splice(Game.keysPressed.indexOf(e.key));
        }
    },
    fireEvent: function(e) {
        Game.Player.fire();
    },
    clearBullets: function() {
        if (this.Bullets) {
            this.Bullets.forEach((blt, i) => {
                if (blt.boundaryCollision()[0] || blt.boundaryCollision()[1]) {
                    this.Bullets.splice(i, 1);
                }
            });
        }
    },
    createEnemies: function() {
        let width, height;
        r = 30;
        let color = "#1e212d";
        for (let i = 0; i < 5; i++) {
            width = Utility.randomDoubleFromRange(r, Game.CanvasSize.width - r);
            height = Utility.randomDoubleFromRange(r, 300);
            let weapon;
            if (Math.random() > 0.75) {
                weapon = "twoBarrel"
            }
            let enemy = new Enemy([width, height], r, color, weapon);
            while(this.Map.checkCollisions(enemy) || this.checkEnemyCollisions(enemy)){
                enemy.pos[0] = Utility.randomDoubleFromRange(r, Game.CanvasSize.width - r);
                enemy.pos[1] =  Utility.randomDoubleFromRange(r, 300);
            }

            this.Enemies.push(enemy);
        }
    },
    checkEnemyCollisions: function(newEnemy){
        let ret = false;
        if(this.Enemies){
            this.Enemies.forEach(Enemy => {
                if(Utility.checkCircleCollision(newEnemy, Enemy)){
                    ret = true;
                    return;
                }
            });
        }
        return ret;
    },
    drawEnemies: function() {
        if (this.Enemies) {
            this.Enemies.forEach(Enemy => {
                if (!Enemy.dead) {
                    Enemy.draw();
                    Game.enemyFire(Enemy);
                }
            });
        }
    },
    enemyFire: function(Enemy) {
        if (!this.Player.dead && Enemy) {
            if (Math.random() < 0.01) Enemy.fire();
        }
    },
    checkBulletCollisions: function() {
        if (!this.Bullets) return;
        this.Bullets.forEach((Bullet, i) => {
            if (Utility.checkCircleCollision(this.Player, Bullet)) {
                this.Bullets.splice(Bullet, 1);
                this.Player.hit();
                Main.updateHealth(this.Player.health);
            }
            else if(this.Map.checkCollisions(Bullet))
            {
                this.Bullets.splice(i, 1);
            }
            else if (this.Enemies) {
                this.Enemies.forEach((Enemy, j) => {
                    if (Utility.checkCircleCollision(Enemy, Bullet)) {
                        this.Bullets.splice(i, 1);
                        Enemy.hit();
                        if (Enemy.dead) {
                            this.Enemies.splice(j, 1);
                        }
                    }
                });
            }
        });
    },
    createMap: function() {
        let rectArray = [   new Rectangle([300, 300], [100, 100], "#111"),
                            new Rectangle([500, 200], [100, 100], "#111"),
                            new Rectangle([700, 300], [100, 100], "#111"),
                            new Rectangle([200, 200], [100, 100], "#111"),
                            new Rectangle([100, 400], [100, 100], "#111"),
                            new Rectangle([000, 400], [100, 100], "#111"),
                            new Rectangle([700, 400], [100, 100], "#111")
                        ];

        this.Map = new GameMap(rectArray);
    },
    loadImages: function() {
        let img = new Image();
        img.onload = function() {
            Game.Images.brick = img;
        }
        img.src = "img/brick_texture.jpg";
    }
}