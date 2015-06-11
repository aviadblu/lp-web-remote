;(function(){
    'use strict';
    angular
        .module('lpWebRemote')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('app.remotecontroll', {
                    url: '/remotecontroll',
                    controller: 'RemotecontrollCtrl',
                    controllerAs: 'ctrl',
                    templateUrl: 'views/app/remotecontroll/remotecontroll.html'
                })
        }]);


}).call(this);