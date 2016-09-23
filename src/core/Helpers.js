'use strict';


class Helpers {
    isCreepA(creep, role){
        return (creep.name.split('-')[0] == role);
    }

    isCreepAtPosition(creep, position){
        return (
            creep.pos.x == position.x &&
            creep.pos.y == position.y
        );
    }

    isCreepGathereable(creep){
        return(
            this.isCreepA(creep, consts.MINER) &&
            (creep.gathered == undefined || !creep.gathered)
        )
    }

    isCreepDelivereable(creep){
        return(
            !this.isCreepA(creep, consts.CARRIER) &&
            !this.isCreepA(creep, consts.MINER) &&
            (creep.delivered == undefined || !creep.delivered)
        )
    }

    isCellWall(cell){
        return cell.type == 'terrain' && cell.terrain == 'wall';
    }

    filterExtensions(stock){
        return stock.structureType == STRUCTURE_EXTENSION;
    }

    filterContainers(stock){
        return stock.structureType == STRUCTURE_CONTAINER;
    }

    filterStorages(stock){
        return stock.structureType == STRUCTURE_STORAGE;
    }
}

module.exports.Helpers = Helpers;