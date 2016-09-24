'use strict';
var Miner = require('creep.Miner').Miner;
var Carrier = require('creep.Carrier').Carrier;
var Upgrader = require('creep.Upgrader').Upgrader;
var Builder = require('creep.Builder').Builder;


class Factory {

    constructor(myRoom){
        this.myRoom = myRoom
        this.room = myRoom.room;
        this.population = myRoom.Population;
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
                newCreep = new Builer(creep, this.myRoom);
                break;

            case consts.REPAIRER:

                break;

            default:
                throw('Unknown creep: ' + creep.name);
        }

        return newCreep;
    }

    createCreep(spawn){
        var spawnableRole = this.population.getSpawnableRole();
        if(spawnableRole){
            try {
                var creepBody = this.getBestSpawnable(spawnableRole);
                var abilities = creepBody.abilities;
                var creepName = this.getNewCreepName(spawnableRole);
                if(spawn.canCreateCreep(abilities, creepName) == OK){
                    spawn.createCreep(abilities, creepName, {role: spawnableRole});
                    Log('❱❱❱❱❱❱❱❱❱❱❱❱❱❱❱❱❱❱❱❱❱❱❱❱');
                    Log('❱❱❱❱❱❱❱❱ Spawning: ' + creepName);
                    Log('❱❱❱❱❱❱❱❱❱❱❱❱❱❱❱❱❱❱❱❱❱❱❱❱');
                }
                else {
                    throw('Spawn ' + spawn.name + ' can\'t create ' + creepName);
                }
            }
            catch(error){
                Log(error, 'error');
            }
        }
    }

    getBestSpawnable(role){
        var maxEnergy = this.myRoom.energyForSpawn;
        var bestIndex = 1;
        var bestLevel = this.levels[role][bestIndex];

        for(var i in this.levels[role]){
            if(this.levels[role][i].cost > maxEnergy){
                break;
            }
            bestLevel = this.levels[role][i];
            bestIndex = i;
        }

        if(bestIndex == this.levels[role].length){
            Log(bestLevel);
            Log(bestLevel.cost);
            Log(maxEnergy)
        }

        return bestLevel;
    }

    getNewCreepName(role){
        return role + '-' + (this.lastCreepNumber(role) + 1);
    }

    lastCreepNumber(role){
        var creeps = this.population.getCreepsForRole(role);
        var lastCreep = creeps[creeps.length - 1];
        if (lastCreep == undefined){
            return 0;
        }
        return parseInt(lastCreep.name.split('-')[1]);
    }
}

module.exports.CreepFactory = Factory;