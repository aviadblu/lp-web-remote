'use strict';

angular.module('factories.game_server',[])
    .factory('game_server', function($http) {
        var services = {
            login: function(secret) {
                return $http.get("/api/server/login?secret=" + secret);
            },
            getServer: function(game_id) {
                return $http.get("/api/server/data?id=" + game_id);
            },
            getAllServers: function() {
                return $http.get("/api/server/list");
            }
        };
        return services;
    });