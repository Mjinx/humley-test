(function(){
    var module = angular.module("humleyTest");

    var WatsonCtrl = function($scope, watsonAPI) {

        $scope.question = "";

        var onRepo = function(data){
          $scope.repo = data;  
        };
        
        var onError = function(reason){
          $scope.error = reason;  
        };

         $scope.ask = function(q){
             watsonAPI.askQuestion(q)
             .then(onRepo, onError);
         };

         $scope.checkStatus = function(){
             watsonAPI.checkStatus()
             .then(onRepo, onError);

         }
    };

    module.controller("watsonCtrl",['$scope', 'watsonAPI', WatsonCtrl]);
})();