var weatherHeader = angular.module('weatherHeader', []);
var weatherForecast = angular.module('weatherForecast', []);
var weatherRetrieveInfo = angular.module('weatherRetrieveInfo', []);
var windInfo = angular.module('windInfo', []);
var navBar = angular.module('navBar', []);
var app = angular.module('app', ['weatherHeader', 'weatherForecast', 'weatherRetrieveInfo', 'windInfo', 'navBar', 'ngMaterial']);
