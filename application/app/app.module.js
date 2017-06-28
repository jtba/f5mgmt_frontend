var env = {};


var clusterMgmt = angular.module("clusterMgmt", ['datatables', 'ngCookies', 'ui.bootstrap', 'angular-growl', 'ngSelectable'])
    .constant('__env', env)
    .config(['growlProvider', function (growlProvider) {
        growlProvider.globalTimeToLive(3000);
        growlProvider.globalPosition('bottom-right');
    }])
    .run(function ($rootScope, $http) {
        $rootScope.envVarPromise = new Promise(function(resolve,reject){
            $http.get('/config').then(function (res) {
                window.__env = res.data;
                resolve();
            }, function errorCallback(res) {
                console.log("Error calling the config");
                reject();
            });
        });
    });