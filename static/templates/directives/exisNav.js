angular.module('exisNavModule', [])
.directive('exisNav', [function() {
  return {
    restrict: 'E',                  // must be an element
    scope: {
      bgColor: '@backgroundColor',  // for basic coloring
      background: '@'               // for gradients (e.g. Swift)
    },
    controller: function($scope) {  // set some default values
      if (!$scope.bgColor && !$scope.background) {
        $scope.bgColor = '#282B35';
      }

      if (!$scope.background) {
        $scope.background = $scope.bgColor;
      }
    },
    templateUrl: '../static/templates/exis-nav.html'
  };
}]);
