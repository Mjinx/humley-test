(function(){
    "use strict";

    var module = angular.module("humleyTest");

    var WatsonCtrl = function($scope, watsonAPI) {
        $scope.message = "choose a classifier..";

        var onRepo = function(data){
            console.log(data);
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

            watsonAPI.askQuestion($scope.classifier,question)
            .then(onRepo, onError);
        };

        $scope.checkStatus = function(){
            $scope.message = "Just checking...";
            $scope.repo = null;
            
            watsonAPI.checkStatus($scope.classifier)
            .then(onRepo, onError);
        };

        watsonAPI.classifiers().then(function(data){
            $scope.message = '';
            $scope.classifiers = data;  
        }, onError);

        $scope.classifier = null;
    };

    module.controller("watsonCtrl",['$scope', 'watsonAPI', WatsonCtrl]);
})();