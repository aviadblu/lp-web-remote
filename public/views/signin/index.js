;(function(){
    'use strict';
    angular
        .module('lpWebRemote')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('signin', {
                    url: '/signin',
                    controller: 'SigninCtrl',
                    controllerAs: 'ctrl',
                    templateUrl: 'views/signin/signin.html'
                })
        }]);


}).call(this);