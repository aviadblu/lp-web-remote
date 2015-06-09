;(function(){
    'use strict';
    angular
        .module('lpWebRemote')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('signin', {
                    url: '/signin',
                    controller: 'SigninCtrl',
                    templateUrl: 'views/signin/signin.html'
                })
        }]);


}).call(this);