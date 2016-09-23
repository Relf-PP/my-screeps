'use strict';


class TickCache {

    constructor(){
        this.cache = {};
        this.randomId = parseInt(Math.random() * 10000);
    }

    getValue(key){
        return this.cache[key + '_' + this.randomId];
    }

    setValue(key, value){
        this.cache[key + '_' + this.randomId] = value;
        return this.getValue(key);
    }

    remember(key, callback, args){
        args = args || [];
        var cached_value = this.getValue(key);
        if(cached_value === undefined) {
            var result = callback.apply(null, args);
            this.setValue(key, result)

        }

        return this.getValue(key);
    }
}

module.exports.TickCache = TickCache;