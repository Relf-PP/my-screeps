'use strict';
var AbstractStock = require('stock.AbstractStock').AbstractStock;


class Spawns extends AbstractStock {

    constructor(room, spawns){
        super(room, spawns);
    }

    init(){
        this.cacheKey = 'empty-spawns';
        this.emptyLevel = consts.EMPTY_SPAWN_LVL;
        super.init();
    }
}

module.exports.Spawns = Spawns;