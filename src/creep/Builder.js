'use strict';
var AbstractCreep = require('creep.AbstractCreep').AbstractCreep;


class Builder extends AbstractCreep {

    constructor(creep, myRoom){
        super(creep, myRoom);
        this.work();
    }

    work(){
        try {

        }
        catch(error){
            throw('BuilderWork: ' + error);
        }
    }


}

module.exports.Builder = Builder;