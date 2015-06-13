;(function(){
    'use strict';
    angular
        .module('lpWebRemote')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('admin', {
                    abstract: true,
                    controller: 'AdminCtrl',
                    controllerAs: 'adminCtrl',
                    url: '/admin',
                    templateUrl: 'views/admin/admin.html'
                })
        }]);


}).call(this);