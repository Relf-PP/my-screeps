'use strict';

var carrier_settings = {
    priority: 1,
    min: 1,
    total: 0,
    minExtensions: 0,
    minPopulation: 1,
    finalStats: [CARRY, MOVE],
    levels: [{
        level: 1,
        abilities: [CARRY, MOVE]
    }, {
        level: 2,
        abilities: [CARRY, CARRY, MOVE]
    }, {
        level: 3,
        abilities: [CARRY, CARRY, MOVE, MOVE]
    }, {
        level: 4,
        abilities: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
    }, {
        level: 5,
        abilities: [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
    }, {
        level: 6,
        abilities: [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
    }, {
        level: 7,
        abilities: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
    }, {
        level: 8,
        abilities: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
    }, {
        level: 9,
        abilities: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
    }, {
        level: 10,
        abilities: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
    }]
};

module.exports.settings = carrier_settings;