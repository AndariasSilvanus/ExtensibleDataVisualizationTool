/**
 * Created by Andarias Silvanus on 16/06/10.
 */

optikosApp.controller('worksheetController', function ($scope, $http) {

    // todo from 19 Juni 00:53
    // passing list dimension & measure dr tahap parsing data ke list (array) $scope
    // agar dapat dipakai untuk generate daftar measure & dimension di view

    // rencana:
    // - buat list dimension (ambil datanya dulu)
    // - buat list measure (ambil datanya dulu)
    // - buat list row
    // - buat list column
    // - view generate komponen dimension & measure dr list dimension & measure
    // - sambungkan view dengan list row & column untuk keperluan draggable

    $scope.dimensionList = [];
    $scope.measureList = [];
    $scope.measureType = [];
    $scope.rowList = [];
    $scope.columnList = [];

    var fill_dimension = function() {
        $http({
            method: 'GET',
            url: 'api/fillDimension'
        }).then(function successCallback(response) {
            $scope.dimensionList = response.data;
        }, function errorCallback(response) {
            alert ("Oops, seems there are error. Please reload this page");
        });
    };

    var fill_measure = function() {
        $http({
            method: 'GET',
            url: 'api/fillMeasure'
        }).then(function successCallback(response) {
            $scope.measureList = response.data;
        }, function errorCallback(response) {
            alert ("Oops, seems there are error. Please reload this page");
        });
    };

    var fill_measure_type = function() {
        $http({
            method: 'GET',
            url: 'api/fillMeasureType'
        }).then(function successCallback(response) {
            $scope.measureType = response.data;
        }, function errorCallback(response) {
            alert ("Oops, seems there are error. Please reload this page");
        });
    };

    var init = function () {
        fill_dimension();
        fill_measure();
        fill_measure_type();
    };

    init();

    //FOR TESTING
    $scope.models = {
        selected: null,
        lists: {"A": [], "B": []}
    };

    // Generate initial model
    for (var i = 1; i <= 3; ++i) {
        $scope.models.lists.A.push({label: "Item A" + i});
        $scope.models.lists.B.push({label: "Item B" + i});
    }

    // Model to JSON for demo purpose
    $scope.$watch('models', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);
    //END TESTING
});