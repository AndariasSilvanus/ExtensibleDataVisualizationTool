/**
 * Created by Andarias Silvanus on 16/06/23.
 */

optikosApp.directive('worksheetButton', function() {
    return {
        restrict: "E",
        scope: {},
        templateUrl:'ContactType.html',
        controller: function($rootScope, $scope, $element) {
            $scope.contacts = $rootScope.GetContactTypes;
        }
    }
});