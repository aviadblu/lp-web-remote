'use strict';

angular.module('controllers.remotecontroll',[])
    .controller('RemotecontrollCtrl', function ($scope, $stateParams, $timeout, game_server) {
        var ctrl = this;
        var userInfo = JSON.parse(localStorage.gameData);
        ctrl.status = {
            ready: false
        };


        var init = function() {
            angular.element(document.querySelector('#page-loading')).removeClass("hidden");
            game_server.getServer(userInfo.game_id)
                .success(function (data, status, headers, config) {
                    ctrl.gameData = data;
                    $timeout(function(){
                        angular.element(document.querySelector('#page-loading')).addClass("hidden");
                        ctrl.status.ready = true;
                        initSocket();
                    },1000);
                });
        };

        var socket;
        var initSocket = function() {
            socket = io();
            socket.on("servers", function (data) {
                $scope.servers = data;
                $scope.$apply();
            });
        };


        init();





    });


