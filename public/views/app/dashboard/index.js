;(function(){
    'use strict';
    angular
        .module('lpWebRemote')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('app.dashboard', {
                    url: '/dashboard',
                    controller: 'DashboardCtrl',
                    templateUrl: 'views/app/dashboard/dashboard.html'
                })
        }]);


}).call(this);