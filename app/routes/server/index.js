var express = require('express');
var router = express.Router();


var servers = {};
var pass = {};
var Server = function (id) {

    var ServerObj;

    this.init = function (id, name, secret, no_remotes) {
        if (!servers[id]) {
            servers[id] = {
                name: name,
                secret: secret,
                no_remotes: no_remotes,
                created: new Date().getTime(),
                list: [1,2,3,4]
            };
            pass[secret] = id;
            return "Server created!";
        }
        return "Server already exists";
    };

    this.getServer = function(id) {
        return servers[id] || null;
    };

    this.reset = function(id) {
        var server = this.getServer(id);
        server.list = [];
    };

};

router.get('/start', function (req, res) {
    var id = req.query.id;
    var name = req.query.name;
    var secret = req.query.secret;
    var no_remotes = req.query.rm || 400;

    var server = new Server();
    var createRes = server.init(id, name, secret, no_remotes);
    res.send(createRes);
});

router.get('/kill', function (req, res) {
    var id = req.query.id;
    var server = new Server();

    if(server.getServer(id)) {
        delete servers[id];
        res.send("Server " + id + " is dead now!");
        return;
    }

    res.send("Could not find server " + id);
});


router.get('/reset', function (req, res) {
    var id = req.query.id;
    var server = new Server();
    server.reset(id);

    res.send("Server " + id + " reset successfully");
});

router.get('/list', function (req, res) {
    res.send(servers);
});


module.exports = router;