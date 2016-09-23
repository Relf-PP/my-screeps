'use strict';
var consts = require('core.Constants');
var TickCache = require('core.Cache').TickCache;
var Helpers = require('core.Helpers').Helpers;
var GameManager = require('GameManager');

global.consts = consts;
global.Cache = new TickCache();
global.Helpers = new Helpers();

global.game_manager = new GameManager(Game);
game_manager.run();