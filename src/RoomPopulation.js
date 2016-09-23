'use strict';
var MinerSettings = require('settings.miner').settings;
var CarrierSettings = require('settings.carrier').settings;
var BuilderSettings = require('settings.builder').settings;
var RepairerSettings = require('settings.repairer').settings;
var UpgraderSettings = require('settings.upgrader').settings;


class RoomPopulation {

    constructor(myRoom, creeps){
        this.myRoom = myRoom;
        this.room = myRoom.room;
        this.SourceManager = myRoom.SourceManager
        this.creeps = creeps;
        this.setDistribution();
    }

    setDistribution(){
        this.distribution = {};
        this.distribution[consts.MINER] = MinerSettings;
        this.distribution[consts.CARRIER] = CarrierSettings;
        this.distribution[consts.BUILDER] = BuilderSettings;
        this.distribution[consts.UPGRADER] = UpgraderSettings;
        this.distribution[consts.REPAIRER] = RepairerSettings;

        for(var c in this.creeps){
            var creep = this.creeps[c];
            var role = creep.name.split('-')[0];

            if(!this.checkIfRoleExists(role, creep)){
                continue;
            }

            this.distribution[role].total ++;

            this.assignPercentages();
        }
    }

    assignPercentages(){
        for(var name in this.distribution){
            var creep = this.distribution[name];
            creep.percentage = creep.total / this.getTotal();
        }
    }

    getTotal(){
        return this.creeps.length;
    }

    getMax(){
        return Cache.remember(
            'max-population',
            () => {
                var population = 0;
                for(var n in this.distribution){
                    population += this.distribution[n].max;
                }
                return population;
            }
        );
    }

    getRole(role){
        return Cache.remember(
            'population-role-' + role,
            () => {
                return this.distribution[role];
            }
        )
    }

    checkIfRoleExists(role, creep){
        if(this.distribution[role] == undefined){
            creep.suicide();
            Log('Uknown role ' + role + ', killing…');
            return false;
        }
        return true;
    }

    setPopulationLevels(){
        this.distribution.miner.max = this.getMaxMiners();
        this.distribution.builder.max = this.getMaxBuilders();
        this.distribution.upgrader.max = this.getMaxUpgraders();
        this.distribution.repairer.max = this.getMaxRepairers();
        this.distribution.carrier.max = this.getMaxCarriers();
    }

    getMaxMiners(){
        var sourcesPositions = this.SourceManager.getAvailablePositions();
        if(sourcesPositions == undefined){
            return 0;
        }

        var sourcesNumber = sourcesPositions.length;

        if(this.getTotal() < 6){
            return sourcesNumber < 2 ? 2 : sourcesNumber;
        }

        return sourcesNumber > 2 ? sourcesNumber : 2;
    }

    getMaxBuilders(){
        if(this.getTotal() < 10){
            return 0;
        }

        if(this.getTotal() >= 10 && this.getTotal() < 20){
            return 1;
        }

        if(this.getTotal() < 50){
            return 2;
        }

        return 4;
    }

    getMaxUpgraders(){
        if(this.getTotal() < 10){
            return 1;
        }

        if(this.getTotal() < 20){
            return 2;
        }

        if(this.getTotal() < 50){
            return 3;
        }

        return 4;
    }

    getMaxRepairers(){
        return this.getMaxBuilders();
    }

    getMaxCarriers(){
        return (
            this.distribution.miner.max +
            this.distribution.builder.max +
            this.distribution.repairer.max +
            this.distribution.upgrader.max
        );
    }
}

module.exports.RoomPopulation = RoomPopulation;