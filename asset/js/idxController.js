/**
 * Created by Andarias Silvanus on 16/05/28.
 */
'use strict';

/* Controllers */

//angular.module('controller', [])

    optikosApp.controller('idxController', function ($rootScope, $scope, stateService, WSListService) {

        //$scope.items = ['Data', 'Worksheet', 'Dashboard'];
        //$scope.selection = $scope.items[0];

        $scope.selection = 'Data';
        $rootScope.currentState = $scope.selection;
        var workSheetInit = {
            name: 'Worksheet 1',
            worksheet: new worksheet()
        };

        $scope.workSheetList = WSListService;
        $scope.workSheetList.push(workSheetInit);

        $scope.changeView = function(sheetType, sheetName){
            console.log("masuk change view, sheetType: " + sheetType + ", sheetName: " + sheetName);
            $scope.selection = sheetType;
            stateService.setState(sheetName);
            console.log("currState stateService: " + stateService.getState());
        };

        $scope.addWorksheet = function() {
            var count = $scope.workSheetList.length;
            ++count;
            var newName = 'Worksheet ' + count;
            var WS = {
                name: newName,
                worksheet: new worksheet()
            };
            $scope.workSheetList.push(WS);
        };
    });