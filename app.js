var app = angular.module('project',['ngMessages']);

app.controller('TestController', function($scope) {
  $scope.testValue = "This is very basic test controller";
  $scope.phone = '';

  $scope.setFormScope= function(scope){
     $scope.formScope = scope;
  }
});


app.directive('phoneValidate', function() {
    return {
        require: 'ngModel',
        replace: true,
        restrict: 'AE',
        scope: {}, // isolates scope
        template: '<div><input type="text" ng-model="formattedPhone" class="formattedPhone" /></div>',
        link: function(scope, elm, attrs, ngModel) {
           scope.formattedPhone = '';

           scope.$watch('formattedPhone', function (viewValue) {
             var phoneValidLength = (viewValue && viewValue.replace(/\D/g, '').length == 10 ? 'valid' : undefined);
             if(phoneValidLength) {
                 ngModel.$setValidity('phone', true);
                 ngModel.$setViewValue(viewValue.replace(/\D/g, ''));
             } else {
                 ngModel.$setValidity('phone', false);
             }
           }, true);

            ngModel.$render = function () {
              var modelValue = ngModel.$viewValue;
              if (modelValue) {
                 element.find('.formattedPhone').val('formatted - ' + modelValue + ' =======')
              }
            };
        }
    };
});
