clusterMgmt.factory('httpSvc', ['$http', '$cookies', function ($http, $cookies) {

      // models name object
      var Models = {
         'Pools': {},
         'Login': {},
         'ScrubData': {},
         'F5':{}
      };

      Models.Login.setUser = function(credentials){
          localStorage.setItem("Auth", credentials);
      };

      Models.Login.getUser = function(){
          return localStorage.getItem("Auth");
      };
      Models.Login.clearUser = function(){
          localStorage.removeItem('Auth');
      }

      Models.Login.auth = function (prefix, data) {
         let request = {
            method: 'POST',
            url: prefix + '/auth',
            data: data
         };
         return $http(request);
      };

      Models.Pools.getAll = function (prefix) {
         let request = {
            method: 'POST',
            url: prefix + '/pools',
            headers:{'Authorization':localStorage.getItem('Auth')}
            //url: prefix + 'fakedata.json'
         };
         return $http(request);
      };
      
      Models.F5.disableMembers = function (prefix,data){
        console.log("disable members");
         let request = {
            method: 'PUT',
            url: prefix + '/members/disable',
            headers:{'Authorization':localStorage.getItem('Auth')},
            data: data
         };
         console.log("request headers");
         console.log(request.headers);
         return $http(request);
      };
      
      Models.F5.enableMembers = function (prefix,data){
         let request = {
            method: 'PUT',
            url: prefix + '/members/enable',
            headers:{'Authorization':localStorage.getItem('Auth')},
            data: data
         };
         return $http(request);
      };
         
/* 
    By default the F5 API returns a very challenging JSON object; this scrubber will transform it to something usable.
*/
      Models.ScrubData.scrub = function (data) {
         let tempstore = [];
         //Create array of F5s
         for (f5 = 0; f5 < data.results.length; f5++) {
            let currentF5 = data.results[f5];
            let f5Object = {f5Name: currentF5.name, members: []};
            for (pool = 0; pool < currentF5.data.items.length; pool++) {
               let currentPool = currentF5.data.items[pool];
               let poolName = currentPool.name;
               if (currentPool.membersReference.items) {
                  for (member = 0; member < currentPool.membersReference.items.length; member++) {
                     let currentMember = currentPool.membersReference.items[member];
                     let memberObject = {poolName: poolName, memberName: currentMember.name, memberStatus: currentMember.session, f5Uri: currentF5.name};
                     f5Object.members.push(memberObject);
                  }// -- End of member loop
               }
            } // -- End of pool loop
            tempstore.push(f5Object);
         } //-- End of F5 loop
         data = tempstore;
          console.log(data);
         return data;
      };


      return Models;
   }]);