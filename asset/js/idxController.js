/**
 * Created by Andarias Silvanus on 16/05/28.
 */
'use strict';

/* Controllers */

//angular.module('controller', [])

    optikosApp.controller('idxController', function ($scope) {

        $scope.items = ['data', 'worksheet', 'dashboard'];
        $scope.selection = $scope.items[0];

    });