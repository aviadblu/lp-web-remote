/**
 * Created by AvB on 13/06/2015.
 */
'use strict';

angular.module('controllers.app',[])
    .controller('AppCtrl', function ($scope, $stateParams, game_server) {
        var ctrl = this;
        var userInfo = JSON.parse(localStorage.gameData);
        ctrl.status = {
            ready: false
        };

        game_server.getServer(userInfo.game_id)
            .success(function (data, status, headers, config) {
                ctrl.gameData = data;
                setDesign(data.design);

            });


        ctrl.design = {
            logo: "assets/images/logo_full.png",
            background: {}
        };

        var setDesign = function(design) {

            if(!design)
                return;

            if(design.logo)
                ctrl.design.logo = design.logo;

            if(design.container)
                ctrl.design.container = design.container;



        };


    });


