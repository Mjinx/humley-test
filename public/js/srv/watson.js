(function(){
    "use strict";

    var module = angular.module("humleyTest");

    var WatsonAPI = function($http, $log){
        var classifiers = function(){
            return $http.get('/api/classifiers')
            .then(function(response){
                return response.data;
            })
        }

        var checkStatus = function(id){
            return $http.get('/api/status/'+id)
            .then(function(response){
                return response.data;
            })
        }

        var askQuestion = function(id,question){
            return $http.get('/api/ask/'+id+'/'+question)
            .then(function(response){
                return response.data;
            });
        };
        return {
            askQuestion:askQuestion,
            checkStatus:checkStatus,
            classifiers:classifiers
        };        
    };

    module.factory("watsonAPI", ['$http', '$log',WatsonAPI]);
})();