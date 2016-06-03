/**
 * Created by Andarias Silvanus on 16/05/28.
 */
'use strict';

/* Controllers */

angular.module('controller', [])
    .controller('mainController', function ($scope, dataService, $http) {
        $scope.samples = [
            { title : 'Cars (multivariate)', url : 'data/multivariate.csv' },
            { title : 'Movies (dispersions)', url : 'data/dispersions.csv' },
            { title : 'Music (flows)', url : 'data/flows.csv' },
            { title : 'Cocktails (correlations)', url : 'data/correlations.csv' }
        ];

        $scope.$watch('sample', function (sample){
            if (!sample) return;
            dataService.loadSample(sample.url).then(
                function(data){
                    $scope.text = data;
                },
                function(error){
                    $scope.error = error;
                }
            );
        });

        // init
        $scope.raw = dataProcessor;
        $scope.data = [];
        $scope.metadata = [];
        $scope.error = false;
        $scope.loading = true;

        $scope.categories = ['Correlations', 'Distributions', 'Time Series', 'Hierarchies', 'Others'];

        $scope.parse = function(text){

            //if ($scope.model) $scope.model.clear();

            $scope.data = {};
            $scope.metadata = [];
            $scope.error = false;
            $scope.$apply();

            try {
                var parser = dataProcessor.parser();
                $scope.data = parser(text);
                //$scope.metadata = parser.metadata(text); -> give error
                $scope.error = false;
            } catch(e){
                $scope.data = {};
                $scope.metadata = [];
                $scope.error = e.name == "ParseError" ? +e.message : false;
            }
            //if (!$scope.data.length && $scope.model) $scope.model.clear();
            $scope.loading = false;
        };

        $scope.delayParse = dataService.debounce($scope.parse, 500, false);

        var timeoutCode;
        var delayInMs = 200;
        $scope.$watch("text", function (text){
            clearTimeout(timeoutCode);
            timeoutCode = setTimeout(function(){   //Set timeout
                $scope.loading = true;
                $scope.delayParse(text);
                $http({
					method : 'POST',
					url : 'api/addData',
					data : $scope.data
				});
            },delayInMs);
        });
    })