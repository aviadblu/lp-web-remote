'use strict';

angular.module('controllers.signin', [])
    .controller('SigninCtrl', function ($scope, $stateParams, game_server) {

        this.login = function () {
            game_server.login(this.form.game_id)
                .success(function (data, status, headers, config) {
                    localStorage.gameData = JSON.stringify(data);
                    console.log(data);
                }).
                error(function (data, status, headers, config) {
                    console.log(data)
                });
            return true;
        };
    });


