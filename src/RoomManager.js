'use strict';


class RoomManager {

    constructor(){
        this.rooms = {};
    }

    addRoom(room, name){
        this.rooms[name] = room;
    }

    loadRooms() {
        for(var name in this.rooms){
            var room = this.rooms[name];

            room.loadCreeps();

            Log('-------------------------------------------------------\n' +
                name + ' - ' +
                '⚉ ' + room.Population.getTotal() +
                '/' + room.Population.getMax() + ' : ' +
                'M ' + room.Population.getRole(consts.MINER).total +
                '/' + room.Population.getRole(consts.MINER).max + ' ★ ' +
                'C ' + room.Population.getRole(consts.CARRIER).total +
                '/' + room.Population.getRole(consts.CARRIER).max + ' ★ ' +
                'B ' + room.Population.getRole(consts.BUILDER).total +
                '/' + room.Population.getRole(consts.BUILDER).max + ' ★ ' +
                'R ' + room.Population.getRole(consts.REPAIRER).total +
                '/' + room.Population.getRole(consts.REPAIRER).max + ' ★ ' +
                'U ' + room.Population.getRole(consts.UPGRADER).total +
                '/' + room.Population.getRole(consts.UPGRADER).max + ' - ' +
                '⚡ ' + room.StockManager.energy +
                '/' + room.StockManager.energyCapacity +
                ' ❖ ' + room.SourceManager.energy +
                '\n-------------------------------------------------------');
        }
    }
}

module.exports.RoomManager = RoomManager;