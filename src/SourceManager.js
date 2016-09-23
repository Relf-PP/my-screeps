class SourceManager {

    constructor(room){
        this.room = room;
        this.sources = this.getSources();
        this.energy = 0;
        this.loadSources();
    }

    loadSources(){
        for(var s in this.sources){
            this.energy += this.sources[s].energy;
        }
    }

    getSources(){
        var sources = this.room.memory.sources;
        if(sources == undefined || sources.length == 0){
            this.room.memory.sources = this.room.find(FIND_SOURCES);
        }
        return this.room.memory.sources;
    }

    getRandomSource(){
        var sources = this.getSources();
        var random = Math.floor(Math.random() * sources.length);
        return sources[random];
    }

    getAvailablePositions(){
        var positions = this.room.memory.availableSourcesPositions || [];

        if(positions.length){
            return positions;
        }

        var sources = this.getSources();
        for(var s in sources){
            positions.push(
                this.getAvailablePositionsForSource(sources[s])
            );
        }

        if(positions.length){
            this.room.memory.availableSourcesPositions = positions;
        }
    }

    getAvailablePositionsForSource(source){
        var positions = [];

        for(var x = -1; x <= 1; x++){
            for(var y = -1; y <= 1; y++){
                if(x == 0 && y == 0){
                    continue;
                }

                var cell_position = this.room.getPositionAt(
                    source.pos.x + x, source.pos.y + y
                )
                var cell = cell_position.look();
                for(var c in cell){
                    if(Helpers.isCellWall(cell[c])){
                        continue;
                    }

                    cell_position.free = true;
                    positions.push(cell_position);
                    break;
                }
            }
        }

        return positions;
    }

    forgetAvailablePosition(spot){
        var positionSources = this.getAvailablePositions();
        for(var s in positionSources){
            var positions = positionSources[s];
            for(var p in positions){
                var position = positionSources[s][p];

                if(position.x == spot.x && position.y == spot.y){
                    this.rentSpot(s, p);
                }
            }
        }
    }

    rentSpot(source, position){
        this.room.memory.availableSourcesPositions[source][position].free = false;
    }

    getFreeMiningSpots(){
        var freeSpots = this.getAvailablePositions();
        var spots = []
        for(var s in freeSpots){
            for(var p in freeSpots[s]){
                if(freeSpots[s][p].free){
                    spots.push(
                        this.room.getPositionAt(
                            freeSpots[s][p].x,
                            freeSpots[s][p].y
                        )
                    );
                }
            }
        }

        return spots;
    }
}

module.exports.SourceManager = SourceManager;