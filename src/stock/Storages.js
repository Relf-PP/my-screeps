'use strict';
var AbstractStock = require('stock.AbstractStock').AbstractStock;


class Storages extends AbstractStock {

    constructor(room, storages){
        super(room, storages);
    }

    init(){
        this.cacheKey = 'empty-stores';
        this.capacityField = 'storeCapacity';
        this.emptyLevel = consts.EMPTY_STORAGE_LVL;
        super.init();
        this.getEmpty();
    }
}

module.exports.Storages = Storages;