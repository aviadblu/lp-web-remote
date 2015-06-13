;(function(){
    'use strict';
    angular
        .module('lpWebRemote')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('app', {
                    abstract: true,
                    controller: 'AppCtrl',
                    controllerAs: 'appCtrl',
                    url: '/app',
                    templateUrl: 'views/app/app.html'
                })
        }]);


}).call(this);