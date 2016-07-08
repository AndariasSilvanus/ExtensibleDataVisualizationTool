/**
 * Created by Andarias Silvanus on 16/06/23.
 */

//optikosApp.directive('worksheetButton', function() {
//    return {
//        restrict: "E",
//        scope: {},
//        templateUrl:'ContactType.html',
//        controller: function($rootScope, $scope, $element) {
//            $scope.contacts = $rootScope.GetContactTypes;
//        }
//    }
//});

//optikosApp.directive('load-chart-script', [function() {
//    return function(scope, element, attrs) {
//        angular.element('<script src="/path/to/my/file.js"></script>').appendTo(element);
//    }
//}]);

optikosApp.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                };
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);