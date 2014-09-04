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
            } else if (Math.random() < 0.06 && !this.occupied[x][y]) {
                Crafty.e('Bush').at(x, y);
                this.occupied[x][y] = true;
            }
        }
    }
    var max_villages = 5;
    for (var x = 0; x < Game.map_grid.width; x++) {
        for(var y = 0; y < Game.map_grid.height; y++) {
            if(Math.random() < 0.02) {
                if(Crafty('Village').length < max_villages && !this.occupied[x][y]) {
                    Crafty.e('Village').at(x, y);
                }
            }
        }
    }

    this.show_victory = this.bind('VillageVisited', function () {
        if (!Crafty('Village').length) {
            Crafty.scene('Victory');
        }
    });
}, function () {
    this.unbind('VillageVisited', this.show_victory);
});

Crafty.scene('Victory', function () {
    Crafty.e('2D, DOM, Text')
        .attr({ x: 0, y: 0})
        .text('Victory!');

    this.restart_game = this.bind('KeyDown', function () {
        Crafty.scene('Game');
    });
}, function () {
    this.unbind('KeyDown', this.restart_game);
});