'use strict';
var AbstractStock = require('stock.AbstractStock').AbstractStock;


class Extensions extends AbstractStock {

    constructor(room, extensions){
        super(room, extensions);
    }

    init(){
        this.cacheKey = 'empty-extensions';
        this.emptyLevel = consts.EMPTY_EXTENSION_LVL;
        super.init();
    }
}

module.exports.Extensions = Extensions;