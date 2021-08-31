let Main = {
    init: function() {
        Game.init();
    },
    updateHealth: function(health) {
        document.getElementById("health").innerHTML = health;
    }
}

window.onload = Main.init();