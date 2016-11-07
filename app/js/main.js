var weatherHeader = angular.module('weatherHeader', []);
var weatherForecast = angular.module('weatherForecast', []);
var weatherRetrieveInfo = angular.module('weatherRetrieveInfo', []);
var navBar = angular.module('navBar', []);
var app = angular.module('app', ['weatherHeader', 'weatherForecast', 'weatherRetrieveInfo', 'navBar', 'ngMaterial']);

app.config(function($provide){
    console.log('config');
    
  });

  app.run(["$http", function($http, weatherInfoService){
    console.log('run block');
  
  }]);
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
        var url = "https://query.yahooapis.com/v1/public/yql?q=select%20item%20from%20weather.forecast%20where%20woeid%3D" + paramValue + "%20and%20u%3D'c'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
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
          cache.put(cacheId, response.data);
          deferred.resolve(response.results);
        }, function(response) {
           deferred.reject("Failed...");
            return deferred.promise;
        }.bind(this));
            return deferred.promise;
        };
  });

navBar.controller('navBarController', function($scope){
  $scope.refresh = function(){ 
    angular.element(document.querySelector('#loading-mask')).addClass("active");
    var locId = (getUrlParameter('woeid').length > 0) ? getUrlParameter('woeid') : "2165358";
    location.href="?woeid="+locId;
  };
  $scope.changeLoc = function(locId){
    location.href = "?woeid=" + locId;
  }
});
weatherForecast.controller('WeatherForecastController', function ($scope, $q, weatherInfoService) {
  weatherInfoService.getApiContentCache();
  $scope.$on('weatherInfoData', function(event, result) {
    angular.element(document.querySelector("#loading-mask")).removeClass("active");
    var daysForecast = result.forecast;  
    var forecastImg = [];
    angular.forEach(daysForecast, function(dailyForecast){
      var day = dailyForecast.day;
      var img = getWeatherIconByText(dailyForecast.text);
      var weekday = getWeekdayNameByShortForm(day);
      var newProps = {'img' : img, 'weekday': weekday};
            forecastImg.push(newProps);
    });

    var forecastList = angular.merge({}, daysForecast, forecastImg);
    $scope.forecastingList = forecastList;

  });
});

weatherHeader.controller('WeatherHeaderController', function ($scope, $q, weatherInfoService) {
  weatherInfoService.getApiContentCache();
  $scope.$on('weatherInfoData', function(event, result) {
    console.log("got Data");
    // console.log(result);
    var condition = result.condition;
    var todayCondition = result.forecast[0];
    console.log(todayCondition);

    $scope.weatherDesc = condition.text;
    $scope.weatherImg = getWeatherIconByText(condition.text);
    $scope.highestDeg = todayCondition.high;
    $scope.lowestDeg = todayCondition.low;
    $scope.currentDeg = condition.temp;

    
  });
  $scope.$on('woeid', function(event, result){
    $scope.districtName = getDistrictName(result);
    // console.log("districtName="+districtName);
  });
   
});

weatherForecast.controller('WeatherRetrieveInfoController', function ($scope, $q, weatherInfoService) {
  weatherInfoService.getApiContentCache();
  $scope.$on('retrieveInfo', function(event, result) {
    var m = moment(result);
    $scope.infoLastRetrieve = m.format('LLL');
  });
});
function getWeatherIconByText(text){
  var img = "";
  switch(text){
      case "Mostly Sunny":
        img = "images/icons/sun.png";
        break;
      case "Mostly Cloudy":
        img = "images/icons/clouds.png";
        break;
      case "Partly Cloudy":
        img = "images/icons/partial_sunny.png";
        break;
      default:
        img = "images/icons/sun.png";
        break;
  }
  return img;
}

function getWeekdayNameByShortForm(dayText){
  switch(dayText){
    case "Sun":
      return "Sunday";
    case "Mon":
      return "Monday";
    case "Tue":
      return "Tuesday";
    case "Wed":
      return "Wednesday";
    case "Thu":
      return "Thursday";
    case "Fri":
      return "Friday";
    case "Sat":
      return "Saturday";
  } 
}

function getUrlParameter(sParam){
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    
    }
    return "";
}

function getDistrictName(woeid){
  switch(woeid){
    case "2165411":
      return "Tuen Mun";
    case "2165358":
      return "Yuen Long";
    case "2165398":
      return "Sham Shui Po";
    case "2165386":
      return "Kwun Tong";
    case "24703137":
      return "Wong Tai Sin";
    case "2165356":
      return "Sha Tin";
    case "2165355":
      return "Tsuen Wan";
  }
}