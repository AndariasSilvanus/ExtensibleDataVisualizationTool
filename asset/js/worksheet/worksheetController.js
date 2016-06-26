/**
 * Created by Andarias Silvanus on 16/06/10.
 */

optikosApp.controller('worksheetController', function ($rootScope, $scope, $http, $timeout, stateService, WSfirst) {

    $scope.dimensionList = [];  // contains list of dimension
    $scope.measureList = [];    // contains list of measure
    $scope.measureType = [];    // contains list of measure type
    $scope.typeList = [];       // contains list option for measure type: SUM, AVG, COUNT

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

    $scope.stateService = stateService;
    console.log($scope.workSheetList);

    var init = function () {
        if (WSfirst.getFirst()) {
            // First time worksheet controller created, fill dimension list, measure list, and measure type
            fill_dimension();
            fill_measure();
            fill_measure_type();
            $scope.typeList.push("SUM", "AVG", "COUNT");
            WSfirst.setFirst(false);
            alert ("this is first time");
        }
        else {
            // Transition between worksheet sheet, construct worksheet with associated worksheet object
            var currentState = stateService.getState();
            alert ("currState: " + currentState);
        }
    };

    $scope.$watch('stateService.getState()', function(newval) {
        console.log("masuk watch service, new value: " + newval);
        $timeout(function() {
            console.log("masuk timeout watch service");
            init();
        });
    }, true);

    $scope.deleteCol = function (idx) {
        $scope.columnList.splice(idx, 1);
    };

    $scope.deleteRow = function (idx) {
        $scope.rowList.splice(idx, 1);
    };

    $scope.changeMeasure = function (measureName, idx) {
        alert ("index: " + idx + ", name: " + measureName);
    }

});