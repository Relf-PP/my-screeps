'use strict';
var AbstractStock = require('stock.AbstractStock').AbstractStock;


class Containers extends AbstractStock {

    constructor(room, containers){
        super(room, containers);
    }

    init(){
        this.cacheKey = 'empty-containers';
        this.capacityField = 'storeCapacity';
        this.emptyLevel = consts.EMPTY_CONTAINER_LVL;
        super.init();
    }
}

module.exports.Containers = Containers;