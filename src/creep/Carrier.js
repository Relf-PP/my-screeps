'use strict';
var AbstractCreep = require('creep.AbstractCreep').AbstractCreep;


class Carrier extends AbstractCreep {

    constructor(creep, myRoom){
        super(creep, myRoom);

        this.myMinerCreep = this.assignMyMinerCreep();
        this.myDepositCreep = this.assignMyDepositCreep();

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
        var myMinerCreep = Game.getObjectById(this.myMinerCreep.id);
        if(this.creep.pos.isNearTo(myMinerCreep)){
            this.stopMoving();
            myMinerCreep.transfer(this.creep, RESOURCE_ENERGY);
            return true;
        }

        this.startMoving();
        this.creep.moveTo(myMinerCreep);
        return false
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
            throw(this.name + ': I have nothing to do !');
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
}

module.exports.Carrier = Carrier;