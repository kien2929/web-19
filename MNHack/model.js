const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    game:{
        type : Number
    },

    player1 : {
        type : {
            name : {
                type: String,
            },
            result : {
                type : [JSON],
            },
            total :{
                type:Number
            }
        }
    },
    
    player2 : {
        type : {
            name : {
                type: String,
            },
            result : {
                type : [JSON],
            },
            total :{
                type:Number
            }
        }
    },

    player3 : {
        type : {
            name : {
                type: String,
            },
            result : {
                type : [JSON],
            },
            total :{
                type:Number
            }
        }
    },

    player4 : {
        type : {
            name : {
                type: String,
            },
            result : {
                type : [JSON],
            },
            total :{
                type:Number
            }
        }
    }

});

const playerModel = mongoose.model('player',PlayerSchema);

module.exports = playerModel;