/**
 * Created by Andarias Silvanus on 16/06/10.
 */

optikosApp.controller('worksheetController', function ($rootScope, $scope, $http, $timeout, stateService, WSfirst) {

    $scope.myWorksheet = {};
    $scope.dimensionContainer = [];
    $scope.measureContainer = [];
    $scope.drillDownContainer = [];
    $scope.drillDownContainerDummy = [];
    $scope.chartListSystem = [];
    $scope.chartListLocal = [];
    $scope.loadChart = false;

    var fill_dimension = function() {
        $http({
            method: 'GET',
            url: 'api/fillDimension'
        }).then(function successCallback(response) {
            for (var i=0; i<response.data.length; i++) {
                $scope.dimensionList.push({
                    data: response.data[i],
                    type: 'dimension',
                    measure_type: 'SUM'
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
            //console.log("response fill measure");
            //console.log(response);
            for (var i=0; i<response.data.length; i++) {
                $scope.measureList.push({
                    data: response.data[i].measure,
                    type: 'measure',
                    measure_type: response.data[i]['measure_type']
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

    var fill_chart_list_local = function () {
        $scope.chartListLocal = JSON.parse(localStorage.getItem('chartTable'));
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

    function getCurrWS() {
        var idxWS = getWS(stateService.getState());
        return $scope.workSheetList[idxWS].worksheet;
    }

    function initRun() {
        // initial setup needed when page changed into another worksheet
        var myWorkSheet = getCurrWS();

        //var idxWS = getWS(stateService.getState());
        //$scope.myWorksheet = $scope.workSheetList[idxWS].worksheet;

        $scope.dimensionContainer = myWorkSheet.getDimension();
        $scope.measureContainer = myWorkSheet.getMeasure();
        $scope.drillDownContainer = myWorkSheet.getDrillDown();
        if ((myWorkSheet.chart.highchart != null) && (myWorkSheet.data.length > 0)) {
            console.log (myWorkSheet.chart.highchart );
            console.log (myWorkSheet.data);
            myWorkSheet.drawChartContainer(myWorkSheet.chart.highchart);
        }
        else {
            $('#chartContainer').html('');
        }
    }

    var init = function () {
        if (WSfirst.getFirst()) {
            // First time worksheet controller created, fill dimension list, measure list, and measure type
            fill_dimension();
            //fill_measure_type();
            fill_measure();
            fill_chart_list_system();
            fill_chart_list_local();
            $scope.typeList.push("SUM", "AVG", "COUNT");
            $scope.drillDownContainerDummy.push({
                data: 'Drilldown Dimension',
                type: 'drilldown'
            });
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
        $timeout(function() {
            init();
        });
    }, true);

    function deleteSame(target, arrayDel){
        var i = 0;
        var found = false;
        while ((i < arrayDel.length) && (!found)) {
            if (arrayDel[i].data == target.data)
                found = true;
            else
                i++;
        }
        if (found) return i;
        else return -1;
    }

    //$scope.$watch('dimensionList', function(newval) {
    //    $timeout(function() {
    //        console.log("dimension list");
    //        console.log(newval);
    //        var i = 0;
    //        var found = false;
    //        var res = -1;
    //        while ((i < $scope.measureList.length) && (!found)) {
    //            res = deleteSame($scope.dimensionList[i], $scope.measureList);
    //            if (res != -1) {
    //                $scope.measureList.splice(i, 1);
    //                found = true;
    //            }
    //            else
    //                i++
    //        }
    //    });
    //}, true);
    //
    //$scope.$watch('measureList', function(newval) {
    //    $timeout(function() {
    //        console.log("measure list");
    //        console.log(newval);
    //        var i = 0;
    //        var found = false;
    //        var res = -1;
    //        while ((i < $scope.dimensionList.length) && (!found)) {
    //            res = deleteSame($scope.measureList[i], $scope.dimensionList);
    //            if (res != -1) {
    //                $scope.dimensionList.splice(i, 1);
    //                found = true;
    //            }
    //            else
    //                i++
    //        }
    //    });
    //}, true);

    $scope.$watch('dimensionContainer', function(newval) {
        $timeout(function() {
            //console.log($scope.dimensionContainer);
            var myWorkSheet = getCurrWS();
            myWorkSheet.dimensionContainer = $scope.dimensionContainer;

            var idxWS = getWS(stateService.getState());
            console.log("WS dr WS list utk dimension container");
            console.log(myWorkSheet.dimensionContainer);
            console.log ($scope.workSheetList[idxWS].worksheet.dimensionContainer);
        });
    }, true);

    $scope.$watch('measureContainer', function(newval) {
        $timeout(function() {
            //console.log($scope.measureContainer);
            var myWorkSheet = getCurrWS();
            myWorkSheet.measureContainer = $scope.measureContainer;

            var idxWS = getWS(stateService.getState());
            //console.log("WS dr WS list utk measure container");
            //console.log(myWorkSheet.measureContainer);
            //console.log ($scope.workSheetList[idxWS].worksheet.measureContainer);
        });
    }, true);

    $scope.$watch('drillDownContainer', function(newval) {
        $timeout(function() {
            //console.log($scope.measureContainer);
            var myWorkSheet = getCurrWS();
            myWorkSheet.drillDownArr = $scope.drillDownContainer;

            var idxWS = getWS(stateService.getState());
            console.log("WS dr WS list utk drilldown container");
            console.log(myWorkSheet.drillDownArr);
            console.log ($scope.workSheetList[idxWS].worksheet.drillDownArr);
        });
    }, true);

    $scope.deleteCol = function (idx) {
        //$scope.columnList.splice(idx, 1);
        //$scope.myWorksheet.popMeasure(idx);
        var myWorkSheet = getCurrWS();
        myWorkSheet.popMeasure(idx);
    };

    $scope.deleteRow = function (idx) {
        //$scope.rowList.splice(idx, 1);
        //$scope.myWorksheet.popDimension(idx);
        var myWorkSheet = getCurrWS();
        myWorkSheet.popDimension(idx);
    };

    $scope.deleteDrillDown = function(idx) {
        var myWorkSheet = getCurrWS();
        myWorkSheet.popDrillDown(idx);
    };

    $scope.changeMeasure = function (measureName, idx) {
        alert ("index: " + idx + ", name: " + measureName);
        //swal ("Information", "index: " + idx + ", name: " + measureName, "warning");
    };

    $scope.generateChart = function (type, idx) {
        var checkIsDrillDown = function () {
            var i = 0;
            var found = false;
            while (i<$scope.dimensionContainer.length && !found) {
                if ($scope.dimensionContainer[i].type == 'drilldown')
                    found = true;
                else
                    i++;
            }
            if (found) return i;
            else return -1;
        };

        var idxFound = checkIsDrillDown();

        // type == 0 for load chart from database system, 1 for load chart from local storage
        if (type == 0) {
            $scope.loadJSChart = $scope.chartListSystem[idx]['url-js'];
            $scope.loadJSChartLocal = "";
            var chart_type = $scope.chartListSystem[idx]['type'];

            //var idxWS = getWS(stateService.getState());
            //$scope.workSheetList[idxWS].worksheet.chart.highchart = optikos_chart;
            //$scope.workSheetList[idxWS].worksheet.chart.dimensionQuantity = optikos_chart.dimensionQuantity;
            //$scope.workSheetList[idxWS].worksheet.chart.measureQuantity = optikos_chart.measureQuantity;
            //
            //$scope.workSheetList[idxWS].worksheet.drawChart(chart_type);

            //var myWorkSheet = getCurrWS();
            //myWorkSheet.chart.highchart = optikos_chart;
            //myWorkSheet.chart.dimensionQuantity = optikos_chart.dimensionQuantity;
            //myWorkSheet.chart.measureQuantity = optikos_chart.measureQuantity;
            //myWorkSheet.drawChart(chart_type);
        }
        else if (type == 1) {
            $scope.loadJSChart = "";
            $scope.loadJSChartLocal = $scope.chartListLocal[idx]['jsChart'];
            var chart_type = $scope.chartListLocal[idx]['type'];

            // ERROR BECAUSE 'OPTIKOS_CHART' IS NOT DEFINED?
            // KARENA WATCH PERUBAHAN DILAKUKAN ASYNC, OPTIKOS_CHART MASIH BELUM ADA
            // PERLU DILAKUKAN SYNC. BERLAKU UTK KODE DI ATAS JUGA

            //var myWorkSheet = getCurrWS();
            //myWorkSheet.chart.highchart = optikos_chart;
            //myWorkSheet.chart.dimensionQuantity = optikos_chart.dimensionQuantity;
            //myWorkSheet.chart.measureQuantity = optikos_chart.measureQuantity;
            //myWorkSheet.drawChart(chart_type);
        }

        var myWorkSheet = getCurrWS();
        myWorkSheet.chart.highchart = optikos_chart;
        myWorkSheet.chart.dimensionQuantity = optikos_chart.dimensionQuantity;
        myWorkSheet.chart.measureQuantity = optikos_chart.measureQuantity;
        myWorkSheet.drawChart(chart_type, idxFound);

        //var wsDrawChart = function() {
        //    if ($scope.loadChart) {
        //        console.log($scope.loadChart);
        //        myWorkSheet.drawChart(chart_type, idxFound);
        //        $scope.loadChart = false;
        //        console.log($scope.loadChart);
        //        return;
        //    }
        //    setTimeout(wsDrawChart, 1000);
        //};
        //wsDrawChart();
    };

    $scope.$watch('loadJSChartLocal', function() {
        $timeout(function() {
            if ($scope.loadJSChartLocal.length > 0) {
                $("#load-chart-script-local").append($("<script />", {
                    html: $scope.loadJSChartLocal
                }));
                $scope.loadChart = true;
            }
            else {
                // remove script in load-chart-script div
                $('#load-chart-script-local').html('');
            }
        });
    }, true);

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
                $scope.loadChart = true;
            }
            else {
                // remove script in load-chart-script div
                $('#load-chart-script').html('');
            }
        });
    }, true);

    $scope.chartType = [
        {label: 'Line',     value: 'line'},
        {label: 'Bar',      value: 'bar'},
        {label: 'Column',   value: 'column'},
        {label: 'Pie',      value: 'pie'},
        {label: 'Bubble',   value: 'bubble'},
        {label: 'Heatmap',  value: 'heatmap'},
        {label: 'Area',     value: 'area'},
        {label: 'Scatter',  value: 'scatter'},
        {label: 'Treemap',  value: 'treemap'}];

    $scope.addChartObj = {
        chartType: {},
        dimensionQuantity: 0,
        measureQuantity: 0,
        urlImage: '',
        dataImage: '',
        urlChart: '',
        jsChart: ''
    };

    $scope.addChart = function() {

        $scope.readImageReady = false;
        $scope.readFileReady = false;

        var readImage = function () {
            var files = document.getElementById('imageInputFile').files;

            //if (!file.type.match('image.*')) {
            //    continue;
            //}

            var file = files[0];
            var start = 0;
            var stop = file.size - 1;
            var reader = new FileReader();
            // If we use onloadend, we need to check the readyState.
            reader.onloadend = function(evt) {
                if (evt.target.readyState == FileReader.DONE) { // DONE == 2
                    $scope.addChartObj.dataImage = evt.target.result;
                    $scope.readImageReady = true;
                }
            };

            reader.readAsDataURL(file);
        };

        var readFile = function() {
            var files = document.getElementById('jsInputFile').files;
            //if (!files.length) {
            //    alert('Please select a file!');
            //    return;
            //}

            var file = files[0];
            var start = 0;
            var stop = file.size - 1;
            var reader = new FileReader();

            // If we use onloadend, we need to check the readyState.
            reader.onloadend = function(evt) {
                if (evt.target.readyState == FileReader.DONE) { // DONE == 2
                    $scope.addChartObj.jsChart = evt.target.result;
                    $scope.readFileReady = true;
                }
            };

            var blob = file.slice(start, stop + 1);
            reader.readAsBinaryString(blob);
        };

        var checkIsReady = function() {
            console.log("checkisready called, readImageReady: " + $scope.readImageReady + ", readFileReady" + $scope.readFileReady);
            if (($scope.readImageReady === true) && ($scope.readFileReady === true)) {
                //console.log("readfile");
                //console.log($scope.addChartObj.jsChart);
                //console.log("readimage");
                //console.log($scope.addChartObj.dataImage);

                // Store data to local storage
                var oldItems = JSON.parse(localStorage.getItem('chartTable')) || [];
                var newItem = {
                    'type': $scope.addChartObj.chartType.value,
                    'dimensionSum': $scope.addChartObj.dimensionQuantity,
                    'measureSum': $scope.addChartObj.measureQuantity,
                    'jsChart': $scope.addChartObj.jsChart,
                    'dataImage': $scope.addChartObj.dataImage
                };
                oldItems.push(newItem);
                    console.log("old chartListLocal");
                    console.log($scope.chartListLocal);
                    //$scope.chartListLocal = oldItems;
                $scope.chartListLocal.push(newItem);
                    console.log("new chartListLocal");
                    console.log($scope.chartListLocal);
                localStorage.setItem('chartTable', JSON.stringify(oldItems));

                // Clear data
                $scope.addChartObj.chartType = {};
                $scope.addChartObj.dimensionQuantity = 0;
                $scope.addChartObj.measureQuantity = 0;
                $scope.addChartObj.jsChart = '';
                $scope.addChartObj.dataImage = '';

                return;
            }
            setTimeout(checkIsReady, 1000);
        };

        // Check for the various File API support.
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            // Success! All the File APIs are supported.

            // Get all variable
            readImage();
            readFile();
            checkIsReady();
        }
        else {
            alert('The File APIs are not fully supported in this browser.');
        }

        //alert (
        //    "value of chosen chart: " + $scope.addChartObj.chartType.value + "\n" +
        //    "value of dimension Q: " + $scope.addChartObj.dimensionQuantity + "\n" +
        //    "value of dimension Q: " + $scope.addChartObj.measureQuantity + "\n"
        //);
    };
});