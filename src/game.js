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
        Crafty.background('rgb(87, 109, 20)');

        Crafty.scene('Loading');
    }
}