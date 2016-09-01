(function(){
    var module = angular.module("humleyTest");

    var WatsonAPI = function($http, $log){
        
        var classificationId ="be05f9x94-nlc-2409";
        var url = "https://gateway.watsonplatform.net/natural-language-classifier/api/v1/classifiers/"+classificationId+"/classify";

        var checkStatus = function(){
            var url = "https://gateway.watsonplatform.net/natural-languge-classifier/api/v1/classifiers/be05f9x94-nlc-2409";
            return $http.get(url).then(function(response){
                return response.data;
            })
        }

        var askQuestion = function(question){
            var data = { text: question};
            return $http.get(url,
            data,
            {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(function(response){
                return response.data;
            });
        };
        return {
            askQuestion:askQuestion,
            checkStatus:checkStatus
        };        
    };

    module.factory("watsonAPI", ['$http', '$log',WatsonAPI]);
})();