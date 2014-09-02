var Game = {
    //define grid
    map_grid: {
        width: 24,
        height: 16,
        tile: {
            width: 16,
            height: 16
        }
    },

    //total width of screen
    width: function () {
        return this.map_grid.width * this.map_grid.tile.width;
    },

    //height of screen
    height: function() {
        return this.map_grid.height * this.map_grid.tile.height;
    },

    //Init
    start: function () {
        //start crafty
        Crafty.init(Game.width(), Game.height());
        Crafty.background('rgb(249, 223, 125)');

        Crafty.scene('Game');

        //trees
        for(var x = 0; x < Game.map_grid.width; x++) {
            for(var y = 0; y < Game.map_grid.height; y++) {
                var at_edge = (x == 0 ||
                    x == Game.map_grid.width - 1 ||
                    y == 0 ||
                    y == Game.map_grid.height - 1);
                
                // edge of screen
                if(at_edge) {
                    //place tree
                    Crafty.e('Tree').at(x, y);

                } else if(Math.random() < 0.06) {
                    //bushes placed at random at a 6% chance
                    Crafty.e('Bush').at(x, y);
                }
            }
        }
        Crafty.e('PlayerCharacter').at(5, 5);

        //villages
        var max_villages = 5;
        for (var x = 1; x < Game.map_grid.width - 1; x++) {
            for (var y = 1; y < Game.map_grid.height - 1; y++) {
                if (Math.random() < 0.02) {
                    Crafty.e('Village').at(x, y);

                    if(Crafty('Village').length >= max_villages) {
                        return;
                    }
                }
            }
        }
    }
}