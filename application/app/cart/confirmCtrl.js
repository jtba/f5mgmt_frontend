clusterMgmt.controller('confirmCtrl', ['$scope','$modalInstance','cart','action', function ($scope,$modalInstance,cart,action) {
      
      $scope.cart = cart;
      $scope.action = action;

      $scope.submit = function () {
         $modalInstance.close(true);
      };

      $scope.cancel = function () {
         $modalInstance.close(false);
      };
   }]);