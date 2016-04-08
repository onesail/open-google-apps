console.info("loading googleapps.js ...");

var app = angular.module('OpenGoogleApps', []);

app.config(['$compileProvider',
    function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(http?|googledocs|googlesheets|googleslides):/);
    }
]);

app.controller('AppController', function ($scope) {

    console.info("OpenGoogleApps 20160408");

    $scope.vm = {}

    $scope.clear = function() {
        console.info("clear()");
        $scope.vm.doclink = "";
        $scope.vm.applink = "";
        $scope.vm.appname = "Google's";
        $scope.vm.buttonEnabled = false;
    }

    $scope.setAppLink = function(googleApplication) {
        console.info("setAppLink(%s)", googleApplication);
        $scope.vm.applink = googleApplication + ":" + $scope.vm.doclink;
        $scope.vm.appname = googleApplication;
        $scope.vm.buttonEnabled = true;
        console.info("applink: %s", $scope.vm.applink);
    }

    $scope.doclinkChanged = function() {
        console.info("doclinkChanged()");
        console.info("doclink: %s", $scope.vm.doclink);

        if (/docs\.google\.com\/document/.test($scope.vm.doclink)) {
            $scope.setAppLink("GoogleDocs");

        } else if (/docs\.google\.com\/spreadsheet/.test($scope.vm.doclink)) {
            $scope.setAppLink("GoogleSheets");

        } else if (/docs\.google\.com\/presentation/.test($scope.vm.doclink)) {
            $scope.setAppLink("GoogleSlides");

        } else {
            $scope.vm.applink = "";
            $scope.vm.appname = "Google's";
            $scope.vm.buttonEnabled = false;
        }
    }

    $scope.runTest = function() {
        console.info("runTest()");
        $scope.vm.doclink="https://docs.google.com/document/d/1-tmUJFWlizc1FkkJDsvOE7jEgBuk89wZCpK8X8Y-wFg/edit?usp=sharing";
        $scope.doclinkChanged();
    }

    $scope.clear();
    //$scope.runTest();

});
