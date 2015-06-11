var db = require('../../../config/firebase/connection');
var servers_fb = db.child('servers');
var secrets_fb = db.child('secrets');
var uuid = require('node-uuid');

var getSecret = function (secret_array) {
    var sec = Math.floor(Math.random() * 9000) + 1000;
    if (secret_array[sec])
        return getSecret(secret_array);
    else
        return sec;
};

var servers_db = {
    create: function (id, server_data, callback) {
        var server = servers_fb.child(id);
        server.once("value", function (data) {
            var data = data.val();

            if (data) {
                callback("No such id!");
            }
            else {
                var serverRef = servers_fb.push(server_data);
                var serverID = serverRef.key();


                // create secret connection
                secrets_fb.once("value", function (secret_data) {
                    var secret_array = secret_data.val() || {};
                    var newSecret = getSecret(secret_array);
                    secret_array[newSecret] = serverID;

                    secrets_fb.update(secret_array, function () {
                        callback(null, {id: serverID, secret: newSecret});
                    });

                });


            }
        });
    },

    getServer: function (id, callback) {
        var server = servers_fb.child(id);
        server.once("value", function (data) {
            var data = data.val();

            if (data) {
                callback(null, data);
            }
            else {
                callback("No server!");
            }
        });
    },

    killServer: function (id, callback) {
        var server = servers_fb.child(id);
        server.once("value", function (data) {
            var data = data.val();

            if (data) {
                servers_fb.child(id).remove(function () {
                    callback(null, "Server " + id + " is dead now... :(");
                });
            }
            else {
                callback("No server!");
            }
        });
    },

    resetServer: function (id, callback) {
        var server = servers_fb.child(id);
        server.once("value", function (data) {
            var data = data.val();

            if (data) {
                servers_fb.child(id).update({list: []}, function () {
                    callback(null, "Server " + id + " reset successfully!");
                });
            }
            else {
                callback("No server!");
            }
        });
    },

    serverList: function (callback) {

        servers_fb.once("value", function (data) {
            var data = data.val();

            if (data) {
                callback(null, data);
            }
            else {
                callback("No server!");
            }
        });
    },

    serverBySecret: function (secret, callback) {
        secrets_fb.child(secret).once("value", function (data) {
            var game_id = data.val();

            if (game_id) {
                callback(null, game_id);
            }
            else {
                callback("No server!");
            }
        });
    },

    registerRC: function (game_id, callback) {
        servers_db.getServer(game_id, function (err, game_data) {
            if (!game_data.active || err) {
                return callback(err || "Server not active");
            }

            var remotes = game_data.remotes || [];
            console.log("@@@@ remotes @@@@");
            console.log(remotes);

            if (remotes.length >= game_data.max_remotes) {
                return callback("Max remote number reached!");
            }

            // create remote:
            var now = new Date().getTime();
            var remote = {
                uid: uuid.v1(),
                created: now,
                lastSync: now
            };

            var pos = remotes.length;
            remotes[pos] = remote;

            // save remotes
            servers_fb.child(game_id).update({remotes: remotes}, function () {
                callback(null, {
                    uid: remote.uid,
                    pos: pos
                });
            });


        });
    }
};

module.exports = servers_db;