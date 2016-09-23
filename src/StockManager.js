'use strict';
var Spawns = require('stock.Spawns').Spawns;
var Extensions = require('stock.Extensions').Extensions;
var Containers = require('stock.Containers').Containers;
var Storages = require('stock.Storages').Storages;


class StockManager {

    constructor(room){
        this.room = room;
        this.energy = room.energyAvailable;
        this.energyCapacity = room.energyCapacityAvailable;
        this.spawns = this.loadSpawns();
        this.extensions = this.loadExtensions();
        this.containers = this.loadContainers();
        this.storages = this.loadStorages();
    }

    loadSpawns(){
        var spawns = this.room.find(
            FIND_MY_SPAWNS
        );
        return new Spawns(this.room, spawns);
    }

    getSpawnById(id){
        for(var ss in this.spawns){
            for(var s in this.spawns[ss]){
                if(this.spawns[ss][s].id == id){
                    return this.spawns[ss][s];
                }
            }
        }
        return false;
    }

    loadExtensions(){
        var extensions = this.room.find(
            FIND_MY_STRUCTURES,
            {filter: Helpers.filterExtensions}
        )
        return new Extensions(this.room, extensions);
    }

    loadContainers(){
        var containers = this.room.find(
            FIND_STRUCTURES,
            {filter: Helpers.filterContainers}
        );
        var my_containers = new Containers(this.room, containers);
        this.energy += my_containers.energy;
        this.energyCapacity += my_containers.energyCapacity;
        return my_containers;
    }

    loadStorages(){
        var storages = this.room.find(
            FIND_STRUCTURES,
            {filter: Helpers.filterStorages}
        );
        var my_storages = new Storages(this.room, storages);
        this.energy += my_storages.energy;
        this.energyCapacity += my_storages.energyCapacity;
        return my_storages;
    }
}

module.exports.StockManager = StockManager;