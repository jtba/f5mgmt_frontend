clusterMgmt.controller('clusterMgmtCtrl', ['$scope', '$http', '$rootScope', 'DTOptionsBuilder', 'DTColumnDefBuilder','DTInstances', '$modal', 'httpSvc', 'growl','$interval',
    function ($scope, $http, $rootScope, DTOptionsBuilder, DTColumnDefBuilder,DTInstances, $modal, httpSvc,growl,$interval) {
      $scope.f5data = [];
      $scope.dataFinished = true;
      $scope.initLoaded = false;
      $scope.f5tables = [];
      $scope.globalsearch = {};

      $scope.dtOptions = {
         paginationType: 'simple',
         displayLength: 400,
         lengthChange: false,
         order: [[2, 'asc']]
      };
      $scope.dtColumnDef = [
         {aTargets: 2, type: 'natural'},
         {aTargets: 0, bSortable: false}
      ];
   
      //Loop through the existing datatables and modify the search and then draw (update the view)
      $scope.searchAll = function(){
         angular.forEach($scope.f5tables,function(instance){
            instance.DataTable.search($scope.globalsearch.value).draw(); //TODO possible render() here
         });
      };

      //Push each datatable into an array for use by the global search
      $scope.dtInstance = function(instance){
         $scope.f5tables.push(instance);
      };
      
      $scope.countDown = function(){
         $scope.countDownReset();
         $interval(function(){
            if($scope.countdown <= 0){
               $scope.getPools('refresh');
            }else{
               $scope.countdown--;
            }
            
         },1000,0);
      };
      $scope.countDownReset = function(){
         $scope.countdown = 15;
      };

      $scope.selectedItems = [];

      $scope.wipeCredentials = function () {
          httpSvc.Login.clearUser();
         growl.success('Credentials Wiped');
      };

      $scope.loginPrompt = function (template) {
         var modalInstance = $modal.open({
            templateUrl: template,
            controller: 'loginCtrl'
         });
         modalInstance.result.then(function (output) {
            httpSvc.Login.setUser(output);
            growl.success('Login success!');
            return true;
         });
      };
      
      $scope.confirmPrompt = function(action){
         var modalInstance = $modal.open({
            templateUrl:'app/cart/confirm.html',
            controller:'confirmCtrl',
            size:'lg',
            resolve:{
               cart: function(){
                  return $scope.selectedItems;
               },
               action: function(){
                  return action;
               }
            }
         });
         return modalInstance;
      };

      $scope.getPools = function (reason) {
          $rootScope.envVarPromise.then(function() {
                if ($scope.dataFinished) {
                  $scope.dataFinished = false;
                  var request = httpSvc.Pools.getAll(__env.apiUrl);
                  request.success(function (data) {
                      $scope.dataFinished = true;
                      $scope.countDownReset();
                      data = httpSvc.ScrubData.scrub(data);
                      switch (reason) {
                          case 'init':
                              $scope.f5data = data;
                              $scope.initLoaded = true;
                              $('.selectable').selectable({filter: 'tr'});
                              $scope.countDown();
                              break;
                          case 'refresh':
                              angular.merge($scope.f5data, data);
                              growl.info("Refreshed data");
                              break;
                          case 'reload':
                              $scope.f5data = data;
                              break;
                      }
                  }).error(function (data) {
                      console.log(data);
                  });
              }
          });
      };
      $scope.localMember = function (f5index, memberobject) {
         if (memberobject.ischecked) {
            $scope.selectedItems.push(memberobject);
         } else {
            $scope.selectedItems = $.grep($scope.selectedItems, function (e) {
               return e !== memberobject;
            });
         }
      };

      $scope.disableMembers = function () {
         if (!localStorage.getItem("Auth")) {
            $scope.loginPrompt('app/login/login.html');
            growl.error("No credentials. Login, and try again");
         } else {
            var confirmmodal = new $scope.confirmPrompt('Disable');
            confirmmodal.result.then(function(output){
               if(output){
                  growl.info("Your request is processing. Dont touch anything!");
                  var request = httpSvc.F5.disableMembers(__env.apiUrl, $scope.selectedItems);
                  request.success(function (data) {
                     console.log(data);
                     growl.success("Disabled selected pools. Data will refresh.");
                     $scope.getPools('refresh');
                  }).error(function (data) {
                     console.log(data);
                  });
               }
            });
         }
      };
      $scope.enableMembers = function () {
         if (!localStorage.getItem("Auth")) {
            $scope.loginPrompt('app/login/login.html');
            growl.error("No credentials. Login, and try again");
         } else {
            var confirmmodal = new $scope.confirmPrompt('Enable');
            confirmmodal.result.then(function(output){
               if(output){
                  growl.info("Your request is processing. Dont touch anything!");
                  var request = httpSvc.F5.enableMembers(__env.apiUrl, $scope.selectedItems);
                  request.success(function (data) {
                     console.log(data);
                     growl.success("Enabled selected pools. Data will refresh.");
                     $scope.getPools('refresh');
                  }).error(function (data) {
                     console.log(data);
                  });
               }
            });
         }
      };
      
      $scope.selectableSelected = function(event, ui){
         if(!angular.element(ui.selected).find('.icheckbox').data().$ngModelController.$modelValue){
            angular.element(ui.selected).find('.icheckbox').click();
         }
      };
      
      $scope.selectableUnselected = function(event, ui){
         if(angular.element(ui.unselected).find('.icheckbox').data().$ngModelController.$modelValue){
            angular.element(ui.unselected).find('.icheckbox').click();
         }
      };
      

   }]);