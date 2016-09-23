'use strict';
var AbstractCreep = require('creep.AbstractCreep').AbstractCreep;


class Upgrader extends AbstractCreep {

    constructor(creep, myRoom){
        super(creep, myRoom);
        this.controller = this.myRoom.room.controller
        this.work();
    }

    work(){
        try {
            this.upgradeController();
        }
        catch(error){
            throw('UpgraderWork: ' + error);
        }
    }

    upgradeController(){
        var controller = Game.getObjectById(this.controller.id);
        if(this.creep.pos.isNearTo(controller)){
            this.stopMoving();
            this.creep.upgradeController(controller);
            return true;
        }

        this.startMoving();
        this.creep.moveTo(controller);
        return false
    }
}

module.exports.Upgrader = Upgrader;