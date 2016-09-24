'use strict';

var repairer_settings = {
    priority: 1,
    min: 1,
    total: 0,
    minExtensions: 0,
    minPopulation: 10,
    finalStats: [CARRY, WORK],
    levels: [{
        level: 1,
        abilities: [WORK, CARRY, MOVE]
    }, {
        level: 2,
        abilities: [WORK, WORK, CARRY, MOVE]
    }, {
        level: 3,
        abilities: [WORK, WORK, WORK, CARRY, MOVE]
    }, {
        level: 4,
        abilities: [WORK, WORK, WORK, WORK, CARRY, MOVE]
    }, {
        level: 5,
        abilities: [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE]
    }, {
        level: 6,
        abilities: [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE]
    }, {
        level: 7,
        abilities: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE]
    }, {
        level: 8,
        abilities: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE]
    }, {
        level: 9,
        abilities: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE]
    }, {
        level: 10,
        abilities: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE]
    }]
};

module.exports.settings = repairer_settings;