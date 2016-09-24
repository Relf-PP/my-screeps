'use strict';
var AbstractCreep = require('creep.AbstractCreep').AbstractCreep;


class Miner extends AbstractCreep {

    constructor(creep, myRoom){
        super(creep, myRoom);
        this.mineSpot = this.initMyMiningSpot();
        this.myContainer = this.initMyContainer();
        this.work();
    }

    work(){
        try {
            if(this.energy < this.energyCapacity){
                this.mineSource();
            }
            else {
                this.depositToContainer();
            }
        }
        catch(error){
            throw('MinerWork: ' + error);
        }
    }

    mineSource(source){
        let action;
        var atPosition = Helpers.isCreepAtPosition(
            this.creep, this.mineSpot
        );
        var source = this.getMySource();

        if(!atPosition){
            this.startMoving();
            action = this.creep.moveTo(
                this.mineSpot.x, this.mineSpot.y
            );
        }
        else {
            this.stopMoving();
            action = this.creep.harvest(Game.getObjectById(source.id));
        }

        if(action < 0){
            throw(this.name + 'Mine error ' + action);
        }
    }

    depositToContainer(){
        if(this.myContainer){
            if(!this.isMyContainerFull()){
                var container = Game.getObjectById(this.myContainer.id);
                this.creep.transfer(container, RESOURCE_ENERGY);
            }
            else {
                throw(this.name + ': My container is full !');
            }
        }
        else {
            throw(this.name + ': No container near me !');
        }
    }

    isMyContainerFull(){
        var containers = this.StockManager.containers;
        var energy = containers.getEnergy(this.myContainer);
        var energyCapacity = containers.getEnergyCapacity(this.myContainer);
        return energy == energyCapacity;
    }

    initMyMiningSpot(){
        if(!this.remember('myMiningSpot')){
            try {
                var spot = this.getClosestFreeMiningSpot();
                if(!spot){
                    this.creep.suicide();
                    throw('No free spot available !');
                }

                this.remember('myMiningSpot', spot);
            }
            catch(error){
                this.forget('myMiningSpot');
                throw('initMyMiningSpot: ' + error);
            }
        }

        return this.remember('myMiningSpot');
    }

    initMyContainer(){
        if(!this.remember('MyContainer')){
            var containers = this.StockManager.containers.stocks;
            for(var c in containers){
                var container = Game.getObjectById(containers[c].id);
                Log(this.creep.pos.getRangeTo(container));
                if(this.creep.pos.isNearTo(container)){
                    this.remember('MyContainer', containers[c]);
                }
            }
        }

        return this.remember('MyContainer');
    }

    getClosestFreeMiningSpot(){
        var freeSpots = this.SourceManager.getFreeMiningSpots();

        if(freeSpots.length == 0){
            return false;
        }

        var closestSpot = this.creep.pos.findClosestByRange(freeSpots);

        this.SourceManager.forgetAvailablePosition(closestSpot);

        return closestSpot;
    }

    getMySource(){
        if(this.remember('mySource') == undefined){
            this.remember(
                'mySource',
                this.creep.pos.findClosestByRange(FIND_SOURCES)
            );
        }
        return this.remember('mySource');
    }
}

module.exports.Miner = Miner;