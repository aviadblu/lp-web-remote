'use strict';

angular.module('controllers.servers', [])
    .controller('ServersCtrl', function ($scope, $stateParams, $timeout, game_server) {
        var ctrl = this;
        ctrl.press_data = {};
        ctrl.selected_server = null;


        ctrl.pressData = function () {
            if (ctrl.press_data && ctrl.selected_server && ctrl.press_data[ctrl.selected_server]) {
                return ctrl.press_data[ctrl.selected_server].reverse();
            }
            else {
                return [];
            }

        };

        var init = function () {
            game_server.getAllServers()
                .success(function (data, status, headers, config) {
                    ctrl.servers = data;
                    initSocket();
                });
        };


        var socket;
        var initSocket = function () {
            socket = io();
            socket.on("press_data", function (data) {
                $timeout(function () {
                    ctrl.press_data = data;
                });

            });
        };

        init();


        ctrl.selectServer = function (server_id) {
            ctrl.selected_server = server_id;
        };
    });


