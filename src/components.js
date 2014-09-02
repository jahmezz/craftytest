// grid component
Crafty.c('Grid', {
    init: function() {
        this.attr({
            w: Game.map_grid.tile.width,
            h: Game.map_grid.tile.height
        })
    },

    //locate this
    at: function (x, y) {
        if (x === undefined && y === undefined) {
            return {
                x: this.x/Game.map_grid.tile.width,
                y: this.y/Game.map_grid.tile.height
            }
        } else {
            this.attr({
                x: x * Game.map_grid.tile.width,
                y: y * Game.map_grid.tile.height
            });
            return this;
        }
    }
});

//actor is anything drawn onto canvas using grid
Crafty.c('Actor', {
    init: function () {
        this.requires('2D, Canvas, Grid');
    },
});

//Tree is an actor with a certain color
Crafty.c('Tree', {
    init: function () {
        this.requires('Actor, Color, Solid')
            .color('rgb(20, 125, 40)');
    },
});

// Bush is an actor with a color
Crafty.c('Bush', {
    init: function () {
        this.requires('Actor, Color, Solid')
            .color('rgb(20, 185, 40)');
    },
});

// character
Crafty.c('PlayerCharacter', {
    init: function () {
        this.requires('Actor, Fourway, Color, Collision')
            .fourway(4)
            .color('rgb(20, 75, 40)')
            .stopOnSolids()
            //whenever PC touches a village, respond
            .onHit('Village', this.visitVillage);   
    },
    //stop movement function called when hit solid component
    stopOnSolids: function () {
        this.onHit('Solid', this.stopMovement);

        return this;
    },

    //stop movement
    stopMovement: function () {
        this._speed = 0;
        if (this._movement) {
            this.x -= this._movement.x;
            this.y -= this._movement.y;
        }
    },

    visitVillage: function (data) {
        village = data[0].obj;
        village.collect();
    }
});

//village = win square
Crafty.c('Village', {
    init: function () {
        this.requires('Actor, Color')
            .color('rgb(170, 125, 40)');
    },

    collect: function () {
        this.destroy();
        Crafty.trigger('VillageVisited', this);
    }
})