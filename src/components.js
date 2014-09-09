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
        this.requires('Actor, Solid, spr_tree');
    },
});

// Bush is an actor with a color
Crafty.c('Bush', {
    init: function () {
        this.requires('Actor, Solid, spr_bush');
    },
});

Crafty.c('Rock', {
  init: function() {
    this.requires('Actor, Solid, spr_rock');
  },
});

// character
Crafty.c('PlayerCharacter', {
    init: function () {
        this.requires('Actor, Fourway, Collision, spr_player, SpriteAnimation')
            .fourway(4)
            .stopOnSolids()
            .onHit('Village', this.visitVillage)
            .animate('PlayerMovingUp',    0, 0, 2)
            .animate('PlayerMovingRight', 0, 1, 2)
            .animate('PlayerMovingDown',  0, 2, 2)
            .animate('PlayerMovingLeft',  0, 3, 2);

        var animation_speed = 4;
        this.bind('NewDirection', function (data) {
            if (data.x > 0) {
                this.animate('PlayerMovingRight', animation_speed, -1);
            } else if (data.x < 0) {
                this.animate('PlayerMovingLeft', animation_speed, -1);
            } else if (data.y > 0) {
                this.animate('PlayerMovingDown', animation_speed, -1);
            } else if (data.y < 0) {
                this.animate('PlayerMovingUp', animation_speed, -1);
            } else {
                this.stop();
            }
        });
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
        village.visit();
    },
});

//village = win square
Crafty.c('Village', {
    init: function () {
        this.requires('Actor, spr_village');
    },

    visit: function () {
        this.destroy();
        Crafty.trigger('VillageVisited', this);
    }
});