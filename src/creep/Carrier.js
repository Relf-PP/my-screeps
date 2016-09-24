'use strict';
var AbstractCreep = require('creep.AbstractCreep').AbstractCreep;


class Carrier extends AbstractCreep {

    constructor(creep, myRoom){
        super(creep, myRoom);

        this.myMinerCreep = this.assignMyMinerCreep();
        this.myDepositCreep = this.assignMyDepositCreep();
        this.myContainer = this.assignMyContainer();

        this.spawns = this.StockManager.spawns;
        this.spawn = this.StockManager.getSpawnById(this.mySpawn.id);
        this.mySpawnObject = Game.spawns[this.mySpawn.name];

        this.extensions = this.StockManager.extensions;

        this.work();
    }

    work(){
        try {
            if(this.energy < this.energyCapacity){
                this.gatherEnergy();
            }
            else {
                this.depositEnergy();
            }
        }
        catch(error){
            throw('CarrierWork: ' + error);
        }
    }

    gatherEnergy(){
        if(!this.isMyContainerAlmostEmpty()){
            this.gatherEnergyFromMyContainer();
        }
        else {
            this.gatherEnergyFromMyMiner();
        }
    }

    gatherEnergyFromMyContainer(){
        if(this.myContainer){
            var container = Game.getObjectById(this.myContainer.id);
            if(this.creep.pos.isNearTo(container)){
                this.stopMoving();
                container.transfer(this.creep, RESOURCE_ENERGY);
            }
            else {
                this.startMoving();
                this.creep.moveTo(container);
            }
        }
        else {
            throw(this.name + ': No container available !');
        }
    }

    gatherEnergyFromMyMiner(){
        var myMinerCreep = Game.getObjectById(this.myMinerCreep.id);
        if(this.creep.pos.isNearTo(myMinerCreep)){
            this.stopMoving();
            myMinerCreep.transfer(this.creep, RESOURCE_ENERGY);
        }

        this.startMoving();
        this.creep.moveTo(myMinerCreep);
    }

    depositEnergy(){
        var continueAction = true;

        if(this.spawns.isEmpty(this.spawn)){
            continueAction = this.depositEnergyToMySpawn();
        }

        if(continueAction){
            this.depositEnergyToExtension();
        }

        if(continueAction){
            this.depositEnergyToMyDepositCreep();
        }

        if(continueAction){
            // TODO other targets
        }
    }

    depositEnergyToMySpawn(){
        let action;

        if(this.creep.pos.isNearTo(this.mySpawnObject)){
            this.stopMoving();
            action = this.creep.transfer(this.mySpawnObject, RESOURCE_ENERGY);
        }
        else {
            this.startMoving();
            action = this.creep.moveTo(this.mySpawnObject);
        }

        return action < OK;
    }

    depositEnergyToExtension(){
        let action;
        var extension = null;

        for(var e in this.extensions.stocks){
            var extension = this.extensions.stocks[e];
            if(this.extensions.isEmpty(extension)){
                break;
            }
        }

        if(extension != null){
            if(this.creep.pos.isNearTo(extension)){
                this.stopMoving();
                action = this.creep.transfer(extension, RESOURCE_ENERGY);
            }
            else {
                this.startMoving();
                action = this.creep.moveTo(extension);
            }
        }

        return action < OK;
    }

    depositEnergyToMyDepositCreep(){
        if(this.myDepositCreep == undefined){
            return true;
        }

        let action;
        var myDepositCreep = Game.getObjectById(this.myDepositCreep.id);

        if(this.creep.pos.isNearTo(myDepositCreep)){
            this.stopMoving();
            action = this.creep.transfer(myDepositCreep, RESOURCE_ENERGY);
        }
        else {
            this.startMoving();
            action = this.creep.moveTo(myDepositCreep);
        }

        return action < OK;
    }

    assignMyContainer(){
        if(!this.remember('MyContainer')){
            var containers = this.StockManager.containers.stocks;
            for(var c in containers){
                var container = Game.getObjectById(containers[c].id);
                this.remember('MyContainer', containers[c]);
                break;
            }
        }

        return this.remember('MyContainer');
    }

    assignMyMinerCreep(){
        if(!this.remember('myMinerCreep')){
            for(var c in this.myRoom.creeps){
                var creep = this.myRoom.creeps[c];
                if(Helpers.isCreepGathereable(creep)){
                    this.remember('myMinerCreep', creep);
                    creep.memory.gathered = true;
                }
            }
        }

        return this.remember('myMinerCreep');
    }

    assignMyDepositCreep(){
        if(!this.remember('myDepositCreep')){
            for(var c in this.myRoom.creeps){
                var creep = this.myRoom.creeps[c];
                if(Helpers.isCreepDelivereable(creep)){
                    this.remember('myDepositCreep', creep);
                    creep.memory.delivered = true;
                }
            }
        }

        return this.remember('myDepositCreep');
    }

    isMyContainerAlmostEmpty(){
        var containers = this.StockManager.containers;
        if(containers.stocks.length == 0){
            return true;
        }

        var energy = containers.getEnergy(this.myContainer);
        var energyCapacity = containers.getEnergyCapacity(this.myContainer);
        return energy < this.creep.energyCapacity;
    }
}

module.exports.Carrier = Carrier;