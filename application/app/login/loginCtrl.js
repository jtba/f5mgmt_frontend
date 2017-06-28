clusterMgmt.controller('loginCtrl', ['$scope', '$http', '$cookies', '$modal', '$modalInstance', 'httpSvc',
    function ($scope, $http, $cookies, $modal, $modalInstance, httpSvc) {
      $scope.credentials={};
      $scope.authfailure=false;

      $scope.save = function () {
         var encoded = {};
         encoded.authstring = "Basic "+ btoa($scope.credentials.username+":"+$scope.credentials.password);
         var request = httpSvc.Login.auth(__env.apiUrl, encoded);
         request.success(function (data) {
            if(data.status === "success"){
               $modalInstance.close(encoded.authstring);
            }else{
               $scope.authfailure=true;
            }
         }).error(function (data) {
            $scope.authfailure=true;
         });

      };

      $scope.cancel = function () {
         $modalInstance.dismiss('meh');
      };
   }]);