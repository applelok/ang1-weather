 app.service("weatherInfoService", function ($http, $q, $cacheFactory, $rootScope) {
      var cache = $cacheFactory('dataCache');
      var cacheId;

      this.getApiContentCache = function(){
        if(cacheId){
          // console.log('cached');
          return cache.get(cacheId);
        }
        else{
          // console.log('cached failed.');
          this.getApiContent();
        }
      };
    
      this.getApiContent = function () {
        var paramValue = (getUrlParameter('woeid').length > 0) ? getUrlParameter('woeid') : "2165358";
        console.log(paramValue);
        var deferred = $q.defer();
        var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D" + paramValue + "%20and%20u%3D'c'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
        // var params = jQuery.param({
        //   soNumber:getUrlParameter("so_number"), 
        // soThreepl:getUrlParameter("so_threepl"),
        // userLocale: "en_US"
        // });
        console.log('weatherInfo starts');
        // cacheId = url + '*' + params;
        $http({
          method: 'POST',
          url: url
        }).then(function(response) {
          console.log(response);
          var data = response.data.query.results.channel.item;
          $rootScope.$broadcast('weatherInfoData', data);
          $rootScope.$broadcast('woeid', paramValue);
          $rootScope.$broadcast('retrieveInfo', response.data.query.created);
          $rootScope.$broadcast('windInfo', response.data.query.results.channel.wind);
          cache.put(cacheId, response.data);
          deferred.resolve(response.results);
        }, function(response) {
           deferred.reject("Failed...");
            return deferred.promise;
        }.bind(this));
            return deferred.promise;
        };
  });