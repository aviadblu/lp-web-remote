'use strict';

angular.module('controllers.remotecontroll',[])
    .controller('RemotecontrollCtrl', function ($scope, $stateParams, $timeout, game_server) {
        var ctrl = this;
        var userInfo = JSON.parse(localStorage.gameData);

        ctrl.status = {
            ready: false
        };

        var getRemoteData = function(index) {
            var digits = 4;
            var No = index + 1;
            var str = No + "";
            while (str.length < digits) str = "0" + str;
            return str;
        };

        ctrl.remoteNo = getRemoteData(userInfo.remote.pos);

        var init = function() {
            angular.element(document.querySelector('#page-loading')).removeClass("hidden");
            game_server.getServer(userInfo.game_id)
                .success(function (data, status, headers, config) {
                    ctrl.gameData = data;
                    $timeout(function(){
                        angular.element(document.querySelector('#page-loading')).addClass("hidden");
                        ctrl.status.ready = true;
                        initSocket();

                        var design = data.design || null;
                        initButtons(design);
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

        var no_butons = 4;
        var buttons_style_set = [];

        var convertDesign = function(design) {
            if(!design || !design.buttons)
                return;

            for(var i in design.buttons) {
                buttons_style_set.push(design.buttons[i]);
            }

        };

        var initButtons = function(design) {
            convertDesign(design);
            ctrl.buttons = [];
            for(var i = 0; i< no_butons; i++) {
                var but = {
                    label: i + 1
                };

                if(buttons_style_set[i]) {
                    but.style = buttons_style_set[i]
                }

                ctrl.buttons.push(but);
            }
        };

        ctrl.setAnswer = function(i) {
            socket.emit('remotePress', {
                gameID: userInfo.game_id,
                remote: userInfo.remote.uid,
                pos: userInfo.remote.pos,
                key: i
            });
        };

        init();

    });


