'use strict';

var miner_settings = {
    priority: 0,
    min: 2,
    total: 0,
    minExtensions: 0,
    minPopulation: 0,
    finalStats: [CARRY, WORK],
    levels: [{
        level: 1,
        abilities: [WORK, CARRY, MOVE]
    }, {
        level: 2,
        abilities: [WORK, WORK, CARRY, MOVE]
    }, {
        level: 3,
        abilities: [WORK, WORK, CARRY, CARRY, MOVE]
    }, {
        level: 4,
        abilities: [WORK, WORK, WORK, CARRY, CARRY, MOVE]
    }, {
        level: 5,
        abilities: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE]
    }, {
        level: 6,
        abilities: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE]
    }, {
        level: 7,
        abilities: [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE]
    }, {
        level: 8,
        abilities: [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE]
    }, {
        level: 9,
        abilities: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE]
    }, {
        level: 10,
        abilities: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE]
    }]
};

module.exports.settings = miner_settings;