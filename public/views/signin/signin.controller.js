'use strict';

angular.module('controllers.signin', [])
    .controller('SigninCtrl', function ($scope, $stateParams, $state, game_server) {
        var ctrl = this;
        this.response = null;
        this.login = function () {
            game_server.login(this.form.game_id)
                .success(function (data, status, headers, config) {
                    localStorage.gameData = JSON.stringify(data);
                    $state.go("app.remotecontroll");
                }).
                error(function (data, status, headers, config) {
                    ctrl.response = data;
                });
            return true;
        };
    });


