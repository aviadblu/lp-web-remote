;(function(){
    'use strict';
    angular
        .module('lpWebRemote')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('admin.servers', {
                    url: '/servers',
                    controller: 'ServersCtrl',
                    controllerAs: 'ctrl',
                    templateUrl: 'views/admin/servers/servers.html'
                })
        }]);


}).call(this);