"use strict";

module.exports.MINER = 'miner';
module.exports.CARRIER = 'carrier';
module.exports.BUILDER = 'builder';
module.exports.UPGRADER = 'upgrader';
module.exports.REPAIRER = 'repairer';
module.exports.SKIP_REPAIR = true;
module.exports.EMPTY_SPAWN_LVL = 0.9;
module.exports.EMPTY_EXTENSION_LVL = 0.9;
module.exports.EMPTY_CONTAINER_LVL = 0.5;
module.exports.EMPTY_STORAGE_LVL = 0.5;
module.exports.ACTIONS = {
    RECOLTING: 1,
    STOCKING: 2,
    BUILDING: 3,
    REPAIRING: 4,
    UPGRADING: 5
};
module.exports.STOCK_TO = {
    BUILDER: 1,
    REPAIRER: 2,
    UPGRADER: 3,
    SPAWN: 4,
    EXTENSION: 5,
    CONTAINER: 6,
    STORAGE: 7
};
module.exports.LOG = {
    global: true,
    error: true,
    miner: true,
    builder: true,
    repairer: true,
    upgrader: true,
    carrier: true
};