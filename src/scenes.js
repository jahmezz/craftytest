Crafty.scene('Game', function () {
    //2d array for occupied
    this.occupied = new Array(Game.map_grid.width);
    for (var i = 0; i < Game.map_grid.width; i++) {
        this.occupied[i] = new Array(Game.map_grid.height);
        for (var y = 0; y < Game.map_grid.height; y++) {
            this.occupied[i][y] = false;
        }
    }

    //character
    this.player = Crafty.e('PlayerCharacter').at(5, 5);
    this.occupied[this.player.at().x][this.player.at().y] = true;

    //trees
    for (var x = 0; x < Game.map_grid.width; x++) {
        for (var y = 0; y < Game.map_grid.height; y++) {
            var at_edge = x == 0 ||
                x == Game.map_grid.width - 1 ||
                y == 0 ||
                y == Game.map_grid.height - 1;

            if (at_edge) {
                Crafty.e('Tree').at(x, y);
                this.occupied[x][y] = true;
            } eles if (Math.random() < 0.06 && !this.occupied[x][y]) {
                Crafty.e('Bush').at(x, y);
                this.occupied[x][y] = true;
            }
        }
    }
    var max_villages = 5;
    for (var x = 0; x < Things.length; x++) {
        for(var y = 0; y < Game.map_grid.height; y++) {
            if(Math.random() < 0.02) {
                if(Crafty('Village').length < max_villages && !this.occupied[x][y]) {
                    Crafty.e('Village').at(x, y);
                }
            }
        }
    };
})