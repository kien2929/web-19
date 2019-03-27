const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const playerModel = require('./model');
let _game = 1;

mongoose.connect('mongodb://localhost:27017/mnhack', (err) =>{
    if(err) throw err;
    console.log('connect to mongoDB success');
})

const server = express();
server.use(express.static('public'));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.get('/', (req,res) => {
    res.status(200).sendFile(path.resolve(__dirname, './public/home.html'));
});

server.get('/games/:gameId',(req,res)=>{
    res.status(200).sendFile(path.resolve(__dirname, './public/game.html'));
})
server.post('/api/game',(rep,res)=>{
    try {
        
    } catch (error) {

    }
})

server.get('/create', async(req,res)=>{
    _game =await playerModel.count();
    console.log(_game);

    const newplayer = {
        game : _game,
        player1 : {
            name : req.query.player1,
            result : [],
            total : 0,
        },
        player2 : {
            name : req.query.player2,
            result : [],
            total : 0,
        },
        player3 : {
            name : req.query.player3,
            result : [],
            total : 0,
        },
        player4 : {
            name : req.query.player4,
            result : [],
            total : 0,
        }
    }
    await playerModel.create(newplayer);
    _game+=1;
    res.status(200).json({
        message : success,
    })
});

server.get('/playgame', (req,res) => {
    res.status(200).sendFile(path.resolve(__dirname, './playgame/game.html'));
});
server.get('/startgame', (req,res) => {
    playerModel.findOne({game : _game-1}, (err,docs) =>{
        if( err ) throw err;
        res.status(201).json({
            namePlayer1 : docs.player1.name,
            namePlayer2 : docs.player2.name,
            namePlayer3 : docs.player3.name,
            namePlayer4 : docs.player4.name
        })
    })
});

server.get('/totalscore',(req,res) => {
    playerModel.findOne({game : _game-1}, (err,docs)=>{
        if(err) throw err;
        res.status(201).json({
            total1 : docs.player1.total,
            total2 : docs.player2.total,
            total3 : docs.player3.total,
            total4 : docs.player4.total,
        })
    })
})

server.get('/savescore',(req,res) =>{
    const score1 = req.query.score1;
    const score2 = req.query.score2;
    const score3 = req.query.score3;
    const score4 = req.query.score4;
    const _round = req.query.round;

    playerModel.findOne({game : _game-1}, (err,docs)=>{
        if(err) throw err;
        const result1 = (docs.player1.result);
        const result2 = (docs.player2.result);
        const result3 = (docs.player3.result);
        const result4 = (docs.player4.result)
        result1.push({round : _round, score : score1});
        result2.push({round : _round, score : score2});
        result3.push({round : _round, score : score3});
        result4.push({round : _round, score : score4});

        const player1 = {
            name : docs.player1.name,
            result : result1,
            total : docs.player1.total + Number(score1)
        }
        const player2 = {
            name : docs.player2.name,
            result : result2,
            total : docs.player2.total + Number(score3)
        }
        const player3 = {
            name : docs.player3.name,
            result : result3,
            total : docs.player3.total + Number(score3)
        }
        const player4 = {
            name : docs.player4.name,
            result : result4,
            total : docs.player4.total + Number(score4)
        }

        playerModel.findOneAndUpdate({game : _game-1},{player1 : player1, player2 : player2, player3 : player3, player4 : player4},(err,kqua)=>{
            if(err) throw err;
            res.status(200).json(kqua);
        })
    })
})

server.listen(3000, (error) => {
    if(error) throw error;
    console.log('server listen on port 3000 ...');
});
