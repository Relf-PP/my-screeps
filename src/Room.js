'use strict';
var RoomPopulation = require('RoomPopulation').RoomPopulation;
var StockManager = require('StockManager').StockManager;
var SourceManager = require('SourceManager').SourceManager;
var CreepFactory = require('creep.Factory').CreepFactory;


class MyRoom {

    constructor(room){
        this.room = room;
        this.energyAvailable = room.energyAvailable;
        this.energyCapacityAvailable = room.energyCapacityAvailable;
        this.creeps = this.getCreeps();
        this.myCreeps = [];
        this.StockManager = new StockManager(room);
        this.SourceManager = new SourceManager(room);
        this.Population = new RoomPopulation(this, this.creeps);
        this.Population.setPopulationLevels();
        this.CreepFactory = new CreepFactory(this);
    }

    getCreeps(){
        return Cache.remember(
            'room-' + this.room.id + '-creeps',
            () => {
                return this.room.find(FIND_MY_CREEPS);
            }
        )
    }

    getPopulationDistribution(){
        return this.Population.distribution;
    }

    loadCreeps(){
        for(var c in this.creeps){
            try {
                var creep = this.CreepFactory.loadExistantCreep(
                    this.creeps[c]
                );
                if(creep != false){
                    this.myCreeps.push(creep);
                }
            }
            catch(error) {
                Log('Error during loading creep: ' + error, 'error');
                game_manager.notify(error);
            }
        }
    }
}

module.exports.MyRoom = MyRoom;