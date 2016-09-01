(function(){
    var module = angular.module("humleyTest");

    var WatsonAPI = function($http, $log){
        var checkStatus = function(){
            return $http.get('/api/status')
            .then(function(response){
                return response.data;
            })
        }

        var askQuestion = function(question){
            return $http.get('/api/ask/'+question)
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