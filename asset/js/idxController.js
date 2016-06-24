/**
 * Created by Andarias Silvanus on 16/05/28.
 */
'use strict';

/* Controllers */

//angular.module('controller', [])

    optikosApp.controller('idxController', function ($rootScope, $scope) {

        //$scope.items = ['Data', 'Worksheet', 'Dashboard'];
        //$scope.selection = $scope.items[0];

        $scope.selection = 'Data';
        $rootScope.workSheetList = ['Worksheet 1'];

        $scope.changeView = function(item){
            $scope.selection = item;
        };

        $scope.addWorksheet = function() {
            var count = $rootScope.workSheetList.length;
            ++count;
            var newName = 'Worksheet ' + count;
            $rootScope.workSheetList.push(newName);
        };
    });