'use strict';


class AbstractCreep {

    constructor(creep, myRoom){
        this.creep = creep;
        this.myRoom = myRoom;
        this.SourceManager = myRoom.SourceManager;
        this.StockManager = myRoom.StockManager;
        this.initMySpawn();
        this.initMyRoom();
        this.initMoving();
    }

    set creep(creep){
        this._creep = creep;
    }

    get creep(){
        return this._creep;
    }

    set myRoom(myRoom){
        this._myRoom = myRoom;
    }

    get myRoom(){
        return this._myRoom;
    }

    get mySpawn(){
        return this.remember('mySpawn');
    }

    getSpawn(){
        return this.creep.pos.findClosestByRange(FIND_MY_SPAWNS);
    }

    get room(){
        return this.myRoom.room;
    }

    get name(){
        return this.creep.name;
    }

    get type(){
        return this.remember('role', this.name.split('-')[0]);
    }

    get memory(){
        return this.creep.memory;
    }

    get energy(){
        return this.creep.carry.energy;
    }

    get energyCapacity(){
        return this.creep.carryCapacity;
    }

    get moving(){
        return this.remember('moving');
    }

    initMySpawn(){
        if(!this.remember('mySpawn')){
            try {
                var spawn = this.getSpawn();
                this.remember('mySpawn', spawn);
            }
            catch(error){
                this.forget('mySpawn');
                throw('initMySpawn: ' + error);
            }
        }
    }

    initMyRoom(){
        if(!this.remember('MyRoom')){
            try {
                this.remember('MyRoom', this.myRoom.room);
            }
            catch(error){
                this.forget('MyRoom');
                throw('initMyRoom: ' + error);
            }
        }
    }

    initMoving(){
        if(this.moving == undefined){
            try {
                this.stopMoving();
            }
            catch(error){
                this.forget('moving');
                throw('initMoving: ' + error);
            }
        }
    }

    startMoving(){
        if(!this.moving){
            this.remember('moving', true);
        }
    }

    stopMoving(){
        if(this.moving){
            this.remember('moving', false);
        }
    }

    remember(key, value){
        if(value == undefined){
            return this.memory[key];
        }

        this.memory[key] = value;

        return value;
    }

    forget(key){
        delete this.memory[key];
    }
}

module.exports.AbstractCreep = AbstractCreep;