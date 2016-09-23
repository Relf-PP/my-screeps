'use strict';
var RoomManager = require('RoomManager').RoomManager;
var MyRoom = require('Room').MyRoom;


class GameManager {

    constructor(game){
        this.game = game;
        global.Log = this.log;
        this.RoomManager = new RoomManager();
    }

    run(){
        this.cleanMemory();
        this.checkCpuBucket();
        this.initFactoryMemory();
        this.initRooms();
        this.RoomManager.loadRooms();
    }

    initRooms(){
        for(var name in this.game.rooms){
            var room = new MyRoom(this.game.rooms[name]);
            this.RoomManager.addRoom(room, name);
        }
    }

    checkCpuBucket(){
        if(this.game.cpu.bucket < 1000){
            Log('☢ Tick skipped due to low cpu bucket! ☢');
            return;
        }
    }

    cleanMemory(){
        for(var name in this.game.creeps){
            if(!this.game.creeps[name]){
                delete this.game.memory.creeps[name];
                Log('☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢');
                Log('RIP ' + name);
                Log('☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢ ☢');
            }
        }
    }

    initFactoryMemory(){
        if(Memory.factory == undefined){
            Memory.factory = {};
        }
    }

    log(message, for_role){
        var logger = consts.LOG[for_role];

        if(logger != undefined && !logger){
            return;
        }

        if(message == undefined){
            console.log();
        }
        else {
            if(for_role == 'error'){
                console.log(
                    '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n' +
                    message +
                    '\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
                );
            }
            else {
                for(var i in arguments){
                    if(typeof arguments[i] == 'object'){
                        arguments[i] = JSON.stringify(arguments[i]);
                    }
                }
                console.log.apply(null, arguments);
            }
        }
    }

    notify(message){
        this.game.notify(message);
    }

}

module.exports = GameManager;