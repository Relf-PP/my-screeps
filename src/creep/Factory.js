'use strict';
var Miner = require('creep.Miner').Miner;
var Carrier = require('creep.Carrier').Carrier;
var Upgrader = require('creep.Upgrader').Upgrader;


class Factory {

    constructor(myRoom){
        this.myRoom = myRoom
        this.room = myRoom.room;
        this.levels = this.getLevels();
    }

    getLevels(){
        if(Memory.factory.levels == undefined){
            Memory.factory.levels = this.loadLevels();
        }
        return Memory.factory.levels;
    }

    loadLevels(){
        var levels = {};
        var roles = this.myRoom.getPopulationDistribution();
        for(var role in roles){
            levels[role] = {};
            for(var i in roles[role].levels){
                var abilities = roles[role].levels[i].abilities;
                levels[role][parseInt(i) + 1] = {
                    abilities: abilities,
                    cost: this.getCostForAbilities(abilities)
                }
            }
        }
        return levels;
    }

    getCostForAbilities(abilities){
        var cost = 0;
        for(var i in abilities){
            cost += BODYPART_COST[abilities[i]];
        }
        return cost;
    }

    loadExistantCreep(creep){
        var newCreep = false;

        switch(creep.name.split('-')[0]){
            case consts.MINER:
                newCreep = new Miner(creep, this.myRoom);
                break;

            case consts.CARRIER:
                newCreep = new Carrier(creep, this.myRoom);
                break;

            case consts.UPGRADER:
                newCreep = new Upgrader(creep, this.myRoom);
                break;

            case consts.BUILDER:

                break;

            case consts.REPAIRER:

                break;

            default:
                throw('Unknown creep: ' + creep.name);
        }

        return newCreep;
    }
}

module.exports.CreepFactory = Factory;