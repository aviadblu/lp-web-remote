'use strict';

angular.module('factories.game_server',[])
    .factory('game_server', function($http) {
        var services = {
            login: function(secret) {
                return $http.get("/api/server/login?secret=" + secret);
            }
        };
        return services;
    });