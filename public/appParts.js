(function (window, angular) {
    'use strict';

    angular
        .module('services', [

        ]);

    angular
        .module('factories', [
            'factories.game_server'
        ]);

    angular
        .module('controllers', [
            'controllers.signin',
            'controllers.dashboard',
            'controllers.remotecontroll'
        ]);

    angular
        .module('filters', [

        ]);

    angular
        .module('constants', [

        ]);

    angular
        .module('directives', [

        ]);


    angular
        .module('appParts', [
            'services',
            'factories',
            'controllers',
            'filters',
            'constants',
            'directives'
        ])

        .run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
            $rootScope
                .$on('$stateChangeStart',
                function(event, toState, toParams, fromState, fromParams){
                    angular.element(document.querySelector('#ui-view')).html("");
                    angular.element(document.querySelector('#page-loading')).removeClass("hidden");
                });

            $rootScope
                .$on('$stateChangeSuccess',
                function(event, toState, toParams, fromState, fromParams){
                    angular.element(document.querySelector('#page-loading')).addClass("hidden");
                });
        }])

        .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {

            if(localStorage.gameData) {
                $urlRouterProvider.otherwise("/app/remotecontroll");
            }
            else {
                $urlRouterProvider.otherwise("/signin");
            }


            $httpProvider.interceptors.push(function($q) {
                return {
                    'request': function(config) {
                        var remoteData = null;
                        if(localStorage.gameData) {
                            //var gameData = JSON.parse(localStorage.gameData);
                            remoteData = localStorage.gameData;
                        }
                        config.headers['remote-data'] = remoteData;
                        return config;
                    }
                };
            });

        }]);

})(window, window.angular);
