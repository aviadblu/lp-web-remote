var express = require('express');
var config   = require('../../../config');
var router = express.Router();
var servers_db = require("./db");
var app = config.app;
var io = app.io;

io.on('connection', function (socket) {
    console.log("someone connected to sync");
});


router.get('/start', function (req, res) {
    var name = req.query.name;
    var max_remotes = req.query.rm || 400;

    var server = {
        active: 1,
        name: name,
        max_remotes: max_remotes,
        created: new Date().getTime(),
        remotes: []
    };

    var id = "xxx";

    servers_db.create(id, server, function(err, data){
        if(!err)
            res.send("Server " + data.id + " created! (" + data.secret + ")");
        else
            res.status(400).send(err);
    });

});

router.get('/data', function (req, res) {
    var id = req.query.id;

    servers_db.getServer(id,function(err,data){
        if(!err)
            res.send(data);
        else
            res.status(400).send(err);
    });

});

router.get('/kill', function (req, res) {
    var id = req.query.id;

    servers_db.killServer(id, function(err,data){
        if(!err)
            res.send(data);
        else
            res.status(400).send(err);
    });
});

router.get('/reset', function (req, res) {
    var id = req.query.id;
    servers_db.resetServer(id, function(err,data){
        if(!err)
            res.send(data);
        else
            res.status(400).send(err);
    });
});

router.get('/list', function (req, res) {
    servers_db.serverList(function(err,data){
        if(!err)
            res.send(data);
        else
            res.status(400).send(err);
    });
});


router.get('/login', function (req, res) {
    var secret = req.query.secret;

    servers_db.serverBySecret(secret, function(err, game_id){
        if(err)
            return res.status(400).send(err);

        // register rc
        servers_db.registerRC(game_id, function(err, remote_data){
            if(err)
                return res.status(400).send(err);

            res.send({game_id: game_id, remote: remote_data});
        });


    });

});


module.exports = router;