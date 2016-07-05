/**
 * Created by Andarias Silvanus on 16/06/10.
 */

optikosApp.controller('worksheetController', function ($rootScope, $scope, $http, $timeout, stateService, WSfirst) {

    $scope.myWorksheet = {};
    $scope.rowList = [];
    $scope.columnList = [];
    $scope.chartListSystem = [];

    var fill_dimension = function() {
        $http({
            method: 'GET',
            url: 'api/fillDimension'
        }).then(function successCallback(response) {
            for (var i=0; i<response.data.length; i++) {
                $scope.dimensionList.push({
                    data: response.data[i],
                    type: 'dimension'
                });
            }
        }, function errorCallback(response) {
            alert ("Oops, seems there are error. Please reload this page");
        });
    };

    var fill_measure = function() {
        $http({
            method: 'GET',
            url: 'api/fillMeasure'
        }).then(function successCallback(response) {
            for (var i=0; i<response.data.length; i++) {
                $scope.measureList.push({
                    data: response.data[i],
                    type: 'measure',
                    measure_type: $scope.measureType[i]
                });
            }
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

    var fill_chart_list_system = function () {
        $http({
            method : "GET",
            url : "api/getChartTable"
        }).then(function successCallback(response) {
            $scope.chartListSystem = response.data;
        }, function errorCallback(response) {
            alert ("Oops, seems there are error. Please reload this page");
            //$scope.myWelcome = response.statusText;
        });
    };

    // ga penting??
    $scope.stateService = stateService;
    console.log($scope.workSheetList);
    // end of ga penting??

    function getWS (WSname) {
        // Search worksheet object in $scope.worksheetList by its name
        if ($scope.workSheetList.length > 0) {
            var found = false;
            var i = 0;
            while ((i < $scope.workSheetList.length) && !found) {
                if ($scope.workSheetList[i].name == WSname)
                    found = true;
                else
                    i++;
            }
            if (found) return i;
            else return -1;
        }
        else
            return -1;
    }

    function initRun() {
        // initial setup needed when page changed into another worksheet
        var idxWS = getWS(stateService.getState());
        $scope.myWorksheet = $scope.workSheetList[idxWS].worksheet;
        $scope.rowList = $scope.myWorksheet.getRow();
        $scope.columnList = $scope.myWorksheet.getColumn();
    }

    var init = function () {
        if (WSfirst.getFirst()) {
            // First time worksheet controller created, fill dimension list, measure list, and measure type
            fill_dimension();
            fill_measure_type();
            fill_measure();
            fill_chart_list_system();
            $scope.typeList.push("SUM", "AVG", "COUNT");
            WSfirst.setFirst(false);
            initRun();


            //FOR TESTING
            //alert ("this is first time");
            console.log("my worksheet");
            console.log($scope.myWorksheet);
            console.log("my worksheetList");
            console.log($scope.workSheetList);
        }
        else {
            // Transition between worksheet sheet, construct worksheet with associated worksheet object
            initRun();


            //FOR TESTING
            //var currentState = stateService.getState();
            //alert ("currState: " + currentState);
            console.log("my worksheet");
            console.log($scope.myWorksheet);
            console.log("my worksheetList");
            console.log($scope.workSheetList);
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
        //$scope.columnList.splice(idx, 1);
        $scope.myWorksheet.popColumn(idx);
    };

    $scope.deleteRow = function (idx) {
        //$scope.rowList.splice(idx, 1);
        $scope.myWorksheet.popRow(idx);
    };

    $scope.changeMeasure = function (measureName, idx) {
        alert ("index: " + idx + ", name: " + measureName);
    };

    $scope.generateChart = function (idx) {
        $scope.loadJSChart = $scope.chartListSystem[idx]['url-js'];
        //console.log($scope.loadJSChart);
    };

    $scope.$watch('loadJSChart', function() {
        $timeout(function() {
            if ($scope.loadJSChart.length > 0) {
                // remove script in load-chart-script div
                $('#load-chart-script').html('');

                // inject script
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = $scope.loadJSChart;
                //script.src = $scope.loadJSChart[$scope.loadJSChart.length-1];
                $("#load-chart-script").append(script);
            }
        });
    }, true);
});