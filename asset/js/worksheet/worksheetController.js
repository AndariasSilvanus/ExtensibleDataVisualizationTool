/**
 * Created by Andarias Silvanus on 16/06/10.
 */

optikosApp.controller('worksheetController', function ($rootScope, $scope, $http, $timeout, stateService) {
//optikosApp.controller('worksheetController', function ($rootScope, $scope, $http, $timeout) {

    // todo list:
    // - tampilkan tipe dimension (string/number/date/dll) di dimension field
    // - tampilkan tipe measure (sum/avg/count/dll) di measure field
    // - bisa klik kanan di measure untuk ubah type-nya

    // ide: bisa ga tiap kali controller di-init / load, dia buat 1 new worksheet object?
    // tp buat atribut laen, cem2 dimensionList & measureList ttep di controller aja

    $scope.dimensionList = [];
    $scope.measureList = [];
    $scope.measureType = [];
    $scope.rowList = [];
    $scope.columnList = [];
    $scope.typeList = [];

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
        fill_dimension();
        fill_measure();
        fill_measure_type();
        $scope.typeList.push("SUM", "AVG", "COUNT");
        var stateee = stateService.getState();
        alert (stateee);
    };

    //$rootScope.watch('currentState', function() {
    //    $timeout(function() {
    //        init();
    //    });
    //});


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