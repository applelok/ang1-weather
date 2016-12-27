
app.config(function($provide){
    console.log('config');
    
  });

  app.run(["$http", function($http, weatherInfoService){
    console.log('run block');
  
  }]);


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

windInfo.controller('WindInfoController', function ($scope, $q, weatherInfoService){
  weatherInfoService.getApiContentCache();
  $scope.$on('windInfo', function(event, result) {
    // var m = moment(result);
    // $scope.infoLastRetrieve = m.format('LLL');
    console.log("Wind = " + result);
    $scope.speed = result.speed;
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