angular.module('exisNavModule', [])
.directive('exisNav', [function() {
  return {
    restrict: 'E',                  // must be an element
    scope: {
      background: '@'               // for gradients (e.g. Swift)
    },
    controller: function($scope) {
      $scope.backgroundString = '';

      if ($scope.background) {
        $scope.backgroundString = 'background: ' + $scope.background + ';';
      }
    },
    templateUrl: '../static/templates/exis-nav.html'
  };
}]);
