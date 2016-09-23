'use strict';


class AbstractStock{

    constructor(room, stocks){
        this.room = room;
        this.stocks = stocks;
        this.energy = 0;
        this.energyCapacity = 0;
        this.emptyLevel = null;
        this.capacityField = null;
        this.cacheKey = null;
        this.init();
    }

    init(){
        for(var s in this.stocks){
            this.energy += this.getEnergy(this.stocks[s]);
            this.energyCapacity += this.getEnergyCapacity(this.stocks[s]);
        }
    }

    getEmpty(){
        return Cache.remember(
            this.cacheKey,
            () => {
                var empty = [];
                for(var s in this.stocks){
                    if(this.isEmpty(this.stocks[s])){
                        empty.push(this.stocks[s]);
                    }
                }
                return empty;
            }
        )
    }

    isEmpty(stock){
        return Cache.remember(
            this.cacheKey + '-' + stock.id + '-isEmpty',
            () => {
                return this.getFilledPercentage(stock) < this.emptyLevel;
            }
        )
    }

    getFilledPercentage(stock){
        return Cache.remember(
            this.cacheKey + '-' + stock.id + '-filledPercentage',
            () => {
                return this.getEnergy(stock) / this.getEnergyCapacity(stock);
            }
        )
    }

    getClosestEmpty(creep){
        return creep.pos.findClosestByRange(this.getEmpty());
    }

    getEnergy(stock){
        return Cache.remember(
            this.cacheKey + '-' + stock.id + '-energy',
            () => {
                if(stock.energy == undefined){
                    return stock.store.energy;
                }
                return stock.energy;
            }
        )
    }

    getEnergyCapacity(stock){
        return Cache.remember(
            this.cacheKey + '-' + stock.id + 'capacity',
            () => {
                if(this.capacityField != null){
                    var capacity = stock[this.capacityField];
                    if(Object.keys(stock.store).length > 1){
                        delete(stock.store.energy);
                        for(var mineral in stock.store){
                            capacity -= stock.store[mineral];
                        }
                    }
                    return capacity;
                }
                return stock.energyCapacity;
            }
        );
    }
}

module.exports.AbstractStock = AbstractStock;