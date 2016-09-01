(function(){
    "use strict";

    var module = angular.module("humleyTest");

    var WatsonCtrl = function($scope, watsonAPI) {
        $scope.message = "ask me anything.";



        var onRepo = function(data){
            $scope.message = data.answer;
            $scope.repo = data;  
        };

        var onError = function(reason){
            $scope.message = reason;  
            $scope.error = data;  
        };

        $scope.ask = function(question){
            $scope.message = "Asking...";
            $scope.repo = null;

            watsonAPI.askQuestion(question)
            .then(onRepo, onError);
        };

        $scope.checkStatus = function(){
            $scope.message = "Just checking...";
            $scope.repo = null;

            watsonAPI.checkStatus()
            .then(onRepo, onError);
        };
    };

    module.controller("watsonCtrl",['$scope', 'watsonAPI', WatsonCtrl]);
})();