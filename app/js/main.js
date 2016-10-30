var items = angular.module('items', []);
var text = angular.module('text', []);
var app = angular.module('app', ['items', 'text', 'ngMaterial']);


text.controller('TextController', function ($scope) {
    $scope.text = {
        message: 'Welcome!!'
    };
});

items.controller('ItemController', function ($scope) {
    $scope.items = [{
        title: 'Pencil',
        quantity: 8,
        price: 4.2
    }, {
        title: 'Pen',
        quantity: 2,
        price: 5.2
    }, {
        title: 'Watch',
        quantity: 3,
        price: 10.2
    }];
});