(function(){
    var module = angular.module("humleyTest",['ngRoute']);
    module.config(function ($httpProvider) {
        var login = "ae641e65-28bc-4835-a14e-7fa6cc104981";
        var password = "J1EVZ0Xvq3e0";
        $httpProvider.defaults.headers.common["Authorization"] = "Basic " + login + ":" + password;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    });
})();